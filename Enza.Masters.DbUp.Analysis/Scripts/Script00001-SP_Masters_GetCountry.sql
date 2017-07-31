-- Author:		Krishna Gautam
-- Create date: 03 Jan 2017
-- Description:	Get Countries.
IF OBJECTPROPERTY(object_id('dbo.SP_Masters_GetCountry'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Masters_GetCountry]
GO

CREATE PROCEDURE [dbo].[SP_Masters_GetCountry]
AS BEGIN		
	SELECT CountryCode, CountryCode3,CountryCodeInt,CountryName FROM Country ORDER BY CountryName;
END;


