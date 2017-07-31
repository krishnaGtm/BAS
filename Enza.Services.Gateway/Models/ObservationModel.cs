using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.Common.Args;
using Enza.Common.Extensions;
using Enza.Discovery.Entities;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;
using Enza.Gateway.Entities.BDTOs.Args;
using Enza.Lots.Entities.BDTOs.Args;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;
using Enza.Observations.Entities.BDTOs.Args;
using Enza.Plants.Entities.BDTOs.Args;
using Enza.Services.API.Batches;
using Enza.Services.API.Discovery;
using Enza.Services.API.Entities;
using Enza.Services.API.Lots;
using Enza.Services.API.Masters;
using Enza.Services.API.Observations;
using Enza.Services.API.Plants;
using Enza.Trial.Entities.BDTOs.Args;
using Enza.Crossing.Entities.BDTOs.Args;
using Enza.Services.API.Crossings;
using Enza.Services.API.Trial;
using Newtonsoft.Json;

namespace Enza.Services.Gateway.Models
{
    /// <summary>
    /// Model for getting data from different micro services and aggregate data
    /// </summary>
    public class ObservationModel
    {
        /// <summary>
        /// Returns list of errors
        /// </summary>
        public List<string> Errors { get; } = new List<string>();

        /// <summary>
        /// Get data from different micro services and aggregate/merge and provide final data to client.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public async Task<Dictionary<string, object>> GetObservationDataAsync(GatewayRequestArgs args)
        {
            //get the list of all services and filter for required services
            var discoveryAPI = new DiscoveryAPI();
            var services = await discoveryAPI.GetServicesAsync();

            var observationService = services.FirstOrDefault(o => o.Name == MicroServices.OBSERVATIONS);
            if (args.GetFilters().Rows.Count > 0 || args.GetSorts().Rows.Count > 0)
            {
                #region Data with Sorting and Filtering

                var observationArgs = new ObservationRequestArgs
                {
                    //CGID = args.CGID,
                    CC = args.CC,
                    ETC = args.ETC,
                    EZID = args.EZID,
                    EZIDS = args.EZIDs.ToText().Replace("|", ","),
                    Level = args.Level,
                    TFSID = args.TFSID,
                    PFSID = args.PFSID,
                    TCOLS = args.TCOLS,
                    PCOLS = args.PCOLS,
                    Year = args.Year,
                    F = args.F,
                    PN = args.PN,
                    PS = args.PS,
                    SC = args.SC,
                    SO = args.SO,
                    S = args.S,
                    Total = args.Total
                };
                var data = await GetDataForObservations(observationService?.Url, observationArgs);
                //Fetch EZIDS for getting child columns count
                var finaldata = JsonConvert.DeserializeObject<DataTable>(data["FinalData"].ToString());
                if (!finaldata.Columns.Contains("ChildRows"))
                {
                    //var EZIDS = string.Join(",", finaldata.AsEnumerable().Select(row => row.Field<int>("EZID")));
                    var EZIDS = string.Join(",", finaldata.AsEnumerable().Select(x => x["EZID"].ToString()));

                    var relationService = services.FirstOrDefault(o => o.Name == MicroServices.ENTITIES);
                    var relations = await GetDataForRelationWithCountAsync(relationService?.Url, new RelationRequestArgs
                    {
                        EZIDS = EZIDS
                    });
                    finaldata = finaldata.Join(relations, new[] {"EZID"});
                    data["FinalData"] = finaldata;
                    //Get Initial Fields
                    var initialFields = GetInitialColumns();
                    data.Add("InitialFields", initialFields);
                }

                //Get fields details
                var masterService = services.FirstOrDefault(o => o.Name == MicroServices.MASTERS);
                var fields = await GetColumnDetailsAsync(masterService?.Url, new TraitRequestArgs
                {
                    TFSID = args.TFSID,
                    PFSID = args.PFSID,
                    TCOLS = args.TCOLS,
                    PCOLS = args.PCOLS
                });
                data.Add("Fields", fields);
                return data;

                #endregion
            }
            else
            {
                #region Initial Data withouth Sorting and Filtering

                var data = new Dictionary<string, object>();
                if (((!string.IsNullOrWhiteSpace(args.EZIDs) && !string.IsNullOrWhiteSpace(args.ETCS)) &&
                     (args.PFSID != null || !string.IsNullOrWhiteSpace(args.PCOLS)) &&
                     (args.TFSID == null && string.IsNullOrWhiteSpace(args.TCOLS))))
                {
                    var propertyData = await GetPropertyFieldDataAsync(services, args);
                    data.Add("PropertyData", propertyData);
                }
                else
                {
                    var observations = await GetDataForObservations(observationService?.Url, new ObservationRequestArgs
                    {
                        //CGID = args.CGID,
                        CC = args.CC,
                        ETC = args.ETC,
                        ETCS = args.ETCS,
                        EZID = args.EZID,
                        EZIDS = args.EZIDs.ToText().Replace("|", ","),
                        Level = args.Level,
                        TFSID = args.TFSID,
                        PFSID = args.PFSID,
                        TCOLS = args.TCOLS,
                        PCOLS = args.PCOLS,
                        F = args.F,
                        PN = args.PN,
                        PS = args.PS,
                        SC = args.SC,
                        SO = args.SO,
                        Year = args.Year,
                        S = args.S
                    });

                    data = observations;
                    //Get PropertyFieldSet data
                    if ((!string.IsNullOrWhiteSpace(args.PCOLS) || args.PFSID != null) &&
                        (string.IsNullOrWhiteSpace(args.EZIDs) && string.IsNullOrWhiteSpace(args.ETCS)))
                    {
                        var initialData = data["InitialData"] as Newtonsoft.Json.Linq.JArray;
                        var groups = initialData.Select(o => o.ToObject<Enza.Gateway.Entities.BDTOs.EntityItem>())
                            .GroupBy(g => g.EntityTypeCode)
                            .Select(o => new
                            {
                                ETC = o.Key,
                                EZIDS = string.Join(",", o.Select(x => x.EZID).ToArray())
                            }).ToList();

                        var etcs = string.Join("|", groups.Select(o => o.ETC).ToArray());
                        var ezids = string.Join("|", groups.Select(o => o.EZIDS).ToArray());
                        var gatewayRequestArgs = args.CloneAs<GatewayRequestArgs>();
                        gatewayRequestArgs.ETCS = etcs;
                        gatewayRequestArgs.EZIDs = ezids;

                        var propertyData = await GetPropertyFieldDataAsync(services, gatewayRequestArgs);
                        data.Add("PropertyData", propertyData);
                    }
                    else if (!string.IsNullOrWhiteSpace(args.EZIDs) && !string.IsNullOrWhiteSpace(args.ETCS))
                    {
                        var propertyData = await GetPropertyFieldDataAsync(services, args);
                        data.Add("PropertyData", propertyData);
                    }
                    else if (args.EZID != null && !string.IsNullOrWhiteSpace(args.ETC) &&
                             (args.PFSID != null || !string.IsNullOrWhiteSpace(args.PCOLS)))
                    {
                        //get ezids and etcs based on pfisd and pcols
                        //Get child records for property fieldsets data.
                        var relationService = services.FirstOrDefault(o => o.Name == MicroServices.ENTITIES);
                        var relations = await GetDataForRelationAsync(relationService?.Url, new RelationRequestArgs
                        {
                            EZID = args.EZID.Value,
                            ETC = args.ETC
                        });
                        var groups = relations.GroupBy(g => g.EntityTypeCode)
                            .Select(o => new
                            {
                                ETC = o.Key,
                                EZIDS = string.Join(",", o.Select(x => x.EZID).ToArray())
                            }).ToList();

                        var etcs = string.Join("|", groups.Select(o => o.ETC).ToArray());
                        var ezids = string.Join("|", groups.Select(o => o.EZIDS).ToArray());

                        var gatewayRequestArgs = args.CloneAs<GatewayRequestArgs>();
                        gatewayRequestArgs.ETCS = etcs;
                        gatewayRequestArgs.EZIDs = ezids;

                        var propertyData = await GetPropertyFieldDataAsync(services, gatewayRequestArgs);
                        data.Add("PropertyData", propertyData);
                    }
                }

                var initialFields = GetInitialColumns();
                data.Add("InitialFields", initialFields);

                //Get fields details
                var masterService = services.FirstOrDefault(o => o.Name == MicroServices.MASTERS);
                var fields = await GetColumnDetailsAsync(masterService?.Url, new TraitRequestArgs
                {
                    TFSID = args.TFSID,
                    PFSID = args.PFSID,
                    TCOLS = args.TCOLS,
                    PCOLS = args.PCOLS
                });
                data.Add("Fields", fields);

                return data;

                #endregion
            }
        }

