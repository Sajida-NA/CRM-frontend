import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

const iconMap = {
  Call: <CallOutlinedIcon fontSize="small" />,
  Email: <EmailOutlinedIcon fontSize="small" />,
  Note: <NoteAltOutlinedIcon fontSize="small" />,
  Meeting: <EventOutlinedIcon fontSize="small" />,
  Task: <TaskAltOutlinedIcon fontSize="small" />,
  Ticket: <ConfirmationNumberOutlinedIcon fontSize="small" />,
};

export default function ActivityCard({
  type = "Note",
  title,
  date,
  description,
  createdBy,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        mb: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
      >
        {/* Activity Icon */}
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#F5F3FF",
            color: "primary.main",
          }}
        >
          {iconMap[type]}
        </Avatar>

        <Box flex={1}>
          {/* Title */}
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          {/* Created By */}
          {createdBy && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.3 }}
            >
              {createdBy}
            </Typography>
          )}

          {/* Date */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              mt: 0.5,
            }}
          >
            {date}
          </Typography>

          {/* Description */}
          {description && (
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                color: "text.primary",
                lineHeight: 1.7,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}