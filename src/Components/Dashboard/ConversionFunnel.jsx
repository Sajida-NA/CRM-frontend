import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const stages = [
  { label: "Contact", value: 70, color: "#6C63FF" },
  { label: "Qualified Lead", value: 50, color: "green" },
  { label: "Proposal Sent", value: 40, color: "goldenrod" },
  { label: "Negotiation", value: 30, color: "blue" },
  { label: "Closed Won", value: 20, color: "darkblue" },
  { label: "Closed Lost", value: 10, color: "red" },
];

const ConversionFunnel = () => (
  <Box>
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        textAlign: "left",
        fontSize: 19,
        fontWeight: "bold",
        color: "#191b1e",
      }}
    >
      Contact to Deal Conversion
    </Typography>

    {stages.map((stage) => (
      <Box key={stage.label} sx={{ mb: 2 }}>
        {/* Left-aligned stage label */}
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "left",
            fontSize: 12,
            fontWeight: 600,
            color: "#1F2937",
          }}
        >
          {stage.label}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={stage.value}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: "#E5E7EB",
            "& .MuiLinearProgress-bar": { bgcolor: stage.color },
          }}
        />
      </Box>
    ))}
  </Box>
);

export default ConversionFunnel;
