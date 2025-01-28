import React, { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "../../api";
import TodoListItem from "./TodoListItem";
import Header from "../Header/Header"; 
import "./TodoList.css";
import { Task } from "./TodoList.types";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [searchValue, setSearchValue] = useState(""); // <-- Estado para el texto de búsqueda

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title || newTask.description.length < 10) {
      alert(
        "El título es obligatorio y la descripción debe tener al menos 10 caracteres."
      );
      return;
    }
    try {
      await createTask(newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Filtramos tareas según el texto introducido en la barra de búsqueda
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="todo-list">
      {/* Header con la búsqueda */}
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />

      {/* Formulario para crear una nueva tarea */}
      <div className="todo-list__input">
        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleCreateTask}>Agregar Tarea</button>
      </div>

      {/* Renderizado de tareas filtradas */}
      <ul className="todo-list__items">
        {filteredTasks.map((task) => (
          <TodoListItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
