

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
 
//   if (!email) { 
//     return null; 
//   } 
 
//   // ========================================== 
//   // EMAIL DATA 
//   // ========================================== 
 
//   const subject = 
//     email.subject || "No Subject"; 
 
//   const sender = 
//     email.sender_name || 
//     email.sender_email || 
//     "Unknown"; 
 
//   const recipient = 
//     email.recipient_name || 
//     email.recipient_email || 
//     "Unknown"; 
 
//   const body = email.body || ""; 
 
//   // ========================================== 
//   // DATE 
//   // ========================================== 
 
//   const formattedDate = email.date 
//     ? new Date(email.date).toLocaleString( 
//         "en-US", 
//         { 
//           month: "long", 
//           day: "numeric", 
//           year: "numeric", 
//           hour: "numeric", 
//           minute: "2-digit", 
//         } 
//       ) 
//     : ""; 
 
//   // ========================================== 
//   // BODY PREVIEW 
//   // ========================================== 
 
//   const plainBody = body.replace( 
//     /<[^>]*>/g, 
//     "" 
//   ); 
 
//   const preview = 
//     plainBody.length > 80 
//       ? `${plainBody.substring(0, 80)}...` 
//       : plainBody; 
 
//   return ( 
//     <Box 
//       sx={{ 
//         border: "1px solid", 
//         borderColor: "divider", 
//         borderRadius: 2, 
//         bgcolor: "#fff", 
//         overflow: "hidden", 
//         mt: 1, 
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
//         <Stack 
//           direction="row" 
//           spacing={1} 
//           alignItems="center" 
//         > 
//           {/* Arrow */} 
//           <IconButton 
//             size="small" 
//             sx={{ 
//               p: 0, 
//             }} 
//           > 
//             {open ? ( 
//               <KeyboardArrowDownIcon 
//                 color="primary" 
//                 fontSize="small" 
//               /> 
//             ) : ( 
//               <KeyboardArrowRightIcon 
//                 color="primary" 
//                 fontSize="small" 
//               /> 
//             )} 
//           </IconButton> 
 
//           {/* Email information */} 
//           <Box> 
//             <Typography 
//               sx={{ 
//                 fontSize: 18, 
//                 fontWeight: 700, 
//                 color: "#374151", 
//               }} 
//             > 
//               Logged Email - {subject} 
 
//               <Typography 
//                 component="span" 
//                 sx={{ 
//                   fontWeight: 400, 
//                   color: "#6B7280", 
//                   ml: 0.5, 
//                 }} 
//               > 
//                 by {sender} 
//               </Typography> 
//             </Typography> 
 
//             {/* Preview */} 
//             {!open && ( 
//               <Typography 
//                 sx={{ 
//                   mt: 0.5, 
//                   color: "#64748B", 
//                   fontSize: 15, 
//                 }} 
//               > 
//                 {preview || 
//                   "No email content"} 
//               </Typography> 
//             )} 
//           </Box> 
//         </Stack> 
 
//         {/* Date */} 
//         <Typography 
//           sx={{ 
//             fontSize: 15, 
//             color: "#6B7280", 
//             whiteSpace: "nowrap", 
//           }} 
//         > 
//           {formattedDate} 
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
//           {/* Recipient */} 
//           <Typography 
//             sx={{ 
//               color: "#64748B", 
//               mb: 3, 
//             }} 
//           > 
//             To {recipient} 
//           </Typography> 
 
//           {/* Email Body */} 
//           <Typography 
//             component="div" 
//             sx={{ 
//               whiteSpace: "pre-line", 
//               lineHeight: 2, 
//               color: "#64748B", 
//               fontSize: 13, 
//             }} 
//           > 
//             {plainBody} 
//           </Typography> 
//         </Box> 
//       </Collapse> 
//     </Box> 
//   ); 
// } 

