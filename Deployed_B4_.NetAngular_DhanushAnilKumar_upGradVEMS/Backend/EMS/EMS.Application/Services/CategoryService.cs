using EMS.Application.Interfaces;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;

namespace EMS.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;

        public CategoryService(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CategoryDetails>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }
    }
}