        private async Task<DataTable> GetPropertyFieldDataAsync(List<ServiceSetting> allServices,
            GatewayRequestArgs args)
        {
            DataTable result;
            string error;
            var ezIDs = ParseEZIDs(args, out error);
            if (!string.IsNullOrWhiteSpace(error))
            {
                throw new Exception(error);
            }

            var services = allServices.Where(o => ezIDs.Keys.Contains(o.Code)).ToList();
            var ds = new DataSet();

            #region Get data from different MicroServices

            foreach (var ezID in ezIDs)
            {
                //get services url based on entitytypecode.
                var service = services.FirstOrDefault(o => o.Code == ezID.Key);
                if (service == null)
                    continue;

                switch (service.Name)
                {
                    case MicroServices.BATCHES:
                        try
                        {
                            var batchArgs = new BatchRequestArgs
                            {
                                PFSID = args.PFSID,
                                ETC = ezID.Key,
                                EZIDS = ezID.Value,
                                PCOLS = args.PCOLS
                            };
                            var batches = await GetDataForBatchesAsync(service.Url, batchArgs);
                            if (batches != null && batches.Rows.Count > 0)
                                ds.Tables.Add(batches);
                        }
                        catch (Exception ex)
                        {
                            this.LogError(ex);

                            Errors.Add(ex.Message);
                        }
                        break;
                    case MicroServices.PLANTS:
                        try
                        {
                            var plantArgs = new PlantRequestArgs
                            {
                                PFSID = args.PFSID,
                                ETC = ezID.Key,
                                EZIDS = ezID.Value,
                                PCOLS = args.PCOLS
                            };
                            var plants = await GetDataForPlantsAsync(service.Url, plantArgs);
                            if (plants != null && plants.Rows.Count > 0)
                                ds.Tables.Add(plants);
                        }
                        catch (Exception ex)
                        {
                            this.LogError(ex);
                            Errors.Add(ex.Message);
                        }
                        break;
                    case MicroServices.LOTS:
                        try
                        {
                            var lotArgs = new LotRequestArgs
                            {
                                PFSID = args.PFSID,
                                ETC = ezID.Key,
                                EZIDS = ezID.Value,
                                PCOLS = args.PCOLS
                            };
                            var lots = await GetDataForLotsAsync(service.Url, lotArgs);
                            if (lots != null && lots.Rows.Count > 0)
                                ds.Tables.Add(lots);
                        }
                        catch (Exception ex)
                        {
                            this.LogError(ex);
                            Errors.Add(ex.Message);
                        }
                        break;
                    case MicroServices.TRIALS:
                    case MicroServices.TRIAL_ENTRIES:
                        try
                        {
                            var trialArgs = new TrialRequestArgs
                            {
                                PFSID = args.PFSID,
                                ETC = ezID.Key,
                                EZIDS = ezID.Value,
                                PCOLS = args.PCOLS
                            };
                            var trials = await GetDataForTrialsAsync(service.Url, trialArgs);
                            if (trials != null && trials.Rows.Count > 0)
                                ds.Tables.Add(trials);
                        }
                        catch (Exception ex)
                        {
                            this.LogError(ex);
                            Errors.Add(ex.Message);
                        }
                        break;
                    case MicroServices.CROSSINGS:
                        try
                        {
                            var crossingArgs = new CrossingRequestArgs
                            {
                                PFSID = args.PFSID,
                                ETC = ezID.Key,
                                EZIDS = ezID.Value,
                                PCOLS = args.PCOLS
                            };
                            var trials = await GetDataForCrossingsAsync(service.Url, crossingArgs);
                            if (trials != null && trials.Rows.Count > 0)
                                ds.Tables.Add(trials);
                        }
                        catch (Exception ex)
                        {
                            this.LogError(ex);
                            Errors.Add(ex.Message);
                        }
                        break;
                    case MicroServices.GROUPS:
                        break;
                }
            }

            #endregion

            #region Load and Merge tables

            if (ds.Tables.Count <= 0)
            {
                return null;
            }

            if (ds.Tables.Count > 1)
            {
                //Merge all tables
                var table1 = ds.Tables[0];
                var table2 = ds.Tables[1];

                var keys = new[] {"EZID"};
                var rs = table1.Join(table2, keys);
                if (ds.Tables.Count > 2)
                {
                    for (var i = 2; i < ds.Tables.Count; i++)
                    {
                        rs = rs.Join(ds.Tables[i], keys);
                    }
                }
                result = rs;
            }
            else
            {
                result = ds.Tables[0];
            }

            #endregion

            return result;
        }

