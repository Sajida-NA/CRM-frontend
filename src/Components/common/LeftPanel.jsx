import React from "react";
import { Box, Typography } from "@mui/material";

// Material UI Icons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";
import EditSquareIcon from "@mui/icons-material/EditSquare";

export default function LeftPanel({
  // Page title (Lead, Company, Deal, Ticket)
  title,

  // Quick action buttons
  actions,

  // Details displayed in the About section
  leadDetails,

  // Handles quick action button click
  handleActionClick,

  // Dynamic profile information
  profile = {},

  // About section heading
  sectionTitle = "About this lead",
}) {
  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#fff",
        borderTopLeftRadius: "17px",
        borderBottomLeftRadius: "19px",
        p: 2,
      }}
    >
      {/* ================= Page Title ================= */}
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      {/* ================= Profile Section ================= */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Profile Image Placeholder */}
        <Box
          sx={{
            width: 72,
            height: 72,
            backgroundColor: "#D9D9D9",
            borderRadius: "12px",
          }}
        />

        {/* Profile Information */}
        <Box>
          {/* Name */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            {profile.name || "Jane Cooper"}
          </Typography>

          {/* Subtitle / Job Title */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#33475B",
            }}
          >
            {profile.subTitle || "SalesPerson"}
          </Typography>

          {/* Email with Edit Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#33475B",
              }}
            >
              {profile.email || "janecooper@gmail.com"}
            </Typography>

            <EditSquareIcon
              sx={{
                fontSize: 14,
                color: "#5A45E5",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ================= Quick Action Buttons ================= */}
      <Box
        sx={{
          backgroundColor: "#F7F7FA",
          borderRadius: "8px",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {actions.map((item) => (
          <Box
            key={item.label}
            sx={{
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleActionClick(item.label)}
          >
            {/* Action Icon */}
            <Box
              sx={{
                width: 32,
                height: 32,
                border: "1px solid #E0E3EB",
                borderRadius: "5px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {React.cloneElement(item.icon, {
                sx: {
                  fontSize: 18,
                  color: "#5948DB",
                },
              })}
            </Box>

            {/* Action Label */}
            <Typography
              sx={{
                fontSize: "10px",
                mt: 0.5,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ================= About Section Header ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            color: "#33475B",
          }}
        >
          {sectionTitle}
        </Typography>

        {/* Edit About Section */}
        <EditSquareIcon
          sx={{
            fontSize: 14,
            color: "#5A45E5",
            cursor: "pointer",
          }}
        />
      </Box>

      {/* ================= Details Section ================= */}
      {leadDetails.map((item) => (
        <Box
          key={item.label}
          sx={{
            mb: 2,
          }}
        >
          {/* Detail Label */}
          <Typography
            sx={{
              color: "#516F90",
              fontSize: "13px",
            }}
          >
            {item.label}
          </Typography>

          {/* Detail Value */}
          <Typography
            sx={{
              fontSize: "15px",
              color: "#1E1E1E",
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}