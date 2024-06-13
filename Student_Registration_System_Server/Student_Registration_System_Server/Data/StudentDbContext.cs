using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Student_Registration_System_Server.Models;

namespace Student_Registration_System_Server.Data
{
    public class StudentDbContext : IdentityDbContext<AppUser>
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : 
            base(options)
        {
            
        }

        public DbSet<StudentsModel> Students { get; set; }


    }
}
