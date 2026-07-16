import { Box, Paper, Typography } from "@mui/material";

export default function AuthLayout({
  title,
  children,
  footer,
  maxWidth = 500,
}) {
  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.background.default,
        px: 2,
        py: 4,
      })}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        <Paper
          elevation={0}
          sx={(theme) => ({
            p: 3,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[1],
            bgcolor: theme.palette.background.paper,
          })}
        >
          <Typography
            sx={{
              textAlign:"center",
              fontSize: 24,
              fontWeight: 750,
              mb: 3,
            }}
          >
            {title}
          </Typography>

          {children}
        </Paper>

        {footer && (
          <Typography
            align="center"
            sx={{
              mt: 3
            }}
          >
            {footer}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
