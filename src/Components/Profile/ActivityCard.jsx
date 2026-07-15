import React from "react";
import {
  Avatar,
  Box,
  Typography,
} from "@mui/material";

import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

const iconMap = {
  Call: <CallOutlinedIcon sx={{ fontSize: 18 }} />,
  Email: <EmailOutlinedIcon sx={{ fontSize: 18 }} />,
  Note: <NoteAltOutlinedIcon sx={{ fontSize: 18 }} />,
  Meeting: <EventOutlinedIcon sx={{ fontSize: 18 }} />,
  Task: <TaskAltOutlinedIcon sx={{ fontSize: 18 }} />,
  Ticket: <ConfirmationNumberOutlinedIcon sx={{ fontSize: 18 }} />,
};

export default function ActivityCard({
  type = "Note",
  title,
  date,
  description,
  createdBy,
  entityType,
}) {
  // Ticket Profile Card
  if (entityType === "ticket") {
    return (
      <Box
        sx={{
          width: "100%",
          border: "1px solid #EAECF0",
          borderRadius: "10px",
          bgcolor: "#fff",
          px: 2,
          py: 1.5,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {/* Left Content */}

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              pr: 2,
            }}
          >
            {title && (
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#344054",
                  mb: 0.5,
                }}
              >
                {title}
              </Typography>
            )}

            {description && (
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#475467",
                  lineHeight: 1.5,
                }}
              >
                {description}
              </Typography>
            )}
          </Box>

          {/* Right Side - Date and Time */}

          <Typography
            sx={{
              fontSize: 11,
              color: "#667085",
              whiteSpace: "nowrap",
              flexShrink: 0,
              textAlign: "right",
              ml: "auto",
            }}
          >
            {date}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Company Profile Activity Card
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        py: 1.5,
        borderBottom: "1px solid #F2F4F7",

        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      {/* Activity Icon */}

      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: "#F4F3FF",
          color: "#5A45E5",
          flexShrink: 0,
        }}
      >
        {iconMap[type] || (
          <NoteAltOutlinedIcon sx={{ fontSize: 18 }} />
        )}
      </Avatar>

      {/* Content */}

      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "#101828",
          }}
        >
          {title}
        </Typography>

        {createdBy && (
          <Typography
            sx={{
              mt: 0.3,
              fontSize: 12,
              color: "#667085",
            }}
          >
            {createdBy}
          </Typography>
        )}

        <Typography
          sx={{
            mt: 0.3,
            fontSize: 11,
            color: "#667085",
          }}
        >
          {date}
        </Typography>

        {description && (
          <Typography
            sx={{
              mt: 0.8,
              fontSize: 12,
              lineHeight: 1.6,
              color: "#475467",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}