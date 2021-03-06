/*
-- Author:		Krishna Gautam
-- Create date: 20 July 2016
-- Description:	Create New trialentry data.
*/

/*
==========Example==============

EXEC SP_Trial_GetTrialEntryByTrial 1,'TO'


*/
IF OBJECTPROPERTY(object_id('dbo.SP_Trial_GetTrialEntryByTrial'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Trial_GetTrialEntryByTrial]
GO

CREATE PROCEDURE [dbo].[SP_Trial_GetTrialEntryByTrial]
(
	@EZID		INT,
	@CropCode	NCHAR(2)
)
AS BEGIN

	SELECT TE.EZID,TE.FieldNumber,TE.Name,TE.CropCode FROM TrialEntry TE 
		JOIN Relationship R on R.EZID2 = TE.EZID
	WHERE R.EZID1 = @EZID AND TE.CropCode = @CropCode
	SELECT * FROM Trial WHERE EZID = @EZID;
END

