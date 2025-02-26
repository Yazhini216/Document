import React, { useState } from "react";

import "../pages/Theme.css"; // Import CSS file for styling

const Theme = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Function
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <Navbar/>
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <h1>Dark / Light Theme Toggle</h1>
      <p>Click the button to switch themes.</p>
    </div>
  );
};

export default Theme;
