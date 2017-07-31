/*
Author:		Krishna Gautam
Create date: 30 June 2016
Description: Get sorting value in single statement
*/

CREATE FUNCTION [dbo].[FN_ApplySort1]
(
	@tvp_Sort TVPSorting READONLY,
	@TVP_Fields TVP_Fields READONLY

) RETURNS NVARCHAR(MAX)
AS BEGIN
	DECLARE @SortClause NVARCHAR(MAX);
	DECLARE @SortTable TVPSorting;

	INSERT INTO @SortTable (columnName, SortDir)
	SELECT * FROM @tvp_Sort;
		
	UPDATE T SET ColumnName = POE.TableField FROM @SortTable T JOIN propertyofEntity POE on CAST(POE.TraitID AS NVARCHAR) = T.ColumnName WHERE POE.TableField IS NOT NULL OR POE.TableField <> '';


	DELETE FROM @SortTable where columnName NOT IN ( SELECT CAST(TraitID AS NVARCHAR) FROM @TVP_Fields) AND ISNUMERIC(ColumnName) = 1;


	--INSERT INTO @SortTable (columnName,SortDir)
	--(select CASE ISNUMERIC(T1.columnName) WHEN 0 THEN T1.columnName END,T1.SortDir from @tvp_Sort T1);

	--INSERT INTO @SortTable(columnName,SortDir)
	--(
	--	SELECT T1.columnName,T1.SortDir 
	--		FROM @tvp_Sort T1 JOIN @TVP_Fields T2 
	--			ON T1.columnName = CAST( T2.TraitID AS VARCHAR)
	--)
	
	--UPDATE T SET ColumnName = POE.TableField FROM @SortTable T JOIN propertyofEntity POE on CAST(POE.TraitID AS NVARCHAR) = T.ColumnName WHERE POE.TableField IS NOT NULL OR POE.TableField <> '';
	
	--UPDATE @SortTable  
	--Set columnName = '' JOIN propertyofEntity POE on CAST(POE.TraitID AS NVARCHAR) = T.ColumnName WHERE POE.TableField IS NOT NULL OR POE.TableField = '';
	SELECT 
		@SortClause = COALESCE(@SortClause + ',', '')+ QUOTENAME(columnName) + ' ' + SortDir
	FROM @SortTable;
	--APPEND EZID on every sort operation
	IF NOT EXISTS(SELECT * FROM @SortTable WHERE columnName = 'EZID')
	BEGIN
		SET @SortClause = COALESCE(@SortClause + ',', '')+' EZID ASC'
	END
if(ISNULL(@SortClause,'') = '')
BEGIN
	RETURN '';
END;
ELSE
BEGIN
	RETURN ' ORDER BY ' + @SortClause;
END
RETURN ' ORDER BY ' + @SortClause;

--RETURN ' ORDER BY ' + ISNULL(@SortClause,'EZID ASC');
END


GO


