import { useState, useEffect } from 'react';

function getStorageValue(key, defaultValue) {
  if (typeof window !== 'undefined') { // Ensure localStorage is available
    const saved = localStorage.getItem(key);
    try {
      const initial = saved ? JSON.parse(saved) : defaultValue;
      return initial;
    } catch (error) {
      console.error("Error parsing localStorage item:", key, error);
      return defaultValue;
    }
  }
  return defaultValue; // Return default if not in browser
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting localStorage item:", key, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};