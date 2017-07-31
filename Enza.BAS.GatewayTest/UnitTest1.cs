using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Enza.BAS.GatewayTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public async void GetInitialDataTest()
        {
            var model = new ObservationModel();
            //try
            //{
                //GatewayRequestArgs args = new GatewayRequestArgs
                var result = await model.GetObservationDataAsync(new Enza.Gateway.Entities.BDTOs.ArgsGatewayRequestArgs { CGID =1,CC="TO",ETC="BAT",Level=-1,PN=0,PS=100,SC="EZID",SO="ASC" });

                //result.Add("ERRORS", string.Empty);
                //if (model.Errors.Count > 0)
                //{
                //    result["ERRORS"] = string.Join(Environment.NewLine, model.Errors.ToArray());
                //}
                //return JsonResult(result);
            //}
            //catch (Exception ex)
            //{
            //    //var excep = new UELException(ex);
            //    //this.Error(excep);
            //    //return UIError(excep);
            //}
        }
        [TestMethod]
        public void GetInitialDataWithFilterTest()
        {

        }
        [TestMethod]
        public void GetInitialDataWithFilter()
        {

        }
        [TestMethod]
        public void GetInitialDataWithSortingAndFiltering()
        {

        }
    }
}
