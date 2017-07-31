IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_Fields' AND ss.name = N'dbo')
	CREATE TYPE [dbo].[TVP_Fields] AS TABLE(
		[EntityTypeCode] [nchar](3) NULL,
		[TraitID] [int] NULL,
		[ColumnLabel] [nvarchar](20) NULL,
		[DataType] [nvarchar](10) NULL,
		[DisplayFormat] [nvarchar](50) NULL,
		[Editor] [bit] NULL,
		[ListOfValues] [nvarchar](max) NULL,
		[MaxValue] [int] NULL,
		[MinValue] [int] NULL,
		[Updatable] [bit] NULL,
		[Property] [bit] NULL,
		[SortingOrder] [int] NULL
	)
GO


