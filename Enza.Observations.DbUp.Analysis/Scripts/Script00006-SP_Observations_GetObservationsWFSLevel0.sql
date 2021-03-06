--DECLARE @TotalRows INT
--EXEC SP_Observations_GetObservationsWFSLevel0 'BATCH', 1,'TO','TRI',NULL,0,'EZID','ASC',30,1,NULL,NULL,'2015,2016',@TotalRows OUTPUT
IF OBJECTPROPERTY(object_id('dbo.SP_Observations_GetObservationsWFSLevel0'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Observations_GetObservationsWFSLevel0]
GO

CREATE PROCEDURE [dbo].[SP_Observations_GetObservationsWFSLevel0]
(
	@TableName					NVARCHAR(30),
	--@CropGroupID				INT, 
	@CropCode					NCHAR(2), 
	@EntityTypeCode				NVARCHAR(3),
	@EZID						INT				= NULL,	
	@Level						INT				= 0,
	@SortColumn					VARCHAR(30)		= NULL,
	@SortDir					VARCHAR(4)		= NULL,
	@PageSize					INT				= 20,
	@PageOffSet					INT				= 1,
	@TraitFieldsetID			INT				= NULL,
	@TraitCols					NVARCHAR(MAX)	= NULL,
	@Year						NVARCHAR(MAX)	= NULL,
	@TotalRows					INT				= NULL OUTPUT
) AS BEGIN
--RAISERROR('test error demo', 16, 1);
	DECLARE 
		@FIELDS			NVARCHAR(MAX),
		@SQL			NVARCHAR(MAX),
		@P_DEF			NVARCHAR(255),
		@YearFilter		NVARCHAR(MAX);

		IF(@TableName = 'Trial' AND ISNULL(@Year,'')<>'')
			SET @YearFilter = '
			AND v1.[Year] IN ('+@Year+')';
		ELSE
			SET @YearFilter = '';

	SET @SQL = N'		
		WITH CTE AS (
			SELECT  TOP 50000
				E.EZID,
				E.EntityTypeCode,
				V1.Name,
				ChildRows = V2.Total
			FROM Entity E
			JOIN EntityType ET ON ET.EntityTypeCode = E.EntityTypeCode
			JOIN ' + QUOTENAME(@TableName) + ' V1 ON V1.EZID = E.EZID
			JOIN CropRD CR ON Cr.CropCode = V1.CropCode
			JOIN CropGroup CG ON CG.CropGroupID = CR.CropGroupID
			LEFT JOIN
			(
				SELECT 
					EZID1, 
					Total = COUNT(EZID1) 
				FROM Relationship R 
				WHERE R.EntityTypeCode1 = @P_EntityTypeCode
				AND (ISNULL(@P_EZID, 0) = 0 OR R.EZID1 = @P_EZID)
				GROUP BY EZID1
			) V2 ON V2.EZID1 = V1.EZID
			WHERE --CR.CropGroupID = @P_CropGroupID 
			--AND 
			V1.CropCode = @P_CropCode
			AND E.EntityTypeCode = @P_EntityTypeCode
			'+@YearFilter+'
			--AND (ISNULL(@P_EZID, 0) = 0 OR E.EZID = @P_EZID)
		), CTE_COUNT AS (SELECT COUNT(DISTINCT EZID) AS TotalRows FROM CTE)
		SELECT EZID, EntityTypeCode, Name, ChildRows,  TotalRows FROM CTE, CTE_COUNT
		ORDER BY ' + QUOTENAME(@SortColumn) + ' ' +  @SortDir + N'
		OFFSET @P_PAGE_OFFSET ROWS
		FETCH NEXT @P_PageSize ROWS ONLY;'		
	--SET @P_DEF = N'@P_CropGroupID INT, @P_CropCode NCHAR(2), @P_EntityTypeCode NVARCHAR(3), @P_EZID INT, @P_PAGE_OFFSET INT, @P_PageSize INT';
	SET @P_DEF = N'@P_CropCode NCHAR(2), @P_EntityTypeCode NVARCHAR(3), @P_EZID INT, @P_PAGE_OFFSET INT, @P_PageSize INT';
	
	DECLARE @tbl TABLE(EZID INT, EntityTypeCode NVARCHAR(3),Name NVARCHAR(50), ChildRows INT,  TotalRows INT)	
	INSERT INTO @tbl(EZID, EntityTypeCode,Name, ChildRows,  TotalRows)
	--EXEC sp_executesql @SQL, @P_DEF, @P_CropGroupID = @CropGroupID, @P_CropCode = @CropCode, @P_EntityTypeCode = @EntityTypeCode , 
	--	@P_EZID = @EZID, @P_PAGE_OFFSET = @PageOffSet, @P_PageSize = @PageSize
	EXEC sp_executesql @SQL, @P_DEF, @P_CropCode = @CropCode, @P_EntityTypeCode = @EntityTypeCode , 
		@P_EZID = @EZID, @P_PAGE_OFFSET = @PageOffSet, @P_PageSize = @PageSize

	--GET total rows count
	IF(@@ROWCOUNT > 0) BEGIN
		SELECT TOP 1 @TotalRows = TotalRows FROM @tbl;
	END
			
	SELECT EZID, EntityTypeCode, ChildRows, Name, [Level] = ISNULL(@Level, 0) FROM @tbl
	IF(ISNULL(@TraitCols, '') <> '' OR ISNULL(@TraitFieldsetID, 0) <> 0)
	BEGIN
		DECLARE
			@EZIDS NVARCHAR(MAX) = NULL;
		SELECT 
			@EZIDS = COALESCE(@EZIDS + ',', '') + CAST(EZID AS NVARCHAR(MAX))
		FROM @tbl;
		EXEC SP_Observations_GetFieldSetDataWithAddedColumns @TraitFieldSetID,  @TraitCols,  @EZIDS
	END
	
END

