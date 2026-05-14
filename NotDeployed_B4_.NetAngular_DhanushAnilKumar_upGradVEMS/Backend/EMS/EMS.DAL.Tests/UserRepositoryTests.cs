using EMS.DAL.Models;
using EMS.DAL.Repositories;

namespace EMS.DAL.Tests
{
    public class UserRepositoryTests
    {
        [Test]
        public async Task AddAsync_Should_Add_User()
        {
            var context = TestDbContextFactory.Create();
            var repo = new UserRepository(context);

            var user = new UserInfo
            {
                EmailId = "test@test.com",
                UserName = "Test",
                Password = "Test@123",
                Role = "Participant"  
            };

            await repo.AddAsync(user);

            var result = await repo.GetByEmailAsync("test@test.com");

            Assert.IsNotNull(result);
        }

        [Test]
        public async Task GetAllAsync_Should_Return_Users()
        {
            var context = TestDbContextFactory.Create();
            var repo = new UserRepository(context);

            await repo.AddAsync(new UserInfo
            {
                EmailId = "a@test.com",
                UserName = "User A",
                Password = "Test@123",
                Role = "Participant"
            });

            await repo.AddAsync(new UserInfo
            {
                EmailId = "b@test.com",
                UserName = "User B",
                Password = "Test@123",
                Role = "Participant"
            });

            var users = await repo.GetAllAsync();

            Assert.AreEqual(2, users.Count);
        }
    }
}
