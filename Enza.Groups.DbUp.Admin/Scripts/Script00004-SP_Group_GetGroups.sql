-- Author:			Krishna Gautam
-- Create date:		26 December 2016
-- Updated date:	04 Jan 2017 --column GroupName changed to Name
-- Description:		Get all Group Record.
IF OBJECTPROPERTY(object_id('dbo.SP_Group_GetGroups'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Group_GetGroups]
GO

CREATE PROCEDURE [dbo].[SP_Group_GetGroups]
(		
	@User NVARCHAR(50)

)
AS BEGIN
		SELECT ChildRows = ISNULL(ChildRows,0), E.EZID, E.Name,E.UtcInsertDate,E.Remark, EntityTypeCode = 'GRP' FROM EntityGroup E
		LEFT JOIN
		(
			SELECT GroupEZID,ChildRows = Count(GroupEZID) FROM EntityInGroup
			GROUP BY GroupEZID
		)
		AS EIG on EIG.GroupEZID = E.EZID WHERE E.UserIdCreated = @User;
END;


