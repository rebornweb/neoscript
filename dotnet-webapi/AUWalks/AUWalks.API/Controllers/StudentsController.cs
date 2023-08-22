using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AUWalks.API.Controllers
{

    // https://localhost:port/api/students

    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        // GET Request https://localhost:port/api/students
        [HttpGet]
        public IActionResult GetAllStudents()
        {
            string[] studentNames = new string[] {
                "Jane", "John"
            };

            return Ok(studentNames);
        }
    }
}
