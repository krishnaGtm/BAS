/*
	DECLARE @filters TVP_Filters;
	--INSERT INTO @filters(FieldName, FieldType, FieldValue, Expression, Operator) VALUES ('2244', 'ST','111955','contains', NULL);
	EXEC SP_Entities_V2_GetEntities 'TO', 'BAT', '2244, 2245', @filters
*/
IF OBJECTPROPERTY(object_id('dbo.SP_Entities_V2_GetEntities'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Entities_V2_GetEntities]
GO
CREATE PROCEDURE [dbo].[SP_Entities_V2_GetEntities]
(
	@CropCode		NCHAR(3),
	@ETC			NCHAR(3),
	@traitIDs		NVARCHAR(MAX),
	@filters		TVP_Filters READONLY
)AS BEGIN
	DECLARE 
		@TableName		NVARCHAR(50), 
		@COLUMNS		NVARCHAR(MAX) = '',
		@SQL			NVARCHAR(MAX), 
		@SQL_FILTERS	NVARCHAR(MAX), 
		@fields			TVP_Fields,
		@Error			NVARCHAR(MAX);
	
	SELECT @TableName = QUOTENAME(TableName) FROM EntityType WHERE EntityTypeCode = @ETC
	IF(ISNULL(@TableName, '') = '') BEGIN
		SET @ERROR = 'Table ''' + @TableName + ''' doesn''t exist in EntityType table.';
		RAISERROR(@ERROR, 16, 1);
		RETURN;		
	END
	
	--Convert traitIDs into real columns
	INSERT INTO @fields( EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder )
	SELECT DISTINCT @ETC, T.TraitID, POE.TableField, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
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
	AND ISNULL(POE.TableField, '') <> '' --Not complex property;

	SELECT 
		@COLUMNS = COALESCE(@COLUMNS + ',', '') +  QUOTENAME(ColumnLabel) + ' AS ' + QUOTENAME(TraitID)
	FROM @fields;
	
	SET @SQL = N'SELECT * FROM
				(
					SELECT TOP 50000
						EZID, ''' + @ETC + ''' AS EntityTypeCode, Name ' + ISNULL(@COLUMNS, '') + N'
					FROM ' + @TableName + N' 
				) E	';

	SET @SQL_FILTERS = dbo.FN_ApplyFilters(@filters, @fields);
	IF(ISNULL(@SQL_FILTERS, '') <> '') BEGIN
		SET @SQL = @SQL + ' WHERE ' + @SQL_FILTERS;
	END		
	--PRINT @SQL;			
	EXEC sp_executesql @SQL;
END
