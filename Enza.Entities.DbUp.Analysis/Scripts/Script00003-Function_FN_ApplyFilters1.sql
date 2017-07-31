--	DECLARE @tvp_filters TVP_Filters
--	INSERT INTO @tvp_filters(FieldName, FieldType, FieldValue, Expression, Operator)
--	VALUES  
--	('Name','st', 'Dibya', 'eq', 'OR'),
--	('Name','st', 'Hari', 'neq', 'OR'),
--	('Name','st', 'Hari', 'contains', 'OR'),
--	('JoinDate','dt', '2016-03-21', 'gt', NULL),
--	('Salary','System.Decimal', '50000.00', 'lte', NULL),
--	('Phone','st', '123', 'isempty', NULL)
--  SELECT dbo.FN_ApplyFilters(@tvp_filters)

CREATE FUNCTION [dbo].[FN_ApplyFilters1]
(
	@tvp_filters TVP_Filters READONLY,
	@TVP_fields TVP_Fields READONLY

) RETURNS NVARCHAR(MAX)
AS BEGIN
	DECLARE @tvp_filters_final TVP_Filters;

	--exprs: eq, neq, gte, gt, lte, lt, isnull, isnotnull, startswith, contains, doesnotcontains, endswith, isempty, isnotempty
	DECLARE @tbl TABLE(ID INT IDENTITY(1, 1), FieldName NVARCHAR(50), TOTAL INT)
	INSERT INTO @tvp_filters_final(Expression,FieldName,FieldType,FieldValue,Operator)
		(select Expression,FieldName,FieldType,FieldValue,Operator from @tvp_filters WHERE ISNUMERIC(FieldName) = 0);

	INSERT INTO @tvp_filters_final(Expression,FieldName,FieldType,FieldValue,Operator)
	SELECT T1.Expression,T1.FieldName,T1.FieldType,T1.FieldValue,T1.Operator 
			FROM @tvp_filters T1 JOIN @TVP_fields T2 
				ON T1.FieldName = CAST(T2.TraitID AS NVARCHAR);

	UPDATE T SET T.FieldName = POE.TableField FROM @tvp_filters_final T JOIN propertyofEntity POE on CAST(POE.TraitID AS NVARCHAR) = T.FieldName WHERE POE.TableField IS NOT NULL OR POE.TableField <> ''; 

	INSERT INTO @tbl( FieldName, TOTAL)
	SELECT FieldName, COUNT(FieldName)
	FROM @tvp_filters_final
	GROUP BY FieldName
	ORDER BY FieldName

	DECLARE @tbl_fields TABLE (FieldName NVARCHAR(50))
	DECLARE @V_FieldName NVARCHAR(50), @V_Operator VARCHAR(10)

	DECLARE @P_COLUMNS AS NVARCHAR(MAX) = ''; 
	DECLARE @P_COLUMNS_TEMP AS NVARCHAR(MAX); 
	DECLARE @index INT = 1, @count INT = 0, @total INT = 0
	SELECT @count = COUNT(ID) FROM @tbl
	WHILE(@index <= @count) BEGIN
		SET @P_COLUMNS_TEMP = ''
		SET @V_Operator = ''

		SELECT @V_FieldName = FieldName, @total = Total FROM @tbl WHERE ID = @index
		IF(@total > 1) BEGIN
			IF(LEN(@P_COLUMNS) > 0) BEGIN
				SET @P_COLUMNS = @P_COLUMNS + ' AND '
			END
			SET @P_COLUMNS = @P_COLUMNS + ' ( '
			SELECT
				@V_Operator = ISNULL(Operator, ''), 
				@P_COLUMNS_TEMP = COALESCE(@P_COLUMNS_TEMP , '') +
				QUOTENAME(FieldName) + ' ' + 
				CASE ISNULL(Expression, '') 
					WHEN 'eq' THEN  ' = ' 
					WHEN 'neq' THEN ' <> ' 
					WHEN 'gte' THEN ' >= ' 
					WHEN 'gt' THEN  ' > ' 
					WHEN 'lte' THEN ' <= ' 
					WHEN 'lt' THEN ' < ' 
					WHEN 'isnull' THEN ' IS NULL ' 
					WHEN 'isnotnull' THEN ' IS NOT NULL '
					--string comparision
					WHEN 'startswith' THEN
						CASE FieldType WHEN 
							'System.String' THEN ' LIKE '
						END
					WHEN 'contains' THEN
						CASE FieldType WHEN 
							'ST' THEN ' LIKE '
						END
					WHEN 'doesnotcontains' THEN
						CASE FieldType WHEN 
							'ST' THEN ' NOT LIKE '
						END
					WHEN 'endswith' THEN
						CASE FieldType WHEN 
							'ST' THEN ' LIKE '
						END
					WHEN 'isempty' THEN
						CASE FieldType WHEN 
							'ST' THEN ' = '
						END
					WHEN 'isnotempty' THEN
						CASE FieldType WHEN 
							'ST' THEN ' <> '
						END
				END
				+ ' ' + 
				CASE FieldType 
					WHEN 'ST' THEN
						CASE ISNULL(Expression, '')
							WHEN 'startswith' THEN	
								'''' + ISNULL(FieldValue, '') + '%'''			
							WHEN 'contains' THEN
								'''%' + ISNULL(FieldValue, '') + '%'''
							WHEN 'doesnotcontains' THEN
								'''%' + ISNULL(FieldValue, '') + '%'''
							WHEN 'endswith' THEN
								'''%' + ISNULL(FieldValue, '') + ''''
							WHEN 'isempty' THEN
								''''''
							WHEN 'isnotempty' THEN
								''''''
							WHEN 'isnull' THEN
								''
							WHEN 'isnotnull' THEN
								''
							ELSE 
								'''' + ISNULL(FieldValue, '') + ''''
						END
					WHEN 'DT' THEN   '''' + ISNULL(FieldValue, '') + ''''
					ELSE ISNULL(FieldValue, '')
				END
				+ ' '
				+ ISNULL(Operator, '')
				+ ' '
			FROM @tvp_filters_final WHERE FieldName = @V_FieldName
			SET @P_COLUMNS_TEMP = LEFT(@P_COLUMNS_TEMP, LEN(@P_COLUMNS_TEMP) - LEN(@V_Operator))
			SET @P_COLUMNS = @P_COLUMNS + @P_COLUMNS_TEMP
			SET @P_COLUMNS = @P_COLUMNS + ' ) '
		END
		ELSE BEGIN
			IF(LEN(@P_COLUMNS) > 0) BEGIN
				SET @P_COLUMNS = @P_COLUMNS + ' AND '
			END
			SELECT 
				@P_COLUMNS_TEMP = COALESCE(@P_COLUMNS_TEMP, '') 
				+ '('
				+ QUOTENAME(FieldName)
				+ ' ' +
				CASE ISNULL(Expression , '')
					WHEN 'eq' THEN  ' = ' 
					WHEN 'neq' THEN ' <> ' 
					WHEN 'gte' THEN ' >= ' 
					WHEN 'gt' THEN  ' > ' 
					WHEN 'lte' THEN ' <= ' 
					WHEN 'lt' THEN ' < ' 
					WHEN 'isnull' THEN ' IS NULL ' 
					WHEN 'isnotnull' THEN ' IS NOT NULL '
					--string comparision
					WHEN 'startswith' THEN
						CASE FieldType WHEN 
							'ST' THEN ' LIKE '
						END
					WHEN 'contains' THEN
						CASE FieldType WHEN 
							'ST' THEN ' LIKE '
						END
					WHEN 'doesnotcontains' THEN
						CASE FieldType WHEN 
							'ST' THEN ' NOT LIKE '
						END
					WHEN 'endswith' THEN
						CASE FieldType WHEN 
							'ST' THEN ' LIKE '
						END
					WHEN 'isempty' THEN
						CASE FieldType WHEN 
							'ST' THEN ' = '
						END
					WHEN 'isnotempty' THEN
						CASE FieldType WHEN 
							'ST' THEN ' <> '
						END
				END
				+ ' ' +
				CASE FieldType 
					WHEN 'ST' THEN
						CASE ISNULL(Expression,'')
							WHEN 'startswith' THEN	
								'''' + ISNULL(FieldValue, '') + '%'''			
							WHEN 'contains' THEN
								'''%' + ISNULL(FieldValue, '') + '%'''
							WHEN 'doesnotcontains' THEN
								'''%' + ISNULL(FieldValue, '') + '%'''
							WHEN 'endswith' THEN
								'''%' + ISNULL(FieldValue, '') + ''''
							WHEN 'isempty' THEN
								''''''
							WHEN 'isnotempty' THEN
								''''''
							WHEN 'isnull' THEN
								''
							WHEN 'isnotnull' THEN
								''
							ELSE 
								'''' + ISNULL(FieldValue, '') + ''''
						END
					WHEN 'DT' THEN   '''' + ISNULL(FieldValue, '') + ''''
					ELSE FieldValue
				END
				+ ') '	 
			FROM @tvp_filters_final WHERE FieldName = @V_FieldName
			SET @P_COLUMNS = @P_COLUMNS + @P_COLUMNS_TEMP
		END

		SET @index = @index + 1
	END

	RETURN @P_COLUMNS
END

GO


