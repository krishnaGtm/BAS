using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Enza.BAS.UnitTest.Utilities
{
    public class TestUtils
    {
        public static void Verify<T, TException>(T o, Action<T> action, string error)
        {
            try
            {
                action(o);
                Assert.Fail(error);
            }
            catch (Exception ex)
            {
                if (!(ex is TException))
                    throw;
                Assert.IsTrue(true);
            }
        }

        public static void Validate<T>(Action action)
        {
            
        }
    }
}
