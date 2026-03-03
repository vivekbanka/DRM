using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

/// <summary>
/// Represents a user with scalar and navigation properties
/// </summary>
public class User
{
    /// <summary>
    /// Unique identifier for the user (scalar: integer)
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }
    
    /// <summary>
    /// User email address (scalar: string)
    /// </summary>
    /// <example>user@example.com</example>
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Hashed password (scalar: string)
    /// </summary>
    [Required]
    [MinLength(6)]
    public string PasswordHash { get; set; } = string.Empty;
    
    /// <summary>
    /// User first name (scalar: string)
    /// </summary>
    /// <example>John</example>
    [Required]
    public string FirstName { get; set; } = string.Empty;
    
    /// <summary>
    /// User last name (scalar: string)
    /// </summary>
    /// <example>Doe</example>
    [Required]
    public string LastName { get; set; } = string.Empty;
    
    /// <summary>
    /// Company identifier (scalar: integer)
    /// </summary>
    /// <example>1</example>
    [Required]
    public int CompanyId { get; set; }
    
    /// <summary>
    /// Account creation timestamp (scalar: datetime)
    /// </summary>
    /// <example>2024-01-01T00:00:00Z</example>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    /// <summary>
    /// Last update timestamp (scalar: datetime, nullable)
    /// </summary>
    /// <example>2024-01-02T00:00:00Z</example>
    public DateTime? UpdatedAt { get; set; }
    
    /// <summary>
    /// Account active status (scalar: boolean)
    /// </summary>
    /// <example>true</example>
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    /// <summary>
    /// Collection of user roles (navigation property)
    /// </summary>
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
