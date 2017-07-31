IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[VwObservation4]'))
DROP VIEW [dbo].[VwObservation4]
--IF NOT EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[VwObservation4]'))
EXEC dbo.sp_executesql @statement = N'
CREATE VIEW [dbo].[VwObservation4]
(
  EZID, TraitID, ObsVal
)
AS
SELECT 
	O.EZID, 
	T.TraitID,
	ObsVal =  (CASE T.DataType
				WHEN ''C'' THEN O1.ObsValueChar
				WHEN ''D'' THEN FORMAT(O1.ObsValueDate, ''dd-MM-yyyy'', ''en-US'')
				WHEN ''A'' THEN CAST(O1.ObsValueDec AS NVARCHAR(10))
				WHEN ''I'' THEN CAST(O1.ObsValueInt AS NVARCHAR(10))
			END
			)   
FROM
(
	SELECT MAX(o1.observationID) ObservationID, O1.TraitID AS TraitID,O1.EZID FROM observation o1
	GROUP BY o1.EZID, O1.TraitID 
) AS O
JOIN Observation O1 on O1.ObservationID = O.ObservationID
JOIN dbo.Trait T ON O.TraitID = T.TraitID

' 
GO


