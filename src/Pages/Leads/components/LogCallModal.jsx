import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ModalWrapper from "../../../components/common/ModalWrapper";

const LogCallModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    callType: "",
    callPurpose: "",
    callOutcome: "",
    callDetails: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    // TODO: API call
    console.log("Call Logged:", form);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Log Call">
      <Box sx={{ mt: 1 }}>
        {/* Call Type */}
        <Typography mb={0.5}>Call Type</Typography>
        <TextField
          select
          fullWidth
          name="callType"
          value={form.callType}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        >
          <MenuItem value="Inbound">Inbound</MenuItem>
          <MenuItem value="Outbound">Outbound</MenuItem>
        </TextField>

        {/* Call Purpose */}
        <Typography mb={0.5}>Call Purpose</Typography>
        <TextField
          select
          fullWidth
          name="callPurpose"
          value={form.callPurpose}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        >
          <MenuItem value="Follow Up">Follow Up</MenuItem>
          <MenuItem value="Demo Discussion">Demo Discussion</MenuItem>
          <MenuItem value="Negotiation">Negotiation</MenuItem>
        </TextField>

        {/* Call Outcome */}
        <Typography mb={0.5}>Call Outcome</Typography>
        <TextField
          select
          fullWidth
          name="callOutcome"
          value={form.callOutcome}
          onChange={handleChange}
          size="small"
          sx={{ mb: 2 }}
        >
          <MenuItem value="Successful">Successful</MenuItem>
          <MenuItem value="No Answer">No Answer</MenuItem>
          <MenuItem value="Call Back Later">Call Back Later</MenuItem>
          <MenuItem value="Not Interested">Not Interested</MenuItem>
        </TextField>

        {/* Call Details */}
        <Typography mb={0.5}>Call Details</Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          name="callDetails"
          value={form.callDetails}
          onChange={handleChange}
          placeholder="Describe the call..."
        />

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default LogCallModal;
