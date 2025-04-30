using System;

namespace UniqueNotesBackend.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; }  // 🔑 Important: this is used to link notes to users
    }
}
