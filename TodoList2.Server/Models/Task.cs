namespace TodoList2.Server.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public string Status { get; set; } = "Pendiente";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
