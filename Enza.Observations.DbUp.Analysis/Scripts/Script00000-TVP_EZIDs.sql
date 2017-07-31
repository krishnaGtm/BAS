IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_EZIDs' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_EZIDs] AS TABLE(
	[EZID] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[EZID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)


