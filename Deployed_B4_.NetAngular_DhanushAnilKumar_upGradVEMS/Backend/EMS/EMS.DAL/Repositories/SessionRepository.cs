using EMS.DAL.Data;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Repositories
{
    public class SessionRepository : ISessionRepository
    {
        private readonly EMSDbContext _context;

        public SessionRepository(EMSDbContext context)
        {
            _context = context;
        }

        public async Task<List<SessionInfo>> GetAllAsync()
        {
            return await _context.Sessions
                .Include(s => s.Event)
                .Include(s => s.Speaker)
                .ToListAsync();
        }

        public async Task<SessionInfo?> GetByIdAsync(Guid id)
        {
            return await _context.Sessions
                .Include(s => s.Event)
                .Include(s => s.Speaker)
                .FirstOrDefaultAsync(s => s.SessionId == id);
        }

        public async Task AddAsync(SessionInfo session)
        {
            await _context.Sessions.AddAsync(session);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(SessionInfo session)
        {
            _context.Sessions.Update(session);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var s = await _context.Sessions.FindAsync(id);

            if (s != null)
            {
                _context.Sessions.Remove(s);
                await _context.SaveChangesAsync();
            }
        }
    }
}