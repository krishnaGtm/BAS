/****** Object:  StoredProcedure [dbo].[sp_UserSrv_getUserRoleCrop]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_UserSrv_getUserRoleCrop]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateTrialToReady]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_updateTrialToReady]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateTrialRegion]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_updateTrialRegion]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_updateObservations]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_updateFieldSet]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_updateAssortment]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_Rename_TrialEntries]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_Rename_TrialEntries]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_removeVarietyFromAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_removeVarietyFromAssortment]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertTrialEntry]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_insertTrialEntry]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertTrial]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_insertTrial]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_insertObservations]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_insertFieldSet]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_insertAssortment]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insert_Trait]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_insert_Trait]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insert_Property]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_insert_Property]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getVarietyList]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getVarietyList]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getVarietiesByAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getVarietiesByAssortment]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialWithPropertiesAndObservationValues]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialWithPropertiesAndObservationValues]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialTypes]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialTypes]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByPropertyIDs]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByPropertyIDs]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByFieldSets]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByFieldSets]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialRegions]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialRegions]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialList]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialList]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialEntriesWithTraitObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialEntriesWithTraitObservations]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialEntriesForNaming]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialEntriesForNaming]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialEntries]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTrialEntries]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTraitsByFieldset]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getTraitsByFieldset]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getPropertyObsValuesByTraitIds]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getPropertyObsValuesByTraitIds]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getFieldSets]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getFieldSets]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getCrops]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getCrops]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getAssortmentList]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_getAssortmentList]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteVarietyGroup]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_deleteVarietyGroup]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteTrialRegion]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_deleteTrialRegion]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteTrialEntries]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_deleteTrialEntries]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_deleteFieldSet]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_delete_Trait]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_delete_Trait]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_delete_Property]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_delete_Property]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_addVarietiesToTrial]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_addVarietiesToTrial]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_addVarietiesToAssortments]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_addVarietiesToAssortments]
GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_addPropertiesToFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_TrialSrv_addPropertiesToFieldSet]
GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getTraitList]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_SharedSrv_getTraitList]
GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getPropertyObsValues]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_SharedSrv_getPropertyObsValues]
GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getPropertyListOfValues]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_SharedSrv_getPropertyListOfValues]
GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getPropertyList]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_SharedSrv_getPropertyList]
GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_SharedSrv_getObservations]
GO
/****** Object:  StoredProcedure [dbo].[SP_Group_GetGroups]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[SP_Group_GetGroups]
GO
/****** Object:  StoredProcedure [dbo].[SP_Group_GetGroupLine]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[SP_Group_GetGroupLine]
GO
/****** Object:  StoredProcedure [dbo].[SP_Group_CreateGroup]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[SP_Group_CreateGroup]
GO
/****** Object:  StoredProcedure [dbo].[SP_Group_Create_Group_Line]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[SP_Group_Create_Group_Line]
GO
/****** Object:  StoredProcedure [dbo].[SP_Entities_CreateEZIDS]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[SP_Entities_CreateEZIDS]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_VarietyInAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_VarietyInAssortment]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Varieties]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_Varieties]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_TraitValue]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_TraitValue]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Traits]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_Traits]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_PropInFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_PropInFieldSet]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Observations]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_Observations]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_FieldSets]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_FieldSets]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_EZIDs]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_EZIDs]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_CROPCODES]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_CROPCODES]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Create_GroupLine]    Script Date: 2/3/2017 2:22:40 PM ******/
DROP TYPE IF EXISTS [dbo].[TVP_Create_GroupLine]
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Create_GroupLine]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_Create_GroupLine' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_Create_GroupLine] AS TABLE(
	[GroupEZID] [int] NULL,
	[EZID] [int] NULL,
	[EntityTypeCode] [nchar](3) NULL,
	[EntityName] [nvarchar](100) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_CROPCODES]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_CROPCODES' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_CROPCODES] AS TABLE(
	[CROPCODE] [nchar](2) NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[CROPCODE] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_EZIDs]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_EZIDs' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_EZIDs] AS TABLE(
	[EZID] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[EZID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_FieldSets]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_FieldSets' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_FieldSets] AS TABLE(
	[FieldSetID] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[FieldSetID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Observations]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_Observations' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_Observations] AS TABLE(
	[TraitID] [bigint] NOT NULL,
	[EZID] [int] NOT NULL,
	[ValueInt] [int] NULL,
	[ValueDec] [decimal](18, 3) NULL,
	[ValueChar] [nvarchar](1023) NULL,
	[ValueDate] [datetime] NULL,
	[ObservationDate] [datetime] NULL,
	[UtcInsertDate] [datetime] NULL,
	[UserIDUpdated] [nvarchar](50) NULL,
	[UtcUpdateDate] [datetime] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_PropInFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_PropInFieldSet' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_PropInFieldSet] AS TABLE(
	[FieldSetID] [int] NOT NULL,
	[TraitID] [int] NOT NULL,
	[SortingOrder] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Traits]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_Traits' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_Traits] AS TABLE(
	[TraitID] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[TraitID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_TraitValue]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_TraitValue' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_TraitValue] AS TABLE(
	[Code] [nvarchar](10) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[SortingOrder] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_Varieties]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_Varieties' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_Varieties] AS TABLE(
	[VarietyID] [int] NOT NULL,
	[FieldNumber] [nvarchar](50) NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[VarietyID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[TVP_VarietyInAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
IF NOT EXISTS (SELECT * FROM sys.types st JOIN sys.schemas ss ON st.schema_id = ss.schema_id WHERE st.name = N'TVP_VarietyInAssortment' AND ss.name = N'dbo')
CREATE TYPE [dbo].[TVP_VarietyInAssortment] AS TABLE(
	[EZID] [int] NOT NULL,
	[VarietyGroupID] [int] NOT NULL,
	[SortingOrder] [int] NULL,
	PRIMARY KEY CLUSTERED 
(
	[EZID] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  StoredProcedure [dbo].[SP_Entities_CreateEZIDS]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_Entities_CreateEZIDS]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[SP_Entities_CreateEZIDS] AS' 
END
GO

-- Author:		Krishna Gautam
-- Create date: 9 AUG 2016
-- Description:	Generate EZIDs.


/*
EXAMPLE
EXEC SP_Entities_CreateEZIDS 2,'PLA'
*/

ALTER PROCEDURE [dbo].[SP_Entities_CreateEZIDS]
(
	@TotalEZID INT,
	@EntityTypeCode CHAR(3)
)
AS BEGIN

	DECLARE @temptable table
	(
		EZID int,
		EntityTypeCode CHAR(3)
	)
	DECLARE @MaxEZID INT;
	SELECT @maxEZID = MAX(EZID) + 1 FROM Entity;
	SET IDENTITY_INSERT Entity ON;
	WHILE(@TotalEZID > 0) BEGIN
		INSERT INTO Entity(EZID,EntityTypeCode) 
			OUTPUT inserted.EZID, inserted.EntityTypeCode INTO @temptable 
		values(@maxEZID,@EntityTypeCode);
		SET @TotalEZID = @TotalEZID -1;
		SET @MaxEZID = @MaxEZID +1;
	END
	SET IDENTITY_INSERT Entity OFF;

	SELECT * FROM @temptable;
END;


GO
/****** Object:  StoredProcedure [dbo].[SP_Group_Create_Group_Line]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_Group_Create_Group_Line]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[SP_Group_Create_Group_Line] AS' 
END
GO

-- Author:		Krishna Gautam
-- Create date: 27 December 2016
-- Update date: 04 Jan 2017 -- Column EntityName changed to Name
-- Update date: 24 Jan 2017 -- Column Name is removed from database
-- Description:	Create Group line Record.

ALTER PROCEDURE [dbo].[SP_Group_Create_Group_Line]
(
	@TVP_Create_groupline TVP_Create_GroupLine READONLY

)
AS BEGIN
	
	MERGE EntityInGroup T1
	USING @TVP_Create_groupline T2 on T2.EZID = T1.EZID 
					AND T2.[GroupEZID] = T1.GroupEZID 					
	WHEN NOT MATCHED THEN
		INSERT (GroupEZID,EZID,EntityTypeCode)
		VALUES (T2.GroupEZID,T2.EZID,T2.EntityTypeCode);
END;

GO
/****** Object:  StoredProcedure [dbo].[SP_Group_CreateGroup]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_Group_CreateGroup]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[SP_Group_CreateGroup] AS' 
END
GO
-- Author:		Krishna Gautam
-- Create date: 26 December 2016
-- Update date: 04 Jan 2017 -- Column EntityName changed to Name
-- Description:	Create Group Record.

ALTER PROCEDURE [dbo].[SP_Group_CreateGroup]
(
	@GroupsAsJson NVARCHAR(MAX)
)
AS BEGIN	
	DECLARE @tbl TABLE( EZID INT, Name NVARCHAR(50));
	WITH CTE AS
	(
		SELECT EZID, GroupName, Remark, [UserIdCreated]
		FROM OPENJSON(@GroupsAsJson)
		WITH
		(
			EZID INT,
			GroupName NVARCHAR(50),
			Remark NVARCHAR(150),
			[UserIdCreated] NVARCHAR(50)
		)
	)	
	INSERT INTO EntityGroup (EZID,Name, Remark, UserIdCreated, UtcInsertDate)
	OUTPUT INSERTED.EZID, inserted.Name INTO @tbl
	SELECT EZID, GroupName, Remark, [UserIdCreated], GETUTCDATE() FROM CTE;

	SELECT * FROM @tbl;
END;


GO
/****** Object:  StoredProcedure [dbo].[SP_Group_GetGroupLine]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_Group_GetGroupLine]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[SP_Group_GetGroupLine] AS' 
END
GO
-- Author:			Krishna Gautam
-- Create date:		27 December 2016
-- Update date:		04 Jan 2017 -- Column EntityName changed to Name
-- Update date:		24 Jan 2017 -- Column Name is removed from db so EZID is fetched as name.
-- Description:		Get Group line record.
ALTER PROCEDURE [dbo].[SP_Group_GetGroupLine]
(
	@EZID INT	

)
AS BEGIN
		
	SELECT GroupEZID,EZID, EntityTypeCode,EZID as Name FROM EntityInGroup WHERE GroupEZID = @EZID;

END;


GO
/****** Object:  StoredProcedure [dbo].[SP_Group_GetGroups]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SP_Group_GetGroups]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[SP_Group_GetGroups] AS' 
END
GO

-- Author:			Krishna Gautam
-- Create date:		26 December 2016
-- Update date:		04 Jan 2017 -- Column EntityName changed to Name
-- Description:		Get all Group Record.


ALTER PROCEDURE [dbo].[SP_Group_GetGroups]
(		
	@User NVARCHAR(50)

)
AS BEGIN
		SELECT ChildRows = ISNULL(ChildRows,0), E.EZID, E.Name, E.UtcInsertDate, E.Remark, EntityTypeCode = 'GRP' FROM EntityGroup E
		LEFT JOIN
		(
			SELECT GroupEZID,ChildRows = Count(GroupEZID) FROM EntityInGroup
			GROUP BY GroupEZID
		)
		AS EIG on EIG.GroupEZID = E.EZID WHERE E.UserIdCreated = @User;
END;




GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_SharedSrv_getObservations]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_SharedSrv_getObservations] AS' 
END
GO


ALTER PROCEDURE [dbo].[sp_SharedSrv_getObservations]
	-- Parameters of the stored procedure:
       @EZIDs    TVP_EZIDs  READONLY -- Table containing the EZIDs for which the observations are requested
AS

BEGIN
	SET NOCOUNT ON;

    Select O.*, ObsChar.ObsValue as ValueChar, ObsInt.ObsValue as ValueInt, ObsDec.ObsValue as ValueDec, ObsDate.ObsValue as ValueDate
	 from  Observation O
	 left outer join ObsChar on ObsChar.ObservationID = O.ObservationID
	 left outer join ObsInt  on ObsInt.ObservationID  = O.ObservationID
	 left outer join ObsDec  on ObsDec.ObservationID  = O.ObservationID
	 left outer join ObsDate on ObsDate.ObservationID = O.ObservationID
	 where O.EZID  in (select EZID    from @EZIDs)

END








GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getPropertyList]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_SharedSrv_getPropertyList]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_SharedSrv_getPropertyList] AS' 
END
GO









-- =============================================
-- Author:		Carla Buis
-- Create date: 7 June 2016
-- Description:	Returns a list of Properties that are linked to a certain table for a certain crop(group)
-- =============================================
ALTER PROCEDURE [dbo].[sp_SharedSrv_getPropertyList]
	-- Parameters of the stored procedure:
       @TableName nvarchar(50) = NULL,
	   @Crop      nchar(2)     = NULL,
	   @CropGroup int          = NULL
	   
AS

BEGIN
	SET NOCOUNT ON;

    Declare @Debug      as bit = 0,
	        @EntityType as nvarchar(3) = NULL,
			@Sql        as nvarchar(1023) = 'Select T.* from PropertyOfEntity P join Trait T on T.TraitID = P.TraitID where P.EntityTypeCode = '''

-- TableName is required
    if (@TableName is NULL)
	begin
        if @Debug = 1 print N'TableName must be filled'
		return(1)
    end

-- Crop or CropGroup must be filled
    if (@Crop is NULL and @CropGroup is NULL)
	begin
        if @Debug = 1 print N'Crop or CropGroup must be filled'
		return(1)
    end

    if (@Crop is not NULL and @CropGroup is not NULL)
	begin
        if @Debug = 1 print N'Crop and CropGroup cannot be filled both'
		return(1)
    end

-- If @Crop is specified, then get the CropGroup
    if(@Crop is not NULL)
	    set @CropGroup = (select CropGroupID from CropRD where CropRD.CropCode = @Crop);

    if (@CropGroup is NULL)
	begin
        if @Debug = 1 print N'CropGroup cannot be determined for Crop ' + @Crop
		return(1)
    end

    set @EntityType = (select EntityTypeCode from EntityType where EntityType.TableName = @TableName);

    if (@EntityType is NULL)
	begin
        if @Debug = 1 print N'EntityType cannot be determined for Table name ' + @TableName
		return(1)
    end


	set @SQL = @SQL + @EntityType + ''' and P.CropGroupID = ' + convert(nvarchar, @CropGroup);

    if @Debug = 1 print N'SQL statement: ' + @Sql

    exec(@SQL)

	return(0)
    
END





GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getPropertyListOfValues]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_SharedSrv_getPropertyListOfValues]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_SharedSrv_getPropertyListOfValues] AS' 
END
GO




ALTER PROCEDURE [dbo].[sp_SharedSrv_getPropertyListOfValues]
	-- Parameters of the stored procedure:
       @TraitIDs TVP_Traits READONLY  -- Table containing the TraitIDs
	   
AS

BEGIN
	SET NOCOUNT ON;

    Select * from TraitValue
	 where TraitValue.TraitID in (select TraitID from @TraitIDs)

END







GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getPropertyObsValues]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_SharedSrv_getPropertyObsValues]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_SharedSrv_getPropertyObsValues] AS' 
END
GO





ALTER PROCEDURE [dbo].[sp_SharedSrv_getPropertyObsValues]
	-- Parameters of the stored procedure:
       @EZIDs    TVP_EZIDs  READONLY, -- Table containing the EZIDs for which the observations are requested
       @TraitIDs TVP_Traits READONLY  -- Table containing the TraitIDs for which the observations are requested
	   
AS

BEGIN
	SET NOCOUNT ON;

    Select O.*, ObsChar.ObsValue as ValueChar, ObsInt.ObsValue as ValueInt, ObsDec.ObsValue as ValueDec, ObsDate.ObsValue as ValueDate
	 from  Observation O
	 left outer join ObsChar on ObsChar.ObservationID = O.ObservationID
	 left outer join ObsInt  on ObsInt.ObservationID  = O.ObservationID
	 left outer join ObsDec  on ObsDec.ObservationID  = O.ObservationID
	 left outer join ObsDate on ObsDate.ObservationID = O.ObservationID
	 where O.TraitID in (select TraitID from @TraitIDs)
	   and O.EZID    in (select EZID    from @EZIDs)

END








GO
/****** Object:  StoredProcedure [dbo].[sp_SharedSrv_getTraitList]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_SharedSrv_getTraitList]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_SharedSrv_getTraitList] AS' 
END
GO

-- =============================================
-- Author:		Carla Buis
-- Create date: 7 June 2016
-- Description:	Returns a list of Properties that are linked to a certain table for a certain crop(group)
-- =============================================
ALTER PROCEDURE [dbo].[sp_SharedSrv_getTraitList]
	   @Crop      nchar(2)     = NULL
AS

BEGIN
	SET NOCOUNT ON;
	declare @CropGroup int
-- Crop or CropGroup must be filled
    if (@Crop is NULL)
	begin
       print N'Crop must be filled'
		return(1)
    end

-- If @Crop is specified, then get the CropGroup
    if(@Crop is not NULL)
	    set @CropGroup = (select CropGroupID from CropRD where CropRD.CropCode = @Crop);

    if (@CropGroup is NULL)
	begin
        print N'CropGroup cannot be determined for Crop ' + @Crop
		return(1)
    end
	select * from Trait
	where CropCode = @Crop and Property = 0

	return(0)
    
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_addPropertiesToFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_addPropertiesToFieldSet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_addPropertiesToFieldSet] AS' 
END
GO


-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 22 Juni 2016
-- Description:	Adds variety to VarietyGroup/Assortment
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_addPropertiesToFieldSet] 
	@PropertiesInFieldSets [TVP_PropInFieldSet] READONLY 
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY
			DELETE FROM [dbo].[TraitInFieldSet]
			WHERE [FieldSetID] IN (SELECT pif.FieldSetID FROM @PropertiesInFieldSets pif)
			INSERT INTO [dbo].[TraitInFieldSet] (FieldSetID,TraitID, SortingOrder)
			SELECT pif.FieldSetID, pif.TraitID, pif.SortingOrder FROM @PropertiesInFieldSets pif
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END





GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_addVarietiesToAssortments]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_addVarietiesToAssortments]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_addVarietiesToAssortments] AS' 
END
GO


-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 22 Juni 2016
-- Description:	Adds variety to VarietyGroup/Assortment
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_addVarietiesToAssortments] 
	@VarietiesInAssortments [TVP_VarietyInAssortment] READONLY,
	@VarietyGroupID int
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY
			DELETE FROM [dbo].[VarietyInGroup]
			WHERE [VarietyGroupID] = @VarietyGroupID
	
			INSERT INTO [dbo].[VarietyInGroup] (VarietyGroupID, EZID, SortingOrder)
			SELECT via.VarietyGroupID, via.EZID, via.SortingOrder FROM @VarietiesInAssortments via
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
		  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_addVarietiesToTrial]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_addVarietiesToTrial]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_addVarietiesToTrial] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 15 juli 2016
-- Description:	Adds varieties to a trial.
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_addVarietiesToTrial]
	@TrialID int,
	@CropCode NVARCHAR(2),
	@VarietyIDs [dbo].[TVP_Varieties] READONLY
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY
			DECLARE @VarietyID int;
			DECLARE @FieldNumber NVARCHAR(50);
			DECLARE varietyCursor CURSOR
			FOR
			SELECT VarietyID,FieldNumber FROM @VarietyIDs
			OPEN varietyCursor
			FETCH NEXT FROM varietyCursor
			INTO @VarietyID,@FieldNumber
			WHILE @@FETCH_STATUS = 0
			BEGIN
				INSERT INTO Entity(EntityTypeCode)
				VALUES ('TRL');

				DECLARE @EZID int SET @EZID = SCOPE_IDENTITY();

				INSERT INTO TrialEntry(EZID, CropCode,FieldNumber)
				VALUES (@EZID, @CropCode,@FieldNumber);

				INSERT INTO Relationship(EZID1, EntityTypeCode1, EZID2, EntityTypeCode2)
				VALUES (@TrialID, 'TRI', @EZID, 'TRL');

				INSERT INTO Relationship(EZID1, EntityTypeCode1, EZID2, EntityTypeCode2)
				VALUES (@VarietyID, 'VAR', @EZID, 'TRL');

				FETCH NEXT FROM varietyCursor
				INTO @VarietyID,@FieldNumber
			END
			CLOSE varietyCursor
			DEALLOCATE varietyCursor
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_delete_Property]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_delete_Property]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_delete_Property] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 22 juli 2016
-- Description:	Deletes a property
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_delete_Property]
	@PropertyID INT
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY
			DECLARE @Count INT SET @Count = (SELECT COUNT(*) FROM Observation WHERE TraitID = @PropertyID)
			IF @Count = 0
			BEGIN
				DELETE FROM PropertyOfEntity WHERE TraitID = @PropertyID
				DELETE FROM TraitInFieldSet WHERE TraitID = @PropertyID
				DELETE FROM TraitValue WHERE TraitID = @PropertyID
				DELETE FROM Trait WHERE TraitID = @PropertyID
			END
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_delete_Trait]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_delete_Trait]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_delete_Trait] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 22 juli 2016
-- Description:	Deletes a property
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_delete_Trait]
	@PropertyID INT
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY
			DECLARE @Count INT SET @Count = (SELECT COUNT(*) FROM Observation WHERE TraitID = @PropertyID)
			IF @Count = 0
			BEGIN
				DELETE FROM TraitInFieldSet WHERE TraitID = @PropertyID
				DELETE FROM TraitValue WHERE TraitID = @PropertyID
				DELETE FROM Trait WHERE TraitID = @PropertyID
				COMMIT TRAN
			END
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_deleteFieldSet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_deleteFieldSet] AS' 
END
GO

-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_deleteFieldSet]
	@FieldSetID			int
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY
			DELETE FROM [dbo].[TraitInFieldSet]
			WHERE FieldSetID = @FieldSetID
			DELETE FROM FieldSet WHERE FieldSetID = @FieldSetID
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteTrialEntries]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_deleteTrialEntries]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_deleteTrialEntries] AS' 
END
GO


ALTER PROCEDURE [dbo].[sp_TrialSrv_deleteTrialEntries]
	-- Parameters of the stored procedure:
	
       @trialEntries   [dbo].[TVP_EZIDs] READONLY
AS

BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY

		delete from [dbo].Relationship where EZID2 in (select EZID from @trialEntries) and EntityTypeCode1 = 'TRI' and EntityTypeCode2 = 'TRL'

		delete from [dbo].Relationship where EZID2 in (select EZID from @trialEntries) and EntityTypeCode1 = 'VAR' and EntityTypeCode2 = 'TRL'

			
			delete from [dbo].[TrialEntry]
		where EZID in (select EZID from @trialEntries)

			delete 
		from [dbo].Entity
		where EZID in (select EZID from @trialEntries)

		 
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
			  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
	return(0)
END






GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteTrialRegion]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_deleteTrialRegion]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_deleteTrialRegion] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 21 juli 2016
-- Description:	deletes a trialregion
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_deleteTrialRegion] 
	@TrialRegionID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @VarietyGroupCount INT SET @VarietyGroupCount = (SELECT COUNT(*) FROM VarietyGroup WHERE TrialRegionID = @TrialRegionID);
	IF @VarietyGroupCount <= 0
	BEGIN
		DELETE FROM TrialRegion WHERE TrialRegionID = @TrialRegionID
	END
	ELSE
	BEGIN
		RAISERROR('There are VarietyGroups in this TrialRegion.', 16, 1)
	END
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_deleteVarietyGroup]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_deleteVarietyGroup]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_deleteVarietyGroup] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 12 juli 2016
-- Description:	Deletes a VarietyGroup and the VarietyInGroups it references.
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_deleteVarietyGroup]
	@AssortmentID int
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED
	BEGIN TRAN
		BEGIN TRY
			DELETE FROM VarietyInGroup WHERE VarietyGroupID = @AssortmentID
			DELETE FROM VarietyGroup WHERE VarietyGroupID = @AssortmentID
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getAssortmentList]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getAssortmentList]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getAssortmentList] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 21 Juni 2106
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getAssortmentList]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT vg.VarietyGroupID, 
		   vg.VarietyGroupName, 
		   vg.TrialRegionID, 
		   vg.[Year], 
		   tr.TrialRegionName, 
		   vig.EZID, 
		   vig.SortingOrder
	FROM VarietyGroup vg
	LEFT OUTER JOIN VarietyInGroup vig ON vg.VarietyGroupID = vig.VarietyGroupID
	LEFT OUTER JOIN TrialRegion tr ON tr.TrialRegionID = vg.TrialRegionID
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getCrops]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getCrops]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getCrops] AS' 
END
GO



ALTER PROCEDURE [dbo].[sp_TrialSrv_getCrops]
	-- Parameters of the stored procedure:
       @CropCodes TVP_CROPCODES READONLY  -- Table containing the TraitIDs
	   
AS

BEGIN
	SET NOCOUNT ON;

    Select * from CropRD
	where CropRD.CropCode in (select CROPCODE from @CropCodes)

END








GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getFieldSets]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getFieldSets]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getFieldSets] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 21 Juni 2106
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getFieldSets]
@CropCode nchar(2)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT f.CropCode, 
		   f.CropGroupID, 
		   f.FieldSetCode, 
		   f.FieldSetID, 
		   f.FieldSetName, 
		   f.NormalTrait, 
		   f.Property,
		   t.TraitID,
		   t.SortingOrder
	FROM FieldSet F
	LEFT OUTER JOIN TraitInFieldSet T ON F.FieldSetID = T.FieldSetID
	where F.CropCode = @CropCode
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getPropertyObsValuesByTraitIds]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getPropertyObsValuesByTraitIds]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getPropertyObsValuesByTraitIds] AS' 
END
GO

-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getPropertyObsValuesByTraitIds]
       @TraitIDs TVP_Traits READONLY  -- Table containing the TraitIDs for which the observations are requested
	   
AS

BEGIN
	SET NOCOUNT ON;

    Select O.*, ObsChar.ObsValue as ValueChar, ObsInt.ObsValue as ValueInt, ObsDec.ObsValue as ValueDec, ObsDate.ObsValue as ValueDate
	 from  Observation O
	 left outer join ObsChar on ObsChar.ObservationID = O.ObservationID
	 left outer join ObsInt  on ObsInt.ObservationID  = O.ObservationID
	 left outer join ObsDec  on ObsDec.ObservationID  = O.ObservationID
	 left outer join ObsDate on ObsDate.ObservationID = O.ObservationID
	 where O.TraitID in (select TraitID from @TraitIDs)

END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTraitsByFieldset]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTraitsByFieldset]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTraitsByFieldset] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 8 juli 2016
-- Description:	Gets all varieties for a given assortment.
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTraitsByFieldset]
	@fieldSetID int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT  t.*
	FROM TraitInFieldSet ti 
	INNER JOIN Trait t ON t.TraitID = ti.TraitID
	WHERE ti.FieldSetID = @fieldSetID
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialEntries]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialEntries]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialEntries] AS' 
END
GO







-- =============================================
-- Author:		Carla Buis
-- Create date: 6 June 2016
-- Description:	Returns the TrialEntries of one Trial
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialEntries]
	-- Parameters of the stored procedure:
       @TrialID   int      = NULL

AS

BEGIN
	SET NOCOUNT ON;

    Declare @Debug as bit = 0

-- TrialID is required
    if (@TrialID is NULL)
	begin
	    if @Debug = 1  print N'TrialID must be filled.'
		return(1)
    end

-- Select TrialEntry data and the corresponding Variety data
    select te.*, v.*
	    from Relationship r1
		join TrialEntry te   on  r1.EZID1 = @TrialID
		                     and r1.EZID2 = te.EZID
		left outer join Relationship r2 on  r2.EZID2 = te.EZID and r2.EZID1 <> @TrialID 
		left outer join Variety v       on  r2.EZID1 = v.EZID 

	return(0)
    
END







GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialEntriesForNaming]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialEntriesForNaming]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialEntriesForNaming] AS' 
END
GO

-- =============================================
-- Author:		Dibya Mani Suvedi
-- Create date: 10 Jan 2017
-- Description:	Gets the list of trial entries only (not including observations) to display on trial selection screen.
-- EXEC [sp_TrialSrv_getTrialEntriesForNaming] 1
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialEntriesForNaming] 
(
	@TrialEZID INT
)AS BEGIN
	SET NOCOUNT ON;

	SELECT 
		TE.EZID,
		TE.Name,
		TE.CropCode
	FROM dbo.Trial T
	JOIN dbo.Relationship R ON R.EZID1 = T.EZID  AND R.EntityTypeCode1 = 'TRI'
	JOIN dbo.TrialEntry TE ON TE.EZID = R.EZID2 AND R.EntityTypeCode2 = 'TRL'
	WHERE T.EZID = @TrialEZID;	
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialEntriesWithTraitObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialEntriesWithTraitObservations]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialEntriesWithTraitObservations] AS' 
END
GO
-- =============================================
-- Author:		Carla Buis
-- Create date: 10 November 2016
-- Description:	Get trial with its Trial entries and the observations for the Traits in the selected Fieldset
--              This stored procedure is called by the report to print the trial results.
-- =============================================

ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialEntriesWithTraitObservations]
	@TrialID int,
	@FieldsetID int

AS
BEGIN
	SET NOCOUNT ON;
	declare @SQL as nvarchar(MAX)
	declare @ColumnList as nvarchar(MAX)
	declare @ColumnLabelList as nvarchar(MAX)

	-- Temporary table to select the TrialEntry EZIDs of the selected Trial in a temporary table, for use later to select observations
	if object_ID('tempdb.dbo.#TrialEntries') is not NULL drop Table #TrialEntries

	create table #TrialEntries (
		TrialEntryID int,
		Fieldnumber nvarchar(50),
		VarietyName nvarchar(50)
	)

	-- Get distinct values of the columns
	select @ColumnList = isnull(@ColumnList + ' ,','') + quotename(TraitID),
		   @ColumnLabelList = isnull(@ColumnLabelList + ' ,','') + quotename(TraitID) + ' as ' + quotename(ColumnLabel)
	from dbo.Trait
	where TraitID in (select TraitID from dbo.TraitInFieldSet where FieldSetID = @FieldSetID)

	-- print @ColumnList
	-- print @ColumnLabelList

	-- Select all EZIDs of the TrialEntries in the temporary table with their Fieldnumber and Variety name
	insert into #TrialEntries (TrialEntryID, Fieldnumber, VarietyName)
	select r1.EZID2 as TrialEntryID, (case when LEN(te.FieldNumber) = 1 then '0' + te.FieldNumber else te.FieldNumber end), v.VarietyName
	from dbo.Trial t
	join dbo.Relationship r1 on r1.EZID1 = t.EZID
	join dbo.TrialEntry te   on te.EZID  = r1.EZID2
	left outer join Relationship r2 on  r2.EZID2 = r1.EZID2 and r2.EZID1 <> @TrialID 
	left outer join Variety v       on  r2.EZID1 = v.EZID 
	where t.EZID = @TrialID

	-- Prepare PIVOT query dynamically
	set @SQL =
	  'select EZID, Fieldnumber, VarietyName, ' + @ColumnLabelList
	+ ' into xxtest from (select coalesce (c.ObsValue, convert(nvarchar(1023),d.ObsValue), convert(nvarchar(1023),de.ObsValue), convert(nvarchar(1023),i.ObsValue)) as ObsValue, o.TraitID, te.TrialEntryID as EZID, te.Fieldnumber, te.VarietyName
				from #TrialEntries te
				left outer join dbo.Observation o on o.EZID = te.TrialEntryID
				left outer join dbo.ObsChar c on c.ObservationID = o.ObservationID
				left outer join dbo.ObsDate d on d.ObservationID = o.ObservationID
				left outer join dbo.ObsInt  i on i.ObservationID = o.ObservationID
				left outer join dbo.ObsDec de on de.ObservationID = o.ObservationID
		where te.TrialEntryID in (select TrialEntryID from #TrialEntries)) as p
	PIVOT
	(
	MAX(ObsValue) for TraitID in (' + @ColumnList + ')
	) as pvt
	order by FieldNumber'


	-- print @SQL
	exec sp_executesql @SQL

	select * from xxtest
	drop table xxtest

END


GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialList]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialList]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialList] AS' 
END
GO





ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialList]
	-- Parameters of the stored procedure:
       @TrialType   int      = NULL,
	   @Crop        nchar(2) = NULL,
	   @Country     nchar(2) = NULL,
	   @TrialRegion int      = NULL,
	   @Year        int      = NULL

AS

BEGIN
	SET NOCOUNT ON;

    Declare @Debug as bit = 0,
	        @Count as bit = 0,  -- First parameter in where clause must use the 'where' keyword. Others are added with 'and'.
	        @Where as nvarchar(1023) = '',
			@Sql   as nvarchar(1023) = 'Select Trial.EZID, Trial.CropCode, Trial.TrialName, Trial.TrialTypeID, Trial.CountryCode, Trial.TrialRegionID, Trial.Completed, Trial.Year, c.CountryName from Trial INNER JOIN Country c ON Trial.CountryCode = c.CountryCode'

-- Compose where clause. Only include a parameter in the where clause if it has a value

    if (@TrialType is not NULL)
	begin
	    if @Count = 0 
		    set @Where = @Where + ' where Trial.TrialTypeID = ' + convert(nvarchar, @TrialType)
	    else
		    set @Where = @Where + ' and Trial.TrialTypeID = ' + convert(nvarchar, @TrialType)

		set @Count = 1
    end

    if (@Crop is not NULL)
	begin
	    if @Count = 0 
		    set @Where = @Where + ' where Trial.CropCode = ''' + @Crop + ''''
	    else
		    set @Where = @Where + ' and Trial.CropCode = ''' + @Crop + ''''

		set @Count = 1
    end

    if (@Country is not NULL)
	begin
	    if @Count = 0 
		    set @Where = @Where + ' where Trial.CountryCode = ''' + @Country + ''''
	    else
		    set @Where = @Where + ' and Trial.CountryCode = ''' + @Country + ''''

		set @Count = 1
    end

    if (@TrialRegion is not NULL)
	begin
	    if @Count = 0 
		    set @Where = @Where + ' where Trial.TrialRegionID = ' + convert(nvarchar, @TrialRegion)
	    else
	        set @Where = @Where + ' and Trial.TrialRegionID = ' + convert(nvarchar, @TrialRegion)

		set @Count = 1
    end

    if (@Year is not NULL)
	begin
	    if @Count = 0 
		    set @Where = @Where + ' where Trial.Year = ' + convert(nvarchar, @Year)
	    else
	        set @Where = @Where + ' and Trial.Year= ' + convert(nvarchar, @Year)

		set @Count = 1
    end

    if @Debug = 1 print N'Where clause: ' + Coalesce(@Where,'is empty')


	-- compose and execute SQL statement

	if @Where > '' set @Sql = @Sql + @Where

    if @Debug = 1 print N'SQL statement: ' + @Sql

	Exec(@Sql)

	return(0)
    
END





GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialRegions]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialRegions]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialRegions] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 20 Juni 2016
-- Description:	Gets trial regions from database
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialRegions]
	@CropCode NCHAR(2)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT *
	FROM [dbo].[TrialRegion]
	WHERE CropCode = @CropCode
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByFieldSets]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByFieldSets]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByFieldSets] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 28 Juni 2016
-- Description:	Get trials with given properties and their observationvalues
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByFieldSets]
	@CropCode NVARCHAR(2),
	@CropGroupID int,
	@EntityTypeCode NVARCHAR(4),
	@FieldSetIDs [dbo].[TVP_FieldSets] READONLY,
	@TrialEZIDs TVP_EZIDs READONLY
AS
BEGIN
	SET NOCOUNT ON;
	SELECT trl.EZID as TrialEZID
	   ,trl.TrialName
	   ,trl.CountryCode
	   ,trl.CropCode
	   ,trl.TrialTypeID
	   ,trl.Completed
	   ,trt.TraitID
	   ,trt.TraitName
	   ,trt.DataType
	   ,trt.DisplayFormat
	   ,trt.MinValue
	   ,trt.MaxValue
	   ,trt.ColumnLabel
	   ,trt.Property
	   ,trt.CropGroupID
	   ,obs.ObservationID
	   ,obs.EZID as ObservationEZID
	   ,obs.UserIDCreated
	   ,obs.UtcInsertDate
	   ,obs.UserIDUpdated
	   ,obs.UtcUpdateDate
	   ,och.ObsValue as ObsValueChar
	   ,oin.ObsValue as ObsValueInt
	   ,ode.ObsValue as ObsValueDecimal
	   ,oda.ObsValue as ObsValueDate
	FROM TrialType tt
	LEFT OUTER JOIN Trial trl ON tt.TrialTypeID = trl.TrialTypeID
	LEFT OUTER JOIN Entity en ON trl.EZID = en.EZID
	LEFT OUTER JOIN EntityType entt ON entt.EntityTypeCode = en.EntityTypeCode
	LEFT OUTER JOIN PropertyOfEntity poe ON poe.EntityTypeCode = entt.EntityTypeCode
	LEFT OUTER JOIN Trait trt ON trt.TraitID = poe.TraitID
	LEFT OUTER JOIN TraitInFieldSet tifs ON tifs.TraitID = trt.TraitID
	LEFT OUTER JOIN Observation obs ON trt.TraitID = obs.TraitID
	LEFT OUTER JOIN ObsChar och ON och.ObservationID = obs.ObservationID
	LEFT OUTER JOIN ObsInt oin ON oin.ObservationID = obs.ObservationID
	LEFT OUTER JOIN ObsDec ode ON ode.ObservationID = obs.ObservationID
	LEFT OUTER JOIN ObsDate oda ON oda.ObservationID = obs.ObservationID
	WHERE entt.EntityTypeCode = @EntityTypeCode AND
		  trl.EZID IN (SELECT t.EZID FROM  @TrialEZIDs t) AND
		  trl.CropCode = @CropCode AND
		  tt.CropGroupID = @CropGroupID AND
		  (trt.Property IS NULL OR trt.Property = 1) AND
		  (tifs.FieldSetID IS NULL OR tifs.FieldSetID IN (SELECT fs.FieldSetID FROM @FieldSetIDs fs))
	ORDER BY trl.EZID, trt.TraitID
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByPropertyIDs]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByPropertyIDs]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByPropertyIDs] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 27 Juni 2016
-- Description:	Get trials with given properties and their observationvalues
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialsWithPropertiesAndObservationValuesByPropertyIDs]
	@CropCode NVARCHAR(2),
	@CropGroupID int,
	@EntityTypeCode NVARCHAR(4),
	@PropertyIDs TVP_Traits READONLY,
	@TrialEZIDs TVP_EZIDs READONLY
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @NumberOfEZIDs INT = (SELECT COUNT(*) FROM @TrialEZIDs)

	IF @NumberOfEZIDs = 0
	BEGIN
		SELECT trl.EZID as TrialEZID
		   ,trl.TrialName
		   ,trl.CountryCode
		   ,trl.CropCode
		   ,trl.TrialTypeID
		   ,trl.Completed
		   ,trt.TraitID
		   ,trt.TraitName
		   ,trt.DataType
		   ,trt.DisplayFormat
		   ,trt.MinValue
		   ,trt.MaxValue
		   ,trt.ColumnLabel
		   ,trt.Property
		   ,trt.CropGroupID
		   ,obs.ObservationID
		   ,obs.EZID as ObservationEZID
		   ,obs.UserIDCreated
		   ,obs.UtcInsertDate
		   ,obs.UserIDUpdated
		   ,obs.UtcUpdateDate
		   ,och.ObsValue as ObsValueChar
		   ,oin.ObsValue as ObsValueInt
		   ,ode.ObsValue as ObsValueDecimal
		   ,oda.ObsValue as ObsValueDate
		FROM TrialType tt
		LEFT OUTER JOIN Trial trl ON tt.TrialTypeID = trl.TrialTypeID
		LEFT OUTER JOIN Entity en ON trl.EZID = en.EZID
		LEFT OUTER JOIN EntityType entt ON entt.EntityTypeCode = en.EntityTypeCode
		LEFT OUTER JOIN PropertyOfEntity poe ON poe.EntityTypeCode = entt.EntityTypeCode
		LEFT OUTER JOIN Trait trt ON trt.TraitID = poe.TraitID
		LEFT OUTER JOIN Observation obs ON trt.TraitID = obs.TraitID
		LEFT OUTER JOIN ObsChar och ON och.ObservationID = obs.ObservationID
		LEFT OUTER JOIN ObsInt oin ON oin.ObservationID = obs.ObservationID
		LEFT OUTER JOIN ObsDec ode ON ode.ObservationID = obs.ObservationID
		LEFT OUTER JOIN ObsDate oda ON oda.ObservationID = obs.ObservationID
		WHERE entt.EntityTypeCode = @EntityTypeCode AND
			  (trt.TraitID IS NULL OR trt.TraitID IN (SELECT p.TraitID FROM  @PropertyIDs p)) AND
			  trl.CropCode = @CropCode AND
			  tt.CropGroupID = @CropGroupID AND
			  (trt.Property IS NULL OR trt.Property = 1)
		ORDER BY trl.EZID, trt.TraitID
	END
	ELSE
	BEGIN
		SELECT trl.EZID as TrialEZID
		   ,trl.TrialName
		   ,trl.CountryCode
		   ,trl.CropCode
		   ,trl.TrialTypeID
		   ,trt.TraitID
		   ,trt.TraitName
		   ,trt.DataType
		   ,trt.DisplayFormat
		   ,trt.MinValue
		   ,trt.MaxValue
		   ,trt.ColumnLabel
		   ,trt.Property
		   ,trt.CropGroupID
		   ,obs.ObservationID
		   ,obs.EZID as ObservationEZID
		   ,obs.UserIDCreated
		   ,obs.UtcInsertDate
		   ,obs.UserIDUpdated
		   ,obs.UtcUpdateDate
		   ,och.ObsValue as ObsValueChar
		   ,oin.ObsValue as ObsValueInt
		   ,ode.ObsValue as ObsValueDecimal
		   ,oda.ObsValue as ObsValueDate
		FROM TrialType tt
		LEFT OUTER JOIN Trial trl ON tt.TrialTypeID = trl.TrialTypeID
		LEFT OUTER JOIN Entity en ON trl.EZID = en.EZID
		INNER JOIN EntityType entt ON entt.EntityTypeCode = en.EntityTypeCode
		INNER JOIN PropertyOfEntity poe ON poe.EntityTypeCode = entt.EntityTypeCode
		LEFT OUTER JOIN Trait trt ON trt.TraitID = poe.TraitID
		LEFT OUTER JOIN Observation obs ON trt.TraitID = obs.TraitID
		LEFT OUTER JOIN ObsChar och ON obs.ObservationID = obs.ObservationID
		LEFT OUTER JOIN ObsInt oin ON oin.ObservationID = obs.ObservationID
		LEFT OUTER JOIN ObsDec ode ON ode.ObservationID = obs.ObservationID
		LEFT OUTER JOIN ObsDate oda ON oda.ObservationID = obs.ObservationID
		WHERE entt.EntityTypeCode = @EntityTypeCode AND
			  trt.TraitID IN (SELECT p.TraitID FROM  @PropertyIDs p) AND
			  trl.EZID IN (SELECT t.EZID FROM  @TrialEZIDs t) AND
			  trl.CropCode = @CropCode AND
			  tt.CropGroupID = @CropGroupID AND
			  trt.Property = 1
		ORDER BY trl.EZID, trt.TraitID
	END
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialTypes]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialTypes]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialTypes] AS' 
END
GO


-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 7 septmeber 2016
-- Description:	Returns all trialtypes
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialTypes]
AS

BEGIN
	SET NOCOUNT ON;
	SELECT * FROM dbo.TrialType;
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getTrialWithPropertiesAndObservationValues]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getTrialWithPropertiesAndObservationValues]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getTrialWithPropertiesAndObservationValues] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 14 september 2016
-- Description:	Get trial with properties and their observationvalues
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getTrialWithPropertiesAndObservationValues]
	@TrialEZID int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT trl.EZID as TrialEZID
		,trl.TrialName
		,trl.CountryCode
		,trl.CropCode
		,trl.TrialTypeID
		,trl.Completed
		,trt.TraitID
		,trt.TraitName
		,trt.DataType
		,trt.DisplayFormat
		,trt.MinValue
		,trt.MaxValue
		,trt.ColumnLabel
		,trt.Property
		,trt.CropGroupID
		,obs.ObservationID
		,obs.EZID as ObservationEZID
		,obs.UserIDCreated
		,obs.UtcInsertDate
		,obs.UserIDUpdated
		,obs.UtcUpdateDate,
		obs.ObservationDate
		,och.ObsValue as ObsValueChar
		,oin.ObsValue as ObsValueInt
		,ode.ObsValue as ObsValueDecimal
		,oda.ObsValue as ObsValueDate
	FROM TrialType tt
	LEFT OUTER JOIN Trial trl ON tt.TrialTypeID = trl.TrialTypeID
	LEFT OUTER JOIN Entity en ON trl.EZID = en.EZID
	LEFT OUTER JOIN EntityType entt ON entt.EntityTypeCode = en.EntityTypeCode
	LEFT OUTER JOIN PropertyOfEntity poe ON poe.EntityTypeCode = entt.EntityTypeCode
	LEFT OUTER JOIN Trait trt ON trt.TraitID = poe.TraitID
	LEFT OUTER JOIN Observation obs ON trt.TraitID = obs.TraitID AND obs.EZID = trl.EZID
	LEFT OUTER JOIN ObsChar och ON och.ObservationID = obs.ObservationID
	LEFT OUTER JOIN ObsInt oin ON oin.ObservationID = obs.ObservationID
	LEFT OUTER JOIN ObsDec ode ON ode.ObservationID = obs.ObservationID
	LEFT OUTER JOIN ObsDate oda ON oda.ObservationID = obs.ObservationID
	WHERE 
		  trl.EZID = @TrialEZID
		
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getVarietiesByAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getVarietiesByAssortment]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getVarietiesByAssortment] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 8 juli 2016
-- Description:	Gets all varieties for a given assortment.
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getVarietiesByAssortment]
	@AssortmentID int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * 
	FROM VarietyInGroup vig
	INNER JOIN Variety v ON vig.EZID = v.EZID
	WHERE vig.VarietyGroupID = @AssortmentID
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_getVarietyList]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_getVarietyList]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_getVarietyList] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 19 Juli 2016
-- Description:	Retrieves varieties.
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_getVarietyList] 
	@CropCode nvarchar(2)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT EZID, VarietyNr, CropCode, VarietyName, Enumber, CropSegmentCode, ProductSegmentCode, ProductStatus, ResistanceHR, ResistanceIR, ResistanceT, MasterNr
	FROM Variety v WHERE v.CropCode = @CropCode
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insert_Property]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_insert_Property]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_insert_Property] AS' 
END
GO
-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 19 Juli 2016
-- Description:	Creates a property
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_insert_Property]
	@CropCode NVARCHAR(2), 
	@Name NVARCHAR(255),
	@ColumnLabel NVARCHAR(10),
	@DataType NVARCHAR(10),
	@Editor BIT = 0,
	@ListOfValues BIT,
	@Updatable BIT,
	@DisplayFormat NVARCHAR(50),
	@Values [TVP_TraitValue] READONLY
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
	BEGIN TRAN
		BEGIN TRY
			DECLARE @CropGroupID int;
			DECLARE @tbl TABLE(CropGroupID INT, CropCode NCHAR(2), TraitTypeID INT NULL, TraitName NVARCHAR(255), ColumnLabel NVARCHAR(10), DataType NVARCHAR(10), DisplayFormat NVARCHAR(150) NULL, Editor BIT, ListOfValues BIT, MinValue INT NULL, MaxValue INT NULL, Updatable BIT, Property BIT)
			SET @CropGroupID = (SELECT TOP 1 c.CropGroupID FROM CropRD c WHERE c.CropCode = @CropCode)

			INSERT INTO Trait (CropGroupID, CropCode, TraitTypeID, TraitName, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MinValue, MaxValue, Updatable, Property)
			OUTPUT inserted.CropGroupID, inserted.CropCode, inserted.TraitTypeID, inserted.TraitName, inserted.ColumnLabel, inserted.DataType, inserted.DisplayFormat, inserted.Editor, inserted.ListOfValues, inserted.MinValue, inserted.MaxValue, inserted.Updatable, inserted.Property INTO @tbl
			VALUES (@CropGroupID, @CropCode, null, @Name, @ColumnLabel, @DataType, @DisplayFormat, @Editor, @ListOfValues, null, null, @Updatable, 1)

			DECLARE @TraitID int SET @TraitID = SCOPE_IDENTITY();
			
			INSERT INTO PropertyOfEntity(EntityTypeCode, CropGroupID, TraitID)
			VALUES('TRI', @CropGroupID, @TraitID)

			SELECT * FROM @tbl

			INSERT INTO TraitValue (TraitID, TraitValueCode, TraitValueName,SortingOrder)
			SELECT @TraitID, v.Code, v.Name,v.SortingOrder FROM @Values v
			/*
			SELECT t.TraitID, t.CropGroupID, t.CropCode, t.TraitTypeID, t.TraitName, t.ColumnLabel, t.DataType, t.DisplayFormat, t.Editor, t.ListOfValues, t.MinValue, t.MaxValue, t.Updatable, t.Property
			FROM Trait t
			WHERE t.TraitID = @TraitID
			*/
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
	
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insert_Trait]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_insert_Trait]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_insert_Trait] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 19 Juli 2016
-- Description:	Creates a property
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_insert_Trait]
	@CropCode NVARCHAR(2), 
	@Name NVARCHAR(255),
	@ColumnLabel NVARCHAR(10),
	@DataType NVARCHAR(10),
	@Editor BIT = 0,
	@ListOfValues BIT,
	@Updatable BIT,
	@DisplayFormat NVARCHAR(50),
	@Values [TVP_TraitValue] READONLY
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
	BEGIN TRAN
		BEGIN TRY
			DECLARE @CropGroupID int 
			DECLARE @tbl TABLE(CropGroupID INT, CropCode NCHAR(2), TraitTypeID INT NULL, TraitName NVARCHAR(255), ColumnLabel NVARCHAR(10), DataType NVARCHAR(10), DisplayFormat NVARCHAR(150) NULL, Editor BIT, ListOfValues BIT, MinValue INT NULL, MaxValue INT NULL, Updatable BIT, Property BIT)
			SET @CropGroupID = (SELECT TOP 1 c.CropGroupID FROM CropRD c WHERE c.CropCode = @CropCode)

			INSERT INTO Trait (CropGroupID, CropCode, TraitTypeID, TraitName, ColumnLabel, DataType, DisplayFormat, Editor, ListOfValues, MinValue, MaxValue, Updatable, Property)
			OUTPUT inserted.CropGroupID, inserted.CropCode, inserted.TraitTypeID, inserted.TraitName, inserted.ColumnLabel, inserted.DataType, inserted.DisplayFormat, inserted.Editor, inserted.ListOfValues, inserted.MinValue, inserted.MaxValue, inserted.Updatable, inserted.Property INTO @tbl
			VALUES (@CropGroupID, @CropCode, null, @Name, @ColumnLabel, @DataType, @DisplayFormat, @Editor, @ListOfValues, null, null, @Updatable, 0)

			DECLARE @TraitID int SET @TraitID = SCOPE_IDENTITY();
			
			SELECT * FROM @tbl

			INSERT INTO TraitValue (TraitID, TraitValueCode, TraitValueName, SortingOrder)
			SELECT @TraitID, v.Code, v.Name, v.SortingOrder FROM @Values v
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
	
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_insertAssortment]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_insertAssortment] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 21 Juni 2016
-- Description:	Inserts Assortment/VarietyGroup in database
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_insertAssortment]
	@Year			int,
	@TrialRegionID	int	,
	@VarietyGroupName		nvarchar(50)

AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[VarietyGroup] (VarietyGroupName, TrialRegionID, [Year])
	VALUES (@VarietyGroupName, @TrialRegionID, @Year)
	DECLARE @ID int SET @ID = SCOPE_IDENTITY()
	SELECT vg.VarietyGroupID, 
		   vg.VarietyGroupName, 
		   vg.TrialRegionID, 
		   vg.[Year], 
		   tr.TrialRegionName
	FROM VarietyGroup vg
	LEFT OUTER JOIN TrialRegion tr ON tr.TrialRegionID = vg.TrialRegionID
	WHERE vg.VarietyGroupID = @ID
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_insertFieldSet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_insertFieldSet] AS' 
END
GO

-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_insertFieldSet]
	@FieldSetCode			nvarchar(50),
	@FieldSetName	nvarchar(50)	,
	@CropCode char(2),
	@NormalTrait bit,
	@Property bit

AS
BEGIN
	DECLARE @CropGroupID int 
			SET @CropGroupID = (SELECT TOP 1 c.CropGroupID FROM CropRD c WHERE c.CropCode = @CropCode)
INSERT INTO [dbo].[FieldSet]
           ([FieldSetCode]
           ,[FieldSetName]
           ,[CropGroupID]
           ,[CropCode]
           ,[CropGroupLevel]
           ,[CropLevel]
           ,[NormalTrait]
           ,[Property])
     VALUES
           (@FieldSetCode
           ,@FieldSetName
           ,@CropGroupID
           ,@CropCode
           ,0
           ,1
           ,@NormalTrait
           ,@Property)
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_insertObservations]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_insertObservations] AS' 
END
GO
-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 27 juli 2016
-- Description:	Inserts observations with observation values
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_insertObservations]
	@Observations [dbo].[TVP_Observations] READONLY,
	@UserIDCreated nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

	BEGIN TRANSACTION One;
	BEGIN TRY

	INSERT INTO [dbo].[Observation] (EZID, TraitID, UserIDCreated,ObservationDate,UserIDUpdated,UtcInsertDate,UtcUpdateDate)
	SELECT o.EZID, o.TraitID, @UserIDCreated,o.ObservationDate,o.UserIDUpdated,o.UtcInsertDate,o.UtcUpdateDate
	FROM @Observations o
	
	INSERT INTO ObsChar(ObservationID, ObsValue)
	SELECT (SELECT TOP 1 obs.ObservationID FROM Observation obs WHERE obs.TraitID = o.TraitID AND obs.EZID = o.EZID and obs.UserIDCreated = @UserIDCreated ORDER BY UtcInsertDate DESC), o.ValueChar
	FROM @Observations o
	WHERE o.ValueChar IS NOT NULL

	INSERT INTO ObsDate(ObservationID, ObsValue)
	SELECT (SELECT TOP 1 obs.ObservationID FROM Observation obs WHERE obs.TraitID = o.TraitID AND obs.EZID = o.EZID and obs.UserIDCreated = @UserIDCreated ORDER BY UtcInsertDate DESC), o.ValueDate
	FROM @Observations o
	WHERE o.ValueDate IS NOT NULL

	INSERT INTO ObsInt(ObservationID, ObsValue)
	SELECT (SELECT TOP 1 obs.ObservationID FROM Observation obs WHERE obs.TraitID = o.TraitID AND obs.EZID = o.EZID and obs.UserIDCreated = @UserIDCreated ORDER BY UtcInsertDate DESC), o.ValueInt
	FROM @Observations o
	WHERE o.ValueInt IS NOT NULL

	INSERT INTO ObsDec(ObservationID, ObsValue)
	SELECT (SELECT TOP 1 obs.ObservationID FROM Observation obs WHERE obs.TraitID = o.TraitID AND obs.EZID = o.EZID and obs.UserIDCreated = @UserIDCreated ORDER BY UtcInsertDate DESC), o.ValueDec
	FROM @Observations o
	WHERE o.ValueDec IS NOT NULL

	COMMIT TRANSACTION One;
	END TRY
	BEGIN CATCH
	ROLLBACK TRANSACTION One;
	THROW
	END CATCH
	
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertTrial]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_insertTrial]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_insertTrial] AS' 
END
GO
-- =============================================  
-- Author:  Koen Barmentlo  
-- Create date: 15 June 2016 
-- Updated date: 29 jan 2017 -- update for output clause for issue on trigger by Dibya. 
-- Description: Inserts a trial  
-- =============================================  
ALTER PROCEDURE [dbo].[sp_TrialSrv_insertTrial]   
 @CropCode  nchar(2) ,  
 @TrialName  nvarchar(50) ,  
 @TrialTypeID int   ,  
 @CountryCode nchar(2) ,  
 @TrialRegionID  int,  
 @Year int  
