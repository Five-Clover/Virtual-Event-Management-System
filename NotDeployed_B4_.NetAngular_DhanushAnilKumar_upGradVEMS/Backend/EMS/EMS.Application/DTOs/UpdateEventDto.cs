namespace EMS.Application.DTOs
{
    public class UpdateEventDto
    {
        public string EventName { get; set; }
        public Guid CategoryId { get; set; }
        public DateTime EventDate { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }
    }
}
