import { Box, Container, Typography, useTheme } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";

function MainLayout({ children }) {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Navbar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          mt: "auto",
          borderTop: 1,
          borderColor: "divider",
          textAlign: "center",
          bgcolor: theme.palette.mode === "dark" ? "background.paper" : "white",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {currentYear} Polling Station Finder - Uganda
        </Typography>
      </Box>
    </Box>
  );
}

export default MainLayout;
