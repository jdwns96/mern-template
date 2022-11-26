// darkmode Toggle
import React, { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="dark-mode-toggle">
      <input type="checkbox" id="dark-mode-toggle" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      <label htmlFor="dark-mode-toggle" />
    </div>
  );
}
