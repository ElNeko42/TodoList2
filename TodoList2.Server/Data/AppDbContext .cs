using Microsoft.EntityFrameworkCore;
using TodoList2.Server.Models;

namespace TodoList2.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TodoTask> Tasks { get; set; }
    }
}
