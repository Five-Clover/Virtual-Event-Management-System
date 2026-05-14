using EMS.DAL.Data;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly EMSDbContext _context;

        public EventRepository(EMSDbContext context)
        {
            _context = context;
        }

        public async Task<List<EventDetails>> GetAllAsync()
        {
            return await _context.Events
                .Include(e => e.Category)
                .ToListAsync();
        }

        public async Task<EventDetails?> GetByIdAsync(Guid id)
        {
            return await _context.Events
                .Include(e => e.Category)
                .Include(x => x.Sessions)
                .Include(x => x.Participants)
                .FirstOrDefaultAsync(e => e.EventId == id);
        }

        public async Task AddAsync(EventDetails model)
        {
            await _context.Events.AddAsync(model);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(EventDetails model)
        {
            _context.Events.Update(model);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var ev = await _context.Events.FindAsync(id);

            if (ev != null)
            {
                _context.Events.Remove(ev);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsByNameAsync(string eventName)
        {
            return await _context.Events
                .AnyAsync(e => e.EventName.ToLower() == eventName.ToLower());
        }
    }
}