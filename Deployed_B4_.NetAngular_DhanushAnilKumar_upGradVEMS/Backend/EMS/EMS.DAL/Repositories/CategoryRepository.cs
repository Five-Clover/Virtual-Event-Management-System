using EMS.DAL.Data;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly EMSDbContext _context;

        public CategoryRepository(EMSDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryDetails>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}