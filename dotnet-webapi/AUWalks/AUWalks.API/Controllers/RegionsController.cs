using AUWalks.API.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AUWalks.API.Controllers
{   
    // api/regions
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {   
        //GET: URL:port/api/regions
        [HttpGet]
        public IActionResult GetAll()
        {
            var regions = new List<Region> { 
                new Region
                {
                    Id = Guid.NewGuid(),
                    Name = "Sydney Region",
                    Code = "SYD",
                    RegionImageUrl = "https://cdn.pixabay.com/photo/2014/06/06/09/36/sydney-opera-house-363244_1280.jpg"

                },
                new Region
                {
                    Id = Guid.NewGuid(),
                    Name = "Brisbane Region",
                    Code = "BNE",
                    RegionImageUrl = "https://cdn.pixabay.com/photo/2016/02/25/13/35/beach-1222080_1280.jpg"

                }

            };

            return Ok(regions);
        }

    }
}
