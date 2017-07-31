IF EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[crossings_overview2]'))
DROP VIEW [dbo].[crossings_overview2]
EXEC dbo.sp_executesql @statement = N'
CREATE view [dbo].[crossings_overview2] as

SELECT P1_Cr.[Ezid]

      ,P1_Cr.[Ezid1] Parent_1_EZID

      ,P1_Cr.[Ezid2] Parent_2_EZID

      ,P1_Cr.[Sex1] Parent_1_Sex

      ,P1_Cr.[Sex2] Parent_2_Sex

      ,P1_Cr.[Name]

      ,P1_Cr.[CropCode]

         , 0 AS [Level]

         , P1_E1.EntityTypeCode EntityTypeCode_P1

         , P1_E2.EntityTypeCode EntityTypeCode_P2

         , Parent_1_Name = Case P1_E1.EntityTypeCode WHEN ''BAT'' THEN (SELECT B.Name FROM dbo.Batch B where B.EZID = P1_Cr.[Ezid1])

                                             WHEN ''CRO'' THEN (SELECT C.Name FROM dbo.Crossing C WHERE C.Ezid = P1_Cr.[Ezid1])

                                             WHEN ''LOT'' THEN (SELECT L.Name FROM dbo.Lot L WHERE L.EZID = P1_Cr.[Ezid1])

                                             WHEN ''PLA'' THEN (SELECT P.Name FROM dbo.PlantOrPart P WHERE P.EZID = P1_Cr.[Ezid1])

                                             WHEN ''VAR'' THEN (SELECT V.VarietyName FROM dbo.Variety V WHERE V.EZID = P1_Cr.[Ezid1])
                                             
                                             WHEN ''TRL'' THEN (SELECT TE.Name FROM dbo.TrialEntry TE WHERE TE.EZID = P1_Cr.[Ezid1])
                                             
                                             WHEN ''TRI'' THEN (SELECT T.Name FROM dbo.Trial T WHERE T.EZID = P1_Cr.[Ezid1])

                           END

        , Parent_2_Name = Case P1_E2.EntityTypeCode WHEN ''BAT'' THEN (SELECT B.Name FROM dbo.Batch B where B.EZID = P1_Cr.[Ezid2])

                                                                 WHEN ''CRO'' THEN (SELECT C.Name FROM dbo.Crossing C WHERE C.Ezid = P1_Cr.[Ezid2])

                                                                 WHEN ''LOT'' THEN (SELECT L.Name FROM dbo.Lot L WHERE L.EZID = P1_Cr.[Ezid2])

                                                                 WHEN ''PLA'' THEN (SELECT P.Name FROM dbo.PlantOrPart P WHERE P.EZID = P1_Cr.[Ezid2])

                                                                 WHEN ''VAR'' THEN (SELECT V.VarietyName FROM dbo.Variety V WHERE V.EZID = P1_Cr.[Ezid2])
                                                                 
                                                                 WHEN ''TRL'' THEN (SELECT TE.Name FROM dbo.TrialEntry TE WHERE TE.EZID = P1_Cr.[Ezid1])
                                                                 
                                                                 WHEN ''TRI'' THEN (SELECT T.Name FROM dbo.Trial T WHERE T.EZID = P1_Cr.[Ezid1])

                           END

              , Parent_1_crossing = Case P1_E1.EntityTypeCode WHEN ''BAT'' THEN (select R1.EZID1 from Relationship R1 inner join Relationship R2 on R1.EZID2=R2.EZID1 where R2.EZID2 =  P1_Cr.[Ezid1] and R1.EntityTypeCode1 = ''CRO'')

                                             WHEN ''CRO'' THEN (SELECT P1_Cr.[Ezid1])

                                             WHEN ''LOT'' THEN (select R1.EZID1 from Relationship R1 where R1.EZID2 =  P1_Cr.[Ezid1] and R1.EntityTypeCode1 = ''CRO'')

                                            

                           END

              , Parent_2_crossing = Case P1_E2.EntityTypeCode WHEN ''BAT'' THEN (select R1.EZID1 from Relationship R1 inner join Relationship R2 on R1.EZID2=R2.EZID1 where R2.EZID2 =  P1_Cr.[Ezid2] and R1.EntityTypeCode1 = ''CRO'')

                                             WHEN ''CRO'' THEN (SELECT P1_Cr.[Ezid2])

                                             WHEN ''LOT'' THEN (select R1.EZID1 from Relationship R1 where R1.EZID2 =  P1_Cr.[Ezid2] and R1.EntityTypeCode1 = ''CRO'')

                           END

                       ,GenerationCode = (Select L.GenerationCode from Relationship R inner join Lot L on R.EZID2 = L.EZID Where R.EZID1 = P1_Cr.Ezid)

  FROM [dbo].[Crossing] P1_Cr inner join Entity P1_E1 on P1_Cr.Ezid1 = P1_E1.EZID

                           inner join Entity P1_E2 on P1_Cr.Ezid2 = P1_E2.EZID 

                                            inner join Relationship R on P1_Cr.Ezid = R.EZID1


'
GO


