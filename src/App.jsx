// src/App.jsx
import React, { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import EmployeePage from "./pages/EmployeePage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define MUI themes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: isDarkMode ? "#121212" : "#f8f9fa",
            paper: isDarkMode ? "#1e1e1e" : "#ffffff",
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* resets CSS & applies theme globally */}
      <EmployeePage
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </ThemeProvider>
  );
}

export default App;
