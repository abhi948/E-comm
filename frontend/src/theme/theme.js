import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#C31432",        // Deep Indian Red - traditional color from Indian textiles
      light: "#FFB448",       // Marigold Yellow - sacred flower color
      dark: "#800080",        // Royal Purple - represents luxury and royalty
      customBlack: "#2C3E50"  // Deep blue-black - inspired by night markets
    },
    secondary: {
      main: "#FF9933",        // Saffron - from Indian flag
      light: "#138808",       // Green - from Indian flag
      dark: "#D4AF37"         // Royal Gold - represents prosperity
    },
    background: {
      default: "#FFF7E6",     // Warm ivory - inspired by handmade paper
      paper: "#FFFFFF" ,
      card: '#704214'       // Pure white - base for designs
    },
    text: {
      primary: "#2C3E50",     // Deep blue-black
      secondary: "#C31432"    // Deep Indian Red
    },
    action: {
      hover: "#FFB44820",     // Marigold with opacity for hover states
      selected: "#D4AF3730"   // Gold with opacity for selected states
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: "6rem",
      "@media (max-width:960px)": {
        fontSize: "5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "4rem",
      },
      "@media (max-width:414px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "3.75rem",
      "@media (max-width:960px)": {
        fontSize: "3rem",
      },
      "@media (max-width:662px)": {
        fontSize: "2.3rem",
      },
      "@media (max-width:414px)": {
        fontSize: "2.2rem",
      },
    },
    h3: {
      fontSize: "3rem",
      "@media (max-width:960px)": {
        fontSize: "2.4rem",
      },
      "@media (max-width:662px)": {
        fontSize: "2rem",
      },
      "@media (max-width:414px)": {
        fontSize: "1.7rem",
      },
    },
    h4: {
      fontSize: "2.125rem",
      "@media (max-width:960px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      "@media (max-width:960px)": {
        fontSize: "1.25rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1.1rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      "@media (max-width:960px)": {
        fontSize: "1.1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      "@media (max-width:960px)": {
        fontSize: "1rem",
      },
      "@media (max-width:600px)": {
        fontSize: ".9rem",
      },
    },
    body2: {
      fontSize: "1rem",
      "@media (max-width:960px)": {
        fontSize: "1rem",
      },
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
      "@media (max-width:480px)": {
        fontSize: ".97rem",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(195, 20, 50, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid #FFB44820',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(212, 175, 55, 0.15)',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderLeft: '2px solid #C31432',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            '&.Mui-selected': {
              backgroundColor: '#FFB44820',
            },
          },
        },
      },
    },
  },
});

export default theme;