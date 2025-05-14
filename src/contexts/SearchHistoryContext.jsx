import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SearchHistoryContext = createContext();

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider"
    );
  }
  return context;
};

export const SearchHistoryProvider = ({ children }) => {
  const [history, setHistory] = useLocalStorage("voterSearchHistory_v2", []); // Stores an array of search objects
  // Added _v2 to avoid conflicts with potential old versions

  const addSearchToHistory = (searchEntry) => {
    // searchEntry: { id: string, timestamp: string (ISO), data?: object, status: 'success' | 'error', message?: string }
    setHistory((prevHistory) => {
      // Prevent duplicate consecutive entries for the same ID if needed, or just add
      const newHistory = [searchEntry, ...prevHistory];
      return newHistory.slice(0, 15); // Keep last 15 searches
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <SearchHistoryContext.Provider
      value={{ history, addSearchToHistory, clearHistory }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};