AS  
BEGIN  
 SET NOCOUNT ON;  

 DECLARE @tbl TABLE(EZID INT, CropCode NCHAR(2), TrialName NVARCHAR(50), TrialTypeID INT, CountryCode NCHAR(2), [Year] INT, TrialRegionID INT)
  
 INSERT INTO [dbo].[Entity] (EntityTypeCode)  
 VALUES ('TRI');  
   
 DECLARE @EntityEZID int = SCOPE_IDENTITY();  
  
 INSERT INTO [dbo].[Trial](EZID, CropCode, TrialName, TrialTypeID, CountryCode, [Year], [TrialRegionID])  
 OUTPUT inserted.EZID, inserted.CropCode, inserted.TrialName, inserted.TrialTypeID, inserted.CountryCode, inserted.[Year], inserted.[TrialRegionID] INTO @tbl  
 VALUES(@EntityEZID, @CropCode, @TrialName, @TrialTypeID, @CountryCode, @Year, @TrialRegionID)  

 SELECT * FROM @tbl
END  
  

GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_insertTrialEntry]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_insertTrialEntry]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_insertTrialEntry] AS' 
END
GO
-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 20 juni 2016
-- Updated date: 29 jan 2017 -- update for output clause for issue on trigger by Dibya.
-- Description:	Inserts a trialentry in the database.
-- Modified by dibya to support triggers enabled and output clause is used.
-- =============================================
--EXEC [sp_TrialSrv_insertTrialEntry] 1, 'TO', '123123', 'test'

