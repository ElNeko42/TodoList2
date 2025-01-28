import React from "react";
import TaskBoard from "./components/TaskBoard/TaskBoard";
// import TodoList from "./components/TodoList/TodoList";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <TaskBoard />
    </div>
  );
};

export default App;
