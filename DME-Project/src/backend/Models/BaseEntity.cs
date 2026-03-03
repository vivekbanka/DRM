namespace Backend.Models;

public class BaseEntity
{
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; } 
    public int? CreatedBy { get; set; }  
    public int? UpdatedBy { get; set; }
}