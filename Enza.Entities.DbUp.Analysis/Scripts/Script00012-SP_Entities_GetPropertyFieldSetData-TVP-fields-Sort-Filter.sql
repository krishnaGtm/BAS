/**********************************************************************************************************************
Author:			Dibya Mani Suvedi
Created Date:	2016-06-29
Description:	Gets data from property fieldsets only

EXAMPLE:
DECLARE @filters TVP_Filters, @sorts TVPSorting;


INSERT INTO @filters(FieldName, FieldType, FieldValue, Expression, Operator) VALUES('EZID', 'INT', 954490, 'gte', NULL);
INSERT INTO @sorts(ColumnName, SortDir) VALUES('EZID', 'DESC');

EXEC [SP_Entities_GetPropertyFieldSetData] 'TO', 'BAT', -1, NULL, 25, 1, NULL, @filters, @sorts
**********************************************************************************************************************/
IF OBJECTPROPERTY(object_id('dbo.SP_Entities_GetPropertyFieldSetData'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Entities_GetPropertyFieldSetData]
GO
CREATE PROCEDURE [dbo].[SP_Entities_GetPropertyFieldSetData]
(
	@CropCode		NCHAR(2),
	@EntityTypeCode	NCHAR(3),
	@Level			INT,
	@EZID			INT,
	@PageSize		INT,
	@PAGE_OFFSET	INT,
	@fields			TVP_FIELDS	READONLY,	
	@filters		TVP_Filters	READONLY,
	@sorts			TVPSorting	READONLY,
	@Year			NVARCHAR(MAX)
) AS BEGIN
	DECLARE 
		@SQL			NVARCHAR(MAX),
		@P_DEF			NVARCHAR(1024),
		@TABLE_NAME		VARCHAR(30),
		@COLUMNS		NVARCHAR(MAX),
		@COLUMNS2		NVARCHAR(MAX),
		@TEMP_COLUMNS	NVARCHAR(MAX),
		@ERROR			NVARCHAR(255),
		@YearFilter		NVARCHAR(MAX),
		@WHERE			NVARCHAR(MAX); 

	IF(ISNULL(@EZID, 0) = 0) BEGIN
		SELECT @TABLE_NAME = QUOTENAME(TableName) FROM EntityType WHERE EntityTypeCode = @EntityTypeCode
		IF(ISNULL(@TABLE_NAME, '') = '') BEGIN
			SET @ERROR = 'Table ''' + @TABLE_NAME + ''' doesn''t exist in EntityType table.';
			RAISERROR(@ERROR, 16, 1);		
		END
		SELECT 
			@COLUMNS = CONCAT(COALESCE(@COLUMNS + ',', ''), CASE WHEN F.EntityTypeCode = @EntityTypeCode THEN ColumnLabel ELSE '''''' END, ' AS ', QUOTENAME(TraitID)),
			@COLUMNS2 = CONCAT(COALESCE(@COLUMNS2 + ',', ''), QUOTENAME(TraitID))
		FROM @fields F
		WHERE F.EntityTypeCode IS NOT NULL;
	END
	ELSE BEGIN
		SELECT
			@COLUMNS = CONCAT(COALESCE(@COLUMNS + ',', ''), CASE WHEN F.EntityTypeCode = R.EntityTypeCode2 THEN ColumnLabel ELSE '''''' END, ' AS ', QUOTENAME(TraitID)),
			@COLUMNS2 = CONCAT(COALESCE(@COLUMNS2 + ',', ''), QUOTENAME(TraitID))
		FROM @fields F
		LEFT JOIN
		(
			SELECT DISTINCT 
				EntityTypeCode2
			FROM dbo.Relationship 
			WHERE EZID1 = @EZID
		) R ON R.EntityTypeCode2 = F.EntityTypeCode
		WHERE F.EntityTypeCode IS NOT NULL;	
	END	

	IF(@TABLE_NAME = '[Trial]' AND ISNULL(@Year,'')<>'')
			SET @YearFilter = '
			AND T1.[Year] IN ('+@Year+')
			';
		ELSE
			SET @YearFilter = '';

	SET @TEMP_COLUMNS = 'E.EZID, E.EntityTypeCode, T1.Name';
	IF(ISNULL(@COLUMNS, '') <> '') BEGIN
		SET @TEMP_COLUMNS = CONCAT(@TEMP_COLUMNS, ',', @COLUMNS);
	END

	SET @SQL = N'SELECT  TOP 50000 * FROM
				(
					SELECT ' 
						+ @TEMP_COLUMNS +
					N' FROM Entity E
					JOIN ' + @TABLE_NAME + N' T1 ON T1.EZID = E.EZID
					WHERE E.EntityTypeCode = @EntityTypeCode AND T1.CropCode = @CropCode '+@YearFilter+' 
				) AS V1 ';
	--Look for children if ezid exists
	IF(ISNULL(@EZID, 0) <> 0) BEGIN
		SET @SQL = N'SELECT  TOP 25000 * FROM
					(
						SELECT ' + @TEMP_COLUMNS + N' FROM 
						(
							SELECT
								EZID2 AS EZID,
								EntityTypeCode2 AS EntityTypeCode
							FROM Relationship R
							WHERE R.EZID1 = @EZID
						) AS E
						JOIN EntityType ET ON ET.EntityTypeCode = E.EntityTypeCode '
						+ dbo.FN_GetJoinedChildEntities('E', @EZID) +
						N' WHERE T1.CropCode = @CropCode 
					) AS V1';
	END

	--Apply Filtering
	SET @WHERE = dbo.FN_ApplyFilters(@filters,@fields);
	IF(ISNULL(@WHERE, '') <> '') BEGIN
		SET @SQL = @SQL + ' WHERE ' + @WHERE;
	END	

	SET @SQL = N'WITH CTE AS (' + @SQL + N'), CTE_COUNT AS 
				(
					SELECT COUNT(DISTINCT EZID) AS TotalRows FROM CTE
				)
				SELECT 
					E.EZID, 
					E.EntityTypeCode, [Name] ' + CASE WHEN ISNULL(@COLUMNS2, '') <> '' THEN  CONCAT(',', @COLUMNS2) ELSE '' END + ', 
					TotalRows, 
					ChildRows = ISNULL(ChildRows, 0), 
					[Level] = ' + CAST((ISNULL(@Level, -1) + 1) AS VARCHAR) + N'
				FROM 
				(	
					SELECT * FROM CTE, CTE_COUNT
				) AS E
				LEFT JOIN
				(
					SELECT 
						EZID1, 
						ChildRows = COUNT(EZID1) 
					FROM Relationship R 					
					GROUP BY EZID1
				) V2 ON V2.EZID1 = E.EZID ';
	--Apply Sorting
	SET @SQL = @SQL + dbo.FN_ApplySort(@sorts,@fields);


	SET @SQL = @SQL + N' OFFSET @PAGE_OFFSET ROWS
						FETCH NEXT @PageSize ROWS ONLY';

	PRINT @SQL;

	IF(ISNULL(@EZID, 0) <> 0) BEGIN
		EXEC sp_executesql @SQL, N'@CropCode NCHAR(2), @EntityTypeCode NCHAR(3), @EZID INT, @PAGE_OFFSET INT, @PageSize INT', @CropCode = @CropCode, @EntityTypeCode = @EntityTypeCode, 
			@EZID = @EZID, @PAGE_OFFSET = @PAGE_OFFSET, @PageSize = @PageSize;
	END
	ELSE BEGIN
		EXEC sp_executesql @SQL, N'@CropCode NCHAR(2), @EntityTypeCode NCHAR(3), @PAGE_OFFSET INT, @PageSize INT', @CropCode = @CropCode, @EntityTypeCode = @EntityTypeCode, 
			@PAGE_OFFSET = @PAGE_OFFSET, @PageSize = @PageSize;
	END
END

