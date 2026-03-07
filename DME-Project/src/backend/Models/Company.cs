namespace Backend.Models;

/// <summary>
/// Represents a company with scalar properties
/// </summary>
public class Company : BaseEntity
{
    /// <summary>
    /// Unique identifier for the company (scalar: integer)
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }
    
    /// <summary>
    /// Company name (scalar: string)
    /// </summary>
    /// <example>Tech Corp</example>
    public string Name { get; set; }
    
    /// <summary>
    /// Company address (scalar: string, nullable)
    /// </summary>
    /// <example>123 Main St, City, State</example>
    public string? Address { get; set; }

    /// <summary>
    /// Company description (scalar: string, nullable)
    /// </summary>
    /// <example>A technology company</example>
    public String? Description { get; set; }
    
    /// <summary>
    /// Company active status (scalar: boolean)
    /// </summary>
    /// <example>true</example>
    public bool IsActive { get; set; }
    
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }

}