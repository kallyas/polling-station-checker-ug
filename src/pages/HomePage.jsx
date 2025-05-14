import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Fade,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import BallotIcon from "@mui/icons-material/Ballot";
import PeopleIcon from "@mui/icons-material/People";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSnackbar } from "notistack";
import { motion, AnimatePresence } from "framer-motion";

import VoterForm from "../components/VoterForm/VoterForm";
import VoterInfoCard from "../components/VoterInfoCard/VoterInfoCard";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { getVoterDetails } from "../services/voterService";
import { useSearchHistory } from "../contexts/SearchHistoryContext";
import logo from "../assets/logo.svg";

// SVG patterns for background decoration
const PatternBallot = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.7, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    style={{
      position: "absolute",
      top: "10%",
      right: "5%",
      zIndex: 0,
      opacity: 0.7,
    }}
  >
    <motion.div
      animate={{
        rotate: [0, 10, -10, 5, 0],
        y: [0, -10, 10, -5, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <BallotIcon sx={{ fontSize: 60, color: "primary.light", opacity: 0.3 }} />
    </motion.div>
  </motion.div>
);

const PatternPeople = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    style={{ position: "absolute", top: "60%", left: "8%", zIndex: 0 }}
  >
    <motion.div
      animate={{
        rotate: [0, -5, 5, -2, 0],
        x: [0, 10, -10, 5, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <PeopleIcon
        sx={{ fontSize: 50, color: "secondary.light", opacity: 0.3 }}
      />
    </motion.div>
  </motion.div>
);

const PatternPin = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.7, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    style={{ position: "absolute", bottom: "15%", right: "12%", zIndex: 0 }}
  >
    <motion.div
      animate={{
        rotate: [0, 15, -15, 7, 0],
        y: [0, -15, 15, -7, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <PersonPinCircleIcon
        sx={{ fontSize: 45, color: "error.light", opacity: 0.3 }}
      />
    </motion.div>
  </motion.div>
);

const PatternVote = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.7, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.8 }}
    style={{ position: "absolute", top: "30%", left: "6%", zIndex: 0 }}
  >
    <motion.div
      animate={{
        rotate: [0, 10, -10, 5, 0],
        x: [0, -15, 15, -7, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <HowToVoteIcon
        sx={{ fontSize: 55, color: "primary.dark", opacity: 0.3 }}
      />
    </motion.div>
  </motion.div>
);

const PatternCamera = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
    style={{ position: "absolute", bottom: "30%", left: "15%", zIndex: 0 }}
  >
    <motion.div
      animate={{
        rotate: [0, -8, 8, -4, 0],
        y: [0, 12, -12, 6, 0],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <CameraEnhanceIcon
        sx={{ fontSize: 40, color: "info.light", opacity: 0.3 }}
      />
    </motion.div>
  </motion.div>
);

const FloatingLogo = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    style={{
      position: "absolute",
      top: "5%",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 0,
      width: 80,
      height: 80,
    }}
  >
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        rotate: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    >
      <img
        src={logo}
        alt="Uganda Polling Station Finder Logo"
        style={{
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.2))",
        }}
      />
    </motion.div>
  </motion.div>
);

const DotPattern = ({ count = 20, delay = 0 }) => {
  const dots = Array.from({ length: count }, (_, i) => i);

  return dots.map((dot, index) => {
    const size = Math.random() * 8 + 3;
    const x = Math.random() * 100; // % position
    const y = Math.random() * 100; // % position

    return (
      <motion.div
        key={`dot-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.5, delay: delay + index * 0.05 }}
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor:
            index % 3 === 0
              ? "#009E49"
              : index % 3 === 1
              ? "#FCDC04"
              : "#D90000",
          left: `${x}%`,
          top: `${y}%`,
          zIndex: 0,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "inherit",
          }}
        />
      </motion.div>
    );
  });
};

const SuccessAnimation = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      scale: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        duration: 0.8,
      },
      opacity: {
        duration: 0.3,
      },
    }}
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
    }}
  >
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        delay: 0.3,
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 120, color: "success.main" }} />
    </motion.div>
  </motion.div>
);

function HomePage() {
  const [voterData, setVoterData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addSearchToHistory } = useSearchHistory();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle prefill from history navigation
  useEffect(() => {
    if (location.state?.searchedId) {
      const { searchedId } = location.state;
      // Immediately perform search for the ID from history
      handleSearch(searchedId, true); // Pass a flag to indicate it's a re-search

      // Clear the location state to prevent re-triggering on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleSearch = async (idToSearch, isFromHistory = false) => {
    if (!idToSearch) {
      setError("Please enter a Voter ID.");
      setVoterData(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setVoterData(null);

    try {
      const result = await getVoterDetails(idToSearch);

      if (result.status === "success") {
        // Show success animation
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setVoterData(result.data);
        }, 800);

        // Success notification
        if (!isFromHistory) {
          enqueueSnackbar("Voter information found successfully!", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }

        // Add to search history
        addSearchToHistory({
          id: idToSearch,
          timestamp: new Date().toISOString(),
          data: result.data,
          status: "success",
        });
      } else {
        const errorMsg =
          result.message || "No voter found with provided details.";
        setError(errorMsg);
        setVoterData(null);

        if (!isFromHistory) {
          enqueueSnackbar(errorMsg, {
            variant: "error",
          });
        }

        // Add to search history if it's a new search or error from history view
        if (!isFromHistory || result.message) {
          addSearchToHistory({
            id: idToSearch,
            timestamp: new Date().toISOString(),
            status: "error",
            message: errorMsg,
          });
        }
      }
    } catch (err) {
      const errorMessage = err.message || "An unexpected error occurred.";
      setError(errorMessage);
      setVoterData(null);

      enqueueSnackbar(errorMessage, {
        variant: "error",
      });

      if (!isFromHistory || errorMessage) {
        addSearchToHistory({
          id: idToSearch,
          timestamp: new Date().toISOString(),
          status: "error",
          message: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "80vh",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      {!isMobile && (
        <>
          <DotPattern count={15} delay={0.5} />
          <PatternBallot />
          <PatternPeople />
          <PatternPin />
          <PatternVote />
          <PatternCamera />
          <FloatingLogo />
        </>
      )}

      <AnimatePresence>{showSuccess && <SuccessAnimation />}</AnimatePresence>

      <Container
        maxWidth="md"
        sx={{
          py: 4,
          position: "relative",
          zIndex: 1,
          backdropFilter: theme.palette.mode === "dark" ? "blur(5px)" : "none",
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 4, mt: isMobile ? 2 : 8 }}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight="bold"
                color="primary"
                sx={{
                  mb: 1,
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 10px rgba(0, 158, 73, 0.3)"
                      : "none",
                  background:
                    theme.palette.mode === "light"
                      ? "linear-gradient(45deg, #009E49 30%, #00632C 90%)"
                      : "linear-gradient(45deg, #00B058 30%, #009E49 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Uganda Polling Station Finder
              </Typography>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto", mb: 2 }}
              >
                {/* VOTER NUMBER / NATIONAL ID / APPLICATION ID */}
                Enter your Voter Identification Number (VIN) or National ID or
                Application ID to find your polling station.
              </Typography>
            </motion.div>
          </Box>

          <VoterForm onSearch={handleSearch} isLoading={isLoading} />

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              >
                <CircularProgress size={60} thickness={4} />
              </motion.div>
            </Box>
          )}

          {error && !isLoading && (
            <ErrorMessage message={error} onClose={() => setError(null)} />
          )}

          <Fade in={!isLoading && voterData !== null}>
            <Box>
              {voterData && !isLoading && !error && (
                <VoterInfoCard data={voterData} />
              )}
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
