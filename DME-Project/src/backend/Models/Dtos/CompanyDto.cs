using System.ComponentModel.DataAnnotations;
namespace Backend.Models.Dtos;

public class CompanyDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Address { get; set; } = string.Empty;
    [Required]
    public string Description { get; set; } = string.Empty; 
    [Required]
    public string PhoneNumber { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;
    public int? CompanyID { get; set; }
}
