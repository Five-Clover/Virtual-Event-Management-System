using EMS.DAL.Models;

namespace EMS.DAL.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task AddAsync(UserInfo user);
        Task<UserInfo?> GetByEmailAsync(string email);
        Task<List<UserInfo>> GetAllAsync();
    }
}