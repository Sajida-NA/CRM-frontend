import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function MeetingCard() {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor:"divider",
        borderRadius: "10px",
        bgcolor: "background.paper",
        mt: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          px: 2,
          py: 2,
          cursor: "pointer",
        }}
      >
        {/* Left */}
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <IconButton size="small" sx={{ p: 0, mt: 0.3, mr: 1 }}>
            {open ? (
              <KeyboardArrowRightIcon color="primary" />
            ) : (
              <KeyboardArrowDownIcon color="primary" />
            )}
          </IconButton>

          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: "text.primary",
              }}
            >
              Meeting Maria Johnson and Jane Cooper
            </Typography>

            {!open && (
              <Typography
                sx={{
                  mt: 0.5,
                  color: "text.secondary",
                  fontSize: 14,
                }}
              >
                Let's discuss our new product line.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Date */}
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          June 24, 2025 at 5:30PM
        </Typography>
      </Box>

      {/* Expanded */}
      {open && (
        <Box sx={{ px: 2 }}>
          <Typography
            sx={{
              color: "text.secondary",
              mb: 1,
              fontSize: 15,
            }}
          >
            Organized by Maria
          </Typography>

          {/* Details */}
          <Grid
            container
            sx={{
              bgcolor: "#EEF3F8",
              borderRadius: 1,
              p: 2,
              mb: 1,
            }}
          >
            <Grid size={4}>
              <Typography
                sx={{
                  color: "#516F90",
                  fontSize: 14,
                  
                }}
              >
                Date & Time
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  mt: 0.5,
                }}
              >
                June 24, 2025 at 5:30PM
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography
                sx={{
                  color: "#516F90",
                  fontSize: 14,
                }}
              >
                Duration
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  mt: 0.5,
                }}
              >
                1 hr
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography
                sx={{
                  color: "#516F90",
                  fontSize: 14,
                }}
              >
                Attendees
              </Typography>

              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  mt: 0.5,
                }}
              >
                2
              </Typography>
            </Grid>
          </Grid>

          <Typography
            sx={{
              color: "#516F90",
              fontSize: 15,
            }}
          >
            Let's discuss our new product line.
          </Typography>
        </Box>
      )}
    </Box>
  );
}