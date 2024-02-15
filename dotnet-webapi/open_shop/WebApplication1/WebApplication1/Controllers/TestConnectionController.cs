using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.Data.SqlClient;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionTestController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ConnectionTestController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult TestConnection()
        {
            string connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (var connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    return Ok("Connection successful.");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Connection failed: {ex.Message}");
                }
            }
        }
    }
}
