using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniqueNotesBackend.Data;
using UniqueNotesBackend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace UniqueNotesBackend.Controllers
{
    [ApiController]
    [Route("api/notes")]
    [Authorize] // Ensures that all actions in this controller require authentication
    public class NotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get user's notes
        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // JWT should contain the userId as NameIdentifier claim
            if (userId == null)
            {
                return Unauthorized("User not found in token.");
            }

            // Log userId for debugging
            Console.WriteLine($"User ID: {userId}");

            var notes = await _context.Notes.Where(n => n.UserId == userId).ToListAsync();
            return Ok(notes);
        }

        // Create a new note for the user
        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] Note note)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not found in token.");
            }

            note.UserId = userId; // Set the userId for the note

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetNotes), new { id = note.Id }, note);
        }

        // Delete a note by the user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not found in token.");
            }

            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
