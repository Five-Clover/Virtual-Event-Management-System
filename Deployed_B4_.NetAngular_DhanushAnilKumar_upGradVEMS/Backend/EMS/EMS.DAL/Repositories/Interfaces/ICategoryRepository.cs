using EMS.DAL.Models;

namespace EMS.DAL.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<CategoryDetails>> GetAllAsync();
    }
}