        private Dictionary<string, string> ParseEZIDs(GatewayRequestArgs args, out string error)
        {
            error = string.Empty;
            if (string.IsNullOrWhiteSpace(args.ETCS))
            {
                error = "EntityTypeCodes are blank.";
                return null;
            }
            if (string.IsNullOrWhiteSpace(args.EZIDs))
            {
                error = "EZIDS are blank.";
                return null;
            }

            var etcs = args.ETCS.Split('|');
            var ezids = args.EZIDs.Split('|');
            if (etcs.Length != ezids.Length)
            {
                error = "EZIDS and EntityTypeCodes don't match.";
                return null;
            }

            var items = etcs.Select((o, i) => new
            {
                EntityTypeCode = o,
                EZIDs = ezids[i]
            }).ToDictionary(key => key.EntityTypeCode, value => value.EZIDs);

            return items;
        }

        private async Task<DataTable> GetDataForBatchesAsync(string url, BatchRequestArgs args)
        {
            using (var batchesAPI = new BatchesAPI(url))
            {
                var data = await batchesAPI.GetDataForBatchesAsync(args);
                if (data != null)
                {
                    data.TableName = "BATCH";
                    return data;
                }
            }
            return null;
        }

        private async Task<DataTable> GetDataForPlantsAsync(string url, PlantRequestArgs args)
        {
            using (var plantsAPI = new PlantsAPI(url))
            {
                var data = await plantsAPI.GetDataForPlantsAsync(args);
                if (data != null)
                {
                    data.TableName = "PLANT";
                    return data;
                }
            }
            return null;
        }

