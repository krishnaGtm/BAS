
/*
	DECLARE @TotalRows INT, @TVPfilters TVP_Filters
	--EXEC PR_GetObservationsWFSLevel0 'BATCH',1,'TO', 'BAT',641434,0,'EZID','ASC',20, 0,3,NULL,NULL,NULL, @TotalRows OUTPUT
	--PRINT @TotalRows
	--EXEC PR_GetObservations 1, 'TO', 'BAT',NULL, -1,  @TVPfilters, 'EZID', 'ASC', 20, 2,3,942,NULL,NULL, @TotalRows OUTPUT
	--EXEC PR_GetObservations 1, 'TO', 'BAT',641411, 0,  @TVPfilters, 'EZID', 'ASC', 20, 1,3,NULL,NULL,NULL, @TotalRows OUTPUT -- 668509
	--EXEC PR_GetObservations 1, 'TO', 'BAT', NULL, NULL, -1,  @TVPfilters, 'EZID', 'ASC', 20, 1, @TotalRows OUTPUT
	--EXEC PR_GetObservations 1, 'TO', 'BAT', NULL, 641411, 0,  @TVPfilters, 'EZID', 'ASC', 20, 1, @TotalRows OUTPUT -- 668509
	--EXEC PR_GetObservations 1, 'TO', 'TRL', NULL, 9907, 1,  @TVPfilters, 'EZID', 'ASC', 20, 1, @TotalRows OUTPUT -- 668509

	EXEC SP_Observations_GetObservations 1, 'TO', 'BAT', NULL, -1,  @TVPfilters, 'EZID', 'ASC', 20, 1, NULL,NULL, @TotalRows OUTPUT -- 668509
	PRINT @TotalRows
*/
IF OBJECTPROPERTY(object_id('dbo.SP_Observations_GetObservations'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Observations_GetObservations]
GO

CREATE PROCEDURE [dbo].[SP_Observations_GetObservations]
(
	--@CropGroupID				INT, 
	@CropCode					NCHAR(2), 
	@EntityTypeCode				NVARCHAR(3)		= NULL,
	@EZID						INT				= NULL,	
	@Level						INT				= -1,
	@TVPfilters TVP_Filters		READONLY ,
	@SortColumn					VARCHAR(30)		= NULL,
	@SortDir					VARCHAR(4)		= NULL,
	@PageSize					INT				= 20,
	@PageNum					INT				= 1,
	@TraitFieldsetID			INT				= NULL,
	@TraitCols					NVARCHAR(MAX)	= NULL,
	@Year						NVARCHAR(MAX)	= NULL,
	@TotalRows					INT				= NULL OUTPUT
) AS BEGIN
	SET NOCOUNT ON;

	DECLARE 
		@TableName			NVARCHAR(50),
		@FIELDS				NVARCHAR(MAX),
		@P_COLUMNS			NVARCHAR(MAX), 
		@P_COLUMNS2			NVARCHAR(MAX),
		@SQL				NVARCHAR(MAX),
		@SQL_COUNT			NVARCHAR(MAX),
		@WHERE				NVARCHAR(MAX),			
		@P_DEF				NVARCHAR(255), 
		@P_COUNT_DEF		NVARCHAR(255),
		@PAGE_OFFSET		INT,
		@EntityTypeCode2	NVARCHAR(3),
		@PropertyFieldSet	BIT,
		@TraitFieldSet		BIT;
	
	--Get children count based on relationship
	IF(ISNULL(@Level, -1) >= 0) BEGIN
		SELECT TOP 1 
			@EntityTypeCode2 = EntityTypeCode2 
		FROM Relationship R
		WHERE R.EZID1 = @EZID;
	END

	SELECT @TableName = TableName FROM EntityType 
	WHERE  EntityTypeCode = (CASE WHEN ISNULL(@Level, -1) = -1 THEN @EntityTypeCode ELSE @EntityTypeCode2 END)
	IF(ISNULL(@TableName, '') = '') BEGIN
		RAISERROR('TableName in EntityType table is empty.', 16, 1);
	END

	IF(@SortDir = 'DESC') 
		SET @SortDir = 'DESC'
	ELSE
		SET @SortDir = 'ASC'

	SET @PAGE_OFFSET = (@PageNum - 1) * @PageSize;

	--If fieldset is not defined, display records from entity and its related table only. don't need to go to observations.
	IF(ISNULL(@Level, -1) = -1) BEGIN
		--EXEC SP_Observations_GetObservationsWFSLevel0 @TableName, @CropGroupID, @CropCode, @EntityTypeCode, @EZID, 0, @SortColumn, @SortDir, @PageSize, @PAGE_OFFSET, @TraitFieldsetID, @TraitCols, @Year, @TotalRows OUTPUT
		EXEC SP_Observations_GetObservationsWFSLevel0 @TableName, @CropCode, @EntityTypeCode, @EZID, 0, @SortColumn, @SortDir, @PageSize, @PAGE_OFFSET, @TraitFieldsetID, @TraitCols, @Year, @TotalRows OUTPUT
	END	
	ELSE BEGIN
		--EXEC SP_Observations_GetObservationsWFSChildren @TableName, @CropGroupID, @CropCode, @EntityTypeCode, @EntityTypeCode2, @EZID, @Level, @SortColumn, @SortDir, @TraitFieldsetID, @TraitCols
		EXEC SP_Observations_GetObservationsWFSChildren @TableName, @CropCode, @EntityTypeCode, @EntityTypeCode2, @EZID, @Level, @SortColumn, @SortDir, @TraitFieldsetID, @TraitCols
	END

	SET NOCOUNT OFF;
END



