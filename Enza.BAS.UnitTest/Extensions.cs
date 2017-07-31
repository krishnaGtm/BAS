using System;
using Enza.Common.Args.Abstract;
using System.Linq;

namespace Enza.BAS.UnitTest
{
    public static class Extensions
    {
        public static string GetErrors(this  RequestArgs args)
        {
            var errors = args.Errors.Select(o => o.ErrorMessage).ToArray();
            return string.Join(Environment.NewLine, errors);
        }
    }
}
