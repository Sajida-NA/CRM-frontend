import { useState } from "react";
import {
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
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight={400}
      >
        {label}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={500}
      >
        {value}
      </Typography>
    </Box>
  );
}

function TicketInfo({ ticket }) {
  const [status, setStatus] = useState(ticket.status);

  return (
    <Box
      sx={{
        p: 3,
        height: "100%",
        borderRight: "1px solid #E5E7EB",
      }}
    >
      {/* Back */}
      <Typography
        variant="caption"
        color="text.secondary"
      >
        ← Tickets
      </Typography>

      {/* Ticket Title */}
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ mt: 1 }}
      >
        {ticket.title}
      </Typography>

      {/* Status */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Status
        </Typography>

        <FormControl size="small">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              minWidth: 120,
              height: 32,
              borderRadius: 2,
              fontSize: 13,
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
            <MenuItem value="Closed">
              Closed
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

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
          sx={{
            borderRadius: 2,
            textTransform: "none",
            height: 32,
          }}
        >
          Note
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<EmailOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            height: 32,
          }}
        >
          Email
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<CallOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            height: 32,
          }}
        >
          Call
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<TaskOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            height: 32,
          }}
        >
          Task
        </Button>

        <Button
          fullWidth
          size="small"
          variant="outlined"
          startIcon={<EventOutlinedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            height: 32,
          }}
        >
          Meeting
        </Button>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {/* About Ticket */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
        >
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
    </Box>
  );
}

export default TicketInfo;