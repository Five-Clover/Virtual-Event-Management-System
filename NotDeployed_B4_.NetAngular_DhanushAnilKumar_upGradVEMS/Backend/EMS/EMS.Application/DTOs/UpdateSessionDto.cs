namespace EMS.Application.DTOs
{
    public class UpdateSessionDto
    {
        public Guid EventId { get; set; }
        public Guid SpeakerId { get; set; }
        public string Title { get; set; }
        public DateTime SessionStart { get; set; }
        public DateTime SessionEnd { get; set; }
        public string? Description { get; set; }
        public string? SessionUrl { get; set; }
    }
}
