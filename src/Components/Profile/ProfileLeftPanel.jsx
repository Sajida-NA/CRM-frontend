import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const iconMap = {
  Note: <NoteAltOutlinedIcon fontSize="small" />,
  Email: <EmailOutlinedIcon fontSize="small" />,
  Call: <CallOutlinedIcon fontSize="small" />,
  Task: <TaskAltOutlinedIcon fontSize="small" />,
  Meeting: <EventOutlinedIcon fontSize="small" />,
};

export default function ProfileLeftPanel({
  title,
  profile,
  about,
  quickActions = [],
  onActionClick,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 3,
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        {title}
      </Typography>

      {/* Profile */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
      >
        <Avatar
          src={profile?.avatar}
          sx={{
            width: 72,
            height: 72,
            bgcolor: "#E8ECF3",
            color: "#5B5FC7",
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          {!profile?.avatar &&
            profile?.name?.charAt(0)}
        </Avatar>

        <Box flex={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: .5,
            }}
          >
            {profile?.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {profile?.subtitle}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: .5 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {profile?.email}
            </Typography>

            <IconButton
              size="small"
              sx={{
                color: "primary.main",
                p: .3,
              }}
            >
              <EditSquareIcon
                sx={{ fontSize: 16 }}
              />
            </IconButton>
          </Stack>
        </Box>
      </Stack>

      {/* Quick Actions */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 1.5,
          bgcolor: "#F7F8FC",
          borderRadius: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          {quickActions.map((action) => (
            <Box
              key={action}
              onClick={() =>
                onActionClick?.(action)
              }
              sx={{
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                  mx: "auto",
                }}
              >
                {iconMap[action]}
              </Box>

              <Typography
                variant="caption"
                sx={{
                  mt: .7,
                  display: "block",
                  fontWeight: 500,
                }}
              >
                {action}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
            {/* About Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 4,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {about?.title}
        </Typography>

        <IconButton
          size="small"
          sx={{
            color: "primary.main",
            p: 0.4,
          }}
        >
          <EditSquareIcon
            sx={{
              fontSize: 18,
            }}
          />
        </IconButton>
      </Stack>

      {/* Details */}
      <Stack spacing={2}>
        {about?.details?.map((item) => (
          <Box key={item.label}>
            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
                mb: 0.4,
                fontWeight: 500,
              }}
            >
              {item.label}
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                color: "text.primary",
                fontWeight: 500,
                wordBreak: "break-word",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}