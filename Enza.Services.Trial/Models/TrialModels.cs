using Enza.Masters.Entities;
using System.Collections.Generic;

namespace Enza.Services.Trial.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class TrialModels
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Trait> GetTrialColumns()
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
                    ColumnLabel = "CropCode",
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<Trait> GetTrialEntryColumns()
        {
            var columns = new List<Trait>
            {
                new Trait
                {
                    ColumnLabel = "EZID",
                    DataType = "INT"
                }
                ,
                new Trait
                {
                    ColumnLabel = "FieldNumber",
                    DataType = "ST"
                },
                new Trait
                {
                    ColumnLabel = "Name",
                    DataType = "ST"
                },                
                new Trait
                {
                    ColumnLabel = "CropCode",
                    DataType = "ST"
                }
            };
            return columns;
        }
    }
}