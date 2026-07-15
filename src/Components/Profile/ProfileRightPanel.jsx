import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";

export default function ProfileRightPanel({
  aiSummary = {},
  attachments = [],
}) {
  return (
    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
    p: 2,
  }}
>
      {/* AI Summary */}

      <Box
        sx={{
          bgcolor: "#fff",
          border: "1px solid #5A45E5",
          borderRadius: 2,
          p: 2.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: "#5A45E5",
            mb: 1.5,
          }}
        >
          {aiSummary.title}
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            color: "#667085",
            lineHeight: 1.7,
          }}
        >
          {aiSummary.description}
        </Typography>
      </Box>

      {/* Attachments */}

      <Box
        sx={{
          bgcolor: "#fff",
          border: "1px solid #EAECF0",
          borderRadius: 2,
          p: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "#101828",
            }}
          >
            Attachments
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "#5A45E5",
              cursor: "pointer",

              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            + Add
          </Typography>
        </Box>

        {attachments.length === 0 ? (
          <Typography
            sx={{
              fontSize: 13,
              color: "#667085",
              lineHeight: 1.7,
            }}
          >
            See the files attached to your activities or uploaded to this
            record.
          </Typography>
        ) : (
          attachments.map((file) => (
            <Box
              key={file.id}
              sx={{
                py: 1.2,
                borderBottom: "1px solid #F2F4F7",

                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#101828",
                }}
              >
                {file.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#667085",
                }}
              >
                {file.size}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}