ALTER PROCEDURE [dbo].[sp_TrialSrv_insertTrialEntry]
	@TrialID int,
	@CropCode NVARCHAR(2), 
	@FieldNumber NVARCHAR(50),
	@Name NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
	BEGIN TRAN
		BEGIN TRY
			DECLARE @tbl TABLE(EZID INT, CropCode NCHAR(2), FieldNumber NVARCHAR(50), Name NVARCHAR(50), UtcInsertDate DATETIME, UtcUpdateDate DATETIME);

			INSERT INTO [dbo].[Entity] (EntityTypeCode)
			VALUES ('TRL');
	
			DECLARE @EntityEZID int = SCOPE_IDENTITY();

			INSERT INTO [dbo].[TrialEntry] (EZID, CropCode, FieldNumber, Name)
			OUTPUT inserted.EZID, Inserted.CropCode, Inserted.FieldNumber, Inserted.Name, Inserted.UtcInsertDate, Inserted.UtcUpdateDate INTO @tbl
			VALUES (@EntityEZID, @CropCode, @FieldNumber, @Name) 

			INSERT INTO Relationship (EZID1, EntityTypeCode1, EZID2, EntityTypeCode2)
			VALUES (@TrialID, 'TRI', @EntityEZID, 'TRL')

			SELECT * FROM @tbl;
			SELECT @EntityEZID;

			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
			RAISERROR('Inserting TrialEntry failed', 16, 1);
		END CATCH
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_removeVarietyFromAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_removeVarietyFromAssortment]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_removeVarietyFromAssortment] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 22 Juni 2016
-- Description:	Removes variety from VarietyGroup/Assortment
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_removeVarietyFromAssortment] 
	@VarietyEZID int, 
	@AssortmentID int
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM [dbo].[VarietyInGroup] WHERE VarietyGroupID = @AssortmentID AND EZID = @VarietyEZID
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_Rename_TrialEntries]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_Rename_TrialEntries]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_Rename_TrialEntries] AS' 
END
GO
-- =============================================
-- Author:		Dibya Mani Suvedi
-- Create date: 06 Jan 2017
-- Description:	Updates the name of existing trial lines
-- EXEC [sp_TrialSrv_Rename_TrialEntries] N'[{"EZID":1217,"Name":"NUM0001"}]'
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_Rename_TrialEntries] 
(
	@EntriesAsJson NVARCHAR(MAX)
)AS BEGIN
	SET NOCOUNT ON;
	BEGIN TRAN;

	BEGIN TRY
		DECLARE @tbl TABLE(EZID INT, Name NVARCHAR(100));

		WITH CTE AS
		(
			SELECT EZID, Name 
			FROM OPENJSON(@EntriesAsJson)
			WITH
			(
				EZID INT,
				Name NVARCHAR(100)
			)
		)
		UPDATE T1 SET
			T1.Name = T2.Name	
		OUTPUT Inserted.EZID, Inserted.Name INTO @tbl
		FROM dbo.TrialEntry T1
		JOIN CTE T2
		ON T2.EZID = T1.EZID

		SELECT * FROM @tbl;

		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
			
		DECLARE @ErrorMessage NVARCHAR(MAX);  
		DECLARE @ErrorSeverity INT;  
		DECLARE @ErrorState INT;   
		SELECT   
			@ErrorMessage = ERROR_MESSAGE(),  
			@ErrorSeverity = ERROR_SEVERITY(),  
			@ErrorState = ERROR_STATE();  
  
		RAISERROR 
		(
			@ErrorMessage, -- Message text.  
			@ErrorSeverity, -- Severity.  
			@ErrorState -- State.  
        );  
	END CATCH
