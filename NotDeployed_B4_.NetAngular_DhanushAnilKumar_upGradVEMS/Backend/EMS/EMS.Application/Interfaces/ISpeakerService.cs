using EMS.Application.DTOs;
using EMS.DAL.Models;

namespace EMS.Application.Interfaces
{
    public interface ISpeakerService
    {
        Task<List<SpeakersDetails>> GetAllAsync();
        Task AddAsync(SpeakersDetails speaker);
        Task DeleteAsync(Guid id);
        Task<SpeakerResponseDto?> GetByIdAsync(Guid id);
        Task UpdateAsync(Guid id, UpdateSpeakerDto dto);
    }
}