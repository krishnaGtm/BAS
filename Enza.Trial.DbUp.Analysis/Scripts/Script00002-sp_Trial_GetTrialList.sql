-- =============================================
-- Author:		Krishna
-- Create date: 21 July 2016
-- Description:	Get all trials
-- =============================================
--===============EXAMPLE==================
--EXEC sp_Trial_GetTrialList NULL,'TO',NULL,NULL,NULL 

IF OBJECTPROPERTY(object_id('dbo.sp_Trial_GetTrialList'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[sp_Trial_GetTrialList]
GO
CREATE PROCEDURE [dbo].[sp_Trial_GetTrialList]
	-- Parameters of the stored procedure:
       @TrialType   INT      = NULL,
	   @Crop        NCHAR(2) = NULL,
	   @Country     NCHAR(2) = NULL,
	   @TrialRegion INT      = NULL,
	   @Year        INT      = NULL

AS

BEGIN
    DECLARE 
	        @Where AS NVARCHAR(MAX) = ' WHERE 0 = 0 ',
			@Sql   as nvarchar(1023) = 'SELECT EZID, CropCode, TrialName as Name, TrialTypeID, CountryCode, TrialRegionID, Year FROM Trial'

    IF (@TrialType IS NOT NULL)	
	BEGIN
		SET @Where = @Where + ' AND Trial.TrialTypeID = ' + CONVERT(NVARCHAR, @TrialType)
    END

    if (@Crop IS NOT NULL)	
	BEGIN
		SET @Where = @Where + ' AND Trial.CropCode = ''' + @Crop + ''''
    end

    if (@Country IS NOT NULL)
	BEGIN
		SET @Where = @Where + ' AND Trial.CountryCode = ''' + @Country + ''''
    END

    IF (@TrialRegion IS NOT NULL) 
	BEGIN
	    SET @Where = @Where + ' AND Trial.TrialRegionID = ' + CONVERT(NVARCHAR, @TrialRegion)
    END

    IF (@Year IS NOT NULL) 
	BEGIN
	    SET @Where = @Where + ' AND Trial.Year= ' + CONVERT(NVARCHAR, @Year)
	END
	SET @Sql = @Sql + @Where

	PRINT @Sql;

	EXEC(@Sql)

END



