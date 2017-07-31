using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Generals.DataAccess;
using Enza.Generals.Entities;
using Enza.Generals.Entities.BDTOs.Args;
using System.Data;
using Enza.Generals.BusinessAccess.Interfaces;
using Enza.Generals.DataAccess.Interfaces;

namespace Enza.Generals.BusinessAccess
{
    public class BALCreateTemp : BusinessAccess<CreateTemp>, IBALCreateTemp
    {
        public BALCreateTemp(ICreateTempRepository repository) : base(repository)
        {
        }

        public async Task<DataSet> GetTempDataAsync(CreateTempRequestArgs args)
        {
            return await ((CreateTempRepository) Repository).GetTempDataAsync(args);
        }

        public async Task<DataSet> CreateTempDataAsync(CreateTempRequestArgs args)
        {
            return await ((CreateTempRepository) Repository).CreateTempDataAsync(args);
        }
    }
}
