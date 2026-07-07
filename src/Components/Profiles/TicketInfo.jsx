import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
  FormControl,
  Select,
  MenuItem,
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
        py: 1,
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body2" fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );
}

function TicketInfo({ ticket }) {
  const [status, setStatus] = useState(ticket.status);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      {/* Back */}
      <Typography variant="body2" color="text.secondary">
        ← Tickets
      </Typography>

      {/* Ticket Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mt: 2 }}
      >
        {ticket.title}
      </Typography>

      {/* Status Dropdown */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Status :
        </Typography>

        <FormControl size="small">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              minWidth: 130,
              height: 34,
              borderRadius: 2,
              fontSize: 14,
            }}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">
              In Progress
            </MenuItem>
            <MenuItem value="Resolved">
              Resolved
            </MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<NoteAltOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Note
        </Button>

        <Button
          variant="outlined"
          startIcon={<EmailOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Email
        </Button>

        <Button
          variant="outlined"
          startIcon={<CallOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Call
        </Button>

        <Button
          variant="outlined"
          startIcon={<TaskOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Task
        </Button>

        <Button
          variant="outlined"
          startIcon={<EventOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Meeting
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* About Ticket */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          About this Ticket
        </Typography>

        <IconButton size="small">
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>

      <DetailRow
        label="Ticket Description"
        value={ticket.description}
      />

      <DetailRow
        label="Ticket Owner"
        value={ticket.owner}
      />

      <DetailRow
        label="Priority"
        value={ticket.priority}
      />

      <DetailRow
        label="Created Date"
        value={ticket.createdDate}
      />
    </Paper>
  );
}

export default TicketInfo;