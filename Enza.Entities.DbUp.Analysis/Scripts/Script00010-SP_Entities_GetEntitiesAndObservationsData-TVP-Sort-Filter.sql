/**********************************************************************************************************************
Author:			Dibya Mani Suvedi
Created Date:	2016-06-29
Description:	Gets data from Entities and Observations based on the selected fieldsets. 

EXAMPLE:
DECLARE @filters TVP_Filters, @sorts TVPSorting, @TotalRows INT;

INSERT INTO @filters(FieldName, FieldType, FieldValue, Expression, Operator) VALUES --('11', 'ST', 'SV', 'eq', NULL)
																						--('EZID','INT','641501','lte',NULL),
																						('2', 'ST', 'IURM', 'eq', NULL)
																						--('2250', 'DT', '2008', 'gt', 'AND')
INSERT INTO @sorts(ColumnName, SortDir) VALUES--('Name', 'DESC')
--,
--('51','desc')
--,
--('1496', 'ASC');
('EZID', 'ASC');
EXEC SP_Entities_GetEntitiesAndObservationsData 'TO', 'BAT', -1, NULL, NULL, 3, 2250, NULL, 25, 1, @filters, @sorts,NULL, @TotalRows OUTPUT;
**********************************************************************************************************************/
IF OBJECTPROPERTY(object_id('dbo.SP_Entities_GetEntitiesAndObservationsData'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Entities_GetEntitiesAndObservationsData]
GO
CREATE PROCEDURE [dbo].[SP_Entities_GetEntitiesAndObservationsData]
(
	@CropCode		NCHAR(2),
	@EntityTypeCode	NCHAR(3),
	@Level			INT,
	@EZID			INT				= NULL,
	@PFSID			INT				= NULL,
	@TFSID			INT				= NULL, 
	@PCOLS			VARCHAR(MAX)	= NULL,
	@TCOLS			VARCHAR(MAX)	= NULL,
	@PageSize		INT				= 25,
	@PageNum		INT				= 1,
	@filters		TVP_Filters	READONLY,
	@sorts			TVPSorting READONLY,
	@Year			NVARCHAR(MAX),
	@TotalRows		INT OUTPUT
) AS BEGIN
	SET NOCOUNT ON;
    
	DECLARE 		
		@PAGE_OFFSET	INT, 	
		@P_DEF			NVARCHAR(1024),
		@TABLE_NAME		VARCHAR(30),
		@COLUMNS		NVARCHAR(MAX),
		@COLUMNS2		NVARCHAR(MAX),
		@TEMP_COLUMNS	NVARCHAR(MAX),
		@ERROR			NVARCHAR(255),
		@SQL			NVARCHAR(MAX),
		@fields			TVP_FIELDS;

	--GET Fields as XML and convert it to table
	DECLARE @xml XML;
	EXEC SP_Masters_GetFields @PFSID, @TFSID, @PCOLS, @TCOLS, @xml OUT;	
	

	IF(@xml IS NOT NULL) BEGIN
		INSERT INTO @fields(EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder)
		SELECT EntityTypeCode, TraitID, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MaxValue, MinValue, Updatable, Property, SortingOrder
		FROM dbo.FN_Masters_GetFields(@xml);
	END
	--SELECT * FROM @fields
	SET @PAGE_OFFSET = (@PageNum - 1) * @PageSize;

	--Get Property Field set data if there are no any columns selected 
	IF(@xml IS NULL) BEGIN
		EXEC SP_Entities_GetPropertyFieldSetData @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts, @Year;
		RETURN;
	END
	
	--EXEC SP_Entities_GetPropertyAndTraitFieldDataTEST @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts, @TotalRows OUTPUT;
	IF EXISTS(SELECT TraitID FROM @fields WHERE ISNULL(ColumnLabel,'')='' OR EntityTypeCode IS NULL) BEGIN
		EXEC SP_Entities_GetPropertyAndTraitFieldData @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts,@Year, @TotalRows OUTPUT;
	END
	ELSE BEGIN
		EXEC SP_Entities_GetPropertyFieldSetData @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts, @Year;
	END
	

	--IF((ISNULL(@TFSID, 0) <> 0 OR ISNULL(@TCOLS, '') <> '') AND (ISNULL(@PFSID, 0) <> 0 OR ISNULL(@PCOLS, '') <> ''))BEGIN
	--	IF EXISTS(SELECT TraitID FROM @fields WHERE EntityTypeCode IS NULL) BEGIN
	--		EXEC SP_Entities_GetPropertyAndTraitFieldDataTEST @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts,@Year, @TotalRows OUTPUT;
	--	END
	--	ELSE BEGIN
	--		EXEC SP_Entities_GetPropertyFieldSetData1 @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts, @Year;
	--	END
	--END
	--ELSE IF(ISNULL(@TFSID, 0) <> 0 OR ISNULL(@TCOLS, '') <> '') BEGIN
	
	--	IF EXISTS(SELECT TraitID FROM @fields WHERE EntityTypeCode IS NULL) BEGIN
	--		EXEC SP_Entities_GetPropertyAndTraitFieldDataTEST @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts,@Year, @TotalRows OUTPUT;
	--	END
	--	ELSE BEGIN
	--		EXEC SP_Entities_GetPropertyFieldSetData1 @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts, @Year;
	--	END
	--END
	--ELSE IF(ISNULL(@PFSID, 0) <> 0 OR ISNULL(@PCOLS, '') <> '') BEGIN
	--	EXEC SP_Entities_GetPropertyFieldSetData1 @CropCode, @EntityTypeCode, @Level, @EZID, @PageSize, @PAGE_OFFSET, @fields, @filters, @sorts, @Year;
	--END
	--PRINT 'TotalRows';
	--PRINT @TotalRows;
	SET NOCOUNT OFF;
END

