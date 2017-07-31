using System.Data;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Enza.DataAccess.Databases;
using Enza.Services.Trial.Controllers;
using Enza.Trial.BusinessAccess;
using Enza.Trial.DataAccess;
using Enza.Trial.DataAccess.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;
using Enza.Trial.Entities.Constants;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Enza.BAS.UnitTest.Trials
{
    [TestClass]
    public class TrialsUnitTest
    {
        private const string VALIDATION_ERROR = "There was something changed in validation attributes.";
        [TestMethod]
        public void ValidateTrialEntryRequestArgs()
        {
            var args = new TrialEntryRequestArgs();
            args.Validate();
            //non of the values are passed in corresponding properties, so it shouldn't be valid
            Assert.AreEqual(3, args.Errors.Count, VALIDATION_ERROR);
        }

        [TestMethod]
        public void ValidateTrialMainRequestArgs()
        {
            var args = new TrialRequestArgs();
            args.Validate();
            //non of the values are passed in corresponding properties, so it shouldn't be valid
            Assert.AreEqual(2, args.Errors.Count, VALIDATION_ERROR);
        }

        [TestMethod]
        public void ValidateTrialRequestArgs()
        {
            var args = new CreateTrialRequestArgs();
            args.Validate();
            //non of the values are passed in corresponding properties, so it shouldn't be valid
            Assert.AreEqual(1, args.Errors.Count, VALIDATION_ERROR);
        }

        [TestMethod]
        public void ValidateRouteConstants()
        {
            var expected = "api";
            var actual = RouteConstants.API_TRIAL;
            Assert.AreEqual(expected, actual, "Valud of RouteConstants.API_TRIAL must be \"api\" ");
        }


        //[TestMethod]
        //public async Task GetTrialsByCropCode()
        //{
        //    //var db = new Mock<SqlDatabase>("ConnectionString1");
        //    //var trialRepository = new Mock<TrialRepository>(db.Object);
        //    //trialRepository.Setup(x => x.GetAllTrialAsync(new TrialRequestArgs {CC = "TO"}))
        //    //    .Returns(Task.Run(() => new DataSet()));
        //    //var balTrial = new Mock<BALTrial>(trialRepository.Object);
        //    //var controller = new TrialController(balTrial.Object);

        //    var controller = new TrialController(new BALTrial(new TrialRepository(new SqlDatabase("ConnectionString1"))));
        //    var actionResult = await controller.Get("TO");
        //    var result = actionResult as ResponseMessageResult;
        //    // Assert
        //    Assert.IsNotNull(result);
        //    Assert.IsNotNull(result.Response.Content);
        //}
    }
}
