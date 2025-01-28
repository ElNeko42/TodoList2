import React, { useState } from "react";
import { Task } from "./TodoList.types";
import "./TodoListItem.css";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (task: Task) => void;
}

const TodoListItem: React.FC<Props> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);

  const toggleComplete = () => {
    onUpdate({
      ...task,
      isCompleted: !task.isCompleted,
    });
  };

  const handleSave = () => {
    onUpdate({
      ...task,
      title: editTitle,
      description: editDesc,
    });
    setIsEditing(false);
  };

  return (
    <li className={`todo-list-item ${task.isCompleted ? "completed" : ""}`}>
      <div>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={toggleComplete}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </>
        )}
      </div>

      <div className="todo-list-item__buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoListItem;
