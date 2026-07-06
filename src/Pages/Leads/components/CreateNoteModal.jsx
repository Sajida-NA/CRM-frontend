import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ModalWrapper from "../../../Components/common/ModalWrapper";

const CreateNoteModal = ({ open, onClose }) => {
  const [note, setNote] = useState("");

  const handleSave = () => {
    // TODO: API call to save note
    console.log("Note Saved:", note);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Create Note">
      <Box sx={{ mt: 1 }}>
        <Typography mb={0.5}>Note</Typography>

        <TextField
          fullWidth
          multiline
          minRows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
        />

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

export default CreateNoteModal;
