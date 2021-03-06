--EXEC SP_Masters_GetFields NULL, 3, NULL, NULL,NULL
IF OBJECTPROPERTY(object_id('dbo.SP_Masters_GetFields'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Masters_GetFields]
GO
CREATE PROCEDURE [dbo].[SP_Masters_GetFields]
(
	@PFSID			INT				= NULL,
	@TFSID			INT				= NULL, 
	@PCOLS			VARCHAR(MAX)	= NULL,
	@TCOLS			VARCHAR(MAX)	= NULL,
	@FIELDS_AS_XML	XML	OUTPUT
) AS BEGIN
	SET NOCOUNT ON;

	DECLARE @SQL NVARCHAR(MAX);
	DECLARE @fields TVP_FIELDS;

	--Trait FieldSet
	IF(ISNULL(@TFSID, 0) <> 0) BEGIN
		INSERT INTO @fields(TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder)
		SELECT DISTINCT
			T.TraitID,
			T.ColumnLabel,
			T.DataType,
			T.DisplayFormat,
			T.Editor,
			T.ListOfValues,
			T.MaxValue,
			T.MinValue,
			T.Updatable,
			FS.Property,
			TIFS.SortingOrder
		FROM Trait T
		JOIN TraitInFieldSet TIFS ON TIFS.TraitID = T.TraitID
		JOIN FieldSet FS ON FS.FieldSetID = TIFS.FieldSetID
		
		JOIN CropRD CR ON CR.CropGroupID = FS.CropGroupID AND CR.CropCode = FS.CropCode
		JOIN CropGroup CG ON CG.CropGroupID = CR.CropGroupID
		WHERE FS.FieldSetID = @TFSID
	END
	--Trait Columns
	IF(ISNULL(@TCOLS, '') <> '') BEGIN		
		SET @SQL = N'SELECT DISTINCT
						T.TraitID,
						T.ColumnLabel,
						T.DataType,
						T.DisplayFormat,
						T.Editor,
						T.ListOfValues,
						T.MaxValue,
						T.MinValue,
						T.Updatable,
						T.Property,
						0
					FROM Trait T
					WHERE T.TraitID IN (' + @TCOLS + N')
					AND NOT EXISTS(SELECT TraitID FROM @fields F WHERE F.TraitID = T.TraitID)';
		INSERT INTO @fields(TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder)
		EXEC sp_executesql @SQL, N'@fields TVP_FIELDS READONLY', @fields = @fields
	END

	--Property FieldSet
	IF(ISNULL(@PFSID, 0) <> 0) BEGIN
		INSERT INTO @fields(EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder)
		SELECT DISTINCT
			ET.EntityTypeCode,
			T.TraitID,
			POE.TableField,
			T.DataType,
			T.DisplayFormat,
			T.Editor,
			T.ListOfValues,
			T.MaxValue,
			T.MinValue,
			T.Updatable,
			FS.Property,
			TIFS.SortingOrder
		FROM Trait T
		JOIN TraitInFieldSet TIFS ON TIFS.TraitID = T.TraitID
		JOIN FieldSet FS ON FS.FieldSetID = TIFS.FieldSetID
		
		JOIN CropRD CR ON CR.CropGroupID = FS.CropGroupID AND CR.CropCode = FS.CropCode
		JOIN CropGroup CG ON CG.CropGroupID = CR.CropGroupID
		JOIN PropertyOfEntity POE ON POE.TraitID = T.TraitID AND POE.CropGroupID = T.CropGroupID 
		JOIN EntityType ET ON ET.EntityTypeCode = POE.EntityTypeCode
		WHERE FS.FieldSetID = @PFSID
	END
	--Property Columns
	IF(ISNULL(@PCOLS, '') <> '') BEGIN
		SET @SQL = N'SELECT DISTINCT
						ET.EntityTypeCode,
						T.TraitID,
						POE.TableField,
						T.DataType,
						T.DisplayFormat,
						T.Editor,
						T.ListOfValues,
						T.MaxValue,
						T.MinValue,
						T.Updatable,
						T.Property,
						0
					FROM Trait T
					JOIN PropertyOfEntity POE ON POE.TraitID = T.TraitID AND POE.CropGroupID = T.CropGroupID 
					JOIN EntityType ET ON ET.EntityTypeCode = POE.EntityTypeCode
					WHERE T.TraitID IN (' + @PCOLS + N')
					AND NOT EXISTS(SELECT TraitID FROM @fields F WHERE F.TraitID = T.TraitID)'
		INSERT INTO @fields(EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder)
		EXEC sp_executesql @SQL, N'@fields TVP_FIELDS READONLY', @fields = @fields
	END

	SET @FIELDS_AS_XML = (SELECT * FROM @fields FOR XML PATH('Trait'));

	SET NOCOUNT OFF;
END