END




GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateAssortment]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_updateAssortment]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_updateAssortment] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 21 Juni 2016
-- Description:	Updates Assortment/VarietyGroup in database
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_updateAssortment]
	@VarietyGroupID int,
	@Year			int,
	@TrialRegionID	int,
	@VarietyGroupName		nvarchar(50)

AS
BEGIN
	SET NOCOUNT ON;
	UPDATE [dbo].[VarietyGroup]
	SET [Year] = @Year, TrialRegionID = @TrialRegionID, VarietyGroupName = @VarietyGroupName, UtcUpdateDate = GETUTCDATE()
	WHERE VarietyGroupID = @VarietyGroupID
	SELECT vg.VarietyGroupID, 
		   vg.VarietyGroupName, 
		   vg.TrialRegionID, 
		   vg.[Year], 
		   tr.TrialRegionName, 
		   vig.EZID, 
		   vig.SortingOrder
	FROM VarietyGroup vg
	LEFT OUTER JOIN VarietyInGroup vig ON vg.VarietyGroupID = vig.VarietyGroupID
	LEFT OUTER JOIN TrialRegion tr ON tr.TrialRegionID = vg.TrialRegionID
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateFieldSet]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_updateFieldSet]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_updateFieldSet] AS' 
END
GO


-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_updateFieldSet]
	@FieldSetID			int,
	@FieldSetCode			nvarchar(50),
	@FieldSetName	nvarchar(50)	,
	@CropCode char(2),
	@NormalTrait bit,
	@Property bit,
	@PropertiesInFieldSets [TVP_PropInFieldSet] READONLY 

