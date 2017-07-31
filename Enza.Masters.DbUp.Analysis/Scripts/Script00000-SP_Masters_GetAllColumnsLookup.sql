--EXEC PR_GetAllColumnsLookup 'TO',1
IF OBJECTPROPERTY(object_id('dbo.SP_Masters_GetAllColumnsLookup'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Masters_GetAllColumnsLookup]
GO
CREATE PROCEDURE [dbo].[SP_Masters_GetAllColumnsLookup]
(
 @CROPCODE as char(2)--,
 --@CropGroupID as int
) AS
 BEGIN
 SELECT T.TraitID,T.TraitName, T.ColumnLabel, T.Property FROM Trait T WHERE CropCode = @CROPCODE 
 --AND  CropGroupID = @CropGroupID 
 ORDER BY ColumnLabel;
 END

