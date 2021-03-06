IF OBJECTPROPERTY(object_id('dbo.SP_ENTITY_INNSERSQL1'), N'IsProcedure') = 1
DROP PROCEDURE [dbo].[SP_ENTITY_INNSERSQL1]
GO
CREATE PROCEDURE [dbo].[SP_ENTITY_INNSERSQL1]
(
	@CropCode		NCHAR(2),
	@EZID			INT,
	@EntityTypeCode	CHAR(3),
	@fields			TVP_FIELDS READONLY,
	@filters		TVP_Filters	READONLY,
	@sorts			TVPSorting	READONLY,
	@Year			NVARCHAR(MAX),
	@PAGE_OFFSET	INT,
	@PageSize		INT,
	@SQL			NVARCHAR(MAX) OUTPUT,
	@TotalRows		INT OUTPUT
)
AS BEGIN
	DECLARE @TempTbl TABLE
	(
		FinalColumns NVARCHAR(MAX)
	);
	DECLARE @WHERE NVARCHAR(MAX),@WHERE1 NVARCHAR(MAX), @SORTCLAUSE NVARCHAR(MAX);
	
		DECLARE 
		@SQL1					NVARCHAR(MAX),
		--@P_DEF					NVARCHAR(1024),
		@TABLE_NAME				VARCHAR(30),
		@TraitIDS				NVARCHAR(MAX),
		@TraitColumns			NVARCHAR(MAX),
		@TraitColumnsForFilter	NVARCHAR(MAX),
		@PropColumns			NVARCHAR(MAX),
		@PropAndTraitColumns	NVARCHAR(MAX),
		--@TEMP_COLUMNS			NVARCHAR(MAX),
		@ERROR					NVARCHAR(255)--,
		--@WHERE			NVARCHAR(MAX); 
	SELECT @TABLE_NAME = QUOTENAME(TableName) FROM EntityType WHERE EntityTypeCode = @EntityTypeCode
	IF(ISNULL(@TABLE_NAME, '') = '') BEGIN
		SET @ERROR = 'Table ''' + @TABLE_NAME + ''' doesn''t exist in EntityType table.';
		RAISERROR(@ERROR, 16, 1);		
	END


	SET @WHERE = dbo.FN_ApplyFilters1(@filters,@fields);
	SET @WHERE1 = dbo.FN_ApplyFilters2(@filters,@fields);
	SET @SORTCLAUSE = dbo.FN_ApplySort1(@sorts,@fields);
	
	IF(ISNULL(@WHERE,'')='') BEGIN
			--commented by krishna for test on NOV-24-2016 Till end section and added same clause
			--SET @WHERE = 'WHERE CropCode = '''+@Cropcode+'';
			--SET @WHERE1 = 'WHERE CropCode = '''+@Cropcode+'';
			--IF(@TABLE_NAME ='[Trial]' AND ISNULL(@Year,'')<>'')
			--	BEGIN
			--		SET @WHERE = @WHERE + ' AND [Year] IN (' + @Year +')';
			--		SET @WHERE1 = @WHERE1 + ' AND [Year] IN (' + @Year +')';
			--	END
			SET @WHERE = 'WHERE CropCode = '''+@Cropcode+'''';
			SET @WHERE1 = 'WHERE CropCode = '''+@Cropcode+'''';
			IF(@TABLE_NAME ='[Trial]' AND ISNULL(@Year,'')<>'')
				BEGIN
					SET @WHERE = @WHERE + ' AND [Year] IN (' + @Year +')';
					SET @WHERE1 = @WHERE1 + ' AND [Year] IN (' + @Year +')';
				END
	END	
	ELSE BEGIN
		SET @WHERE = N'WHERE CropCode = '''+@Cropcode+''' AND
							'+@WHERE;
		SET @WHERE1 = N'WHERE CropCode = '''+@Cropcode+''' AND
							'+@WHERE1;
		IF(@TABLE_NAME ='[Trial]' AND ISNULL(@Year,'')<>'')BEGIN
				SET @WHERE = @WHERE + ' AND [Year] IN (' + @Year +')';
				SET @WHERE1 = @WHERE1 + ' AND [Year] IN (' + @Year +')';
		END
	END;
	
	--this is to Normal Trait types columns 
	SELECT --DISTINCT
		@TraitColumns =CONCAT( COALESCE(@TraitColumns + ',',''), QUOTENAME(T.TraitID)),
		@TraitIDS = CONCAT( COALESCE(@TraitIDS + ',',''),T.TraitID)
	--FROM @sorts S 
	FROM (SELECT DISTINCT columnName FROM @sorts) AS S
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = S.columnName
	WHERE T.Property = 0 AND S.columnName NOT IN (SELECT F.FieldName FROM @filters F);
	
	SELECT --DISTINCT
		@TraitColumns = CONCAT( COALESCE(@TraitColumns + ',',''), QUOTENAME(TraitID)),
		@TraitIDS = CONCAT( COALESCE(@TraitIDS + ',',''),T.TraitID)
	--FROM @filters F 	
	FROM (SELECT DISTINCT FieldName FROM @filters) AS F 
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = F.FieldName
	WHERE T.Property = 0;
	
	--this is for Complex property
	SELECT --DISTINCT
		@TraitColumns =CONCAT( COALESCE(@TraitColumns + ',',''), QUOTENAME(T.TraitID)),
		@TraitIDS = CONCAT( COALESCE(@TraitIDS + ',',''),T.TraitID)
	--FROM @sorts S 
	FROM (SELECT DISTINCT columnName FROM @sorts) AS S
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = S.columnName
	JOIN PropertyOfEntity POE on CAST(POE.TraitID AS NVARCHAR) = S.columnName
	WHERE
	T.Property = 1 
	AND S.columnName NOT IN (SELECT F.FieldName FROM @filters F)
	AND (POE.TableField IS NULL OR POE.TableField ='');
	
	SELECT --DISTINCT
		@TraitColumns = CONCAT( COALESCE(@TraitColumns + ',',''), QUOTENAME(T.TraitID)),
		@TraitIDS = CONCAT( COALESCE(@TraitIDS + ',',''),T.TraitID)
	FROM (SELECT DISTINCT FieldName FROM @filters) AS F
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = F.FieldName
	JOIN PropertyOfEntity POE on CAST(POE.TraitID AS NVARCHAR) = F.FieldName
	WHERE
	T.Property = 1
	AND (POE.TableField IS NULL OR POE.TableField ='');

	--this is used to fetch only traits that are involved for filtering on where, to remove pivoting on count
	SELECT --DISTINCT
		@TraitColumnsForFilter = CONCAT( COALESCE(@TraitColumns + ',',''), QUOTENAME(TraitID))
	FROM (SELECT DISTINCT FieldName FROM @filters) AS F 
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = F.FieldName
	WHERE T.Property = 0;

	SELECT --DISTINCT
		@TraitColumnsForFilter = CONCAT( COALESCE(@TraitColumns + ',',''), QUOTENAME(T.TraitID))
	FROM (SELECT DISTINCT FieldName FROM @filters) AS F
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = F.FieldName
	JOIN PropertyOfEntity POE on CAST(POE.TraitID AS NVARCHAR) = F.FieldName
	WHERE
	T.Property = 1
	AND (POE.TableField IS NULL OR POE.TableField ='');



	--This is to fetch Proerty columns
	SELECT 
		@PropColumns =CONCAT( COALESCE(@PropColumns + ',',''), QUOTENAME(T.TraitID)) 
	FROM @sorts S 
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = S.columnName
	JOIN PropertyOfEntity POE ON POE.TraitID = T.TraitID
	WHERE
	T.Property = 1 And S.columnName NOT IN (select F.FieldName FROM @filters F)
	AND (POE.TableField IS NOT NULL OR POE.TableField <>'');

	SELECT 
		@PropColumns = CONCAT( COALESCE(@PropColumns + ',',''), QUOTENAME(T.TraitID)) 
	FROM @filters F 
	JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = F.FieldName
	JOIN PropertyOfEntity POE ON POE.TraitID = T.TraitID
	WHERE
	T.Property = 1
	AND (POE.TableField IS NOT NULL OR POE.TableField <>'');

	--this if for first columns which are not in trait
	SELECT @PropColumns =CONCAT( COALESCE(@PropColumns + ',',''), QUOTENAME(S.columnName)) FROM @sorts S WHERE ISNUMERIC(S.columnName) = 0 And S.columnName NOT IN (select F.FieldName FROM @filters F);
	SELECT @PropColumns = CONCAT( COALESCE(@PropColumns + ',',''), QUOTENAME(F.FieldName)) FROM @filters F WHERE ISNUMERIC(F.FieldName) = 0;
	--this is future implementation of complex property column
	--SELECT @PropColumns =CONCAT( COALESCE(@PropColumns + ',',''), QUOTENAME(TraitID)) FROM @sorts S JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = S.columnName
	--WHERE T.Property = 1; 
	--SELECT @PropColumns = CONCAT( COALESCE(@PropColumns + ',',''), QUOTENAME(TraitID)) FROM @filters F JOIN Trait T ON CAST(T.TraitID AS NVARCHAR) = F.FieldName
	--WHERE T.Property = 1;



	if(ISNULL(@PropColumns,'')<>'')
	BEGIN
		SET @PropAndTraitColumns = COALESCE(@PropAndTraitColumns+',','')+@PropColumns;
	END;
	IF(ISNULL(@TraitColumns,'')<>'')
	BEGIN
		SET @PropAndTraitColumns = COALESCE(@PropAndTraitColumns+',','')+@TraitColumns;
	END

	IF(ISNULL(@SORTCLAUSE,'')='')
		BEGIN
			SET @SORTCLAUSE = dbo.FN_ApplySort(@sorts,@fields);
		END

	SET @SQL = N'
	E.EZID IN
	(
		SELECT B.EZID
		---FROM '+@TABLE_NAME+ N' B
		FROM (SELECT * FROM '+@TABLE_NAME+ N') B
		
		'
		


		
	IF(ISNULL(@TraitColumns,'')<>'')
	BEGIN
		SET @SQL = @SQL + '
			LEFT JOIN 
			(
				SELECT PT1.EZID AS EZID1,'+@TraitColumns+ N'
					FROM 
						(
							SELECT * FROM --VwObservation4 T
							(
								SELECT 
										O.EZID, 
										O.TraitID,
										ObsVal =  (CASE T.DataType 
														WHEN ''C'' THEN O1.ObsValueChar
														WHEN ''D'' THEN FORMAT(O1.ObsValueDate, ''dd-MM-yyyy'', ''en-US'')
														WHEN ''A'' THEN CAST(O1.ObsValueDec AS NVARCHAR(10))
														WHEN ''I'' THEN CAST(O1.ObsValueInt AS NVARCHAR(10))
													END
													)   
												FROM --dbo.Observation O 
												(
													SELECT MAX(o1.observationID) ObservationID, O1.TraitID AS TraitID,O1.EZID FROM observation o1
													WHERE O1.TraitID IN ( '+@TraitIDS+ N')
													GROUP BY o1.EZID, O1.TraitID 
												) AS O
												JOIN Observation O1 on O1.ObservationID = O.ObservationID
												JOIN dbo.Trait T ON O.TraitID = T.TraitID
								) T								
						) PivotTable 
						Pivot 
						(
							Max(ObsVal) FOR TraitID IN ( '+@TraitColumns+ N')
						) AS PT1
			) AS Table2 ON Table2.EZID1 = B.EZID
			 
			'+@WHERE1+ N'
			'+@SORTCLAUSE+N'
			OFFSET '+CAST(@PAGE_OFFSET AS VARCHAR)+' ROWS
			FETCH NEXT '+CAST(@PageSize AS VARCHAR)+' ROWS ONLY';

			--SET @SQL1 = N'
			--SELECT @TotalRows = COUNT(DISTINCT T1.EZID)
			--	--FROM '+@TABLE_NAME+ N' T1 
			--	FROM (SELECT TOP 50000 * FROM '+@TABLE_NAME+ N') T1
			--		LEFT JOIN 
			--		(
			--			SELECT PT1.EZID AS EZID1,'+@TraitColumns+ '
			--				FROM 
			--				(
			--					SELECT * FROM VwObservation4 T
			--						WHERE T.TraitID in ( '+@TraitIDS+ ' )
			--				) PivotTable 
			--				Pivot 
			--				(
			--					Max(ObsVal) FOR TraitID IN ( '+@TraitColumns+ ' )
			--				) AS PT1
			--		) AS Table2 ON Table2.EZID1 = T1.EZID 
								 
			-- '+@WHERE1;
			--EXEC sp_executesql @SQL1, N' @TotalRows INT OUTPUT', @TotalRows = @TotalRows OUTPUT;
	END;

	ELSE IF(ISNULL(@PropColumns,'')<>'')
	BEGIN
		SET @SQL = @SQL +'
		 '+@WHERE+ '
		 '+@SORTCLAUSE+ N'
		 OFFSET '+CAST(@PAGE_OFFSET AS VARCHAR)+' ROWS
		FETCH NEXT '+CAST(@PageSize AS VARCHAR)+' ROWS ONLY';

		 --SET @SQL1 = N'
			--SELECT @TotalRows = COUNT(DISTINCT T1.EZID)
			--	--FROM ' + @TABLE_NAME + ' T1	
			--	FROM (SELECT TOP 50000 EZID FROM ' + @TABLE_NAME + ' '+@WHERE + ' ) T1												 
			-- ';
			--EXEC sp_executesql @SQL1, N' @TotalRows INT OUTPUT ', @TotalRows = @TotalRows OUTPUT;			
	END;

	--this is for count of total records
	IF(ISNULL(@TraitColumnsForFilter ,'')<>'')
	BEGIN
		SET @SQL1 = N'
			SELECT @TotalRows = COUNT(DISTINCT T1.EZID)
				--FROM '+@TABLE_NAME+ N' T1 
			FROM (SELECT  * FROM '+@TABLE_NAME+ N') T1
			LEFT JOIN 
			(
				SELECT PT1.EZID AS EZID1,'+@TraitColumns+ '
				FROM 
				(
					SELECT * FROM VwObservation4 T
					WHERE T.TraitID in ( '+@TraitIDS+ ' )
				) PivotTable 
				Pivot 
				(
					Max(ObsVal) FOR TraitID IN ( '+@TraitColumns+ ' )
				) AS PT1
			) AS Table2 ON Table2.EZID1 = T1.EZID 
								 
			 '+@WHERE1;
			EXEC sp_executesql @SQL1, N' @TotalRows INT OUTPUT', @TotalRows = @TotalRows OUTPUT;
		END

		ELSE
		BEGIN
			SET @SQL1 = N'
				SELECT @TotalRows = COUNT(DISTINCT T1.EZID)
				--FROM ' + @TABLE_NAME + ' T1	
				FROM 
				(
					SELECT  EZID FROM ' + @TABLE_NAME + ' 
					'+@WHERE + ' 
				) T1 ';
			EXEC sp_executesql @SQL1, N' @TotalRows INT OUTPUT ', @TotalRows = @TotalRows OUTPUT;	
		END
	PRINT 'Count';
	PRINT @sql1;	
END;
