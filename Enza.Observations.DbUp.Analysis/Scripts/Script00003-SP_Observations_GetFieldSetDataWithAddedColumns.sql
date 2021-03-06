--EXEC SP_Observations_GetFieldSetDataWithAddedColumns 5, NULL,'144158,144159,144160,144161,144162'

IF OBJECTPROPERTY(object_id('dbo.SP_Observations_GetFieldSetDataWithAddedColumns'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Observations_GetFieldSetDataWithAddedColumns]
GO

CREATE PROCEDURE [dbo].[SP_Observations_GetFieldSetDataWithAddedColumns]
(
	 @TraitFieldsetID		INT				= NULL,
	 @TraitCols				NVARCHAR(MAX)	= NULL,
	 @EZIDS					NVARCHAR(MAX)
) AS BEGIN
	SET NOCOUNT ON;
	DECLARE 
		@col1				NVARCHAR(MAX)	= NULL,
		@SQL				NVARCHAR(MAX),
		@TraitColumns		NVARCHAR(MAX)	= NULL,
		@TraitIDS			NVARCHAR(MAX)	= NULL,
		@PropertyColumns	NVARCHAR(MAX)	= NULL;
		
	IF(ISNULL(@TRAITFIELDSETID, 0) <> 0) BEGIN
		SELECT 
			@TraitColumns = COALESCE(@TraitColumns + ',', '') + QUOTENAME(CAST(TraitID as nvarchar)),
			@TraitIDS = COALESCE(@TraitIDS + ',', '') + CAST(TraitID as nvarchar)
		FROM (	SELECT DISTINCT TFS.TraitID, TFS.SortingOrder FROM TraitInFieldSet TFS 
				WHERE TFS.FieldSetID = @TraitFieldsetID
		) AS B ORDER BY B.SortingOrder
	END	
	IF(ISNULL(@TraitCols, '') <> '') BEGIN
		SELECT 
			@TraitColumns = COALESCE(@TraitColumns + ',', '') + QUOTENAME(Col1),
			@TraitIDS = COALESCE(@TraitIDS + ',', '') + Col1
		FROM dbo.fn_split(@TraitCols,',');
	END	
	IF(ISNULL(@TraitColumns, '') <> '') BEGIN
		SET @SQL = N'SELECT E.EZID, ' + @TraitColumns + ' 
					FROM Entity E 
					LEFT JOIN ( SELECT EZID, ' + @TraitColumns + ' 
								FROM (  SELECT 
										O.EZID, 
										T.TraitID,
										ObsVal = (CASE T.DataType 
														WHEN ''C'' THEN O1.ObsValueChar
														WHEN ''D'' THEN FORMAT(O1.ObsValueDate, ''dd-MM-yyyy'', ''en-US'')
														WHEN ''A'' THEN CAST(O1.ObsValueDec AS NVARCHAR(10))
														WHEN ''I'' THEN CAST(O1.ObsValueInt AS NVARCHAR(10))
													END
													)   
										FROM --dbo.Observation O 
										(
											SELECT MAX(o1.observationID) ObservationID, O1.TraitID AS TraitID,O1.EZID FROM observation o1
											WHERE O1.TraitID IN ( '+@TraitIDS+ N')
											GROUP BY o1.EZID, O1.TraitID 
										) AS O
										JOIN Observation O1 on O1.ObservationID = O.ObservationID
										JOIN dbo.Trait T ON O.TraitID = T.TraitID
								) AS PivotTable 
								Pivot (Max(ObsVal) FOR TraitID IN (' + @TraitColumns + ')
					) AS PivotTable1) AS Table2 ON Table2.EZID = E.EZID  
					WHERE E.EZID IN (' + @EZIDS + ') 
					ORDER BY E.Ezid';					
	EXEC sp_executesql @SQL;
  END

  IF(ISNULL(@TraitColumns, '') = '') BEGIN
	  SET @SQL = N'SELECT EZID
						FROM Entity E 
						WHERE EZID IN (' + @EZIDS + ') 
						ORDER BY E.Ezid';
	EXEC sp_executesql @SQL;
  END
  
  SET NOCOUNT OFF;
END

