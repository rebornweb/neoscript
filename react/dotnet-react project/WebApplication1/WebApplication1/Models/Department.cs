using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("Department")]

public class Department
{
    [Key]
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; }
}