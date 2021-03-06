/*
	DECLARE @filters TVP_Filters;
	--INSERT INTO @filters(FieldName, FieldType, FieldValue, Expression, Operator) VALUES ('2244', 'ST','111955','contains', NULL);
	EXEC SP_Observations_V2_GetObservations 'TO', 'BAT', '2244, 2245', @filters
*/
IF OBJECTPROPERTY(object_id('dbo.SP_Observations_V2_GetObservations'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Observations_V2_GetObservations]
GO

CREATE PROCEDURE [dbo].[SP_Observations_V2_GetObservations]
(
	@CropCode		NCHAR(2),
	@ETC			NCHAR(3),
	@EZIDs			TVP_IDS	READONLY,
	@traitIDs		NVARCHAR(MAX),
	@filters		TVP_Filters READONLY
)AS BEGIN
	DECLARE 
		@TableName		NVARCHAR(50), 
		@COLUMNS		NVARCHAR(MAX),
		@tfsIDs			NVARCHAR(MAX),
		@SQL			NVARCHAR(MAX), 
		@SQL_FILTERS	NVARCHAR(MAX), 
		@fields			TVP_Fields,
		@Error			NVARCHAR(MAX);
	
	--Convert traitIDs into real columns
	INSERT INTO @fields( EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder )
	SELECT DISTINCT @ETC, V2.TraitID, ColumnLabel, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL 
	FROM
	(
		SELECT T.TraitID, POE.TableField AS ColumnLabel
		FROM
		(
			SELECT TraitID = CAST(value AS INT)
			FROM STRING_SPLIT(@traitIDs, ',')
		) AS V1
		JOIN dbo.PropertyOfEntity POE ON POE.TraitID = V1.TraitID
		JOIN dbo.Trait T ON T.TraitID = POE.TraitID
		WHERE T.CropCode = @CropCode 
		AND POE.EntityTypeCode = @ETC
		AND T.Property = 1
		AND ISNULL(POE.TableField, '') = '' --Not complex property;
		UNION ALL
		SELECT
			T.TraitID,
			T.ColumnLabel
		FROM dbo.Trait T
		JOIN 
		(
			SELECT TraitID = CAST(value AS INT)
			FROM STRING_SPLIT(@traitIDs, ',')
		) AS V1 ON V1.TraitID = T.TraitID
		WHERE T.Property = 0
	) AS V2

	SELECT 
		@COLUMNS = COALESCE(@COLUMNS + ',', '') +  QUOTENAME(TraitID),
		@tfsIDs = COALESCE(@tfsIDs + ',', '') +  CAST(TraitID AS VARCHAR)
	FROM @fields;


	SET @SQL = N'SELECT EZID, ' + @COLUMNS + N'
				FROM
				(
					SELECT 
						 EZID, TraitID, ObsVal
					FROM dbo.VwObservation4 O
					JOIN @EZIDs E ON E.ID = O.EZID
					WHERE TraitID IN (' + @tfsIDs + ')
				) O
				PIVOT 
				(
					Max(ObsVal) FOR TraitID IN (' + @COLUMNS + ')
				) AS PT ';
		
	SET @SQL_FILTERS = dbo.FN_ApplyFilters(@filters, @fields);
	IF(ISNULL(@SQL_FILTERS, '') <> '') BEGIN
		SET @SQL = @SQL + ' WHERE ' + @SQL_FILTERS;
	END		
	EXEC sp_executesql @SQL, N'@EZIDs TVP_IDS READONLY', @EZIDs = @EZIDs;
END
