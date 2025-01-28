import React, { useState, useEffect } from "react";
import { Task } from "../TodoList/TodoList.types"; 
import { getTasks, createTask, updateTask, deleteTask } from "../../api";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import "./TaskBoard.css";

const columns = ["Pendiente", "Haciendo", "Hecho"];

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async (title: string, description: string) => {
    console.log("Creando con:", title, description);
    try {
      const res = await createTask({ title, description, status: "Pendiente" });
      console.log("Respuesta del server:", res.data);
      setTasks((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm("¿Eliminar la tarea?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Cambiar el status de la tarea (por ejemplo con un menú o un botón)
  const handleStatusChange = async (task: Task, newStatus: string) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      await updateTask(task.id, updatedTask);
      // Reemplazamos en el estado local
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="task-board-container">
      <h1>Mi ToDo List</h1>

      {/* Formulario para crear nueva tarea */}
      <CreateTaskForm onCreate={handleCreateTask} />

      <div className="columns-container">
        {columns.map((column) => {
          // Filtramos las tareas que coincidan con cada status
          const tasksInColumn = tasks.filter((t) => t.status === column);
          
          return (
            <div key={column} className="column">
              <h2>{column}</h2>
              {tasksInColumn.map((task) => (
                <div key={task.id} className="task-card">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  
                  {/* Botones para cambiar status */}
                  <div className="task-buttons">
                    {columns.map((status) => (
                      <button
                        key={status}
                        disabled={status === task.status}
                        onClick={() => handleStatusChange(task, status)}
                      >
                        {status}
                      </button>
                    ))}
                    <button onClick={() => handleDeleteTask(task.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
