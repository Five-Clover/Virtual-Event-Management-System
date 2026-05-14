using EMS.DAL.Models;

namespace EMS.DAL.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Task<List<EventDetails>> GetAllAsync();
        Task<EventDetails?> GetByIdAsync(Guid id);
        Task AddAsync(EventDetails model);
        Task UpdateAsync(EventDetails model);
        Task DeleteAsync(Guid id);
        Task<bool> ExistsByNameAsync(string eventName);
    }
}
