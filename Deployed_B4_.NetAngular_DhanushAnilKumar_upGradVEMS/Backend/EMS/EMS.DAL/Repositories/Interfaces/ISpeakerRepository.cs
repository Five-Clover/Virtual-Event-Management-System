using EMS.DAL.Models;

namespace EMS.DAL.Repositories.Interfaces
{
    public interface ISpeakerRepository
    {
        Task<List<SpeakersDetails>> GetAllAsync();
        Task AddAsync(SpeakersDetails speaker);
        Task DeleteAsync(Guid id);
        Task<SpeakersDetails?> GetByIdAsync(Guid id);
        Task UpdateAsync(SpeakersDetails speaker);
    }
}