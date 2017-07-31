--SELECT dbo.FN_GetNumberFromEnd('1a2sdlka389')
CREATE FUNCTION [dbo].[FN_GetNumberFromEnd]
(
	@value NVARCHAR(256)
)RETURNS INT
AS BEGIN
	DECLARE @index INT, @value2 NVARCHAR(256);
	SET @value = REVERSE(@value);
	SET @value2 = @value;
	SET @index = PATINDEX('[0-9]%', @value);
	WHILE @index > 0 BEGIN
		SET @value = STUFF(@value, @index, 1, '')
		SET @index = PATINDEX('[0-9]%', @value )
	END
	SET @value2 = LEFT(@value2, LEN(@value2) - LEN(@value))
	
	RETURN CAST(REVERSE(@value2) AS INT)
END

GO


