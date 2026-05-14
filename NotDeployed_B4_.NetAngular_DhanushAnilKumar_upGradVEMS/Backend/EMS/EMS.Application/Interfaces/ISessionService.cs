using EMS.Application.DTOs;
using EMS.DAL.Models;

namespace EMS.Application.Interfaces
{
    public interface ISessionService
    {
        Task<List<SessionInfo>> GetAllAsync(int pageNumber, int pageSize);
        Task CreateAsync(SessionInfo model);
        Task UpdateAsync(SessionInfo model);
        Task DeleteAsync(Guid id);
        Task<SessionResponseDto?> GetByIdAsync(Guid id);
    }
}