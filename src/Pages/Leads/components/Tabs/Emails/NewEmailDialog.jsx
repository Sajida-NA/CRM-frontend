// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   Box,
//   Typography,
//   IconButton,
//   TextField,
//   Button,
//   InputAdornment,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// import CloseIcon from "@mui/icons-material/Close";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
// import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
// import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
// import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// export default function NewEmailDialog({ open, onClose, companyId,onEmailCreated,}) {
//   const theme = useTheme();

//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           overflow: "hidden",
//           bgcolor: theme.palette.background.paper,
//         },
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           height: 48,
//           px: 2,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           bgcolor: theme.palette.primary.main,
//           color: "#fff",
//         }}
//       >
//         <Typography fontWeight={500} fontSize={15}>
//           New Email
//         </Typography>

//         <IconButton
//           size="small"
//           onClick={onClose}
//           sx={{ color: "#fff" }}
//         >
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       </Box>

//       <DialogContent sx={{ p: 0 }}>

//         {/* Recipients */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             px: 2,
//             height: 48,
//             // borderBottom: `1px solid ${theme.palette.divider}`,
//           }}
//         >
//           <TextField
//             variant="standard"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Recipients"
//             InputProps={{
//               disableUnderline: true,
//             }}
//             sx={{
//               "& input": {
//                 fontSize: 14,
//               },
//             }}
//           />

//           <Typography
//             sx={{
//               ml: 2,
//               color: theme.palette.text.secondary,
//               fontSize: 13,
//               cursor: "pointer",
//             }}
//           >
//             Cc&nbsp;&nbsp;Bcc
//           </Typography>
//         </Box>

//         {/* Subject */}

//         <Box
//           sx={{
//             px: 2,
//             height: 48,
//             display: "flex",
//             alignItems: "center",
//             // borderBottom: `1px solid ${theme.palette.divider}`,
//           }}
//         >
//           <TextField
//             variant="standard"
//             fullWidth
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             placeholder="Subject"
//             InputProps={{
//               disableUnderline: true,
//             }}
//           />
//         </Box>

//         {/* Body */}

//         <TextField
//           multiline
//           minRows={16}
//           variant="standard"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Body Text"
//           InputProps={{
//             disableUnderline: true,
//           }}
//           sx={{
//             width: "100%",
//             px: 2,
//             pt: 2,

//             "& textarea": {
//               fontSize: 14,
//               color: theme.palette.text.primary,
//             },
//           }}
//         />

//         {/* Bottom Toolbar */}

//         <Box
//           sx={{
//             px: 2,
//             py: 1.5,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             // borderTop: `1px solid ${theme.palette.divider}`,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <Button
//               variant="contained"
//               sx={{
//                 minWidth: 90,
//                 borderRadius: "6px 0 0 6px",
//                 textTransform: "none",
//                 // px: 3,
//                 boxShadow: "none",
//                 bgcolor: theme.palette.primary.main,

//                 "&:hover": {
//                   bgcolor: theme.palette.primary.dark,
//                   boxShadow: "none",
//                 },
//               }}
//             >
//               Send
//             </Button>

//             <Button
//               variant="contained"
//               sx={{
//                 minWidth: 40,
//                 borderRadius: "0 6px 6px 0",
//                 ml: 0,
//                 bgcolor: theme.palette.primary.main,
//                 boxShadow: "none",
//                 // borderLeft: "1px solid rgba(255,255,255,0.25)",

//                 "&:hover": {
//                   bgcolor: theme.palette.primary.dark,
//                   boxShadow: "none",
//                 },
//               }}
//             >
//               <KeyboardArrowDownIcon fontSize="small" />
//             </Button>

//             <IconButton sx={{ ml: 1 }}>
//               <FormatColorTextOutlinedIcon />
//             </IconButton>

//             <IconButton>
//               <AttachFileOutlinedIcon />
//             </IconButton>

//             <IconButton>
//               <LinkOutlinedIcon />
//             </IconButton>

//             <IconButton>
//               <InsertEmoticonOutlinedIcon />
//             </IconButton>

