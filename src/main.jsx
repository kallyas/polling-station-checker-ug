import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import App from "./App";
import { theme, darkTheme } from "./styles/theme";
import { SearchHistoryProvider } from "./contexts/SearchHistoryContext";
import { ThemeModeProvider } from "./contexts/ThemeContext";
import "./styles/global.css";
import { Analytics } from "@vercel/analytics/next"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeModeProvider>
      {(mode) => (
        <ThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
          <CssBaseline />
          <SnackbarProvider 
            maxSnack={3} 
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <SearchHistoryProvider>
              <Router>
                <App />
                <Analytics />
              </Router>
            </SearchHistoryProvider>
          </SnackbarProvider>
        </ThemeProvider>
      )}
    </ThemeModeProvider>
  </React.StrictMode>
);