import React, { useState } from "react"; 
import { 
  Box, 
  Typography, 
  Stack, 
  IconButton, 
  Collapse, 
} from "@mui/material"; 
 
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"; 
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; 
 
export default function EmailCard({ email }) { 
  const [open, setOpen] = useState(false); 
 
  if (!email) { 
    return null; 
  } 
 
  // ========================================== 
  // EMAIL DATA 
  // ========================================== 
 
  const subject = 
    email.subject || "No Subject"; 
 
  const sender = 
    email.sender_name || 
    email.sender_email || 
    "Unknown"; 
 
  const recipient = 
    email.recipient_name || 
    email.recipient_email || 
    "Unknown"; 
 
  const body = email.body || ""; 
 
  // ========================================== 
  // DATE 
  // ========================================== 
 
  const formattedDate = email.date 
    ? new Date(email.date).toLocaleString( 
        "en-US", 
        { 
          month: "long", 
          day: "numeric", 
          year: "numeric", 
          hour: "numeric", 
          minute: "2-digit", 
        } 
      ) 
    : ""; 
 
  // ========================================== 
  // BODY PREVIEW 
  // ========================================== 
 
  const plainBody = body.replace( 
    /<[^>]*>/g, 
    "" 
  ); 
 
  const preview = 
    plainBody.length > 80 
      ? `${plainBody.substring(0, 80)}...` 
      : plainBody; 
 
  return ( 
    <Box 
      sx={{ 
        border: "1px solid", 
        borderColor: "divider", 
        borderRadius: 2, 
        bgcolor: "#fff", 
        overflow: "hidden", 
        mt: 1, 
      }} 
    > 
      {/* Header */} 
      <Box 
        onClick={() => setOpen(!open)} 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          px: 2, 
          py: 2, 
          cursor: "pointer", 
        }} 
      > 
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center" 
        > 
          {/* Arrow */} 
          <IconButton 
            size="small" 
            sx={{ 
              p: 0, 
            }} 
          > 
            {open ? ( 
              <KeyboardArrowDownIcon 
                color="primary" 
                fontSize="small" 
              /> 
            ) : ( 
              <KeyboardArrowRightIcon 
                color="primary" 
                fontSize="small" 
              /> 
            )} 
          </IconButton> 
 
          {/* Email information */} 
          <Box> 
            <Typography 
              sx={{ 
                fontSize: 18, 
                fontWeight: 700, 
                color: "#374151", 
              }} 
            > 
              Logged Email - {subject} 
 
              <Typography 
                component="span" 
                sx={{ 
                  fontWeight: 400, 
                  color: "#6B7280", 
                  ml: 0.5, 
                }} 
              > 
                by {sender} 
              </Typography> 
            </Typography> 
 
            {/* Preview */} 
            {!open && ( 
              <Typography 
                sx={{ 
                  mt: 0.5, 
                  color: "#64748B", 
                  fontSize: 15, 
                }} 
              > 
                {preview || 
                  "No email content"} 
              </Typography> 
            )} 
          </Box> 
        </Stack> 
 
        {/* Date */} 
        <Typography 
          sx={{ 
            fontSize: 15, 
            color: "#6B7280", 
            whiteSpace: "nowrap", 
          }} 
        > 
          {formattedDate} 
        </Typography> 
      </Box> 
 
      {/* Body */} 
      <Collapse in={open}> 
        <Box 
          sx={{ 
            px: 6, 
            pb: 3, 
          }} 
        > 
          {/* Recipient */} 
          <Typography 
            sx={{ 
              color: "#64748B", 
              mb: 3, 
            }} 
          > 
            To {recipient} 
          </Typography> 
 
          {/* Email Body */} 
          <Typography 
            component="div" 
            sx={{ 
              whiteSpace: "pre-line", 
              lineHeight: 2, 
              color: "#64748B", 
              fontSize: 13, 
            }} 
          > 
            {plainBody} 
          </Typography> 
        </Box> 
      </Collapse> 
    </Box> 
  ); 
} 