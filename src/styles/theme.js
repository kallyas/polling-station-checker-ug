import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Uganda flag colors
const ugandaColors = {
  black: "#000000",
  yellow: "#FCDC04",
  red: "#D90000",
  green: "#009E49",
  darkGreen: "#00632C",
};

// Create the base theme
let theme = createTheme({
  palette: {
    primary: {
      main: ugandaColors.green,
      dark: ugandaColors.darkGreen,
      contrastText: "#ffffff",
    },
    secondary: {
      main: ugandaColors.yellow,
      contrastText: "#000000",
    },
    error: {
      main: ugandaColors.red,
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${ugandaColors.green} 0%, ${ugandaColors.darkGreen} 100%)`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: ugandaColors.green,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: ugandaColors.green,
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
        elevation2: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

// Enable dark mode customizations
theme.palette.mode = "light";

const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: "dark",
    primary: {
      main: ugandaColors.green,
      dark: ugandaColors.darkGreen,
      contrastText: "#ffffff",
    },
    secondary: {
      main: ugandaColors.yellow,
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#b0b0b0",
    },
  },
});

export { theme, darkTheme };
