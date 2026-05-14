namespace EMS.Application.DTOs
{
    public class EventResponseDto
    {
        public Guid EventId { get; set; }
        public Guid CategoryId { get; set; }
        public string EventName { get; set; }
        public string CategoryName { get; set; }
        public DateTime EventDate { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; }
    }
}
