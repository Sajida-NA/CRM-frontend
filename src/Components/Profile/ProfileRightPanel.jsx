import React from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";

export default function ProfileRightPanel({
  aiSummary = {},
  attachments = [],
  entityType,
}) {
  return (
    <Stack spacing={3}>
      {/* ================= AI Summary ================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "primary.main",
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: 700,
            mb: 2,
            fontSize: 16,
          }}
        >
          {aiSummary.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
          }}
        >
          {aiSummary.description}
        </Typography>
      </Paper>

      {/* ================= Attachments ================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            fontWeight={700}
          >
            Attachments
          </Typography>

          <Button
            variant="text"
            size="small"
          >
            + Add
          </Button>
        </Box>

        {attachments.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            See the files attached to your
            activities or uploaded to this
            record.
          </Typography>
        ) : (
          attachments.map((file, index) => (
            <Box key={index}>
              <Typography
                fontWeight={600}
              >
                {file.name}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {file.size}
              </Typography>

              {index !==
                attachments.length - 1 && (
                <Divider
                  sx={{
                    my: 2,
                  }}
                />
              )}
            </Box>
          ))
        )}
      </Paper>

      {/* ================= Company Extra Sections ================= */}

      {entityType === "company" && (
        <>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <Typography
                fontWeight={700}
              >
                Orders
              </Typography>

              <Button
                size="small"
                variant="text"
              >
                + Add
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              See the orders associated
              with this record.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <Typography
                fontWeight={700}
              >
                Deals
              </Typography>

              <Button
                size="small"
                variant="text"
              >
                + Add
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Track the revenue
              opportunities associated
              with this record.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <Typography
                fontWeight={700}
              >
                Contacts
              </Typography>

              <Button
                size="small"
                variant="text"
              >
                + Add
              </Button>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              See the people associated
              with this record.
            </Typography>
          </Paper>
        </>
      )}
    </Stack>
  );
}