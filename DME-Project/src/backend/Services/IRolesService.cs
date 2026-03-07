using Backend.Models.Dtos;

namespace Backend.Services;

public interface IRolesService
{
    Task<IEnumerable<RolesDto>> GetAllRolesAsync();
    Task<RolesDto?> GetRoleByIdAsync(int roleId);
    Task<RolesDto> CreateRoleAsync(RolesDto role);
    Task<RolesDto> UpdateRoleAsync(int roleId, RolesDto role);
    Task<bool> DeleteRoleAsync(int roleId);
}