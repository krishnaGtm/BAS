﻿using Enza.Common.Args.Abstract;

namespace Enza.Crossing.Entities.BDTOs.Args
{
    public class CrossingRequestArgs: PagedRequestArgs
    {
        public string CropCode { get; set; }
        public int? PFSID { get; set; }
        public string ETC { get; set; }
        public string EZIDS { get; set; }
        public string PCOLS { get; set; }
    }
}
