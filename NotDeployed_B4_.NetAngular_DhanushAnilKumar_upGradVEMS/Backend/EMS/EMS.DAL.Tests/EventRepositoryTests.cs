using EMS.DAL.Models;
using EMS.DAL.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EMS.DAL.Tests
{
    public class EventRepositoryTests
    {
        [Test]
        public async Task AddAsync_Should_Add_Event()
        {
            var context = TestDbContextFactory.Create();
            var repo = new EventRepository(context);
            var eventId = Guid.NewGuid();

            var ev = new EventDetails
            {
                EventId = eventId,
                EventName = "Test Event",
                EventDate = DateTime.Now.AddDays(1),
                Status = "Active"
            };

            await repo.AddAsync(ev);

            var exists = await context.Events.AnyAsync(e => e.EventId == eventId);

            Assert.IsTrue(exists);
        }

        [Test]
        public async Task DeleteAsync_Should_Remove_Event()
        {
            var context = TestDbContextFactory.Create();
            var repo = new EventRepository(context);

            var eventId = Guid.NewGuid();

            var ev = new EventDetails
            {
                EventId = eventId,
                EventName = "Test Event",
                EventDate = DateTime.Now.AddDays(1),
                Status = "Active"   
            };

            await repo.AddAsync(ev);

            await repo.DeleteAsync(eventId);

            var exists = await context.Events.AnyAsync(e => e.EventId == eventId);

            Assert.IsFalse(exists);
        }
    }
}
