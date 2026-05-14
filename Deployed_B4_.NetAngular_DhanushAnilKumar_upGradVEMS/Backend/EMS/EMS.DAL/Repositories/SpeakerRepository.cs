using EMS.DAL.Data;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Repositories
{
    public class SpeakerRepository : ISpeakerRepository
    {
        private readonly EMSDbContext _context;

        public SpeakerRepository(EMSDbContext context)
        {
            _context = context;
        }

        public async Task<List<SpeakersDetails>> GetAllAsync()
        {
            return await _context.Speakers.ToListAsync();
        }

        public async Task AddAsync(SpeakersDetails speaker)
        {
            await _context.Speakers.AddAsync(speaker);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var sp = await _context.Speakers.FindAsync(id);

            if (sp != null)
            {
                _context.Speakers.Remove(sp);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<SpeakersDetails?> GetByIdAsync(Guid id)
        {
            return await _context.Speakers
                .Include(x => x.Sessions)
                .FirstOrDefaultAsync(
                    s => s.SpeakerId == id);
        }

        public async Task UpdateAsync(SpeakersDetails speaker)
        {
            _context.Speakers
                .Update(speaker);

            await _context.SaveChangesAsync();
        }
    }
}