-- Author:		Krishna Gautam
-- Create date: 9 AUG 2016
-- Description:	Generate EZIDs.


/*
EXAMPLE
EXEC SP_Entities_CreateEZIDS 2,'PLA'
*/
IF OBJECTPROPERTY(object_id('dbo.SP_Entities_CreateEZIDS'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Entities_CreateEZIDS]
GO
CREATE PROCEDURE [dbo].[SP_Entities_CreateEZIDS]
(
	@TotalEZID INT,
	@EntityTypeCode CHAR(3)
)
AS BEGIN

	DECLARE @temptable table
	(
		EZID int,
		EntityTypeCode CHAR(3)
	)
	DECLARE @MaxEZID INT;
	SELECT @maxEZID = MAX(EZID) + 1 FROM Entity;
	SET IDENTITY_INSERT Entity ON;
	WHILE(@TotalEZID > 0) BEGIN
		INSERT INTO Entity(EZID,EntityTypeCode) 
			OUTPUT inserted.EZID, inserted.EntityTypeCode INTO @temptable 
		values(@maxEZID,@EntityTypeCode);
		SET @TotalEZID = @TotalEZID -1;
		SET @MaxEZID = @MaxEZID +1;
	END
	SET IDENTITY_INSERT Entity OFF;

	SELECT * FROM @temptable;
END;

GO


