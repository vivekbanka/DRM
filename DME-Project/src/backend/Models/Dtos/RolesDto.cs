using System.ComponentModel.DataAnnotations;
namespace Backend.Models.Dtos;
public class RolesDto
{
    [Required]
    public string RoleName { get; set; } = string.Empty;

    [Required]
    public string RoleDescription { get; set; } = string.Empty;

    [Required]
    public bool RolesIsActive { get; set; }  
}