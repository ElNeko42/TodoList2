import axios from "axios";
import { Task } from "./components/TodoList/TodoList.types"; // Ajusta la ruta según tu proyecto
import { CreateTaskDto } from "./components/TodoList/TodoList.types";

const api = axios.create({
  baseURL: "https://localhost:7039/api",
});

// Obtener todas las tareas
export const getTasks = () => api.get<Task[]>("/tasks");

// Crear una tarea 
// (recibe CreateTaskDto y retorna Task creado)
export const createTask = (dto: {
  title: string;
  description: string;
  status?: string;
}) => api.post<Task>("/tasks", dto);


// Actualizar una tarea
export const updateTask = (id: number, task: Task) =>
  api.put(`/tasks/${id}`, task);

// Eliminar una tarea
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);