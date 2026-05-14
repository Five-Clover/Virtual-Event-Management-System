using System.ComponentModel.DataAnnotations;

namespace EMS.DAL.Models
{
    public class CategoryDetails
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string CategoryName { get; set; }

        public ICollection<EventDetails> Events { get; set; }
    }
}
