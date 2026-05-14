using System.ComponentModel.DataAnnotations;

namespace EMS.DAL.Models
{
    public class EventDetails
    {
        [Key]
        public Guid EventId { get; set; }

        [Required]
        public string EventName { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        public CategoryDetails? Category { get; set; }

        public DateTime EventDate { get; set; }

        public string? Description { get; set; }

        public string Status { get; set; }

        public ICollection<SessionInfo>? Sessions { get; set; }
        public ICollection<ParticipantEventDetails>? Participants { get; set; }
    }
}
