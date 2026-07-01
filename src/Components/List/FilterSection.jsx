import { Box } from "@mui/material";

export default function FilterSection({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        py: 2.5,
        px: 0,
        bgcolor: "background.paper",
        borderRadius: 2,
        mb: 3,
      }}
    >
      {children}
    </Box>
  );
}