--SELECT dbo.FN_GetJoinedChildEntities('E', 90603)
CREATE FUNCTION [dbo].[FN_GetJoinedChildEntities]
(
	@Alias		NVARCHAR(20),
	@EZID			INT
) RETURNS NVARCHAR(MAX)
AS BEGIN
	DECLARE @SQL NVARCHAR(MAX) = '';
	--If requesting for child records, need to get data from multiple tables if children contains data from different entity type code
	SELECT 
		@SQL = @SQL + 'LEFT JOIN ' + TableName + ' T' + ID + ' ON T' + ID + '.EZID = ' + @Alias + '.EZID '
	FROM 
	(
		SELECT 
			R.EntityTypeCode2,
			TableName = QUOTENAME(ET.TableName),
			ID = CAST(ROW_NUMBER() OVER (ORDER BY R.EntityTypeCode2) AS VARCHAR(3))
		FROM Relationship R
		JOIN dbo.EntityType ET ON ET.EntityTypeCode = R.EntityTypeCode2
		WHERE R.EZID1 = @EZID
		GROUP BY R.EntityTypeCode2, ET.TableName
	) V1;		
	RETURN @SQL;
END



GO


