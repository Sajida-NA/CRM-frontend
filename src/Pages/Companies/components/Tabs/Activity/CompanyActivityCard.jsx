import React from "react";
import { Box, Typography } from "@mui/material";

export default function CompanyActivityCard({
  title,
  user,
  action,
  entity,
  date,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        mb: 2,
      }}
    >
      {/* Left */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          <Box
            component="span"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            {user}
          </Box>{" "}
          {action}{" "}
          <Box
            component="span"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            {entity}
          </Box>
        </Typography>
      </Box>

      {/* Right */}
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          whiteSpace: "nowrap",
        }}
      >
        {date}
      </Typography>
    </Box>
  );
}