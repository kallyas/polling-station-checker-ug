import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Avatar,
  useScrollTrigger,
  Slide,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import HistoryIcon from "@mui/icons-material/History";
import { motion } from "framer-motion";
import { useThemeMode } from "../../contexts/ThemeContext";
import logo from "../../assets/logo.svg";

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const navItems = [
  { name: "Check Polling Station", path: "/", icon: <HowToVoteIcon /> },
  { name: "Search History", path: "/history", icon: <HistoryIcon /> },
];

function Navbar() {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          src={logo}
          alt="Logo"
          sx={{ width: 40, height: 40, backgroundColor: "white", p: 1 }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Polling Station Finder
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={RouterNavLink}
              to={item.path}
              sx={{
                color: "text.primary",
                "&.active": {
                  color: "primary.main",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(0, 158, 73, 0.1)"
                      : "rgba(0, 158, 73, 0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar
          position="fixed"
          color="default"
          elevation={1}
          sx={{
            bgcolor:
              theme.palette.mode === "dark" ? "background.paper" : "white",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <RouterNavLink
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Avatar
                    src={logo}
                    alt="Logo"
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 1,
                      backgroundColor: "white",
                      p: 0.5,
                    }}
                  />
                </motion.div>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    mr: 2,
                    fontWeight: 700,
                    color: "primary.main",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  Polling Station Finder
                </Typography>
                <Typography
                  variant="subtitle1"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  PSF
                </Typography>
              </RouterNavLink>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    component={RouterNavLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      my: 2,
                      mx: 1,
                      color: "text.primary",
                      fontWeight: 500,
                      "&.active": {
                        color: "primary.main",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 7,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "40%",
                          height: 3,
                          bgcolor: "primary.main",
                          borderRadius: 2,
                        },
                      },
                      position: "relative",
                      "&:hover": {
                        bgcolor: "transparent",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 7,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "20%",
                          height: 3,
                          bgcolor: "primary.light",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                        },
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>

              <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar placeholder to push content below appbar */}
      <Toolbar />
    </Box>
  );
}

export default Navbar;
