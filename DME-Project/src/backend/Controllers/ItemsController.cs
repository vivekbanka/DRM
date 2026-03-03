using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

/// <summary>
/// API controller for managing items with scalar type operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _context;
    
    /// <summary>
    /// Initializes a new instance of ItemsController
    /// </summary>
    /// <param name="context">Database context</param>
    public ItemsController(AppDbContext context) => _context = context;

    /// <summary>
    /// Retrieves all items from the database
    /// </summary>
    /// <returns>List of items with scalar properties</returns>
    /// <response code="200">Returns the list of items</response>
    [HttpGet]
    [ProducesResponseType(typeof(List<Item>), 200)]
    public async Task<IActionResult> Get() => 
        Ok(await _context.Items.ToListAsync());

    /// <summary>
    /// Creates a new item with scalar properties
    /// </summary>
    /// <param name="item">Item object with scalar values</param>
    /// <returns>Created item with generated ID</returns>
    /// <response code="201">Item created successfully</response>
    /// <response code="400">Invalid item data</response>
    [HttpPost]
    [ProducesResponseType(typeof(Item), 201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Post(Item item)
    {
        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }
}