        private async Task<DataTable> GetDataForLotsAsync(string url, LotRequestArgs args)
        {
            using (var lotsAPI = new LotsAPI(url))
            {
                var data = await lotsAPI.GetDataForLotsAsync(args);
                if (data != null)
                {
                    data.TableName = "LOTS";
                    return data;
                }
            }
            return null;
        }

        private async Task<DataTable> GetDataForTrialsAsync(string url, TrialRequestArgs args)
        {
            using (var trialAPI = new TrialAPI(url))
            {
                var data = await trialAPI.GetDataForTrialsAsync(args);
                if (data != null)
                {
                    data.TableName = "TRIALS";
                    return data;
                }
            }
            return null;
        }

        private async Task<DataTable> GetDataForCrossingsAsync(string url, CrossingRequestArgs args)
        {
            using (var crossingAPI = new CrossingAPI(url))
            {
                var data = await crossingAPI.GetDataForCrossingAsync(args);
                if (data != null)
                {
                    data.TableName = "CROSSINGS";
                    return data;
                }
            }
            return null;
        }

        private async Task<List<Entity>> GetDataForRelationAsync(string url, RelationRequestArgs args)
        {
            using (var entitiesAPI = new EntitiesAPI(url))
            {
                return await entitiesAPI.GetDataForRelationshipAsync(args);
            }
        }

        private async Task<DataTable> GetDataForRelationWithCountAsync(string url, RelationRequestArgs args)
        {
            using (var entitiesAPI = new EntitiesAPI(url))
            {
                return await entitiesAPI.GetDataForRelationWithCountAsync(args);
            }
        }

        private async Task<Dictionary<string, object>> GetDataForObservations(string url, ObservationRequestArgs args)
        {
            using (var observationsAPI = new ObservationsAPI(url))
            {
                return await observationsAPI.GetDataForObservationsAsync(args);
            }
        }

        private async Task<List<Trait>> GetColumnDetailsAsync(string url, TraitRequestArgs args)
        {
            using (var masterAPI = new MastersAPI(url))
            {
                return await masterAPI.GetColumnsAsync(args);
            }
        }

        private List<Trait> GetInitialColumns()
        {
            var columns = new List<Trait>
            {
                new Trait
                {
                    ColumnLabel = "EZID",
                    DataType = "INT"
                },
                new Trait
                {
                    ColumnLabel = "EntityTypeCode",
                    DataType = "ST"
                },
                new Trait
                {
                    ColumnLabel = "Name",
                    DataType = "ST"
                }
            };
            return columns;
        }


