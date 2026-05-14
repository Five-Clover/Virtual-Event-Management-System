using System.ComponentModel.DataAnnotations;

namespace EMS.Application.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string EmailId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string UserName { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 6)]
        [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$",
        ErrorMessage = "Password must contain at least one uppercase, one lowercase, one number, and one special character"
            )]
        public string Password { get; set; }
    }
}
