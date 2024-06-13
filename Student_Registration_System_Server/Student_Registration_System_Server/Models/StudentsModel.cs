using System.ComponentModel.DataAnnotations;

namespace Student_Registration_System_Server.Models
{
    public class StudentsModel
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Mobile { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [RegularExpression(@"^\d{9}[\dxXvV]{1}|\d{12}$", ErrorMessage = "Invalid NIC format")]
        public string NIC { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }
    }
}