        #region Search Functionality

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public async Task<Dictionary<string, object>> GetObservationDataV2Async(GatewayRequestArgs args)
        {
            var dt1 = new DataTable("BAT");
            var dt2 = new DataTable("Observation");
            DataTable rs = null, dt = null, result = null;
            var pageNum = 1;
            try
            {
                var discoveryAPI = new DiscoveryAPI();
                var services = await discoveryAPI.GetServicesAsync();
                var fields = new List<Trait>();

                #region Field Information

                //Get field information only if any trait information is found in arguements.
                var traits = new[] {args.PFSID.ToString(), args.TFSID.ToString(), args.PCOLS, args.TCOLS};
                if (traits.Any(o => !string.IsNullOrWhiteSpace(o)))
                {
                    var masterService = services.FirstOrDefault(o => o.Name == MicroServices.MASTERS);
                    fields = await GetColumnDetailsAsync(masterService?.Url, new TraitRequestArgs
                    {
                        TFSID = args.TFSID,
                        PFSID = args.PFSID,
                        TCOLS = args.TCOLS,
                        PCOLS = args.PCOLS
                    });
                }

                #endregion

                #region Entity Data

                var pfsIDs = fields.Where(o => o.Property && !string.IsNullOrWhiteSpace(o.ColumnLabel))
                    .Select(o => o.TraitID)
                    .ToList();
                //Get Property data
                var entityService = services.FirstOrDefault(o => o.Code == args.ETC);
                if (entityService == null)
                    throw new Exception("Service is not available for specified EntityTypeCode.");

                switch (entityService.Name)
                {
                    case MicroServices.BATCHES:
                        using (var batchAPI = new BatchesAPI(entityService.Url))
                        {
                            dt1 = await batchAPI.GetDataForBatchesV2Async(new BatchRequestArgs
                            {
                                CropCode = args.CC,
                                ETC = "BAT",
                                PCOLS = string.Join(",", pfsIDs),
                                F = args.F
                            });
                        }
                        break;
                    case MicroServices.LOTS:
                        using (var lotsAPI = new LotsAPI(entityService.Url))
                        {
                            dt1 = await lotsAPI.GetDataForLotsV2Async(new LotRequestArgs
                            {
                                CropCode = args.CC,
                                ETC = "LOT",
                                PCOLS = string.Join(",", pfsIDs),
                                F = args.F
                            });
                        }
                        break;
                    case MicroServices.PLANTS:
                        using (var plantsAPI = new PlantsAPI(entityService.Url))
                        {
                            dt1 = await plantsAPI.GetDataForPlantsV2Async(new PlantRequestArgs
                            {
                                CropCode = args.CC,
                                ETC = "PLA",
                                PCOLS = string.Join(",", pfsIDs),
                                F = args.F
                            });
                        }
                        break;
                    case MicroServices.TRIALS:
                    case MicroServices.TRIAL_ENTRIES:
                        using (var trialsAPI = new TrialAPI(entityService.Url))
                        {
                            dt1 = await trialsAPI.GetDataForTrialsV2Async(new TrialRequestArgs
                            {
                                CropCode = args.CC,
                                ETC = args.ETC,
                                PCOLS = string.Join(",", pfsIDs),
                                F = args.F
                            });
                        }
                        break;
                    case MicroServices.CROSSINGS:
                        using (var crossingAPI = new CrossingAPI(entityService.Url))
                        {
                            dt1 = await crossingAPI.GetDataForCrossingV2Async(new CrossingRequestArgs
                            {
                                CropCode = args.CC,
                                ETC = "CRO",
                                PCOLS = string.Join(",", pfsIDs),
                                F = args.F
                            });
                        }
                        break;
                }

                if (dt1.Rows.Count <= 0)
                    throw new Exception("No data found.");


                #endregion

                #region Observation Data

                //Get Obsrevation data;
                var tfsIDs = fields.Where(o => !o.Property || (o.Property && string.IsNullOrWhiteSpace(o.ColumnLabel)))
                    .Select(o => o.TraitID)
                    .ToList();
                if (tfsIDs.Any())
                {
                    var ezIDs = dt1.AsEnumerable()
                        .Select(o => o.Field<long>("EZID"))
                        .ToArray();

                    var observationSvcUrl = services.FirstOrDefault(o => o.Name == MicroServices.OBSERVATIONS)?.Url;
                    using (var observationAPI = new ObservationsAPI(observationSvcUrl))
                    {
                        observationAPI.AddVersion(2);
                        dt2 = await observationAPI.GetDataForObservationsV2Async(new ObservationRequestArgs
                        {
                            CC = "TO",
                            ETC = "BAT",
                            EZIDS = string.Join(",", ezIDs),
                            TCOLS = string.Join(",", tfsIDs),
                            F = args.F
                        });
                    }
                }

                #endregion

                #region Combine Data from both entities and observation services

                //Assign first datatable
                rs = dt1;
                //Join two resultsets if available
                if (dt2.Rows.Count > 0)
                {
                    rs = dt1.LeftJoin(dt2, "EZID");
                }
                dt = rs.Clone();
                if (dt.Columns.Contains("EZID0"))
                {
                    dt.Columns.Remove("EZID0"); //remove this unnecessary column
                }
                dt.Columns.Add(new DataColumn("ROW_ID", typeof (int))
                {
                    AutoIncrement = true,
                    AutoIncrementSeed = 1
                });

                #endregion

                #region Sorting

                //apply sort and get new table with new row_id columns
                var sortExpr = ApplySorts(rs.Columns, args.S);
                var rows = rs.Select("", sortExpr);
                dt.BeginLoadData();
                foreach (var dr in rows)
                {
                    dt.ImportRow(dr);
                }
                dt.EndLoadData();

                #endregion

                #region Search

                //search and return paged data
                //var filterExpr = "[2244] LIKE '%111955%'";
                var filterExpr = ApplyFullTextSearch(dt.Columns, fields, args.FTSValue);
                //Handle find next/previous
                if (!string.IsNullOrWhiteSpace(args.FindDir) && args.LastRowID != null)
                {
                    var filterExpr2 = string.Empty;
                    switch (args.FindDir)
                    {
                        case "N":
                            filterExpr2 = $"ROW_ID > {args.LastRowID}";
                            break;
                        case "P":
                            filterExpr2 = $"ROW_ID < {args.LastRowID}";
                            break;
                    }
                    if (!string.IsNullOrWhiteSpace(filterExpr2))
                    {
                        filterExpr = string.Concat("(", filterExpr2, ") AND (", filterExpr, ")");
                    }
                }
                using (var dv = new DataView(dt)
                {
                    RowFilter = filterExpr
                })
                {
                    //if data not found, just return result as null
                    if (dv.Count > 0)
                    {
                        var rowID = dv[0]["ROW_ID"].ToInt32();
                        pageNum = (((rowID)/args.PS) + 1);
                        var from = (pageNum - 1)*args.PS;
                        var to = from + (args.PS - 1);
                        dv.RowFilter = $"ROW_ID >= {from} AND ROW_ID <= {to}";

                        //convert dataview to datatable
                        result = dv.ToTable();
                        //get relationship for +/- symbol
                        var ezIDs = result.AsEnumerable()
                            .Select(o => o.Field<long>("EZID"))
                            .ToList();

                        var dtRelations = await GetRelationsDataAsync(services, ezIDs);
                        result = result.LeftJoin(dtRelations, "EZID");
                        if (result.Columns.Contains("EZID0"))
                        {
                            result.Columns.Remove("EZID0"); //remove this unnecessary column
                        }
                        //add those columns which doesn't belong to selected entity i.e. batch 
                        AddAdditionalColumns(ref result, fields);
                        //re-order columns based on sorting applied on columns
                        ReOrderColumns(ref result, fields);
                    }
                }

                #endregion
            }
            finally
            {
                dt1.Clear();
                dt2.Clear();
                rs?.Clear();
                dt?.Clear();
                dt1.Dispose();
                dt2.Dispose();
                rs?.Dispose();
                dt?.Dispose();
            }
            var dict = new Dictionary<string, object>
            {
                {"Data", result},
                {"PageNumber", pageNum}
            };
            return dict;
        }

