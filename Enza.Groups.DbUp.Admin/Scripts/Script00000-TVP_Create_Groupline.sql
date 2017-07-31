IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_Create_GroupLine' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_Create_GroupLine] AS TABLE(
	[GroupEZID] [int] NULL,
	[EZID] [int] NULL,
	[EntityTypeCode] [nchar](3) NULL,
	[EntityName] [nvarchar](100) NULL
)
GO


