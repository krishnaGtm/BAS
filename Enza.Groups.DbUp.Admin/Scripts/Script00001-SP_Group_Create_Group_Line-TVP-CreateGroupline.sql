
IF OBJECTPROPERTY(object_id('dbo.SP_Group_Create_Group_Line'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Group_Create_Group_Line]
GO

-- Author:		Krishna Gautam
-- Create date: 27 December 2016
-- Update date: 04 Jan 2017 -- Column EntityName changed to Name
-- Update date: 24 Jan 2017 -- Column Name is removed from database
-- Description:	Create Group line Record.

CREATE PROCEDURE [dbo].[SP_Group_Create_Group_Line]
(
	@TVP_Create_groupline TVP_Create_GroupLine READONLY

)
AS BEGIN
	
	MERGE EntityInGroup T1
	USING @TVP_Create_groupline T2 on T2.EZID = T1.EZID 
					AND T2.[GroupEZID] = T1.GroupEZID 					
	WHEN NOT MATCHED THEN
		INSERT (GroupEZID,EZID,EntityTypeCode)
		VALUES (T2.GroupEZID,T2.EZID,T2.EntityTypeCode);
END;