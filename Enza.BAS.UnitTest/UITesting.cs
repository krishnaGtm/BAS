using System;
using System.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Enza.BAS.UnitTest
{
    [TestClass]
    public class UITesting
    {
        [TestMethod]
        public void OpenChrome()
        {
            IWebDriver driver = null;
            try
            {
                var url = ConfigurationManager.AppSettings["APP_URL"];
                driver = new ChromeDriver();
                driver.Manage().Window.Maximize();
                driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(20));
                driver.Navigate().GoToUrl(url);
                
                Assert.AreEqual("Enza: BAS", driver.Title, "Failed.");
            }
            finally
            {
                driver?.Quit();
            }
        }
    }
}