//             <IconButton>
//               <ImageOutlinedIcon />
//             </IconButton>
//           </Box>

//           <IconButton>
//             <DeleteOutlineOutlinedIcon />
//           </IconButton>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// }

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import api from "../../../../../services/api";


export default function NewEmailDialog({
  open,
  onClose,
  companyId,
  onEmailCreated,
}) {

  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {

    if (!companyId) {
      setError("Company ID is missing.");
      return;
    }

    if (!email.trim()) {
      setError("Recipient email is required.");
      return;
    }

    if (!subject.trim()) {
      setError("Subject is required.");
      return;
    }

    if (!body.trim()) {
      setError("Email body is required.");
      return;
    }

    try {

      setSending(true);
      setError("");

      const response = await api.post("activities/email/", {
        module: "company",
        recipient_id: companyId,

        subject: subject,
        body: body,

        cc: [],
        bcc: [],
      });

      console.log("Email created:", response.data);

      if (onEmailCreated) {
        onEmailCreated(response.data);
      }

      setEmail("");
      setSubject("");
      setBody("");

      onClose();

    } catch (err) {

      console.error("Email sending failed:", err);

      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Failed to send email."
      );

    } finally {

      setSending(false);

    }
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: theme.palette.background.paper,
        },
      }}
    >

      {/* Header */}

      <Box
        sx={{
          height: 48,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: theme.palette.primary.main,
          color: "#fff",
        }}
      >

        <Typography
          fontWeight={500}
          fontSize={15}
        >
          New Email
        </Typography>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: "#fff" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

      </Box>


      <DialogContent sx={{ p: 0 }}>

        {/* Recipient */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            height: 48,
          }}
        >

          <TextField
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Recipients"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              "& input": {
                fontSize: 14,
              },
            }}
          />

          <Typography
            sx={{
              ml: 2,
              color: theme.palette.text.secondary,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cc&nbsp;&nbsp;Bcc
          </Typography>

        </Box>


        {/* Subject */}

        <Box
          sx={{
            px: 2,
            height: 48,
            display: "flex",
            alignItems: "center",
          }}
        >

          <TextField
            variant="standard"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            InputProps={{
              disableUnderline: true,
            }}
          />

        </Box>


        {/* Error */}

        {error && (
          <Typography
            sx={{
              px: 2,
              py: 1,
              color: "error.main",
              fontSize: 13,
            }}
          >
            {error}
          </Typography>
        )}


        {/* Body */}

        <TextField
          multiline
          minRows={16}
          variant="standard"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body Text"
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            width: "100%",
            px: 2,
            pt: 2,

            "& textarea": {
              fontSize: 14,
              color: theme.palette.text.primary,
            },
          }}
        />


        {/* Bottom Toolbar */}

        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >

            {/* SEND */}

            <Button
              variant="contained"
              disabled={sending}
              onClick={handleSend}
              sx={{
                minWidth: 90,
                borderRadius: "6px 0 0 6px",
                textTransform: "none",
                boxShadow: "none",
                bgcolor: theme.palette.primary.main,

                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  boxShadow: "none",
                },
              }}
            >
              {sending ? "Sending..." : "Send"}
            </Button>


            <Button
              variant="contained"
              sx={{
                minWidth: 40,
                borderRadius: "0 6px 6px 0",
                ml: 0,
                bgcolor: theme.palette.primary.main,
                boxShadow: "none",

                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  boxShadow: "none",
                },
              }}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </Button>


            <IconButton sx={{ ml: 1 }}>
              <FormatColorTextOutlinedIcon />
            </IconButton>

            <IconButton>
              <AttachFileOutlinedIcon />
            </IconButton>

            <IconButton>
              <LinkOutlinedIcon />
            </IconButton>

            <IconButton>
              <InsertEmoticonOutlinedIcon />
            </IconButton>

            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>

          </Box>


          <IconButton>
            <DeleteOutlineOutlinedIcon />
          </IconButton>

        </Box>

      </DialogContent>

    </Dialog>
  );
}