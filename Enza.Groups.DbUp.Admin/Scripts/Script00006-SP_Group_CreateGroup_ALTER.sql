-- Author:		Krishna Gautam
-- Create date: 26 December 2016
-- Update date: 02 jan 2017 -- column GroupName changed to Name.
-- Description:	Create Group Record.
ALTER PROCEDURE [dbo].[SP_Group_CreateGroup]
(
	@GroupsAsJson NVARCHAR(MAX)
)
AS BEGIN	
	DECLARE @tbl TABLE( EZID INT, Name NVARCHAR(50));
	WITH CTE AS
	(
		SELECT EZID, GroupName, Remark, [UserIdCreated]
		FROM OPENJSON(@GroupsAsJson)
		WITH
		(
			EZID INT,
			GroupName NVARCHAR(50),
			Remark NVARCHAR(150),
			[UserIdCreated] NVARCHAR(50)
		)
	)	
	INSERT INTO EntityGroup (EZID,Name, Remark, UserIdCreated, UtcInsertDate)
	OUTPUT INSERTED.EZID, inserted.Name INTO @tbl
	SELECT EZID, GroupName, Remark, [UserIdCreated], GETUTCDATE() FROM CTE;

	SELECT * FROM @tbl;
END;


