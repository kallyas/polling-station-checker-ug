import { useState, useEffect, useCallback, useRef } from "react";

function getStorageValue(key, defaultValue) {
  // Check if code is running in browser
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    // Get stored value
    const item = localStorage.getItem(key);

    // Return parsed stored json or default value
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error retrieving data from localStorage:", error);
    return defaultValue;
  }
}

export const useLocalStorage = (key, defaultValue) => {
  // Lazy initial state to only get from localStorage on initial render
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  // Keep track of initial mount to avoid unnecessary storage updates
  const initialMount = useRef(true);

  // Update memoized setValue function
  const setStorageValue = useCallback(
    (newValue) => {
      // Allow functional updates
      setValue((prevValue) => {
        // Check if newValue is a function
        const valueToStore =
          newValue instanceof Function ? newValue(prevValue) : newValue;

        // Save state
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            console.error("Error setting localStorage item:", key, error);
          }
        }

        return valueToStore;
      });
    },
    [key]
  );

  // Add event listener for storage changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Error parsing localStorage change:", error);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [key]);

  // Synchronize state with localStorage after the first render
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage item:", key, error);
    }
  }, [key, value]);

  return [value, setStorageValue];
};
