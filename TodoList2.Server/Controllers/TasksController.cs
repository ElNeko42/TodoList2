using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList2.Server.Data;
using TodoList2.Server.Models;

namespace TodoList2.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            // Devuelve tareas ordenadas por CreatedAt descendente
            var tasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(tasks);
        }


        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TodoTask task)
        {
            if (string.IsNullOrEmpty(task.Title) || task.Description.Length < 10)
                return BadRequest("Título obligatorio y descripción >= 10 caracteres.");

            // Si no viene nada, forzamos "Pendiente" en el servidor:
            if (string.IsNullOrEmpty(task.Status))
                task.Status = "Pendiente";

            // Guardar
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Devolver la tarea con su status
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }


        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TodoTask updatedTask)
        {
            var existing = await _context.Tasks.FindAsync(id);
            if (existing == null)
                return NotFound();

            if (string.IsNullOrEmpty(updatedTask.Title) || updatedTask.Description.Length < 10)
                return BadRequest("El título es obligatorio y la descripción debe tener al menos 10 caracteres.");

            existing.Title = updatedTask.Title;
            existing.Description = updatedTask.Description;

            // Actualizamos Status
            existing.Status = updatedTask.Status ?? existing.Status;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
