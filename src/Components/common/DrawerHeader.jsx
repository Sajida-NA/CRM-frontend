import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DrawerHeader = ({
  title,
  onClose,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: "20px",
          color: "#1F2937",
        }}
      >
        {title}
      </Typography>

      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default DrawerHeader;