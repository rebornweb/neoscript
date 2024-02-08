using System.Collections.Generic; // Required for List<T>
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient; // For .NET Core
// If you're using .NET Framework, you would use System.Data.SqlClient instead

[Route("api/[controller]")]
[ApiController]
public class StoredProceduresController : ControllerBase
{
    private readonly string _connectionString;

    public StoredProceduresController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet]
    public IActionResult GetStoredProcedures()
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var commandText = "SELECT name AS ProcedureName, create_date AS CreateDate FROM sys.procedures ORDER BY name";

            using (var command = new SqlCommand(commandText, connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    var procedures = new List<Dictionary<string, object>>();

                    while (reader.Read())
                    {
                        var procedure = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            procedure[reader.GetName(i)] = reader[i];
                        }
                        procedures.Add(procedure);
                    }

                    return Ok(procedures);
                }
            }
        }
    }
}