AS
BEGIN
	DECLARE @CropGroupID int 
			SET @CropGroupID = (SELECT TOP 1 c.CropGroupID FROM CropRD c WHERE c.CropCode = @CropCode)
				BEGIN TRAN
		BEGIN TRY
			UPDATE [dbo].[FieldSet]
				SET [FieldSetCode] = @FieldSetCode
				   ,[FieldSetName] = @FieldSetName
				   ,[CropGroupID] = @CropGroupID
				   ,[CropCode] = @CropCode
				   ,[UtcUpdateDate] = GETUTCDATE()
				   ,[NormalTrait] = @NormalTrait
				   ,[Property] = @Property
			WHERE FieldSetID = @FieldSetID
			DELETE FROM [dbo].[TraitInFieldSet]
			WHERE FieldSetID = @FieldSetID
			INSERT INTO [dbo].[TraitInFieldSet] (FieldSetID,TraitID, SortingOrder)
			SELECT pif.FieldSetID, pif.TraitID, pif.SortingOrder FROM @PropertiesInFieldSets pif
 COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
					  DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
        @ErrorMessage = ERROR_MESSAGE(),  
        @ErrorSeverity = ERROR_SEVERITY(),  
        @ErrorState = ERROR_STATE();  
  
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  
		END CATCH
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateObservations]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_updateObservations]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_updateObservations] AS' 
END
GO
-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 27 juli 2016
-- Description:	Inserts observations with observation values
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_updateObservations]
	@Observations [dbo].[TVP_Observations] READONLY,
	@UserIDCreated nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED

	BEGIN TRANSACTION Two;
	BEGIN TRY

