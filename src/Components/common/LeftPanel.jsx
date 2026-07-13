import React from "react";
import { Box, Typography } from "@mui/material";

import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";
import EditSquareIcon from "@mui/icons-material/EditSquare";

export default function LeftPanel({
  title,
  actions,
  leadDetails,
  handleActionClick,
  profile = {},
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
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            backgroundColor: "#D9D9D9",
            borderRadius: "12px",
          }}
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            {profile.name || "Jane Cooper"}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#33475B",
            }}
          >
            {profile.subTitle || "SalesPerson"}
          </Typography>

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

        <EditSquareIcon
          sx={{
            fontSize: 14,
            color: "#5A45E5",
            cursor: "pointer",
          }}
        />
      </Box>

      {leadDetails.map((item) => (
        <Box
          key={item.label}
          sx={{
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: "#516F90",
              fontSize: "13px",
            }}
          >
            {item.label}
          </Typography>

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