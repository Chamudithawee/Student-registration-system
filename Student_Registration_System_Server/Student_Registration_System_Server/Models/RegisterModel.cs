using System.ComponentModel.DataAnnotations;

namespace Student_Registration_System_Server.Models
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
