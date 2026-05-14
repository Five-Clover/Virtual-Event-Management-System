using EMS.DAL.Models;

namespace EMS.DAL.Repositories.Interfaces
{
    public interface ISessionRepository
    {
        Task<List<SessionInfo>> GetAllAsync();
        Task<SessionInfo?> GetByIdAsync(Guid id);
        Task AddAsync(SessionInfo session);
        Task UpdateAsync(SessionInfo session);
        Task DeleteAsync(Guid id);
    }
}