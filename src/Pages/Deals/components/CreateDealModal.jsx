import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import ModalWrapper from "../../../Components/common/ModalWrapper"

export default function CreateDealModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    value: "",
    stage: "",
    owner: "",
    closeDate: "",
    pipeline: "",
    probability: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (onSave) onSave(form);
    onClose();
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title="Create Deal"
      maxWidth="sm"
    >
      <Box sx={{ mt: 1, display: "grid", gap: 2 }}>
        <TextField
          label="Deal Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          size="small"
        />

        <TextField
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
          fullWidth
          size="small"
        />

        <TextField
          label="Deal Value"
          name="value"
          value={form.value}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="$10,000"
        />

        <TextField
          select
          label="Stage"
          name="stage"
          value={form.stage}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="Qualification">Qualification</MenuItem>
          <MenuItem value="Proposal Sent">Proposal Sent</MenuItem>
          <MenuItem value="Negotiation">Negotiation</MenuItem>
          <MenuItem value="Closed Won">Closed Won</MenuItem>
          <MenuItem value="Closed Lost">Closed Lost</MenuItem>
        </TextField>

        <TextField
          label="Owner"
          name="owner"
          value={form.owner}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="Assign owner"
        />

        <TextField
          label="Close Date"
          name="closeDate"
          type="date"
          value={form.closeDate}
          onChange={handleChange}
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="Pipeline"
          name="pipeline"
          value={form.pipeline}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="Sales Pipeline">Sales Pipeline</MenuItem>
          <MenuItem value="Enterprise Pipeline">Enterprise Pipeline</MenuItem>
        </TextField>

        <TextField
          label="Probability (%)"
          name="probability"
          value={form.probability}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="e.g. 60"
        />

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            onClick={onClose}
            sx={{ textTransform: "none", mr: 2 }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleSave}
          >
            Create Deal
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
}
