using EMS.DAL.Models;
using EMS.DAL.Repositories;

namespace EMS.DAL.Tests
{
    public class ParticipantRepositoryTests
    {
        [Test]
        public async Task RegisterEvent_Should_Add_Record()
        {
            var context = TestDbContextFactory.Create();

            var eventId = Guid.NewGuid();

            context.Events.Add(new EventDetails
            {
                EventId = eventId,
                EventName = "Test Event",
                EventDate = DateTime.Now.AddDays(1),
                Status = "Active"
            });

            await context.SaveChangesAsync();

            var repo = new ParticipantRepository(context);

            var data = new ParticipantEventDetails
            {
                Id = Guid.NewGuid(),
                EventId = eventId, 
                ParticipantEmailId = "test@test.com"
            };

            await repo.RegisterEventAsync(data);

            var result = await repo.GetByUserAsync("test@test.com");

            Assert.AreEqual(1, result.Count);
        }
    }
}
