using EMS.DAL.Models;

namespace EMS.Application.Interfaces
{
    public interface IUserService
    {
        Task RegisterAsync(UserInfo user);
        Task<UserInfo> LoginAsync(string email, string password);
        Task<List<UserInfo>> GetAllUsersAsync();
    }
}