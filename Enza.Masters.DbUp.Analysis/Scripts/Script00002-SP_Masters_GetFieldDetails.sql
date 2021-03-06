--procedure to get field details

--EXEC SP_Masters_GetFieldDetails 3,NULL,NULL,NULL
--EXEC SP_Masters_GetFieldDetails NULL,942,NULL,NULL
--EXEC SP_Masters_GetFieldDetails 3,942,NULL,NULL
--EXEC SP_Masters_GetFieldDetails NULL,NULL,'11,111','312,2244,2245'
--EXEC SP_Masters_GetFieldDetails 3,NULL,'11,111',NULL
--EXEC SP_Masters_GetFieldDetails NULL,NULL,'11,111,2',NULL
IF OBJECTPROPERTY(object_id('dbo.SP_Masters_GetFieldDetails'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Masters_GetFieldDetails]
GO

CREATE PROCEDURE [dbo].[SP_Masters_GetFieldDetails]
(
	@TraitFieldSetID		INT				= NULL,
	@PropertyFieldSetID		INT				= NULL,
	@TraitCols				NVARCHAR(MAX)	= NULL,
	@PropCols				NVARCHAR(MAX)	= NULL
)
AS BEGIN
	SET NOCOUNT ON;
	DECLARE @tbl TABLE(ID INT IDENTITY(1,1) PRIMARY KEY, TraitID INT, SortOrder INT);
	IF(ISNULL(@PropertyFieldSetID, 0) <> 0) BEGIN
		INSERT INTO @tbl(TraitID, SortOrder) 
		SELECT T.TraitID, TIFS.SortingOrder
		FROM Trait T
		JOIN TraitInFieldSet TIFS ON TIFS.TraitID = T.TraitID
		WHERE TIFS.FieldSetID = @PropertyFieldSetID
		AND NOT EXISTS(SELECT TraitID FROM @tbl WHERE TraitID = T.TraitID)
		--ORDER BY TIFS.SortingOrder;
	END
	IF(ISNULL(@TraitFieldSetID, 0) <> 0) BEGIN
		INSERT INTO @tbl(TraitID, SortOrder) 
		SELECT T.TraitID, TIFS.SortingOrder
		FROM Trait T
		JOIN TraitInFieldSet TIFS ON TIFS.TraitID = T.TraitID
		WHERE TIFS.FieldSetID = @TraitFieldSetID 
		AND NOT EXISTS(SELECT TraitID FROM @tbl WHERE TraitID = T.TraitID)
		--ORDER BY TIFS.SortingOrder;
	END
	if(ISNULL(@PropCols,'') <> '') BEGIN
		INSERT INTO @tbl(TraitID) 
			SELECT T.Col1 
			FROM dbo.FN_SPLIT(@PropCols,',') T
			WHERE NOT EXISTS(SELECT TraitID FROM @tbl WHERE TraitID = T.Col1)
	END	
	IF(ISNULL(@TraitCols, '') <> '') BEGIN
			INSERT INTO @tbl(TraitID) 
			SELECT T.Col1 
			FROM dbo.FN_SPLIT(@TraitCols,',') T
			WHERE NOT EXISTS(SELECT TraitID FROM @tbl WHERE TraitID = T.Col1);
	END
		
	SELECT 
		T.TraitID, 
		TraitName, 
		ColumnLabel, 
		DataType, 
		DisplayFormat, 
		Editor, 
		ListOfValues, 
		MinValue, 
		MaxValue, 
		Property, 
		Updatable,
		T.SortOrder
	FROM @tbl T
	JOIN Trait T1 ON T1.TraitID = T.TraitID
	--ORDER BY T.ID;
	ORDER BY T.SortOrder;
	SET NOCOUNT OFF;
END


