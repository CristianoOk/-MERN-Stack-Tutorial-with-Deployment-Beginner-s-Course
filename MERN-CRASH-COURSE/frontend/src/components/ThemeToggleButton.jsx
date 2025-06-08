//Sacado de la documentación oficial de Bootstrap (aparece con este título "Enable dark mode"), más adapatado por chatGPT para ser usado acá con react (porque la documentacón te lo da como html).
import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button className="btn btn-outline-secondary" onClick={toggleTheme}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggleButton;
