using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _context;
    public ItemsController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> Get() => 
        Ok(await _context.Items.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Post(Item item)
    {
        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }
}