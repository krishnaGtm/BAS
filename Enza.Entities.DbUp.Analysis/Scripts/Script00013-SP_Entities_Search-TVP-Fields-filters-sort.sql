/*
	SET NOCOUNT ON;

	DECLARE @fields TVP_Fields, @filters TVP_Filters, @sorts TVPSorting, @search TVP_Filters;
	DECLARE @xml XML;
	EXEC SP_Masters_GetFields 942, 3, NULL, NULL, @xml OUT;	
	IF(@xml IS NOT NULL) BEGIN
		INSERT INTO @fields(EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder)
		SELECT EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder
		FROM dbo.FN_Masters_GetFields(@xml);
	END
	--================
	INSERT INTO @filters(FieldName, FieldType, FieldValue, Expression, Operator) VALUES ('51', 'ST','426','contains', NULL);
	INSERT INTO @sorts(ColumnName, SortDir) VALUES('2244', 'ASC');
	INSERT INTO @search(FieldName, FieldType, FieldValue, Expression, Operator) VALUES ('EZID', 'ST','683','contains', NULL);

	DECLARE @pageNum INT;
	EXEC PR_Entities_Search 'TO', 'BAT', @fields, @filters, @sorts, @search, NULL, NULL, 25, @pageNum OUTPUT
	PRINT @pageNum

	SET NOCOUNT OFF;

	--SELECT TOP 1 ROW_ID
	--FROM    ( SELECT    ROW_NUMBER() OVER ( ORDER BY [2244] ASC ) AS ROW_ID ,
	--					*
	--		  FROM      ( SELECT    E.EZID ,
	--								E.Name ,
	--								[BatchNr] AS [2244]
	--					  FROM      [Batch] E
	--					  WHERE     CropCode = 'TO'
	--					) AS V1
	--		) AS V1
	--WHERE   1 = 1
	--		AND ( ([EZID] LIKE '%683%') )
	--ORDER BY [2244] ASC;
*/
IF OBJECTPROPERTY(object_id('dbo.SP_Entities_Search'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Entities_Search]
GO

CREATE PROCEDURE [dbo].[SP_Entities_Search]
(
	@CropCode		NCHAR(3),
	@ETC			NCHAR(3),
	@fields			TVP_Fields	READONLY,
	@filters		TVP_Filters READONLY,
	@sorts			TVPSorting	READONLY,
	@search			TVP_Filters  READONLY,
	@FindDir		CHAR(1) = NULL,
	@LAST_ROW_ID	INT = NULL,
	@PageSize		INT,
	@PageNum		INT	OUTPUT
)AS BEGIN
	SET NOCOUNT ON;

	DECLARE 
		@TableName		NVARCHAR(50), 
		@SQL			NVARCHAR(MAX), 
		@SQL_FILTERS	NVARCHAR(MAX), 
		@SQL_SORTS		NVARCHAR(MAX), 
		@SQL_SEARCH		NVARCHAR(MAX), 
		@COLUMNS		NVARCHAR(MAX) = '', 
		@Error			NVARCHAR(MAX);

	SET @SQL_FILTERS = dbo.FN_ApplyFilters(@filters, @fields);
	SET @SQL_SORTS = dbo.FN_ApplySort(@sorts, @fields);
	SET @SQL_SEARCH = dbo.FN_ApplyFilters(@search, @fields); --'([Name]  LIKE  ''%426%'')';
	--PRINT @SQL_FILTERS;
	--PRINT @SQL_SORTS;
	--PRINT @SQL_SEARCH;
	
	--Get table Name based on etc
	SELECT @TableName = QUOTENAME(TableName) FROM EntityType WHERE EntityTypeCode = @ETC
	IF(ISNULL(@TableName, '') = '') BEGIN
		SET @ERROR = 'Table ''' + @TableName + ''' doesn''t exist in EntityType table.';
		RAISERROR(@ERROR, 16, 1);
		RETURN;		
	END

	--Get TraitIDs and TraitColumns for observations 
	DECLARE @TraitIDs VARCHAR(MAX), @TraitColumns VARCHAR(MAX);
	SELECT 
		@TraitColumns = CONCAT(COALESCE(@TraitColumns + ',', ''), QUOTENAME(T.TraitID)),
		@TraitIDS = CONCAT(COALESCE(@TraitIDS + ',', ''), T.TraitID)
	FROM @sorts S 
	JOIN @fields T ON CAST(T.TraitID AS VARCHAR) = S.columnName
	WHERE T.Property = 0; 
	
	SELECT 
		@TraitColumns = CONCAT(COALESCE(@TraitColumns + ',', ''), QUOTENAME(TraitID)),
		@TraitIDS = CONCAT(COALESCE(@TraitIDS + ',', ''), T.TraitID)
	FROM @filters F 
	JOIN @fields T ON CAST(T.TraitID AS VARCHAR) = F.FieldName
	WHERE T.Property = 0;

	--Get Property Columns only
	SELECT 
		@COLUMNS = COALESCE(@COLUMNS + ',', '') +  QUOTENAME(ColumnLabel) + ' AS ' + QUOTENAME(TraitID)
	FROM @fields F
	WHERE F.Property = 1
	AND F.EntityTypeCode = @ETC;

	--SELECT * FROM @fields
	--PRINT @TraitIDs;
	--PRINT @TraitColumns;
	--RETURN;
	
	IF(ISNULL(@TraitColumns, '') = '') BEGIN
		SET @SQL = N'
					SELECT 
						ROW_NUMBER() OVER(' + @SQL_SORTS + N') AS ROW_ID, 
						* 
					FROM
					(
						SELECT
							E.EZID,
							E.Name '	
							+ ISNULL(@COLUMNS, '') +
						N'FROM ' + @TableName + ' E 
						WHERE CropCode = @CropCode 
					) AS V1
					WHERE 1 = 1
				';

		--Filter
		IF(ISNULL(@SQL_FILTERS, '') <> '') BEGIN
			SET @SQL = @SQL + ' AND ' + @SQL_FILTERS;
		END
	
		--Search
		SET @SQL = N'SELECT TOP 1 @ROW_ID = ROW_ID FROM ( ' + @SQL + ') AS V1 WHERE 1 = 1';
		IF(ISNULL(@SQL_SEARCH, '') <> '') BEGIN
			SET @SQL = @SQL + ' AND (' + @SQL_SEARCH + ') ';
			--Find Next or Previous
			IF(ISNULL(@FindDir, '') <> '') BEGIN
				IF(@FindDir = 'N') BEGIN
					SET @SQL = @SQL + 'AND (ROW_ID > @LAST_ROW_ID) '
				END
				ELSE IF(@FindDir = 'P') BEGIN
					SET @SQL = @SQL + 'AND (ROW_ID < @LAST_ROW_ID) '
				END
			END
		END
		ELSE BEGIN
			SET @SQL = @SQL + 'AND (ISNULL(@LAST_ROW_ID, 0) = 0 OR ROW_ID = @LAST_ROW_ID) '
		END

		SET @SQL = @SQL  + @SQL_SORTS;

		PRINT @SQL;

		EXEC sp_executesql @SQL, N'@CropCode NCHAR(30), @ROW_ID INT OUTPUT, @LAST_ROW_ID INT', @CropCode = @CropCode, @ROW_ID = @PageNum OUTPUT, @LAST_ROW_ID = @LAST_ROW_ID;
		IF(@@ROWCOUNT > 0) BEGIN
			--Calculate page number from page offset.
			SET @PageNum = ((@PageNum - 1) / @PageSize) + 1;
		END
	END
	ELSE BEGIN
		SET @SQL = N'
					SELECT E.EZID 
					FROM
					(
						SELECT 
							EZID, CropCode, [Name] ' + ISNULL(@COLUMNS, '') + N'
						FROM ' + @TableName + N'
					) E
					JOIN
					(
						SELECT EZID, TraitID, ObsVal 
						FROM
						(
							SELECT EZID, TraitID, ObsVal
							FROM VwObservation4 
							WHERE TraitID IN (' + @TraitIDs + N')
						) AS V1
						PIVOT 
						(
							Max(ObsVal) FOR TraitID IN (' + @TraitColumns + N')
						) AS PT
						
					) AS V1 ON V1.EZID = E.EZID
					WHERE E.CropCode = @CropCode
					--AND E.BatchNr LIKE ''%111955%''
					--AND [11] LIKE ''%R%''
					'
		IF(ISNULL(@SQL_FILTERS, '') <> '') BEGIN
			SET @SQL = @SQL + ' AND ' + @SQL_FILTERS;
		END
			
		PRINT @SQL;

	END
    
	SET NOCOUNT OFF;
END
