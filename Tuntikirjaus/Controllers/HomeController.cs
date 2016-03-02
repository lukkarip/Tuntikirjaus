using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.Net;

namespace Tuntikirjaus.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Henkilo = "Pekka Lukkari";
            ViewBag.Viikkonumero = GetWeekNumber(DateTime.Now);


            System.Net.WebRequest request = System.Net.WebRequest.Create("http://www.iltalehti.fi");
            System.Net.WebResponse response = request.GetResponse();
            Console.WriteLine(response.ResponseUri);


            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        /// <summary>
        /// http://windowsapptutorials.com/tips/general-tips/get-week-number-of-month-in-c-sharp/
        /// </summary>
        private int GetWeekNumber(DateTime date)
        {
            DateTimeFormatInfo dfi = DateTimeFormatInfo.CurrentInfo;
            Calendar cal = dfi.Calendar;

            return cal.GetWeekOfYear(date, dfi.CalendarWeekRule, dfi.FirstDayOfWeek);
        }
    }
}