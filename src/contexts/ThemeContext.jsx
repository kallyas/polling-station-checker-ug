import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeModeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
};

export const ThemeModeProvider = ({ children }) => {
  // Check for user's preference in localStorage or use system preference
  const getInitialMode = () => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      return savedMode;
    }

    // Check for system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light"; // Default to light mode
  };

  const [mode, setMode] = useState(getInitialMode);

  // Function to toggle between light/dark mode
  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem("themeMode")) {
        setMode(e.matches ? "dark" : "light");
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      {typeof children === "function" ? children(mode) : children}
    </ThemeModeContext.Provider>
  );
};
