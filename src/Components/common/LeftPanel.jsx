import React from "react";
import { Box, Typography, Select, MenuItem, } from "@mui/material";

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

  //Square Button

  showProfileEdit = false,

  //profile image

  showProfileImage = false,
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
      {/* <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
        }}
      > */}

      <Box
        sx={{
          display: "flex",
          gap: showProfileImage ? 2 : 0,
          mb: 2,
        }}
      >


        {/* Profile Image Placeholder */}
        {showProfileImage && (

          <Box
            sx={{
              width: 72,
              height: 72,
              backgroundColor: "#D9D9D9",
              borderRadius: "12px",

            }}
          />
        )}

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


          {title === "Tickets" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#33475B",
                  mr: 1,
                }}
              >
                Status :
              </Typography>

              <Select
                value={profile.status}
                onChange={(e) => profile.setStatus(e.target.value)}
                variant="standard"
                disableUnderline
                size="small"
                sx={{
                  fontSize: "14px",
                  minWidth: 50,

                  "& .MuiSelect-select": {
                    padding: 0,
                  },
                }}
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Waiting on Contact">
                  Waiting on Contact
                </MenuItem>
                <MenuItem value="Waiting on Us">
                  Waiting on Us
                </MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: "14px",
                color: "#33475B",
              }}
            >
              {profile.subTitle || "SalesPerson"}
            </Typography>
          )}





          {/* Email / Deal Stage */}
          {/* Deal Stage - Only for Deals */}
          {title === "Deals" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#33475B",
                  mr: 1,
                  minWidth: 50,
                }}
              >
                Stage :
              </Typography>

              <Select
                value={profile.stage}
                onChange={(e) => profile.setStage(e.target.value)}
                variant="standard"
                disableUnderline
                size="small"
                sx={{
                  fontSize: "14px",
                  minWidth: 40,
                  "& .MuiSelect-select": {
                    padding: 0,
                  },
                }}
              >
                <MenuItem value="Appointment Scheduled">
                  Appointment Scheduled
                </MenuItem>
                <MenuItem value="Qualified to Buy">
                  Qualified to Buy
                </MenuItem>
                <MenuItem value="Presentation Scheduled">
                  Presentation Scheduled
                </MenuItem>
                <MenuItem value="Decision Maker Bought-In">
                  Decision Maker Bought-In
                </MenuItem>
                <MenuItem value="Contract Sent">
                  Contract Sent
                </MenuItem>
                <MenuItem value="Closed Won">
                  Closed Won
                </MenuItem>
                <MenuItem value="Closed Lost">
                  Closed Lost
                </MenuItem>
              </Select>
            </Box>
          )}

          {/* Email - Only for Leads and Companies */}
          {title !== "Deals" && title !== "Tickets" && (
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

              {showProfileEdit && (
                <EditSquareIcon
                  sx={{
                    fontSize: 14,
                    color: "#5A45E5",
                    cursor: "pointer",
                  }}
                />
              )}
            </Box>
          )}

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