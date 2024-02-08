using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

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
    public IActionResult ExecuteStoredProcedure()
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            connection.Open();
            var storedProcedureName = "[dbo].[uspGetBillOfMaterials]";
            var startProductID = 893;
            var checkDate = "2010-05-26";

            using (var command = new SqlCommand(storedProcedureName, connection))
            {
                command.CommandType = System.Data.CommandType.StoredProcedure;

                // Add parameters
                command.Parameters.AddWithValue("@StartProductID", startProductID);
                command.Parameters.AddWithValue("@CheckDate", checkDate);

                // Execute the stored procedure
                using (var reader = command.ExecuteReader())
                {
                    var results = new List<Dictionary<string, object>>();

                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();

                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader[i];
                        }

                        results.Add(row);
                    }

                    return Ok(results);
                }
            }
        }
    }
}