        void ReOrderColumns(ref DataTable result, List<Trait> fields)
        {
            var columns1 = fields
                .Where(o => o.SortOrder != null)
                .OrderBy(o => o.SortOrder)
                .Select((o, i) => new
                {
                    Name = o.TraitID.ToString(),
                    Ordinal = i
                }).ToList();
            var columns2 = fields
                .Where(o => o.SortOrder == null)
                .Select((o, i) => new
                {
                    Name = o.TraitID.ToString(),
                    Ordinal = i
                }).ToList();

            int index = 3; //first three columns are fixed i.e. EZID, EntityTypeCode, Name
            foreach (var column in columns1)
            {
                if (result.Columns.Contains(column.Name))
                {
                    result.Columns[column.Name].SetOrdinal(index + column.Ordinal);
                }
            }
            //reset index
            index = index + columns1.Count - 1;
            foreach (var column in columns2)
            {
                if (result.Columns.Contains(column.Name))
                {
                    result.Columns[column.Name].SetOrdinal(index + column.Ordinal);
                }
            }
        }

        void AddAdditionalColumns(ref DataTable result, List<Trait> fields)
        {
            var cols = new DataColumn[result.Columns.Count];
            result.Columns.CopyTo(cols, 0);
            var columns = fields.Where(o => cols.All(x => x.ColumnName != o.TraitID.ToString()))
                .ToList();
            foreach (var column in columns)
            {
                var colName = column.TraitID.ToString();
                if (!result.Columns.Contains(colName))
                {
                    result.Columns.Add(colName, typeof (string));
                }
            }
        }

