IF OBJECTPROPERTY(object_id('dbo.SP_Entities_GetChildEntities'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Entities_GetChildEntities]
GO
CREATE PROCEDURE [dbo].[SP_Entities_GetChildEntities]
(
	@EZID	INT,
	@ETC	NCHAR(3)
) AS BEGIN
	SET NOCOUNT ON;
	SELECT 
		R.EZID2 AS EZID,
		R.EntityTypeCode2 AS EntityTypeCode
	FROM Relationship R
	WHERE EZID1 = @EZID 
	AND EntityTypeCode1 = @ETC;

	SET NOCOUNT OFF;
END

