import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";

// Direct, safe MUI imports
import CloseIcon from "@mui/icons-material/Close";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CommonInput from "../../../../../Components/common/CommonInput";
import CommonButton from "../../../../../Components/common/CommonButton";

export default function EmailRecord({ onClose }) {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ recipients, subject, body });
    onClose();
  };

  // Border and row wrapping styling
  const fieldRowStyle = {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #F0F0F0",
    px: 2.5,
    py: 1,
  };

  // Strip borders and format input styles
  const inputOverrideStyle = {
    flex: 1,
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiOutlinedInput-root": {
      padding: 0,
      fontSize: "13px",
      color: "#333",
      "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
    },
  };

  return (
    <Box
      sx={{
        width: 520,
        height: 500,
        bgcolor: "#fff",
        borderRadius: "8px 8px 4px 4px",
        boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Header Bar */}
      <Box
        sx={{
          bgcolor: "#5B4CE6",
          color: "#fff",
          px: 2.5,
          py: 1.2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={13} fontWeight={600}>
          New Email
        </Typography>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "#fff", p: 0.2, "&:hover": { opacity: 0.8 } }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Form Container */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >
        {/* Recipients Row */}
        <Box sx={fieldRowStyle}>
          <CommonInput
            placeholder="Recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            sx={inputOverrideStyle}
          />
          <Typography
            fontSize={12}
            color="#888"
            sx={{ cursor: "pointer", userSelect: "none", ml: 1, fontWeight: 300 }}
          >
            Cc Bcc
          </Typography>
        </Box>

        {/* Subject Row */}
        <Box sx={fieldRowStyle}>
          <CommonInput
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={inputOverrideStyle}
          />
        </Box>

        {/* Body Text Editor Area  */}
        <Box sx={{ flex: 1, p: 2.5, overflowY: "auto" }}>
          <CommonInput
            placeholder="Body Text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            rows={12}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiOutlinedInput-root": {
                padding: 0,
                fontSize: "13px",
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
              },
              // Bolds the typed body text
              "& .MuiInputBase-input": {
                fontWeight: "bold",
                color: "#2C2C2C",
              },
              // Bolds the placeholder text
              "& .MuiInputBase-input::placeholder": {
                fontWeight: "bold",
                color: "#2C2C2C",
                opacity: 0.9,
              },
            }}
          />
        </Box>

        {/* Action Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
            bgcolor: "#fff",
            borderTop: "1px solid #F0F0F0",
          }}
        >
         
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
     
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#5B4CE6",
                borderRadius: "4px",
                overflow: "hidden",
                height: 32,
              }}
            >
              <CommonButton
                type="submit"
                sx={{
                  bgcolor: "#5B4CE6",
                  color: "#fff",
                  px: 2.5,
                  height: "100%",
                  minWidth: "auto",
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  boxShadow: "none",
                  borderRadius: 0,
                  "&:hover": { bgcolor: "#4A3CD1" },
                }}
              >
                Send
              </CommonButton>
              {/* Divider Line */}
              <Box sx={{ width: "1px", height: "100%", bgcolor: "#4A3CD1" }} />
              {/* Dropdown Container */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#4C3ED4", 
                  width: 28,
                  height: "100%",
                  cursor: "pointer",
                  color: "#fff",
                  "&:hover": { bgcolor: "#3c2fb1" },
                }}
              >
                <ArrowDropDownIcon sx={{ fontSize: 18 }} />
              </Box>
            </Box>

            {/* Utility Icons Layout */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#757575",
              }}
            >
              <IconButton size="small" sx={{ color: "#757575", p: 0.2 }}>
                <FormatColorTextIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "#757575", p: 0.2 }}>
                <AttachFileIcon sx={{ fontSize: 18, transform: "rotate(45deg)" }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "#757575", p: 0.2 }}>
                <InsertLinkIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "#757575", p: 0.2 }}>
                <InsertEmoticonIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: "#757575", p: 0.2 }}>
                <ImageOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Delete Icon (Trash) */}
          <IconButton
            sx={{
              color: "#757575",
              p: 0.5,
              "&:hover": { color: "#d32f2f" },
            }}
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}