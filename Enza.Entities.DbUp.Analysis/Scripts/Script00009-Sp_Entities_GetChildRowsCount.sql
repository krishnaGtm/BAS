--Author:		Krishna Gautam
--Created Date:	2016-08-17
--Description:	Gets Children Count for EZID Provided on Parameter. 

--EXAMPLE
--EXEC Sp_Entities_GetChildRowsCount '1,2,3,4,5,6,7,8,9,10'
--EXEC Sp_Entities_GetChildRowsCount '641405,641406,641407'
IF OBJECTPROPERTY(object_id('dbo.Sp_Entities_GetChildRowsCount'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[Sp_Entities_GetChildRowsCount]
GO
CREATE PROCEDURE [dbo].[Sp_Entities_GetChildRowsCount]
(
	@EZIDS NVARCHAR(MAX)
)
AS
BEGIN
	DECLARE @SQL NVARCHAR(MAX);
	SET @SQL = N'SELECT EZID1 AS EZID, COUNT(DISTINCT EZID2) AS ChildRows FROM Relationship WHERE EZID1 in (' + @EZIDS + N') GROUP BY EZID1';
	

	EXEC sp_executesql @SQL;
	
END;
