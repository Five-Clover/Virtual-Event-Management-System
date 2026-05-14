using System.ComponentModel.DataAnnotations;

namespace EMS.Application.DTOs
{
    public class CreateEventDto
    {
        [Required]
        public string EventName { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public DateTime EventDate { get; set; }

        public string? Description { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
