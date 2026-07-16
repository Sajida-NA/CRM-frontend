import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonIcon from "@mui/icons-material/Person";

const iconMap = {
  Note: <NoteAltOutlinedIcon sx={{ fontSize: 20 }} />,
  Email: <EmailOutlinedIcon sx={{ fontSize: 20 }} />,
  Call: <CallOutlinedIcon sx={{ fontSize: 20 }} />,
  Task: <TaskAltOutlinedIcon sx={{ fontSize: 20 }} />,
  Meeting: <EventOutlinedIcon sx={{ fontSize: 20 }} />,
};

export default function ProfileLeftPanel({
  profile,
  about,
  quickActions = [],
  onActionClick,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        px: 1,
        py: 1,
      }}
    >
      {/* 
          PROFILE SECTION
       */}

      <Stack
        direction="row"
        spacing={profile?.avatar === false ? 0 : 2}
        alignItems="flex-start"
      >
        {/* Profile Avatar / Company Logo */}

        {profile?.avatar !== false && (
         <Avatar
  src={profile?.avatarImage}
  sx={{
    width: 56,
    height: 56,
    borderRadius: "10px",
    bgcolor: "#EEF2FF",
    color: "#5A45E5",
  }}
>
  {!profile?.avatarImage && (
    <PersonIcon sx={{ fontSize: 30 }} />
  )}
</Avatar>
        )}

        {/* Profile Information */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Name */}

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#101828",
              lineHeight: 1.4,
            }}
          >
            {profile?.name}
          </Typography>

          {/* Subtitle */}

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 12,
              color: "#667085",
            }}
          >
            {profile?.subtitle}
          </Typography>

          {/* Email */}

          {profile?.email && (
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                mt: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#667085",
                }}
              >
                {profile.email}
              </Typography>

              <IconButton
                size="small"
                sx={{
                  p: 0.3,
                  color: "#5A45E5",

                  "&:hover": {
                    bgcolor: "#F5F3FF",
                  },
                }}
              >
                <EditSquareIcon
                  sx={{
                    fontSize: 15,
                  }}
                />
              </IconButton>
            </Stack>
          )}
        </Box>
      </Stack>

      {/* 
          QUICK ACTIONS
       */}

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          mt: 3,
          mb: 3,
        }}
      >
        {quickActions.map((action) => (
          <Box
            key={action}
            onClick={() => onActionClick?.(action)}
            sx={{
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {/* Square Action Icon */}

            <Box
              sx={{
                width: 40,
                height: 40,
                mx: "auto",

                border: "1px solid #D0D5DD",
                borderRadius: "8px",

                bgcolor: "#FFFFFF",
                color: "#5A45E5",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                transition:
                  "background-color 0.2s ease, border-color 0.2s ease",

                "&:hover": {
                  bgcolor: "#F5F3FF",
                  borderColor: "#5A45E5",
                },
              }}
            >
              {iconMap[action]}
            </Box>

            {/* Action Name */}

            <Typography
              sx={{
                mt: 0.7,
                fontSize: 11,
                fontWeight: 500,
                color: "#475467",
              }}
            >
              {action}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* 
          ABOUT SECTION
       */}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "#101828",
          }}
        >
          {about?.title}
        </Typography>

        <IconButton
          size="small"
          sx={{
            p: 0.3,
            color: "#5A45E5",

            "&:hover": {
              bgcolor: "#F5F3FF",
            },
          }}
        >
          <EditSquareIcon
            sx={{
              fontSize: 16,
            }}
          />
        </IconButton>
      </Stack>

      {/* 
          ABOUT DETAILS
       */}

      <Stack spacing={1.6}>
        {about?.details?.map((item) => (
          <Box key={item.label}>
            {/* Detail Label */}

            <Typography
              sx={{
                fontSize: 11,
                color: "#667085",
                mb: 0.3,
                fontWeight: 500,
              }}
            >
              {item.label}
            </Typography>

            {/* Detail Value */}

            <Typography
              sx={{
                fontSize: 13,
                color: "#101828",
                fontWeight: 500,
                lineHeight: 1.5,
                wordBreak: "break-word",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}