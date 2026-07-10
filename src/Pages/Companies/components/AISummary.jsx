import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function AISummary() {
  return (
    <Box
      sx={{
        p: 3,
        height: "100%",
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

      {/* Upload Area */}
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
    </Box>
  );
}

export default AISummary;