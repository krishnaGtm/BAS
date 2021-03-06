
/********************************************************************************************
Author:			Dibya Mani Suvedi
Created Date:	2016-06-29
Description:	Gets data from Entities and Observations based on the selected fieldsets.

Example
EXEC SP_Crossing_GetHierarcialData 1146000
EXEC SP_Crossing_GetHierarcialData 641405
EXEC SP_Crossing_GetHierarcialData 1146004
EXEC SP_Crossing_GetHierarcialData 641416
EXEC SP_Crossing_GetHierarcialData 954495
EXEC SP_Crossing_GetHierarcialData 641431
EXEC SP_Crossing_GetHierarcialData 1147118
EXEC SP_Crossing_GetHierarcialData 1147111
EXEC SP_Crossing_GetHierarcialData 641413
*********************************************************************************************/
IF OBJECTPROPERTY(object_id('dbo.SP_Crossing_GetHierarcialData'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_Crossing_GetHierarcialData]
GO

CREATE PROCEDURE [dbo].[SP_Crossing_GetHierarcialData]
(
	@EZID INT
)
AS BEGIN
SET NOCOUNT ON;
	DECLARE @table1 Table
	(
		EZID	INT,
		Name	NVARCHAR(MAX),
		Parent1 INT,
		parent2 INT,
		Parent1_C INT,
		Parent2_C INT,
		Parent1_Name NVARCHAR(MAX),
		Parent2_Name NVARCHAR(MAX),
		[level]	INT,
		GenerationCode NVARCHAR(10)
	);
	
	DECLARE @isEZIDCrossing BIT = 0;
	DECLARE @EZIDCrossing NVARCHAR(MAX), @SQL NVARCHAR(MAX), @Level INT =0;

	--check whether EZID is crossing or other
	SELECT @isEZIDCrossing = 1 FROM Crossing WHERE Ezid = @EZID;
	
	IF(@isEZIDCrossing = 1)	BEGIN
		SET @EZIDCrossing = @EZID;
		SET @Level = 0;
	END;
	ELSE BEGIN
		SELECT @EZIDCrossing = COALESCE(@EZIDCrossing + ',', '') +CAST( Ezid AS NVARCHAR) FROM Crossing WHERE Ezid1 = @EZID OR Ezid2 = @EZID;
		SET @Level = 1;
	END;


SET @SQL = N'
;WITH my_crossings (GenerationCode, Ezid, Parent_1_EZID, Parent_2_EZID, Name, Parent_1_Name, Parent_2_Name, Parent_1_crossing, Parent_2_crossing, [Level] )
AS (
       SELECT P1_Cr.GenerationCode  ,P1_Cr.Ezid, P1_Cr.Parent_1_EZID, P1_Cr.Parent_2_EZID, P1_Cr.Name,  P1_Cr.Parent_1_Name, P1_Cr.Parent_2_Name, P1_Cr.Parent_1_crossing, P1_Cr.Parent_2_crossing

         , '+CAST(@Level AS nvarchar)+' AS [Level]

       FROM crossings_overview2 P1_Cr            

       where P1_Cr.EzID in( '+@EZIDCrossing+' )

       union all
       Select P2_Cr.GenerationCode  ,P2_Cr.Ezid, P2_Cr.Parent_1_EZID, P2_Cr.Parent_2_EZID, P2_Cr.Name, P2_Cr.Parent_1_Name, P2_Cr.Parent_2_Name, P2_Cr.Parent_1_crossing, P2_Cr.Parent_2_crossing

       , mc.Level+1

       from crossings_overview2 P2_Cr inner join my_crossings AS mc on mc.Ezid = P2_Cr.Parent_1_crossing or mc.Ezid = P2_Cr.Parent_2_crossing
)
select Ezid,GenerationCode,[Level],Name,Parent_1_EZID,Parent_1_crossing,Parent_1_Name,Parent_2_EZID,Parent_2_crossing,Parent_2_Name FROM my_crossings;';

INSERT INTO @table1 (EZID,GenerationCode,[level],Name,Parent1,Parent1_C,Parent1_Name,parent2,Parent2_C,Parent2_Name) EXEC SP_executesql @SQL;

IF(@Level = 1) BEGIN
	UPDATE @table1 SET Parent1_C = Parent1 , Parent2_C = parent2 WHERE [Level] = 1
END
ELSE BEGIN
	UPDATE @table1 SET Parent1_C = Parent1 , Parent2_C = parent2 WHERE [Level] = 0
END

UPDATE @table1 SET Parent1_C = Parent1 WHERE Parent1_C IS NULL AND [level] > 0;
UPDATE @table1 SET Parent2_C = Parent2 WHERE Parent2_C IS NULL AND [level] > 0;

INSERT INTO @table1 (EZID, Name, [level])
	SELECT Parent1_C,Parent1_Name, [level] -1 FROM @table1 T1 WHERE T1.Parent1_C NOT IN (SELECT distinct T2.EZID FROM @table1 T2);


INSERT INTO @table1 (EZID, Name, [level])
	SELECT Parent2_C,Parent2_Name, [level] -1 FROM @table1 T1 WHERE T1.Parent2_C NOT IN (SELECT distinct T2.EZID FROM @table1 T2);
	
;WITH CTE 
AS(
	SELECT EZID,Name,Parent1,Parent2,[level], RN = ROW_NUMBER() OVER (PARTITION BY EZID ORDER BY EZID)
FROM @table1)
DELETE FROM CTE WHERE RN> 1;

DECLARE @COUNT INT;
SET @COUNT = 1;
WHILE(@COUNT > 0) BEGIN
	UPDATE T SET T.[level] = T1.[level] +1 FROM @table1 T
	JOIN @table1 T1 ON T.Parent1_C = T1.EZID AND T.[level] <= T1.[level];
	SET @COUNT = @@ROWCOUNT;
	
END
SET @COUNT = 1;
WHILE(@COUNT > 0) BEGIN
	UPDATE T SET T.[level] = T1.[level] +1 FROM @table1 T
	JOIN @table1 T1 ON T1.EZID = T.Parent2_C AND T.[level] <= T1.[level];
	SET @COUNT = @@ROWCOUNT;
END
SELECT EZID,Name, Parent1_C AS Parent1, Parent2_C AS Parent2, [level],GenerationCode FROM @table1 order by [level]
--for json path;

END;

SET NOCOUNT ON;
