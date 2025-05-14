// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage"; // We should create this

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading time for splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Adjust splash screen duration as needed

    return () => clearTimeout(timer);
  }, []);

  // If showing splash, only render that
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
      </Routes>
    </MainLayout>
  );
}

export default App;
