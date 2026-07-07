import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ModalWrapper from "../../../components/common/ModalWrapper";

const MeetingModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    attendees: "",
    location: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    // TODO: API call to save meeting
    console.log("Meeting Scheduled:", form);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Schedule Meeting">
      <Box sx={{ mt: 1 }}>
        {/* Meeting Title */}
        <Typography mb={0.5}>Meeting Title</Typography>
        <TextField
          fullWidth
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter meeting title"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Date */}
        <Typography mb={0.5}>Date</Typography>
        <TextField
          fullWidth
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Start Time */}
        <Typography mb={0.5}>Start Time</Typography>
        <TextField
          fullWidth
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* End Time */}
        <Typography mb={0.5}>End Time</Typography>
        <TextField
          fullWidth
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Attendees */}
        <Typography mb={0.5}>Attendees</Typography>
        <TextField
          fullWidth
          name="attendees"
          value={form.attendees}
          onChange={handleChange}
          placeholder="Enter attendees"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Location */}
        <Typography mb={0.5}>Location</Typography>
        <TextField
          fullWidth
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Enter meeting location"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Notes */}
        <Typography mb={0.5}>Notes</Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Add meeting notes..."
        />

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Schedule
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default MeetingModal;
