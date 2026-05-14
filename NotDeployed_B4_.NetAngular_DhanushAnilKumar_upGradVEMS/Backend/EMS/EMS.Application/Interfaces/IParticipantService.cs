using EMS.DAL.Models;

namespace EMS.Application.Interfaces
{
    public interface IParticipantService
    {
        Task RegisterEventAsync(string email, Guid eventId);
        Task UnregisterAsync(string email, Guid eventId);
        Task<List<SessionInfo>> GetUserSessionsAsync(string email);
        Task MarkAttendanceAsync(string email, Guid eventId);
    }
}