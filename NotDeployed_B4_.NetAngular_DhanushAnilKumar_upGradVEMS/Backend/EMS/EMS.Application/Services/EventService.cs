using EMS.Application.Interfaces;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;

namespace EMS.Application.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _repo;

        public EventService(IEventRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<EventDetails>> GetAllAsync(int pageNumber, int pageSize)
        {
            var data = await _repo.GetAllAsync();

            return data
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public async Task<EventDetails> GetByIdAsync(Guid id)
        {
            var ev = await _repo.GetByIdAsync(id);

            if (ev == null)
                throw new Exception("Event not found");

            return ev;
        }

        public async Task CreateAsync(EventDetails model)
        {

            if (string.IsNullOrWhiteSpace(model.EventName))
                throw new Exception("Event name required");

            if (model.EventDate < DateTime.Now)
                throw new Exception("Event date must be future");

            var existing = await _repo.ExistsByNameAsync(model.EventName);

            if (existing)
                throw new Exception("Event name must be unique");

            await _repo.AddAsync(model);
        }

        public async Task UpdateAsync(EventDetails model)
        {
            await _repo.UpdateAsync(model);
        }

        public async Task DeleteAsync(Guid id)
        {
            var eventData =
                await _repo.GetByIdAsync(id);

            if (eventData == null)
                throw new Exception(
                    "Event not found"
                );

            // SESSIONS EXIST

            if (
                eventData.Sessions != null &&
                eventData.Sessions.Any()
            )
            {
                throw new Exception(
                    "Cannot delete event with existing sessions"
                );
            }

            // PARTICIPANTS REGISTERED

            if (
                eventData.Participants != null &&
                eventData.Participants.Any()
            )
            {
                throw new Exception(
                    "Cannot delete event with registered participants"
                );
            }

            await _repo.DeleteAsync(id);
        }
    }
}