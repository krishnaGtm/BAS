IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_IDs' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_IDs] AS TABLE(
	[ID] [int] NULL
)
GO


