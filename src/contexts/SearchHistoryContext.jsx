import React, { createContext, useContext, useMemo, useCallback } from "react";
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

  // Memoize the addSearchToHistory function to prevent unnecessary re-renders
  const addSearchToHistory = useCallback(
    (searchEntry) => {
      // searchEntry: { id: string, timestamp: string (ISO), data?: object, status: 'success' | 'error', message?: string }
      setHistory((prevHistory) => {
        // Check if this exact search already exists in history
        const existingIndex = prevHistory.findIndex(
          (item) => item.id === searchEntry.id
        );

        let newHistory;
        if (existingIndex !== -1) {
          // If exists, remove it and add the updated version at the top
          newHistory = [
            searchEntry,
            ...prevHistory.slice(0, existingIndex),
            ...prevHistory.slice(existingIndex + 1),
          ];
        } else {
          // If doesn't exist, add it to the top
          newHistory = [searchEntry, ...prevHistory];
        }

        // Keep only the last 20 searches to prevent excessive storage use
        return newHistory.slice(0, 20);
      });
    },
    [setHistory]
  );

  // Memoize the clearHistory function
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      history,
      addSearchToHistory,
      clearHistory,
    }),
    [history, addSearchToHistory, clearHistory]
  );

  return (
    <SearchHistoryContext.Provider value={contextValue}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
