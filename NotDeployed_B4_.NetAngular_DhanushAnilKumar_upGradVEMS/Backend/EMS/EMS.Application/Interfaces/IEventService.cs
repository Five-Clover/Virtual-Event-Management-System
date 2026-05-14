using EMS.DAL.Models;

namespace EMS.Application.Interfaces
{
    public interface IEventService
    {
        Task<List<EventDetails>> GetAllAsync(int pageNumber, int pageSize);
        Task<EventDetails> GetByIdAsync(Guid id);
        Task CreateAsync(EventDetails model);
        Task UpdateAsync(EventDetails model);
        Task DeleteAsync(Guid id);
    }
}