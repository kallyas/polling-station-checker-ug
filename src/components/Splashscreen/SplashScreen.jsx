import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";

function SplashScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #009E49 0%, #00632C 100%)",
        color: "white",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img
            src={logo}
            alt="App Logo"
            style={{
              width: "120px",
              height: "120px",
              filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.3))",
            }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
            }}
          >
            Polling Station Finder
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="normal"
            sx={{
              opacity: 0.9,
              textAlign: "center",
            }}
          >
            Uganda
          </Typography>
        </motion.div>

        <motion.div
          variants={itemVariants}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <CircularProgress
            size={50}
            thickness={4}
            sx={{
              color: "white",
              opacity: 0.9,
            }}
          />
        </motion.div>
      </motion.div>
    </Box>
  );
}

export default SplashScreen;
