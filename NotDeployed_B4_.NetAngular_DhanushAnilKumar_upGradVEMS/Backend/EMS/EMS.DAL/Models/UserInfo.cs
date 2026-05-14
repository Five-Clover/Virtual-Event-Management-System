using System.ComponentModel.DataAnnotations;

namespace EMS.DAL.Models
{
    public class UserInfo
    {
        [Key]
        public string EmailId { get; set; }

        [Required, StringLength(50)]
        public string UserName { get; set; }

        [Required]
        public string Role { get; set; }

        [Required, StringLength(20, MinimumLength = 6)]
        public string Password { get; set; }

        public ICollection<ParticipantEventDetails> Registrations { get; set; }
    }
}
