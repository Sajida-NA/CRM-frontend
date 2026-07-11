import { Box } from "@mui/material";

export default function FilterSection({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap:1,
        py: 2.5,
        px: 2,
        backgroundColor: "background.paper",
      }}
    >
      {children}
    </Box>
  );
}