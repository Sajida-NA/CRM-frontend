import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6F42C1", // CRM purple
    },
    background: {
      default: "#F5F5F5", // light gray page background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
    },
    divider: "#E5E7EB",
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 13,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9FAFB",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        head: {
          fontWeight: 600,
          color: "#374151",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

export default theme;