        async Task<DataTable> GetRelationsDataAsync(List<ServiceSetting> services, IEnumerable<long> ezids)
        {
            var relationService = services.FirstOrDefault(o => o.Name == MicroServices.ENTITIES);
            return await GetDataForRelationWithCountAsync(relationService?.Url, new RelationRequestArgs
            {
                EZIDS = string.Join(",", ezids.ToArray())
            });
        }

        string ApplySorts(DataColumnCollection columns, List<TvpSort> sorts)
        {
            var items = new List<string>();
            foreach (var sort in sorts)
            {
                if (columns.Contains(sort.SC))
                {
                    items.Add($"{sort.SC} {sort.SO}");
                }
            }
            return string.Join(",", items.ToArray());
        }

        string ApplyFullTextSearch(DataColumnCollection columns, List<Trait> fields, string value)
        {
            var items = new List<string>();
            var cols = new DataColumn[columns.Count];
            columns.CopyTo(cols, 0);
            var idColumns = fields.Where(o => cols.Any(x => x.ColumnName == o.TraitID.ToString())).ToList();
            var namedColumns = new[]
            {
                new Trait {ColumnLabel = "EZID", DataType = "I"},
                new Trait {ColumnLabel = "Name", DataType = "C"}
            };
            foreach (var field in idColumns)
            {
                AddValue(ref items, field.DataType, field.TraitID.ToString(), value);
            }
            foreach (var field in namedColumns)
            {
                AddValue(ref items, field.DataType, field.ColumnLabel, value);
            }
            return string.Join(" OR ", items.ToArray());
        }

        void AddValue(ref List<string> items, string dataType, string fieldName, string value)
        {
            switch (dataType)
            {
                case "ST":
                case "C":
                    items.Add($"{QuoteName(fieldName)} LIKE '%{Escape(value)}%'");
                    break;
                case "DT":
                case "D":
                    items.Add($"{QuoteName(fieldName)} = '{value}'");
                    break;
                case "INT":
                case "I":
                case "DEC":
                case "A":
                    if (value.IsNumeric())
                    {
                        items.Add($"{QuoteName(fieldName)} = {value}");
                    }
                    break;
                default:
                    items.Add($"{QuoteName(fieldName)} = {value}");
                    break;
            }
        }

        string QuoteName(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return string.Empty;
            if (!value.StartsWith("["))
                value = string.Concat("[", value);
            if (!value.EndsWith("]"))
                value = string.Concat(value, "]");
            return value;
        }

        string Escape(string valueWithoutWildcards)
        {
            var sb = new StringBuilder();
            for (int i = 0; i < valueWithoutWildcards.Length; i++)
            {
                char c = valueWithoutWildcards[i];
                if (c == '*' || c == '%' || c == '[' || c == ']')
                    sb.Append("[").Append(c).Append("]");
                else if (c == '\'')
                    sb.Append("''");
                else
                    sb.Append(c);
            }
            return sb.ToString();
        }

        #endregion
    }
}