import React from "react";
import { Box, Typography } from "@mui/material";

// AI summary icon
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

export default function RightPanel({
  // Dynamic AI summary title
  // Can be changed from parent component
  summaryTitle = "AI Lead Summary",

  // Dynamic AI summary content
  // Default text will be displayed if no data is passed
  summaryText = "There are no activities associated with this lead and further details are needed to provide a comprehensive summary.",
}) {
  return (
    // Right side panel container
    // Displays AI summary and attachments section
    <Box
      sx={{
        width: 230,
        backgroundColor: "#fff",
        borderTopRightRadius: "12px",
        p: 2,
      }}
    >
      {/* 
        AI Summary Card
        - Shows AI generated summary information
        - Title and text are received as props
      */}
      <Box
        sx={{
          border: "1px solid #5948DB",
          backgroundColor: "#F7F7FA",
          borderRadius: "8px",
          p: 2,
          mb: 3,
        }}
      >
        {/* AI Summary Heading */}
        <Typography
          sx={{
            fontWeight: 700,
            color: "#5948DB",
            mb: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* AI sparkle icon */}
          <AutoAwesomeOutlinedIcon
            color="primary"
            sx={{
              mr: 1,
            }}
          />

          {/* Dynamic summary title */}
          {summaryTitle}
        </Typography>

        {/* AI Summary Description */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#33475B",
            lineHeight: 1.6,
          }}
        >
          {summaryText}
        </Typography>
      </Box>

      {/* 
        Attachments Section
        - Displays files attached to activities
        - Allows adding new attachments
      */}
      <Box>
        {/* Attachment Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          {/* Section title */}
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Attachments
          </Typography>

          {/* Add attachment action */}
          <Typography
            sx={{
              fontWeight: 600,
              color: "#5948DB",
              cursor: "pointer",
            }}
          >
            + Add
          </Typography>
        </Box>

        {/* Attachment information text */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#516F90",
            lineHeight: 1.6,
          }}
        >
          See the files attached to your activities or uploaded to this record.
        </Typography>
      </Box>
    </Box>
  );
}
