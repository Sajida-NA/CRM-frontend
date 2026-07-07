import {
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function AITicketSummary() {
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
          AI Ticket Summary
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
        The ticket titled "Payment Failure Issue"
        currently has no associated conversation,
        call, or note transcripts.
        There are no additional details or
        properties available for this ticket.
      </Typography>

      {/* Attachments */}
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
          startIcon={<CloudUploadOutlinedIcon />}
        >
          Add
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
          See the files attached to your activities
          or uploaded to this record.
        </Typography>
      </Paper>
    </Paper>
  );
}

export default AITicketSummary;