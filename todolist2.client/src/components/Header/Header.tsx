import React from "react";
import "./Header.css";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchValue, onSearchChange }) => {
  return (
    <header className="header-container">
      <h1>To-Do List</h1>
      <div className="header-search">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
