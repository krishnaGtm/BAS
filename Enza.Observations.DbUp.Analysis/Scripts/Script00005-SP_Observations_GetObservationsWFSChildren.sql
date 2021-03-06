--EXEC [SP_Observations_GetObservationsWFSChildren] 'BATCH', 1, 'TO', 'BAT', 'TRL', 641411, 0, 'EZID', 'ASC', 3, NULL, NULL, NULL
IF OBJECTPROPERTY(object_id('dbo.SP_Observations_GetObservationsWFSChildren'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Observations_GetObservationsWFSChildren]
GO
CREATE PROCEDURE [dbo].[SP_Observations_GetObservationsWFSChildren]
(
	@TableName					NVARCHAR(30),
	--@CropGroupID				INT, 
	@CropCode					NCHAR(2), 
	@ParentEntityTypeCode		NVARCHAR(3),
	@EntityTypeCode				NVARCHAR(3),
	@EZID						INT				= NULL,	
	@Level						INT				= -1,
	@SortColumn					VARCHAR(30)		= NULL,
	@SortDir					VARCHAR(4)		= NULL,
	@TraitFieldsetID			INT				= NULL,
	@TraitCols					NVARCHAR(MAX)	= NULL
) AS BEGIN
	DECLARE 
		@FIELDS			NVARCHAR(MAX),
		@SQL			NVARCHAR(MAX),
		@P_DEF			NVARCHAR(255);

	SET @SQL = N'		
		SELECT 
			V1.EZID , 
			V1.EntityTypeCode, 
			ChildRows = V3.Total,
			V2.Name,
			[Level] = ' + CAST((ISNULL(@Level, 0) + 1) AS VARCHAR) + N'
		FROM
		(
			SELECT  TOP 50000
				EZID1, 
				EZID2 AS EZID, 
				EntityTypeCode1, 
				EntityTypeCode2 AS EntityTypeCode
			FROM Relationship
			WHERE EntityTypeCode1 = @P_ParentEntityTypeCode AND EZID1 = @P_EZID 
		) AS V1
		JOIN Entity E ON E.EZID = V1.EZID1 AND E.EntityTypeCode = V1.EntityTypeCode1
		JOIN EntityType ET ON ET.EntityTypeCode = E.EntityTypeCode
		JOIN ' + QUOTENAME(@TableName) + ' V2 ON V2.EZID = V1.EZID
		JOIN CropRD CR ON Cr.CropCode = V2.CropCode
		JOIN CropGroup CG ON CG.CropGroupID = CR.CropGroupID
		LEFT JOIN
		(
			SELECT 
				EZID1, 
				Total = COUNT(EZID1) 
			FROM Relationship R 
			WHERE EntityTypeCode1 = @P_EntityTypeCode
			GROUP BY EZID1	
		) V3 ON V3.EZID1 = V1.EZID
		WHERE --CR.CropGroupID = @P_CropGroupID 
		--AND 
		V2.CropCode = @P_CropCode 
		ORDER BY ' + QUOTENAME(@SortColumn) + ' ' +  @SortDir;		
	
	--SET @P_DEF = N'@P_CropGroupID INT, @P_CropCode NCHAR(2), @P_ParentEntityTypeCode NVARCHAR(3), @P_EntityTypeCode NVARCHAR(3), @P_EZID INT';
	SET @P_DEF = N'@P_CropCode NCHAR(2), @P_ParentEntityTypeCode NVARCHAR(3), @P_EntityTypeCode NVARCHAR(3), @P_EZID INT';
		
	EXEC sp_executesql @SQL, @P_DEF, @P_CropCode = @CropCode, @P_ParentEntityTypeCode = @ParentEntityTypeCode, @P_EntityTypeCode = @EntityTypeCode, @P_EZID = @EZID

	--get data of selected fieldset on expand if columns is already fetched.
	if(ISNULL(@TraitFieldsetID, 0) <> 0 OR ISNULL(@TraitCols, '') <> '')
	BEGIN
		DECLARE 
			@EZIDS AS NVARCHAR(MAX) = NULL;

		SELECT 
			@EZIDS = COALESCE(@EZIDS + ',', '') + CAST(EZID2 AS NVARCHAR)
		FROM Relationship 
		WHERE EZID1 = @EZID
		EXEC SP_Observations_GetFieldSetDataWithAddedColumns @TraitFieldSetID, @TraitCols, @EZIDS
	END
END

