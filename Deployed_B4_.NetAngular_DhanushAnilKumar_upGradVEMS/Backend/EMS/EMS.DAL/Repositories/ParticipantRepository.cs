using EMS.DAL.Data;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Repositories
{
    public class ParticipantRepository : IParticipantRepository
    {
        private readonly EMSDbContext _context;

        public ParticipantRepository(EMSDbContext context)
        {
            _context = context;
        }

        public async Task RegisterEventAsync(ParticipantEventDetails data)
        {
            await _context.ParticipantEvents.AddAsync(data);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ParticipantEventDetails>> GetByUserAsync(string email)
        {
            return await _context.ParticipantEvents
                .Include(p => p.Event)
                .Where(p => p.ParticipantEmailId == email)
                .ToListAsync();
        }

        public async Task RemoveRegistrationAsync(string email, Guid eventId)
        {
            var data = await _context.ParticipantEvents
                .FirstOrDefaultAsync(p => p.ParticipantEmailId == email && p.EventId == eventId);

            if (data != null)
            {
                _context.ParticipantEvents.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<SessionInfo>> GetSessionsByUserAsync(string email)
        {
            return await _context.ParticipantEvents
                .Where(p => p.ParticipantEmailId == email)
                .SelectMany(p => p.Event.Sessions)
                .Include(s => s.Event)
                .Include(s => s.Speaker)
                .ToListAsync();
        }

        public async Task<ParticipantEventDetails?> GetByEmailAndEventAsync(string email, Guid eventId)
        {
            return await _context.ParticipantEvents
                .FirstOrDefaultAsync(x => x.ParticipantEmailId == email && x.EventId == eventId);
        }

        public async Task UpdateAsync(ParticipantEventDetails data)
        {
            _context.ParticipantEvents.Update(data);
            await _context.SaveChangesAsync();
        }
    }
}