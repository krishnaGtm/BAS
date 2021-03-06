--EXEC [SP_Masters_GetFieldSetsLookup] 1,'TO'
IF OBJECTPROPERTY(object_id('dbo.SP_Masters_GetFieldSetsLookup'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Masters_GetFieldSetsLookup]
GO
CREATE PROCEDURE [dbo].[SP_Masters_GetFieldSetsLookup]
(
 --@CropGroupID   INT,
 @CropCode    CHAR(2)
) AS BEGIN
DECLARE @CGID INT;
select @CGID = CropGroupID from CropRD where CropCode = @CropCode;
 SELECT 
  FS.FieldSetID,
  FS.FieldSetCode,
  Fs.FieldSetName,
  FS.Property
 FROM FieldSet FS
 WHERE Fs.CropCode = @CropCode OR (FS.CropGroupID = @CGID AND FS.CropGroupLevel = 1)
END



