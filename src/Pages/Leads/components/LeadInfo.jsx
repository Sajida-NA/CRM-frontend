import {
  Avatar,
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";

import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function DetailRow({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.5,
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {label}
      </Typography>

      <Typography variant="body2" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
}

function LeadInfo({ lead }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      {/* Lead Header */}
      <Box display="flex" gap={2} alignItems="center">
        <Avatar
          sx={{
            width: 70,
            height: 70,
            bgcolor: "#4F46E5",
            fontSize: 28,
            fontWeight: "bold",
            border: "3px solid #E5E7EB",
          }}
        >
          {lead.firstName.charAt(0)}
        </Avatar>

        <Box>
          <Typography variant="h6" fontWeight="bold">
            {lead.fullName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {lead.jobTitle}
          </Typography>

          <Typography variant="body2" color="primary">
            {lead.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Action Buttons */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<NoteAltOutlinedIcon />}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Note
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<EmailOutlinedIcon />}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Email
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<CallOutlinedIcon />}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Call
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<TaskOutlinedIcon />}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Task
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<EventOutlinedIcon />}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Meeting
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* About Lead */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          About this Lead
        </Typography>

        <IconButton size="small">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>

      <DetailRow label="Email" value={lead.email} />
      <DetailRow label="First Name" value={lead.firstName} />
      <DetailRow label="Last Name" value={lead.lastName} />
      <DetailRow label="Phone Number" value={lead.phone} />
      <DetailRow label="Lead Status" value={lead.status} />
      <DetailRow label="Job Title" value={lead.jobTitle} />
      <DetailRow label="Created Date" value={lead.created} />
    </Paper>
  );
}

export default LeadInfo;