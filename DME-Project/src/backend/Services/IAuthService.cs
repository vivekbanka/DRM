using Backend.Models.Dtos;

namespace Backend.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
    Task<bool> RegisterAsync(RegisterRequest request);
    Task<UserDto?> GetUserByIdAsync(int userId);
    Task<bool> IsUserInRoleAsync(int userId, string roleName);
}
