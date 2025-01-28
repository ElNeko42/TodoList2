import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import TaskBoard from "./components/TaskBoard/TaskBoard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta del Login */}
        <Route path="/" element={<LoginForm />} />

        {/* Ruta del ToDo List */}
        <Route path="/todo" element={<TaskBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
