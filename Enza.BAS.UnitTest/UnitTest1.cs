using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Enza.BAS.UnitTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var func = new Functions();
            var actual = func.Add(5, 5);
            var expectation = 10;

            Assert.AreEqual(expectation, actual);
        }
    }

    public class Functions
    {
        public int Add(int a, int b)
        {
            return a + b;
        }
    }
}
