namespace Backend.Models;

public class Company : BaseEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Address { get; set; }

    public String? Description { get; set; }  
    public bool IsActive { get; set; }  

}