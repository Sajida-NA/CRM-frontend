import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function EmailRecord() {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    console.log({
      recipients,
      subject,
      body,
    });

    alert("Email Record Saved");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: 550,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "#5B4AE6",
            color: "white",
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            New Email
          </Typography>

          <IconButton size="small" sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="standard"
            label="Recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
          />

          <TextField
            fullWidth
            variant="standard"
            label="Subject"
            sx={{ mt: 3 }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <TextField
            fullWidth
            multiline
            rows={8}
            variant="standard"
            label="Body Text"
            sx={{ mt: 3 }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Box>

        {/* Footer */}
        <Box
          sx={{
            borderTop: "1px solid #e0e0e0",
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              onClick={handleSubmit}
            >
              Send
            </Button>

            <IconButton>
              <AttachFileIcon />
            </IconButton>

            <IconButton>
              <LinkIcon />
            </IconButton>

            <IconButton>
              <EmojiEmotionsIcon />
            </IconButton>

            <IconButton>
              <ImageIcon />
            </IconButton>
          </Box>

          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default EmailRecord;