import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";

function NotFoundPage() {
  return (
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 10,
          minHeight: "60vh",
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <ErrorOutlineIcon
            color="error"
            sx={{
              fontSize: 120,
              mb: 4,
              color: (theme) =>
                theme.palette.mode === "dark" ? "error.light" : "error.main",
              opacity: 0.8,
            }}
          />
        </motion.div>

        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{
            background: "linear-gradient(45deg, #FF5370 30%, #FF8E53 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Page Not Found
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 600, mb: 4 }}
        >
          Oops! The page you're looking for doesn't seem to exist. It might have
          been moved or deleted.
        </Typography>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            sx={{ py: 1.5, px: 4 }}
          >
            Back to Homepage
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
