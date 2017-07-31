IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_Filters' AND ss.name = N'dbo')
	CREATE TYPE [dbo].[TVP_Filters] AS TABLE(
		[FieldName] [nvarchar](50) NULL,
		[FieldType] [varchar](15) NULL,
		[FieldValue] [nvarchar](255) NULL,
		[Expression] [varchar](20) NULL,
		[Operator] [varchar](10) NULL
	)
GO


