using EMS.DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Tests
{
    public static class TestDbContextFactory
    {
        public static EMSDbContext Create()
        {
            var options = new DbContextOptionsBuilder<EMSDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new EMSDbContext(options);
        }
    }
}
