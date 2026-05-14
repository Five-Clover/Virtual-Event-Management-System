using EMS.DAL.Data;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly EMSDbContext _context;

        public UserRepository(EMSDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(UserInfo user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<UserInfo?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.EmailId.ToLower() == email.ToLower());
        }

        public async Task<List<UserInfo>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}