import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import ModalWrapper from "../../../components/common/ModalWrapper";

const EmailComposerModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    recipients: "",
    cc: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = () => {
    // TODO: API call to log lead email
    console.log("Email Sent:", form);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Log Email">
      <Box sx={{ mt: 1 }}>
        {/* Recipients */}
        <Typography mb={0.5}>Recipients</Typography>
        <TextField
          fullWidth
          name="recipients"
          value={form.recipients}
          onChange={handleChange}
          placeholder="Enter email addresses"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* CC / BCC */}
        <Typography mb={0.5}>Cc / Bcc</Typography>
        <TextField
          fullWidth
          name="cc"
          value={form.cc}
          onChange={handleChange}
          placeholder="Enter Cc/Bcc"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Subject */}
        <Typography mb={0.5}>Subject</Typography>
        <TextField
          fullWidth
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Enter subject"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Body */}
        <Typography mb={0.5}>Body Text</Typography>
        <TextField
          fullWidth
          multiline
          minRows={5}
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Write email body..."
        />

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default EmailComposerModal;
