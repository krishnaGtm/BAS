using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.Masters.DataAccess.Constants;
using Enza.Masters.Entities;
using System.Data;
using Enza.Common.Extensions;
using Enza.DataAccess.Interfaces;
using Enza.Masters.DataAccess.Interfaces;

namespace Enza.Masters.DataAccess
{
    public class CountryRepository : Repository<Country>, ICountryRepository
    {
        public CountryRepository(IAnalysisDatabase dbContext) : base(dbContext)
        {
        }
        public override async Task<IEnumerable<Country>> GetAllAsync()
        {
            return await DbContext.ExecuteReaderAsync(DataConstants.SP_MASTERS_GETCOUNTRY, CommandType.StoredProcedure,
            reader => new Country {
            CountryCode = reader.Get<string>(0),
            CountryCode3 = reader.Get<string>(1),
            CountryCodeInt = reader.Get<int?>(2),
            CountryName = reader.Get<string>(3)
            });
        }
    }
}
