using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.Models;
using Backend.Models.Dtos;

namespace Backend.Services;

public class RolesService : IRolesService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public RolesService(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<IEnumerable<RolesDto>> GetAllRolesAsync()
    {
        return _context.Roles.Select(r => new RolesDto
        {
            RoleName = r.Name,
            RoleDescription = r.Description,
            RolesIsActive = r.IsActive,
            RoleID = r.Id
        }).ToList();
    }

    public async Task<RolesDto?> GetRoleByIdAsync(int roleId)
    {
        var role = await _context.Roles.FindAsync(roleId);
        if (role == null) return null;

        return new RolesDto
        {
            RoleName = role.Name,
            RoleDescription = role.Description,
            RolesIsActive = role.IsActive,
            RoleID = role.Id
        };
    }

    public async Task<bool> CreateRoleAsync(RolesDto roleDto)
    {
        var role = new Role
        {
            Name = roleDto.RoleName,
            Description = roleDto.RoleDescription,
            IsActive = roleDto.RolesIsActive
        };

        _context.Roles.Add(role);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateRoleAsync(int roleId, RolesDto roleDto)
    {
        var existingRole = await _context.Roles.FindAsync(roleId);
        if (existingRole == null) return false;

        existingRole.Name = roleDto.RoleName;
        existingRole.Description = roleDto.RoleDescription;
        existingRole.IsActive = roleDto.RolesIsActive;

        _context.Roles.Update(existingRole);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteRoleAsync(int roleId)
    {
        var existingRole = await _context.Roles.FindAsync(roleId);
        if (existingRole == null) return false;

        _context.Roles.Remove(existingRole);
        return await _context.SaveChangesAsync() > 0;
    }
}