import React from "react";
import { Box, Typography } from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

export default function RightPanel({
  summaryTitle = "AI Lead Summary",
  summaryText =
    "There are no activities associated with this lead and further details are needed to provide a comprehensive summary.",
}) {
  return (
    <Box
      sx={{
        width: 230,
        backgroundColor: "#fff",
        borderTopRightRadius: "12px",
        p: 2,
      }}
    >
      <Box
        sx={{
          border: "1px solid #5948DB",
          backgroundColor: "#F7F7FA",
          borderRadius: "8px",
          p: 2,
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#5948DB",
            mb: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AutoAwesomeOutlinedIcon
            color="primary"
            sx={{
              mr: 1,
            }}
          />

          {summaryTitle}
        </Typography>

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

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Attachments
          </Typography>

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