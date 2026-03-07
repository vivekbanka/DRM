using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.Dtos;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RolesController : ControllerBase
{
    private readonly IRolesService _rolesService;

    public RolesController(IRolesService rolesService)
    {
        _rolesService = rolesService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await _rolesService.GetAllRolesAsync();
        return Ok(roles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoleById(int id)
    {
        var role = await _rolesService.GetRoleByIdAsync(id);
        
        if (role == null)
            return NotFound();

        return Ok(role);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRole([FromBody] RolesDto roleDto)
    {
        var result = await _rolesService.CreateRoleAsync(roleDto);
        
        if (result == null)
            return BadRequest(new { message = "Failed to create role" });

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRole(int id, [FromBody] RolesDto roleDto)
    {
        var result = await _rolesService.UpdateRoleAsync(id, roleDto);
        
        if (result == null)
            return BadRequest(new { message = "Failed to update role" });

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        var result = await _rolesService.DeleteRoleAsync(id);
        
        if (!result)
            return BadRequest(new { message = "Failed to delete role" });

        return Ok(new { message = "Role deleted successfully" });
    }
}