UPDATE [dbo].[Observation]
   SET
      [ObservationDate] = tvp.ObservationDate
      ,[UtcUpdateDate] = tvp.UtcUpdateDate
      ,[UserIDUpdated] = @UserIDCreated
 FROM [dbo].[Observation] INNER JOIN @Observations AS tvp
    ON [dbo].[Observation].EZID = tvp.EZID and [dbo].[Observation].TraitID = tvp.TraitID;

	
	
	UPDATE [dbo].[ObsDate]
   SET [ObsValue] = tvp.ValueDate,
   [UtcUpdateDate]=tvp.UtcUpdateDate
		FROM [dbo].[ObsDate] INNER JOIN @Observations AS tvp
		ON [dbo].[ObsDate].ObservationID = (select top 1 [dbo].[Observation].ObservationID from [dbo].[Observation] inner join [dbo].[ObsDate] ON [dbo].[ObsDate].ObservationID=[dbo].[Observation].ObservationID where EZID = tvp.EZID and TraitID =tvp.TraitID ORDER BY [dbo].[Observation].UtcInsertDate DESC)
		where tvp.ValueDate IS NOT NULL

	UPDATE [dbo].[ObsInt]
   SET [ObsValue] = tvp.ValueInt,
   [UtcUpdateDate]=tvp.UtcUpdateDate
		FROM [dbo].[ObsInt] INNER JOIN @Observations AS tvp
		ON [dbo].[ObsInt].ObservationID = (select top 1 [dbo].[Observation].ObservationID from [dbo].[Observation] inner join [dbo].[ObsInt] ON [dbo].[ObsInt].ObservationID=[dbo].[Observation].ObservationID where EZID = tvp.EZID and TraitID =tvp.TraitID ORDER BY [dbo].[Observation].UtcInsertDate DESC)
		where tvp.ValueInt IS NOT NULL

		UPDATE [dbo].[ObsDec]
   SET [ObsValue] = tvp.ValueDec,
   [UtcUpdateDate]=tvp.UtcUpdateDate
		FROM [dbo].[ObsDec] INNER JOIN @Observations AS tvp
		ON [dbo].[ObsDec].ObservationID = (select top 1 [dbo].[Observation].ObservationID from [dbo].[Observation] inner join [dbo].[ObsDec] ON [dbo].[ObsDec].ObservationID=[dbo].[Observation].ObservationID where EZID = tvp.EZID and TraitID =tvp.TraitID ORDER BY [dbo].[Observation].UtcInsertDate DESC)
		where tvp.ValueDec IS NOT NULL

		UPDATE [dbo].[ObsChar]
   SET [ObsValue] = tvp.ValueChar,
   [UtcUpdateDate]=tvp.UtcUpdateDate
		FROM [dbo].[ObsChar] INNER JOIN @Observations AS tvp
		ON [dbo].[ObsChar].ObservationID = (select top 1[dbo].[Observation].ObservationID from [dbo].[Observation] inner join [dbo].[ObsChar] ON [dbo].[ObsChar].ObservationID=[dbo].[Observation].ObservationID where EZID = tvp.EZID and TraitID =tvp.TraitID ORDER BY [dbo].[Observation].UtcInsertDate DESC)
		where tvp.ValueChar IS NOT NULL

	COMMIT TRANSACTION Two;
	END TRY
	BEGIN CATCH
	ROLLBACK TRANSACTION Two;
	THROW
	END CATCH
	
