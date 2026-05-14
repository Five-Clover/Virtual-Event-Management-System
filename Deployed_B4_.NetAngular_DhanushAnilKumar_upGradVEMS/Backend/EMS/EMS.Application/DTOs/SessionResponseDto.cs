namespace EMS.Application.DTOs
{
    public class SessionResponseDto
    {
        public Guid SessionId { get; set; }
        public Guid EventId { get; set; }
        public Guid SpeakerId { get; set; }
        public string Title { get; set; }
        public string EventName { get; set; }
        public string SpeakerName { get; set; }
        public DateTime SessionStart { get; set; }
        public DateTime SessionEnd { get; set; }
        public string? SessionUrl { get; set; }
        public string? Description { get; set; }
    }
}
