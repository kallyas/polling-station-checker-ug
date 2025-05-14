import {
  Box,
  Container,
  Typography,
  useTheme,
  Link,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";

function MainLayout({ children }) {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];

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
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 1, sm: 3 }}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ mb: 2 }}
          >
            {footerLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  component={RouterLink}
                  to={link.path}
                  color="text.secondary"
                  underline="hover"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </Stack>

          <Typography variant="body2" color="text.secondary">
            © {currentYear} Polling Station Finder - Uganda. All rights
            reserved.
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            This service is not affiliated with the Electoral Commission of
            Uganda.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default MainLayout;
