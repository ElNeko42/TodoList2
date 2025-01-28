# Proyecto ToDo List con Login

Este es un proyecto básico de una aplicación ToDo List con funcionalidades de autenticación y manejo de tareas, desarrollado con **ASP.NET Core** en el backend y **React** en el frontend.

---

## **Instrucciones para ejecutar el proyecto localmente**


### **1. Configuración del Backend**
1. Navega al directorio del servidor:
   cd TodoList2.Server
2.Restaura las dependencias:
    dotnet restore
3.Inicia el servidor:
   dotnet run --launch-profile https
### **2. Configuración del Frontend**
1. Navega al directorio del cliente
cd TodoList2.Client
2.Restaura las dependencias:
    npm install
3.Inicia el aplicación:
   npm start



### Autenticación:
- Credenciales predefinidas (`admin` / `123456`).
- Se implementó un sistema de rutas protegidas para garantizar que solo usuarios autenticados puedan acceder al ToDo List.

- la aplicacion de todo me inpire en las app estilo trello , jira para dar un toque original y no ser solo un listado de tareas



