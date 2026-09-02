// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Stack,
//   IconButton,
//   Collapse,
// } from "@mui/material";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// export default function EmailCard({ email }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Box
//       sx={{
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: 2,
//         bgcolor: "#fff",
//         overflow: "hidden",
//         mt:1
//       }}
//     >
//       {/* Header */}
//       <Box
//         onClick={() => setOpen(!open)}
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//           px: 2,
//           py: 2,
//           cursor: "pointer",
//         }}
//       >
//         <Stack direction="row" spacing={1} alignItems="center">
//           <IconButton size="small" sx={{ p: 0 }}>
//             {open ? (
//               <KeyboardArrowDownIcon color="primary" fontSize="small" />
//             ) : (
//               <KeyboardArrowRightIcon color="primary" fontSize="small" />
//             )}
//           </IconButton>

//           <Box>
//             <Typography
//               sx={{
//                 fontSize: 18,
//                 fontWeight: 700,
//                 color: "#374151",
//               }}
//             >
//               Logged Email - Hello There
//               <Typography
//                 component="span"
//                 sx={{
//                   fontWeight: 400,
//                   color: "#6B7280",
//                   ml: 0.5,
//                 }}
//               >
//                 by Maria Johnson
//               </Typography>
//             </Typography>

//             {!open && (
//               <Typography
//                 sx={{
//                   mt: 0.5,
//                   color: "#64748B",
//                   fontSize: 15,
//                 }}
//               >
//                 Hey Jane Cooper,
//               </Typography>
//             )}
//           </Box>
//         </Stack>

//         <Typography
//           sx={{
//             fontSize: 15,
//             color: "#6B7280",
//             whiteSpace: "nowrap",
//           }}
//         >
//           June 24, 2025 at 5:30PM
//         </Typography>
//       </Box>

//       {/* Body */}
//       <Collapse in={open}>
//         <Box
//           sx={{
//             px: 6,
//             pb: 3,
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#64748B",
//               mb: 3,
//             }}
//           >
//             To Jane Cooper
//           </Typography>

//           <Typography
//             sx={{
//                whiteSpace: "pre-line",
//               lineHeight: 2,
//               color: "#64748B",
//               fontSize: 13,
//             }}
//           >
//  {`Hey Jane Cooper,
// Thank you for showing interest in CRM!
// We noticed you recently filled out our demo request form on the website and wanted to reach out personally.

// Our solution helps businesses streamline sales workflows, track lead progress, and boost conversion rates by up to 40%.

// I'd love to schedule a quick call to understand your needs better and show how we can help. Are you available for a 15-minute chat this week?

// You can book a time that works for you.
// If you have any specific questions or requirements, feel free to reply to this email directly.

// Looking forward to connecting!

// Warm regards,
// Rajat Sharma
// Senior Sales Executive
// CRM Pvt. Ltd.
// +91-9876543210
// rajat@salestrackcrm.com
// salestrackcrm.com`} 
//           </Typography>
//         </Box>
//       </Collapse>
//     </Box>
//   );
// }

import React from "react";

import {
  Box,
  Typography,
  Divider,
} from "@mui/material";


export default function EmailCard({
  email,
}) {

  if (!email) {
    return null;
  }


  return (

    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        mb: 2,
        bgcolor: "background.paper",
      }}
    >

      {/* Subject */}

      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ mb: 1 }}
      >
        {email.subject || "No Subject"}
      </Typography>


      <Divider sx={{ mb: 2 }} />


      {/* From */}

      <Typography
        variant="body2"
        sx={{ mb: 0.5 }}
      >

        <strong>From:</strong>{" "}

        {email.sender_name ||
          "Unknown user"}

        {email.sender_email && (
          <>
            {" "}
            &lt;{email.sender_email}&gt;
          </>
        )}

      </Typography>


      {/* To */}

      <Typography
        variant="body2"
        sx={{ mb: 0.5 }}
      >

        <strong>To:</strong>{" "}

        {email.recipient_name ||
          "Unknown recipient"}

        {email.recipient_email && (
          <>
            {" "}
            &lt;{email.recipient_email}&gt;
          </>
        )}

      </Typography>


      {/* Sent */}

      {email.sent_at && (

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 0.5,
          }}
        >

          <strong>Sent:</strong>{" "}

          {new Date(
            email.sent_at
          ).toLocaleString()}

        </Typography>

      )}


      {/* Status */}

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 2,
        }}
      >

        <strong>Status:</strong>{" "}

        {email.status || "Unknown"}

      </Typography>


      <Divider sx={{ mb: 2 }} />


      {/* Email Body */}

      <Typography
        variant="body2"
        sx={{
          whiteSpace: "pre-wrap",
          lineHeight: 1.7,
        }}
      >

        {email.body || "No email body."}

      </Typography>

    </Box>

  );
}