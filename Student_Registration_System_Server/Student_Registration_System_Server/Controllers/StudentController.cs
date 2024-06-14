using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Student_Registration_System_Server.Data;
using Student_Registration_System_Server.Models;

namespace Student_Registration_System_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly StudentDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public StudentController(StudentDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _hostEnvironment = webHostEnvironment;
        }

        // GET: api/students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentsModel>>> GetStudents()
        {
            var students = await _context.Students.ToListAsync();

            foreach (var student in students)
            {
                student.ImagePath = GetServerBaseUrl() + student.ImagePath;
            }

            return students;
        }

        // GET: api/students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentsModel>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }


        // POST: api/students
        [HttpPost]
        public async Task<ActionResult<StudentsModel>> PostStudent([FromForm] PostStudentDTO student, [FromForm] IFormFile imageFile)
        {
            try
            {
                StudentsModel studentsModel = new StudentsModel();
                studentsModel.FirstName = student.FirstName;
                studentsModel.LastName = student.LastName;
                studentsModel.Mobile = student.Mobile;
                studentsModel.Email = student.Email;
                studentsModel.NIC = student.NIC;
                studentsModel.DateOfBirth = student.DateOfBirth;
                studentsModel.Address = student.Address;

                if (imageFile != null && imageFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(imageFile.FileName);
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(fileStream);
                    }

                    studentsModel.ImagePath = "/uploads/" + uniqueFileName;
                }  
                
                _context.Students.Add(studentsModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);

            }

            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        // PUT: api/students/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, StudentsModel student)
        {
            if (id != student.Id)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            try
            {
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }

        private string GetServerBaseUrl()
        {
            var request = HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}";

            return baseUrl;
        }

    }
}
