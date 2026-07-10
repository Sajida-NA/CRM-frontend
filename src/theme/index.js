import { createTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";
import shadows from "./shadows";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      light: colors.primaryLight,
      contrastText: "#FFFFFF",
    },

    background: {
      default: colors.background,
      paper: colors.paper,
    },

    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },

    divider: colors.border,

    success: {
      main: colors.success,
    },

    warning: {
      main: colors.warning,
    },

    error: {
      main: colors.error,
    },

    info: {
      main: colors.info,
    },
  },

  typography,

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.paper,
          borderRadius: 12,
          boxShadow: shadows.card,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "14px",
          height: 40,
          paddingInline: 20,
          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },

      variants: [
        {
          props: {
            variant: "contained",
            color: "primary",
          },
          style: {
            backgroundColor: "#6C63FF",
            color: "#fff",

            "&:hover": {
              backgroundColor: "#5B52F5",
            },

            "&:disabled": {
              backgroundColor: "#D8D5FF",
              color: "#fff",
            },
          },
        },

        {
          props: {
            variant: "outlined",
            color: "primary",
          },
          style: {
            backgroundColor: "#fff",
            color: "#6C63FF",
            border: "1px solid #6C63FF",

            "&:hover": {
              backgroundColor: "#F5F3FF",
              border: "1px solid #6C63FF",
            },
          },
        },

        {
          props: {
            variant: "text",
            color: "primary",
          },
          style: {
            color: "#6C63FF",

            "&:hover": {
              backgroundColor: "#F5F3FF",
            },
          },
        },
      ],
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 6,
          color: colors.border,

          "&.Mui-checked": {
            color: colors.primary,
          },

          "& .MuiSvgIcon-root": {
            fontSize: 20,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 42,
          backgroundColor: colors.paper,
          borderRadius: 10,

          "& fieldset": {
            borderRadius: 10,
            borderColor: colors.border,
          },

          "&:hover fieldset": {
            borderColor: "#CBD5E1",
          },

          "&.Mui-focused fieldset": {
            borderColor: colors.primary,
            borderWidth: 1,
          },
        },

        input: {
          fontSize: "14px",
          color: colors.textPrimary,

          "&::placeholder": {
            color: "#727680",

            opacity: 1,
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: "14px",
          color: colors.textPrimary,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: colors.primary,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",

          "&.Mui-selected": {
            color: colors.primary,
          },
        },
      },
    },
  },
});

export default theme;
