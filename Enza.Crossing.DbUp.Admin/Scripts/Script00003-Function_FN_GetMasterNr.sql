--select dbo.FN_GetMasterNr('test')

CREATE FUNCTION [dbo].[FN_GetMasterNr]
(		
	@initialVal NVARCHAR(100)
)
RETURNS NVARCHAR(100)
AS BEGIN
	RETURN CONCAT(datepart(YEAR,GETUTCDATE()),'.', @initialVal);
END

GO


