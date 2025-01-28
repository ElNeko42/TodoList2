import React, { useState } from "react";

interface CreateTaskFormProps {
  onCreate: (title: string, description: string) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }
    if (description.trim().length < 10) {
      alert("La descripción debe tener al menos 10 caracteres");
      return;
    }
    onCreate(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="create-task-form">
      <h3>Crear nueva tarea</h3>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Agregar Tarea</button>
    </div>
  );
};

export default CreateTaskForm;