END


GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateTrialRegion]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_updateTrialRegion]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_updateTrialRegion] AS' 
END
GO

-- =============================================
-- Author:		Koen Barmentlo
-- Create date: 20 Juni 2016
-- Description:	Update TrialRegion
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_updateTrialRegion]
	@TrialRegionID		int,
	@TrialRegionName	nchar(50),
	@TrialRegionCode	NVARCHAR(8),
	@CropCode			NVARCHAR(2)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE [dbo].[TrialRegion]
	SET TrialRegionName = @TrialRegionName,
		TrialRegionCode = @TrialRegionCode,
		CropCode = @CropCode,
		UtcUpdateDate = GETUTCDATE()
	WHERE TrialRegionID = @TrialRegionID
END



GO
/****** Object:  StoredProcedure [dbo].[sp_TrialSrv_updateTrialToReady]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_TrialSrv_updateTrialToReady]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_TrialSrv_updateTrialToReady] AS' 
END
GO
-- =============================================
-- Author:		Dibya Mani Suvedi
-- Create date: 05 Jan 2017
-- Description:	Updates the status to complete for trials and make it ready
-- EXEC [sp_TrialSrv_updateTrialToReady] '1,2,3'
-- =============================================
ALTER PROCEDURE [dbo].[sp_TrialSrv_updateTrialToReady] 
(
	@EZIDS NVARCHAR(MAX)
)AS BEGIN
	SET NOCOUNT ON;

	BEGIN TRAN;
	BEGIN TRY

		DECLARE @tbl TABLE(EZID INT);
		INSERT @tbl( EZID )
		SELECT* FROM STRING_SPLIT(@EZIDS, ',');

		UPDATE T1 SET
			T1.Completed = 1		
		FROM dbo.Trial T1
		JOIN @tbl T2 ON T2.EZID = T1.EZID
		COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
			
		DECLARE @ErrorMessage NVARCHAR(4000);  
		DECLARE @ErrorSeverity INT;  
		DECLARE @ErrorState INT;   
		SELECT   
			@ErrorMessage = ERROR_MESSAGE(),  
			@ErrorSeverity = ERROR_SEVERITY(),  
			@ErrorState = ERROR_STATE();  
  
		RAISERROR 
		(
			@ErrorMessage, -- Message text.  
			@ErrorSeverity, -- Severity.  
			@ErrorState -- State.  
        );  
	END CATCH
END




GO
/****** Object:  StoredProcedure [dbo].[sp_UserSrv_getUserRoleCrop]    Script Date: 2/3/2017 2:22:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[sp_UserSrv_getUserRoleCrop]') AND type in (N'P', N'PC'))
BEGIN
EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[sp_UserSrv_getUserRoleCrop] AS' 
END
GO


-- =============================================
-- Author:		Carla Buis
-- Create date: 13 June 2016
-- Description:	Returns the Roles combined with Crops to which a User has access
--              Note that in the database the term "Duty" is used instead of "Role".
-- =============================================
ALTER PROCEDURE [dbo].[sp_UserSrv_getUserRoleCrop]
	-- Parameters of the stored procedure:
       @UserID sysname  = NULL,
       @Crop   nchar(2) = '%'
AS

BEGIN
	SET NOCOUNT ON;

    Declare @DisplayMessage as bit = 0

    if (@UserID is NULL)
	begin
	    if (@DisplayMessage = 1) print N'UserID cannot be NULL.'
	    return(1)
    end

	begin

	-- Check if @UserID includes a domain name. This is required.contains a '\'.
	-- If @UserID does not contain a '\', then it does not have a domain name and an error message is returned.
	if patindex('%\%', @UserID) = 0
	begin
	    if (@DisplayMessage = 1) print N'UserID must be preceded by a domain.'
		return(1)
	end
	else
	    select DutyName as "Role",
		       CropCode
		from   UserDuty
		join   UserCrop on UserCrop.UserID = UserDuty.UserID
	    where  UserDuty.UserID   =    @UserID
	      and  UserCrop.CropCode like @Crop

		return(0)
    end
    
END




GO
