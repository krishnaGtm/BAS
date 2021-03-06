IF OBJECTPROPERTY(object_id('dbo.SP_Group_GetGroupLine'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Group_GetGroupLine]
GO
-- Author:			Krishna Gautam
-- Create date:		27 December 2016
-- Update date:		04 Jan 2017 -- Column EntityName changed to Name
-- Update date:		24 Jan 2017 -- Column Name is removed from db so EZID is fetched as name.
-- Description:		Get Group line record.
CREATE PROCEDURE [dbo].[SP_Group_GetGroupLine]
(
	@EZID INT	

)
AS BEGIN
		
	SELECT GroupEZID,EZID, EntityTypeCode,EZID as Name FROM EntityInGroup WHERE GroupEZID = @EZID;

END;
