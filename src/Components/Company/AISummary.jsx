import {
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function AISummary() {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        minHeight: 600,
      }}
    >
      {/* Title */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
      >
        <AutoAwesomeOutlinedIcon color="primary" />

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          AI Company Summary
        </Typography>
      </Box>

      {/* Summary */}
      <Typography
        color="text.secondary"
        sx={{
          mt: 2,
          lineHeight: 1.8,
        }}
      >
        There are no activities associated with this
        company yet. Additional information and
        activities are required to generate a more
        comprehensive AI summary.
      </Typography>

      {/* Attachments Header */}
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Attachments
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          + Add
        </Button>
      </Box>

      {/* Empty State */}
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          p: 4,
          border: "2px dashed #D1D5DB",
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "#FAFAFA",
        }}
      >
        <CloudUploadOutlinedIcon
          sx={{
            fontSize: 45,
            color: "#9CA3AF",
            mb: 2,
          }}
        />

        <Typography
          variant="body1"
          fontWeight="bold"
        >
          No attachments yet
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Upload documents, contracts, invoices or
          company files here.
        </Typography>
      </Paper>
    </Paper>
  );
}

export default AISummary;