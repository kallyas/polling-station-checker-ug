import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./styles/theme";
import { SearchHistoryProvider } from "./contexts/SearchHistoryContext";
import "./styles/global.css"; // For any minimal global overrides or font imports

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SearchHistoryProvider>
        <Router>
          <App />
        </Router>
      </SearchHistoryProvider>
    </ChakraProvider>
  </React.StrictMode>
);
