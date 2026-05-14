using EMS.Application.Interfaces;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;

namespace EMS.Application.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly IParticipantRepository _repo;

        public ParticipantService(IParticipantRepository repo)
        {
            _repo = repo;
        }

        public async Task RegisterEventAsync(string email, Guid eventId)
        {
            var already = (await _repo.GetByUserAsync(email))
                .Any(e => e.EventId == eventId);

            if (already)
                throw new Exception("Already registered");

            var data = new ParticipantEventDetails
            {
                Id = Guid.NewGuid(),
                EventId = eventId,
                ParticipantEmailId = email,
                IsAttended = false
            };

            await _repo.RegisterEventAsync(data);
        }

        public async Task UnregisterAsync(string email, Guid eventId)
        {
            await _repo.RemoveRegistrationAsync(email, eventId);
        }

        public async Task<List<SessionInfo>> GetUserSessionsAsync(string email)
        {
            return await _repo.GetSessionsByUserAsync(email);
        }

        public async Task MarkAttendanceAsync(string email, Guid eventId)
        {
            var record = await _repo.GetByEmailAndEventAsync(email, eventId);

            if (record == null)
                throw new Exception("Registration not found");

            record.IsAttended = true;

            await _repo.UpdateAsync(record);
        }
    }
}