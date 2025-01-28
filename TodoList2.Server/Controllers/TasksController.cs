using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList2.Server.Data;
using TodoList2.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace TodoList2.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")] // Swagger: indica que produce JSON
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene todas las tareas (ordenadas por CreatedAt desc).
        /// </summary>
        /// <returns>Lista de tareas</returns>
        // GET: api/tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(tasks);
        }

        /// <summary>
        /// Obtiene una tarea por su Id.
        /// </summary>
        /// <param name="id">El ID de la tarea</param>
        /// <returns>Objeto Tarea</returns>
        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) 
                return NotFound();
            return Ok(task);
        }

        /// <summary>
        /// Crea una nueva tarea.
        /// </summary>
        /// <param name="task">Objeto tarea a crear</param>
        /// <returns>La tarea creada</returns>
        // POST: api/tasks
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TodoTask task)
        {
            if (string.IsNullOrEmpty(task.Title) || task.Description.Length < 10)
                return BadRequest("Título obligatorio y descripción >= 10 caracteres.");

            if (string.IsNullOrEmpty(task.Status))
                task.Status = "Pendiente";

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        /// <summary>
        /// Actualiza una tarea por Id.
        /// </summary>
        /// <param name="id">El ID de la tarea a actualizar</param>
        /// <param name="updatedTask">Datos nuevos para la tarea</param>
        /// <returns>Nada (204 NoContent si exitoso)</returns>
        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TodoTask updatedTask)
        {
            var existing = await _context.Tasks.FindAsync(id);
            if (existing == null) return NotFound();

            if (string.IsNullOrEmpty(updatedTask.Title) || updatedTask.Description.Length < 10)
                return BadRequest("...");

            existing.Title = updatedTask.Title;
            existing.Description = updatedTask.Description;
            existing.Status = updatedTask.Status ?? existing.Status;

            // Si está en "Hecho", isCompleted = true; caso contrario, false
            existing.IsCompleted = (existing.Status == "Hecho");

            await _context.SaveChangesAsync();
            return NoContent();
        }


        /// <summary>
        /// Elimina una tarea existente.
        /// </summary>
        /// <param name="id">ID de la tarea a eliminar</param>
        /// <returns>Nada (204 NoContent si se elimina)</returns>
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
