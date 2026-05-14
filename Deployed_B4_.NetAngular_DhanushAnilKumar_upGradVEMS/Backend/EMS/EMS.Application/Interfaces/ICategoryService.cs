using EMS.DAL.Models;

namespace EMS.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDetails>> GetAllAsync();
    }
}
