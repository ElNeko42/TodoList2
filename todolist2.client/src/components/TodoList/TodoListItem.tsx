import React from "react";
import "./TodoListItem.css";
import { Task } from "./TodoList.types";

interface TodoListItemProps {
    task: Task;
    onDelete: (id: number) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ task, onDelete }) => {
    return (
        <li className="todo-list-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
        </li>
    );
};

export default TodoListItem;
