// import React from "react";
// import { Box, Typography } from "@mui/material";

// // Icons
// import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import EmailIcon from "@mui/icons-material/Email";
// import CallIcon from "@mui/icons-material/Call";
// import TaskIcon from "@mui/icons-material/Task";
// import EventIcon from "@mui/icons-material/Event";
// import EditSquareIcon from "@mui/icons-material/EditSquare";

// export default function LeftPanel({
//   actions,
//   leadDetails,
//   handleActionClick,
//   title,
// }) {
//   return (
//     <Box
//       sx={{
//         width: 300,
//         backgroundColor: "#fff",
//         borderTopLeftRadius: "17px",
//         borderBottomLeftRadius: "19px",
//         p: 2,
//       }}
//     >
//       {/* <Typography sx={{ fontWeight: 700, mb: 2 }}>
//         Leads
//       </Typography> */}

//       <Typography sx={{ fontWeight: 700, mb: 2 }}>{title}</Typography>

//       {/* Lead Profile */}
//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <Box
//           sx={{
//             width: 72,
//             height: 72,
//             backgroundColor: "#D9D9D9",
//             borderRadius: "12px",
//           }}
//         />

//         <Box>
//           <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
//             Jane Cooper
//           </Typography>

//           <Typography sx={{ fontSize: "14px", color: "#33475B" }}>
//             SalesPerson
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 color: "#33475B",
//               }}
//             >
//               janecooper@gmail.com
//             </Typography>

//             <EditSquareIcon
//               sx={{
//                 fontSize: 14,
//                 color: "#5A45E5",
//                 cursor: "pointer",
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>

//       {/* Quick Actions */}
//       <Box
//         sx={{
//           backgroundColor: "#F7F7FA",
//           borderRadius: "8px",
//           p: 1,
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         {actions.map((item) => (
//           <Box
//             key={item.label}
//             sx={{
//               textAlign: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => handleActionClick(item.label)}
//           >
//             <Box
//               sx={{
//                 width: 32,
//                 height: 32,
//                 border: "1px solid #E0E3EB",
//                 borderRadius: "5px",
//                 background: "#fff",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {React.cloneElement(item.icon, {
//                 sx: {
//                   fontSize: 18,
//                   color: "#5948DB",
//                 },
//               })}
//             </Box>

//             <Typography sx={{ fontSize: "10px", mt: 0.5 }}>
//               {item.label}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* About Lead */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           mt: 3,
//           mb: 1,
//         }}
//       >
//         <Typography
//           sx={{
//             fontWeight: 700,
//             fontSize: "14px",
//             color: "#33475B",
//           }}
//         >
//           About this lead
//         </Typography>

//         <EditSquareIcon
//           sx={{
//             fontSize: 14,
//             color: "#5A45E5",
//             cursor: "pointer",
//           }}
//         />
//       </Box>

//       {/* Lead Details */}
//       {leadDetails.map((item) => (
//         <Box key={item.label} sx={{ mb: 2 }}>
//           <Typography
//             sx={{
//               color: "#516F90",
//               fontSize: "13px",
//             }}
//           >
//             {item.label}
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: "15px",
//               color: "#1E1E1E",
//             }}
//           >
//             {item.value}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// }

import React from "react";
import { Box, Typography } from "@mui/material";

// Icons used for quick actions and edit buttons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";
import EditSquareIcon from "@mui/icons-material/EditSquare";

export default function LeftPanel({
  // Page/entity title

  title,

  // Quick action buttons data
  // Example: Note, Email, Call, Task, Meeting
  actions,

  // Details displayed in About section
  // Example: Email, Phone, Status etc.
  leadDetails,

  // Function called when quick action is clicked
  handleActionClick,

  // Profile information
  // Comes from parent component dynamically
  profile = {},

  // Section title customization
  sectionTitle = "About this lead",
}) {
  return (
    // Left side panel container
    // Contains profile, actions and entity details
    <Box
      sx={{
        width: 300,
        backgroundColor: "#fff",
        borderTopLeftRadius: "17px",
        borderBottomLeftRadius: "19px",
        p: 2,
      }}
    >
      {/* Entity Title */}
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      {/* 
        Profile Section
        - Displays avatar
        - Displays name, role and email
      */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Profile Image Placeholder */}
        <Box
          sx={{
            width: 72,
            height: 72,
            backgroundColor: "#D9D9D9",
            borderRadius: "12px",
          }}
        />

        {/* Profile Information */}
        <Box>
          {/* Person/Entity Name */}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            {profile.name || "Jane Cooper"}
          </Typography>

          {/* Job title / Subtitle */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#33475B",
            }}
          >
            {profile.subTitle || "SalesPerson"}
          </Typography>

          {/* Email and Edit Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* Email */}
            <Typography
              sx={{
                fontSize: "14px",
                color: "#33475B",
              }}
            >
              {profile.email || "janecooper@gmail.com"}
            </Typography>

            {/* Edit Profile Button */}
            <EditSquareIcon
              sx={{
                fontSize: 14,
                color: "#5A45E5",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* 
        Quick Actions Section
        - Displays Note, Email, Call, Task, Meeting buttons
        - Clicking button triggers handleActionClick()
      */}
      <Box
        sx={{
          backgroundColor: "#F7F7FA",
          borderRadius: "8px",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {actions.map((item) => (
          // Each action button
          <Box
            key={item.label}
            sx={{
              textAlign: "center",
              cursor: "pointer",
            }}
            // Send clicked action label to parent
            onClick={() => handleActionClick(item.label)}
          >
            {/* Action Icon Box */}
            <Box
              sx={{
                width: 32,
                height: 32,
                border: "1px solid #E0E3EB",
                borderRadius: "5px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* 
                Clone icon element
                and apply common styling
              */}
              {React.cloneElement(item.icon, {
                sx: {
                  fontSize: 18,
                  color: "#5948DB",
                },
              })}
            </Box>

            {/* Action Label */}
            <Typography
              sx={{
                fontSize: "10px",
                mt: 0.5,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 
        About Section Header
        - Displays section name
        - Contains edit icon
      */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "14px",
            color: "#33475B",
          }}
        >
          {sectionTitle}
        </Typography>

        {/* Edit About Details */}
        <EditSquareIcon
          sx={{
            fontSize: 14,
            color: "#5A45E5",
            cursor: "pointer",
          }}
        />
      </Box>

      {/* 
        Entity Details List
        - Loops through leadDetails array
        - Displays label and value
      */}
      {leadDetails.map((item) => (
        <Box
          key={item.label}
          sx={{
            mb: 2,
          }}
        >
          {/* Field Label */}
          <Typography
            sx={{
              color: "#516F90",
              fontSize: "13px",
            }}
          >
            {item.label}
          </Typography>

          {/* Field Value */}
          <Typography
            sx={{
              fontSize: "15px",
              color: "#1E1E1E",
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
