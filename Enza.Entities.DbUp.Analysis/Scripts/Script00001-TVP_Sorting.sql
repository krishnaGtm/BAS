IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVPSorting' AND ss.name = N'dbo')
	CREATE TYPE [dbo].[TVPSorting] AS TABLE(
		[columnName] [varchar](40) NULL,
		[SortDir] [varchar](4) NULL
	)
GO


