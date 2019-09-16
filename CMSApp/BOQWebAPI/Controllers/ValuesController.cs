using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BOQWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BOQController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public BOQController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        // GET api/values
        [HttpGet("{role?}")]
        public ActionResult<IEnumerable<BOQ>> Get(string role)
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            var filePath = contentRootPath + "/boqList.json";
            string allText = System.IO.File.ReadAllText(filePath);
            IEnumerable<BOQ> boqList = JsonConvert.DeserializeObject<IEnumerable<BOQ>>(allText);
            return Ok(GetFilteredBOQBasedOnRole(role, boqList).ToList());
        }

        private IEnumerable<BOQ> GetFilteredBOQBasedOnRole(string role, IEnumerable<BOQ> boqList)
        {
            switch (role?.ToUpper())
            {
                case "R1":
                    return boqList.Where(boq => boq.TotalAmount < 100000);
                case "R2":
                    return boqList.Where(boq => boq.TotalAmount >= 100000 && boq.TotalAmount < 450000);
                case "R3":
                    return boqList.Where(boq => boq.TotalAmount >= 450000);
                default:
                    return boqList;
            }
        }
    }

    public class BOQ
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string Status { get; set; }
        public int TotalAmount { get; set; }
        public IEnumerable<Item> Items { get; set; }
    }

    public class Item
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string UnitType { get; set; }
        public int Units { get; set; }
        public int UnitPrice { get; set; }
        public int EstimatedAmount { get; set; }
    }
}
