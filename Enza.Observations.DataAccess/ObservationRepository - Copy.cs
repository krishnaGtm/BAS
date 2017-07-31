using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Enza.Common.Extensions;
using Enza.DataAccess.Abstracts;
using Enza.Observations.DataAccess.Constants;
using Enza.Observations.Entities;
using Enza.Observations.Entities.BDTOs.Args;

namespace Enza.Observations.DataAccess
{
    public class ObservationRepository : Repository<Observation>
    {
        public ObservationRepository(Database database) : base(database)
        {
        }

        public async Task<DataSet> GetObservationDataAsync(ObservationRequestArgs args)
        {
            var tvpFilters = args.GetFilters();
            var p1 = new SqlParameter("@TVPfilters", tvpFilters)
            {
                TypeName = "TVP_Filters"
            };
            var p2 = new SqlParameter("@TotalRows", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };
            var result =  await DbContext.ExecuteDataSetAsync(DataConstants.PR_GET_OBSERVATION_DATA, CommandType.StoredProcedure, parameter =>
            {
                parameter.Add("@CropGroupID", args.CGID);
                parameter.Add("@CropCode", args.CC);
                parameter.Add("@EntityTypeCode", args.ETC);
                parameter.Add("@EZID", args.EZID);
                parameter.Add("@Level", args.Level);
                parameter.Add("@TVPfilters", p1);
                parameter.Add("@SortColumn", args.SC);
                parameter.Add("@SortDir", args.SO);
                parameter.Add("@PageSize", args.PS);
                parameter.Add("@PageNum", args.PN);
                parameter.Add("@TraitFieldsetID", args.TFSID);
                parameter.Add("@TraitCols", args.TCOLS);
                parameter.Add("@TotalRows", p2);
            });
            args.Total = p2.Value.ToInt32();
            return result;
        }

        public async Task<DataTable> GetTraitAndPropertyObservationDataAsync(ObservationRequestArgs args)
        {
            DbContext.CommandTimeout = 300;
            var tvpFilters = args.GetFilters();
            var p1 = new SqlParameter("@filters", tvpFilters)
            {
                TypeName = "TVP_Filters"
            };
            var tvpSorts = args.GetSorts();
            var p2 = new SqlParameter("@sorts", tvpSorts)
            {
                TypeName = "TVPSorting"
            };
            var p3 = new SqlParameter("@TotalRows", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
                
            };
            var result =
                await
                    DbContext.ExecuteDataSetAsync(DataConstants.SP_ENTITIES_GET_ENTITIES_AND_OBSERVATIONSDATA,
                        CommandType.StoredProcedure, parameter =>
                        {
                            parameter.Add("@CropCode", args.CC);
                            parameter.Add("@EntityTypeCode", args.ETC);
                            parameter.Add("@Level", args.Level);
                            parameter.Add("@EZID", args.EZID);
                            parameter.Add("@PFSID", args.PFSID);
                            parameter.Add("@TFSID", args.TFSID);
                            parameter.Add("@PCOLS", args.PCOLS);
                            parameter.Add("@TCOLS", args.TCOLS);
                            parameter.Add("@PageSize", args.PS);
                            parameter.Add("@PageNum", args.PN);
                            parameter.Add("@filters", p1);
                            parameter.Add("@sorts", p2);
                            parameter.Add("@TotalRows", p3);

                        });
            if (result.Tables.Count > 0)
            {
                var tbl = result.Tables[0];
                if(tbl.Columns.Contains("ChildRows"))
                {
                    if (tbl.Rows.Count > 0 && (string.IsNullOrEmpty(args.PCOLS) && (string.IsNullOrEmpty(args.TCOLS)) && (args.PFSID != null) && (args.PCOLS != null)))
                    {
                        var total = tbl.Rows[0]["TotalRows"].ToInt32();
                        args.Total = total;

                        tbl.Columns.Remove("TotalRows");
                    }

                }
                else
                    args.Total = p3.Value.ToInt32();
                
                return tbl;
            }

            return null;
        }

        public async Task<DataSet> GetObservationFieldSetDataAsync(ObservationRequestArgs args)
        {
            var result =
                await
                    DbContext.ExecuteDataSetAsync(DataConstants.PR_GET_FIELDSETDATA_WITHADDEDCOLUMNS,
                        CommandType.StoredProcedure, parameter =>
                        {
                            parameter.Add("@TraitFieldsetID", args.TFSID);
                            parameter.Add("@TraitCols", args.TCOLS);
                            parameter.Add("@EZIDS", args.EZIDS);
                        });
            return result;
        }
    }
}
