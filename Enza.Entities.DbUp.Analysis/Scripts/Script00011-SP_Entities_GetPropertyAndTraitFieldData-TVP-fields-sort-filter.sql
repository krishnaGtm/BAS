
/**********************************************************************************************************************
Author:			Dibya Mani Suvedi
Created Date:	2016-06-29
Description:	Gets data from property fieldsets only

EXAMPLE:
DECLARE @filters TVP_Filters, @sorts TVPSorting;


INSERT INTO @filters(FieldName, FieldType, FieldValue, Expression, Operator) VALUES('1946', 'ST', IU, 'STATRSWITH', NULL);
--INSERT INTO @sorts(ColumnName, SortDir) VALUES('Name', 'DESC');

EXEC [SP_Entities_GetPropertyAndTraitFieldData] 'TO', 'BAT', -1, NULL,25, 0, @fields, @filters, @sorts
**********************************************************************************************************************/
IF OBJECTPROPERTY(object_id('dbo.SP_Entities_GetPropertyAndTraitFieldData'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Entities_GetPropertyAndTraitFieldData]
GO
CREATE PROCEDURE [dbo].[SP_Entities_GetPropertyAndTraitFieldData]
(
	@CropCode		NCHAR(20),
	@EntityTypeCode	NCHAR(3),
	@Level			INT,
	@EZID			INT,
	@PageSize		INT,
	@PAGE_OFFSET	INT,
	@fields			TVP_FIELDS READONLY,
	@filters		TVP_Filters	READONLY,
	@sorts			TVPSorting	READONLY,
	@Year			NVARCHAR(MAX),
	@TotalRows		INT OUTPUT
) AS BEGIN
	DECLARE 
		@SQL			NVARCHAR(MAX),
		@P_DEF			NVARCHAR(1024),
		@TABLE_NAME		VARCHAR(30),
		@COLUMNS		NVARCHAR(MAX),
		@COLUMNS2		NVARCHAR(MAX),
		@COLUMNS3		NVARCHAR(MAX),
		@TEMP_COLUMNS	NVARCHAR(MAX),
		@ERROR			NVARCHAR(255),
		@WHERE			NVARCHAR(MAX),
		@SORT			NVARCHAR(MAX),
		@SORT1			NVARCHAR(MAX);


	--get list of trait ids
	DECLARE @traitIDs VARCHAR(MAX);
	SELECT @traitIDs = COALESCE(@traitIDs + ',', '') + CAST(TraitID AS VARCHAR)
	FROM @fields;
	
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
		--WHERE F.EntityTypeCode IS NOT NULL 
		WHERE F.EntityTypeCode IS NOT NULL AND ISNULL(F.ColumnLabel,'') <> ''
		ORDER BY F.SortingOrder;
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
		WHERE F.EntityTypeCode IS NOT NULL AND ISNULL(F.ColumnLabel,'') <> '' 
		ORDER BY F.SortingOrder;
	END
	SELECT 
		@COLUMNS3 = CONCAT(COALESCE(@COLUMNS3 + ',', ''), QUOTENAME(TraitID))
	FROM @fields 
	WHERE EntityTypeCode IS NULL OR (EntityTypeCode IS NOT NULL AND ISNULL(ColumnLabel,'') = '') 
	ORDER BY SortingOrder;
	PRINT @COLUMNS3;
	--SELECT * FROM @fields;
	SET @TEMP_COLUMNS = 'E.EZID, EntityTypeCode ='''+@EntityTypeCode+''', E.[Name]';
	
	IF(ISNULL(@COLUMNS, '') <> '') BEGIN
		SET @TEMP_COLUMNS = CONCAT(@TEMP_COLUMNS, ',', @COLUMNS);
		
	END
	IF(ISNULL(@COLUMNS3,'')<> '')
		SET @TEMP_COLUMNS = @TEMP_COLUMNS +','+ @COLUMNS3;
	SET @SQL = N'SELECT ' 
						+ @TEMP_COLUMNS +
					N', [Level] = 0
					 --FROM ' + @TABLE_NAME + N' E
					FROM (SELECT * FROM ' + @TABLE_NAME + N') E 

				 ';

	SET @SQL = @SQL + '
						LEFT JOIN
						(
							SELECT EZID '+CASE WHEN ISNULL(@COLUMNS3, '') <> '' THEN CONCAT(',', @COLUMNS3) ELSE '' END  + N' FROM 
								--VwObservation4 AS PivotTable 
								(
									SELECT 
										O.EZID, 
										O.TraitID,
										ObsVal =  (CASE T.DataType
														WHEN ''C'' THEN O1.ObsValueChar
														WHEN ''D'' THEN FORMAT(O1.ObsValueDate, ''dd-MM-yyyy'', ''en-US'')
														WHEN ''A'' THEN CAST(O1.ObsValueDec AS NVARCHAR(10))
														WHEN ''I'' THEN CAST(O1.ObsValueInt AS NVARCHAR(10))
													END
													)   
										FROM --dbo.Observation O 
										(
											SELECT MAX(o1.observationID) ObservationID, O1.TraitID AS TraitID,O1.EZID FROM observation o1 													
											WHERE O1.TraitID IN ( '+@traitIDs+ N')
											GROUP BY o1.EZID, O1.TraitID 
										) AS O
										JOIN Observation O1 on O1.ObservationID = O.ObservationID
										JOIN dbo.Trait T ON O.TraitID = T.TraitID												
								) AS PivotTable
								Pivot 
								(
										Max(ObsVal) FOR TraitID IN ( '+ISNULL(@COLUMNS3,'')+ N')
								) AS PivotTable1
						) as Table2 on Table2.EZID = E.EZID'
				
	SET @WHERE = dbo.FN_ApplyFilters1(@filters,@fields);
	
	SET @SORT = dbo.FN_ApplySort1(@sorts,@fields);
	DECLARE @SQL1 NVARCHAR(MAX);
	
	IF(ISNULL(@WHERE, '') <> '' OR ISNULL(@SORT,'')<> '') BEGIN
		--if(ISNULL(@WHERE,'')<>'') --commented by krishna for test on NOV-24-2016
		--	BEGIN
				SET @SQL = @SQL + N'
					WHERE
					'
			exec SP_ENTITY_INNSERSQL1 @CropCode, @EZID,@EntityTypeCode,@fields,@filters,@sorts,@Year,@PAGE_OFFSET,@PageSize, @SQL1 OUTPUT, @TotalRows OUTPUT;
			SET @SQL = @SQL +@SQL1 +N'
		)'

		SET @PAGE_OFFSET = 0;
		--END --commented by krishna for test on NOV-24-2016
		
	END;

	IF(@TABLE_NAME = '[Trial]' AND ISNULL(@Year,'')<>'' AND ISNULL(@WHERE,'')='') BEGIN
			SET @SQL = @SQL + ' WHERE [Year] in (' + @Year + ')'
		END;	
	IF(ISNULL(@SORT,'')<>'')BEGIN
		SET @SQL = @SQL + dbo.FN_ApplySort(@sorts,@fields)		
	END;
	ELSE IF(ISNULL(@SORT,'')='')
	BEGIN
		SET @SORT = ' ORDER BY EZID';
		SET @SQL = @SQL + @SORT;	
	END
	SET @SQL = @SQL + N'
	OFFSET '+CAST(@PAGE_OFFSET AS VARCHAR)+' ROWS
	FETCH NEXT '+CAST(@PageSize AS VARCHAR)+' ROWS ONLY'

	PRINT @SQL;
	EXEC sp_executesql @SQL;
	IF(ISNULL(@WHERE, '')='')
		BEGIN
			IF(@TABLE_NAME ='[Trial]' AND ISNULL(@Year,'')<>'') BEGIN
				SET @SQL1 = 'SELECT @TotalRows = COUNT(DISTINCT EZID) FROM
						(SELECT  EZID FROM '+@TABLE_NAME+' WHERE [Year] in ('+@Year+')) B'; 
				EXEC sp_executesql @SQL1, N' @TotalRows INT OUTPUT ', @TotalRows = @TotalRows OUTPUT;
			END;
			ELSE BEGIN
				SET @SQL1 = 'SELECT @TotalRows = COUNT(DISTINCT EZID) FROM
						(SELECT   EZID FROM '+@TABLE_NAME+') B'; 
				EXEC sp_executesql @SQL1, N' @TotalRows INT OUTPUT ', @TotalRows = @TotalRows OUTPUT;
			END
		 END
END

