using Microsoft.AspNetCore.Mvc;
using TodoList2.Server.Models;

namespace TodoList2.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        /// <summary>
        /// Endpoint para autenticar al usuario.
        /// </summary>
        /// <param name="loginRequest">Credenciales del usuario.</param>
        /// <returns>Token de autenticación o error 401.</returns>
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        if (loginRequest.Username == "admin" && loginRequest.Password == "123456")
        {
            return Ok(new { Token = "FakeJWTTokenForDemo" });
        }

        return Unauthorized("Usuario o contraseña incorrectos.");
    }
    }
}
