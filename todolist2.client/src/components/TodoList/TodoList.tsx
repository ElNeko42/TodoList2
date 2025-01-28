import React, { useState, useEffect } from "react";
import {  getTasks, createTask, deleteTask, updateTask } from "../../api";
import { Task } from "./TodoList.types";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    // Validaciones front
    if (!newTitle.trim()) {
      alert("El título es obligatorio");
      return;
    }
    if (newDesc.trim().length < 10) {
      alert("Descripción mínima de 10 caracteres");
      return;
    }
    try {
      const res = await createTask({
        title: newTitle,
        description: newDesc,
      });
      // Insertar al principio
      setTasks((prev) => [res.data, ...prev]);
      setNewTitle("");
      setNewDesc("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (updated: Task) => {
    // Validaciones front
    if (!updated.title.trim()) {
      alert("El título es obligatorio");
      return;
    }
    if (updated.description.trim().length < 10) {
      alert("Descripción mínima de 10 caracteres");
      return;
    }
    try {
      await updateTask(updated.id, updated);
      // Reemplazar en el estado
      setTasks((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-list">
      <div className="todo-list__input">
        <h2>Nueva Tarea</h2>
        <input
          type="text"
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button onClick={handleCreate}>Agregar</button>
      </div>

      <ul className="todo-list__items">
        {tasks.map((task) => (
          <TodoListItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
