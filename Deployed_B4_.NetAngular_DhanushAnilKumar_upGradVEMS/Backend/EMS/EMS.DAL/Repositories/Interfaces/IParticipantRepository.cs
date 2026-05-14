using EMS.DAL.Models;

namespace EMS.DAL.Repositories.Interfaces
{
    public interface IParticipantRepository
    {
        Task RegisterEventAsync(ParticipantEventDetails data);
        Task<List<ParticipantEventDetails>> GetByUserAsync(string email);
        Task RemoveRegistrationAsync(string email, Guid eventId);
        Task<List<SessionInfo>> GetSessionsByUserAsync(string email);
        Task<ParticipantEventDetails?> GetByEmailAndEventAsync(string email, Guid eventId);
        Task UpdateAsync(ParticipantEventDetails data);
    }
}