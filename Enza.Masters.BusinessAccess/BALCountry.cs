using Enza.BusinessAccess.Core.Abstracts;
using Enza.Masters.BusinessAccess.Interfaces;
using Enza.Masters.DataAccess;
using Enza.Masters.DataAccess.Interfaces;
using Enza.Masters.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Enza.Masters.BusinessAccess
{
    public class BALCountry : BusinessAccess<Country>, IBALCountry
    {
        public BALCountry(ICountryRepository repository) : base(repository)
        {
        }
        public override async Task<IEnumerable<Country>> GetAllAsync()
        {
            return await ((CountryRepository)Repository).GetAllAsync();
        }

    }
}
