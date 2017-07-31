/*
	EXEC SP_Batch_GetDataForPropertyFieldSets NULL, 'BAT', '641405,641412,641413','2244,1620',NULL,NULL
	EXEC SP_Batch_GetDataForPropertyFieldSets 1948, 'BAT', '641405,641412,641413',NULL,NULL,NULL
*/

IF OBJECTPROPERTY(object_id('dbo.SP_Batch_GetDataForPropertyFieldSets'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Batch_GetDataForPropertyFieldSets]
GO
CREATE PROCEDURE [dbo].[SP_Batch_GetDataForPropertyFieldSets]
(
	@FieldSetID			INT				= NULL,
	@EntityTypeCode		NCHAR(3),
	@EZIDS				VARCHAR(MAX),
	@TraitIDs			VARCHAR(MAX)	= NULL,
	@SortColumn			VARCHAR(30)		= NULL,
	@SortDir			VARCHAR(4)		= NULL
) AS BEGIN
	SET NOCOUNT ON;
	DECLARE 
		@TABLE_NAME		NVARCHAR(50),
		@SQL			NVARCHAR(MAX),
		@SQL1			NVARCHAR(MAX),
		@TraitColumns	NVARCHAR(MAX),
		@TraitIDS1		NVARCHAR(MAX),		
		@COLUMNS		NVARCHAR(MAX);
	
		
	CREATE TABLE #tbl(TraitID INT, ColumnLabel NVARCHAR(20), DataType NVARCHAR(10), DisplayFormat NVARCHAR(50), Editor BIT, ListOfValues BIT, MinValue INT, MaxValue INT, SortingOrder INT);	
	
	IF(ISNULL(@FieldSetID, 0) <> 0) BEGIN
		INSERT INTO #tbl(TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MinValue, MaxValue, SortingOrder)
		SELECT DISTINCT
			TIFS.TraitID,
			TIFS.ColumnLabel,
			TIFS.DataType,
			TIFS.DisplayFormat,
			TIFS.Editor,
			TIFS.ListOfValues,
			TIFS.MinValue,
			TIFS.MaxValue,
			TIFS.SortingOrder
		FROM Vw_TraitInPropertyFieldSet TIFS
		WHERE TIFS.FieldSetID = @FieldSetID
		AND TIFS.EntityTypeCode = @EntityTypeCode;
	END
	--Add more columns based on traitids

	IF(ISNULL(@TraitIDs, '') <> '') BEGIN
		SET @SQL = N'INSERT INTO #tbl(TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MinValue, MaxValue, SortingOrder)
					SELECT DISTINCT
						T.TraitID,
						POE.TableField,
						T.DataType,
						T.DisplayFormat,
						T.Editor,
						T.ListOfValues,
						T.MinValue,
						T.MaxValue,
						-1
					FROM Trait T
					JOIN PropertyOfEntity POE ON POE.TraitID = T.TraitID AND POE.CropGroupID = T.CropGroupID
					WHERE T.TraitID IN (' + @TraitIDs + ') AND POE.EntityTypeCode = @EntityTypeCode';
		EXEC sp_executesql @SQL, N'@EntityTypeCode NVARCHAR(3)', @EntityTypeCode = @EntityTypeCode;
	END

	SELECT 
		@TABLE_NAME = TableName 
	FROM EntityType 
	WHERE EntityTypeCode =  @EntityTypeCode;
	IF(ISNULL(@TABLE_NAME, '') = '') BEGIN
		RAISERROR('TableName in EntityType table is empty.', 16, 1);
	END
	SELECT 
		@COLUMNS  = COALESCE(@COLUMNS + ',', '') + QUOTENAME(ColumnLabel) + ' AS ' + QUOTENAME(TraitID)
	FROM #tbl WHERE ColumnLabel IS NOT NULL
	ORDER BY SortingOrder ASC;

	SELECT 
		@TraitColumns  = COALESCE(@TraitColumns + ',', '') + QUOTENAME(TraitID),
		@TraitIDS1 = COALESCE(@TraitIDS1 + ',', '') + CAST(TraitID AS NVARCHAR(10))
	FROM #tbl WHERE ColumnLabel IS NULL
	ORDER BY SortingOrder ASC;
	IF(ISNULL(@TraitColumns, '') <> '') BEGIN
		SET @SQL1 = N'
					LEFT JOIN ( SELECT EZID, ' + @TraitColumns + '  
								FROM (  SELECT 
										O.EZID, 
										T.TraitID,
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
											WHERE O1.TraitID IN ( '+@TraitIDS1+ N')
											GROUP BY o1.EZID, O1.TraitID 
										) AS O
										JOIN Observation O1 on O1.ObservationID = O.ObservationID
										JOIN dbo.Trait T ON O.TraitID = T.TraitID
								) AS PivotTable 
								Pivot (Max(ObsVal) FOR TraitID IN (' + @TraitColumns + ')
					) AS PivotTable1) AS Table2 ON Table2.EZID = E.EZID ' 
					
	--PRINT @SQL1;
	--EXEC sp_executesql @SQL1;
  END

  IF(ISNULL(@COLUMNS, '') = '' AND ISNULL(@TraitColumns,'')='' )   BEGIN
		SELECT EZID, EntityTypeCode FROM Entity WHERE 1 = 2;
	END
	ELSE IF(ISNULL(@COLUMNS, '') <> '' AND ISNULL(@TraitColumns,'')='' ) BEGIN
		SET @SQL = N'SELECT 
						E.EZID,
						E.EntityTypeCode,' 
						+ @COLUMNS +
					N'FROM Entity E
					JOIN ' + @TABLE_NAME + ' T1 ON T1.EZID = E.EZID
					WHERE E.EZID IN (' + @EZIDS + ')';
		EXEC sp_executesql @SQL;
	END	

	ELSE IF(ISNULL(@COLUMNS, '') = '' AND ISNULL(@TraitColumns,'') <> '') BEGIN
		--SELECT EZID, EntityTypeCode FROM Entity WHERE 1 = 2;
		SET @SQL = N'SELECT E.EZID, ' + @TraitColumns + ' 
					FROM Entity E 
					'+@SQL1 +'
					WHERE E.EZID IN (' + @EZIDS + ') 
					ORDER BY E.Ezid';
		EXEC sp_executesql @SQL;

	END
	ELSE BEGIN
		SET @SQL = N'SELECT 
						E.EZID,
						E.EntityTypeCode,' 
						+ @COLUMNS +', ' + @TraitColumns + 
					N'FROM Entity E
					JOIN ' + @TABLE_NAME + ' T1 ON T1.EZID = E.EZID '+@SQL1 +' 
					
					WHERE E.EZID IN (' + @EZIDS + ') order by EZID' ;

					PRINT @SQL;
		EXEC sp_executesql @SQL;
	END	

	DROP TABLE #tbl;

	SET NOCOUNT OFF;
END


GO


