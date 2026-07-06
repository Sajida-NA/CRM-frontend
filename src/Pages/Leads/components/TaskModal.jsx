import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ModalWrapper from "../../../components/common/ModalWrapper";

const TaskModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    assignedTo: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    // TODO: API call to save task
    console.log("Task Created:", form);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Create Task">
      <Box sx={{ mt: 1 }}>
        {/* Title */}
        <Typography mb={0.5}>Task Title</Typography>
        <TextField
          fullWidth
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Due Date */}
        <Typography mb={0.5}>Due Date</Typography>
        <TextField
          fullWidth
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Assigned To */}
        <Typography mb={0.5}>Assigned To</Typography>
        <TextField
          select
          fullWidth
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        >
          <MenuItem value="Maria Johnson">Maria Johnson</MenuItem>
          <MenuItem value="Raj Sharma">Raj Sharma</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>

        {/* Description */}
        <Typography mb={0.5}>Description</Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the task..."
        />

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save Task
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default TaskModal;
