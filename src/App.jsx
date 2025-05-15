import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "./components/Splashscreen/SplashScreen";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";

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
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{ width: "100%" }}
        >
          <Box
            component="main"
            sx={{
              width: "100%",
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
