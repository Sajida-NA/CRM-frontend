import {
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Tabs,
  Tab
} from "@mui/material";
import { useState } from "react";

import CreateNoteModal from "../components/CreateNoteModal";
import LogCallModal from "../components/LogCallModal";
import EmailComposerModal from "../components/EmailComposerModal";
import TaskModal from "../components/TaskModal";
import MeetingModal from "../components/MeetingModal";

export default function DealProfile() {
  const [tab, setTab] = useState(0);

  const [openNote, setOpenNote] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);

  const deal = {
    id: "DL-101",
    name: "CRM Pro Subscription",
    company: "TrustSphere",
    value: "$12,000",
    stage: "Negotiation",
    owner: "Maria Johnson",
    closeDate: "2025-04-20",
    pipeline: "Sales Pipeline",
    probability: "60%",
    created: "Apr 8, 2025",
  };

  const stageColor = {
    Negotiation: "warning",
    "Proposal Sent": "info",
    "Closed Won": "success",
    "Closed Lost": "error",
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Card */}
      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: 26, fontWeight: 700 }}>
          {deal.name}
        </Typography>

        <Typography sx={{ color: "#666", mt: 0.5 }}>
          Deal ID: {deal.id}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Chip
            label={deal.stage}
            color={stageColor[deal.stage]}
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
          <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={() => setOpenNote(true)}>
            Add Note
          </Button>
          <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={() => setOpenCall(true)}>
            Log Call
          </Button>
          <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={() => setOpenEmail(true)}>
            Send Email
          </Button>
          <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={() => setOpenTask(true)}>
            Add Task
          </Button>
          <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={() => setOpenMeeting(true)}>
            Add Meeting
          </Button>
        </Box>
      </Box>

      {/* Tabs Card */}
      <Box
        sx={{
          background: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ px: 2, pt: 1 }}>
          <Tab label="Details" />
          <Tab label="Notes" />
          <Tab label="Emails" />
          <Tab label="Calls" />
          <Tab label="Tasks" />
          <Tab label="Meetings" />
        </Tabs>

        <Divider />

        {/* Details */}
        {tab === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>Deal Information</Typography>

            <Box sx={{ background: "#fafafa", p: 2, borderRadius: 2 }}>
              <Typography><strong>Deal Name:</strong> {deal.name}</Typography>
              <Typography><strong>Company:</strong> {deal.company}</Typography>
              <Typography><strong>Value:</strong> {deal.value}</Typography>
              <Typography><strong>Stage:</strong> {deal.stage}</Typography>
              <Typography><strong>Owner:</strong> {deal.owner}</Typography>
              <Typography><strong>Close Date:</strong> {deal.closeDate}</Typography>
              <Typography><strong>Pipeline:</strong> {deal.pipeline}</Typography>
              <Typography><strong>Probability:</strong> {deal.probability}</Typography>
              <Typography><strong>Created:</strong> {deal.created}</Typography>
            </Box>
          </Box>
        )}

        {/* Notes */}
        {tab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 600 }}>Notes</Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, textTransform: "none", mt: 2 }}
              onClick={() => setOpenNote(true)}
            >
              Add Note
            </Button>
          </Box>
        )}

        {/* Emails */}
        {tab === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 600 }}>Emails</Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, textTransform: "none", mt: 2 }}
              onClick={() => setOpenEmail(true)}
            >
              Send Email
            </Button>
          </Box>
        )}

        {/* Calls */}
        {tab === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 600 }}>Calls</Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, textTransform: "none", mt: 2 }}
              onClick={() => setOpenCall(true)}
            >
              Log Call
            </Button>
          </Box>
        )}

        {/* Tasks */}
        {tab === 4 && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 600 }}>Tasks</Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, textTransform: "none", mt: 2 }}
              onClick={() => setOpenTask(true)}
            >
              Add Task
            </Button>
          </Box>
        )}

        {/* Meetings */}
        {tab === 5 && (
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: 600 }}>Meetings</Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, textTransform: "none", mt: 2 }}
              onClick={() => setOpenMeeting(true)}
            >
              Add Meeting
            </Button>
          </Box>
        )}
      </Box>

      {/* Modals */}
      <CreateNoteModal open={openNote} onClose={() => setOpenNote(false)} />
      <LogCallModal open={openCall} onClose={() => setOpenCall(false)} />
      <EmailComposerModal open={openEmail} onClose={() => setOpenEmail(false)} />
      <TaskModal open={openTask} onClose={() => setOpenTask(false)} />
      <MeetingModal open={openMeeting} onClose={() => setOpenMeeting(false)} />
    </Box>
  );
}
