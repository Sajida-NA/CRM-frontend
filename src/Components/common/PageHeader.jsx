import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, actions }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: 1,
        mb: 3,
      }}
    >
      <Typography variant="h6" sx={{ color: "text.primary" }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex" }}>{actions}</Box>
    </Box>
  );
}
