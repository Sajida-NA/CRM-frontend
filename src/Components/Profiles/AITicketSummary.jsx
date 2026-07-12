import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function AITicketSummary() {
  return (
    <Box
      sx={{
        p: 3,
        height: "100%",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
      >
        <AutoAwesomeOutlinedIcon
          color="primary"
          fontSize="small"
        />

        <Typography
          variant="subtitle1"
          fontWeight={700}
        >
          AI Ticket Summary
        </Typography>
      </Box>

      {/* Summary */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          lineHeight: 1.7,
          fontSize: 13,
        }}
      >
        The ticket titled <strong>"Payment Failure Issue"</strong>
        currently has no associated conversation,
        call, or note transcripts. There are no
        additional details or properties available
        for this ticket.
      </Typography>

      {/* Attachments */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          fontWeight={700}
        >
          Attachments
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            minWidth: 64,
            height: 32,
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
          p: 3,
          border: "2px dashed #D1D5DB",
          borderRadius: 2,
          bgcolor: "#FAFAFA",
          textAlign: "center",
        }}
      >
        <CloudUploadOutlinedIcon
          sx={{
            fontSize: 36,
            color: "#9CA3AF",
            mb: 1.5,
          }}
        />

        <Typography
          variant="body2"
          fontWeight={700}
        >
          No attachments yet
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            mt: 1,
            lineHeight: 1.6,
          }}
        >
          See the files attached to your
          activities or uploaded to this
          record.
        </Typography>
      </Paper>
    </Box>
  );
}

export default AITicketSummary;