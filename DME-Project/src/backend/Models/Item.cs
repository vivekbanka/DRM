namespace Backend.Models;

/// <summary>
/// Represents an item in the system with scalar properties
/// </summary>
public class Item
{
    /// <summary>
    /// Unique identifier for the item (scalar: integer)
    /// </summary>
    /// <example>1</example>
    public int Id { get; set; }
    
    /// <summary>
    /// Name of the item (scalar: string)
    /// </summary>
    /// <example>Sample Item</example>
    public string Name { get; set; } = string.Empty;
    
    /// <summary>
    /// Numeric value associated with the item (scalar: integer)
    /// </summary>
    /// <example>100</example>
    public int Value { get; set; }
}