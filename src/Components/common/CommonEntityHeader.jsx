// import React from "react";
// import MainLayout from "../../layout/MainLayout";
// import { Box } from "@mui/material";

// // Quick action icons
// import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import EmailIcon from "@mui/icons-material/Email";
// import CallIcon from "@mui/icons-material/Call";
// import TaskIcon from "@mui/icons-material/Task";
// import EventIcon from "@mui/icons-material/Event";

// // Common panel components
// import LeftPanel from "./LeftPanel";
// import MiddlePanel from "./MiddlePanel";
// import RightPanel from "./RightPanel";

// export default function CommonEntityHeader({
//   title,
//   leftPanelData = {},
//   children,
//   action,

//   // Quick action callbacks
//   onCallClick,
//   onNoteClick,
//   onEmailClick,
//   onTaskClick,
//   onMeetingClick,
// }) {
//   // =====================================================
//   // QUICK ACTION CLICK HANDLER
//   // =====================================================

//   const handleActionClick = (type) => {
//     switch (type) {
//       case "Call":
//         onCallClick?.();
//         break;

//       case "Note":
//         onNoteClick?.();
//         break;

//       case "Email":
//         onEmailClick?.();
//         break;

//       case "Task":
//         onTaskClick?.();
//         break;

//       case "Meeting":
//         onMeetingClick?.();
//         break;

//       default:
//         console.log("Unknown action:", type);
//     }
//   };

//   // =====================================================
//   // DEFAULT QUICK ACTIONS
//   // =====================================================

//   const actions = [
//     {
//       label: "Note",
//       icon: <NoteAltIcon />,
//     },
//     {
//       label: "Email",
//       icon: <EmailIcon />,
//     },
//     {
//       label: "Call",
//       icon: <CallIcon />,
//     },
//     {
//       label: "Task",
//       icon: <TaskIcon />,
//     },
//     {
//       label: "Meeting",
//       icon: <EventIcon />,
//     },
//   ];

  

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <MainLayout title={title}>
//       <Box
//         sx={{
//           width: "100%",
//           minHeight: "calc(100vh - 64px)",
//           display: "flex",
//           alignItems: "stretch",
//           backgroundColor: "#fff",
//           borderRadius: 2,
//           overflow: "hidden",
//         }}
//       >
//         {/* =================================================
//             LEFT PANEL
//         ================================================= */}

//         <LeftPanel
//           title={title}
//           actions={leftPanelData.actions || actions}
//           leadDetails={leftPanelData.leadDetails || leadDetails}
//           handleActionClick={
//             leftPanelData.handleActionClick || handleActionClick
//           }
//           profile={leftPanelData.profile}
//           sectionTitle={leftPanelData.sectionTitle}
//           showProfileEdit={leftPanelData.showProfileEdit}
//           showProfileImage={leftPanelData.showProfileImage}
//         />

//         {/* =================================================
//             MIDDLE PANEL
//         ================================================= */}

//         <MiddlePanel action={action}>
//           {children}
//         </MiddlePanel>

//         {/* =================================================
//             RIGHT PANEL
//         ================================================= */}

//         <RightPanel
//           summaryTitle={leftPanelData.summaryTitle}
//           summaryText={leftPanelData.summaryText}
//         />
//       </Box>
//     </MainLayout>
//   );
// }


import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box } from "@mui/material";

// Quick action icons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";

// Common panel components
import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";

export default function CommonEntityHeader({
  title,
  leftPanelData = {},
  children,
  action,

  // Quick action callbacks
  onCallClick,
  onNoteClick,
  onEmailClick,
  onTaskClick,
  onMeetingClick,
}) {
  // =====================================================
  // QUICK ACTION CLICK HANDLER
  // =====================================================

  const handleActionClick = (type) => {
    switch (type) {
      case "Call":
        if (onCallClick) {
          onCallClick();
        }
        break;

      case "Note":
        if (onNoteClick) {
          onNoteClick();
        }
        break;

      case "Email":
        if (onEmailClick) {
          onEmailClick();
        }
        break;

      case "Task":
        if (onTaskClick) {
          onTaskClick();
        }
        break;

      case "Meeting":
        if (onMeetingClick) {
          onMeetingClick();
        }
        break;

      default:
        console.log("Unknown action:", type);
    }
  };

  // =====================================================
  // DEFAULT QUICK ACTIONS
  // =====================================================

  const actions = [
    {
      label: "Note",
      icon: <NoteAltIcon />,
    },
    {
      label: "Email",
      icon: <EmailIcon />,
    },
    {
      label: "Call",
      icon: <CallIcon />,
    },
    {
      label: "Task",
      icon: <TaskIcon />,
    },
    {
      label: "Meeting",
      icon: <EventIcon />,
    },
  ];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <MainLayout title={title}>
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "stretch",
          backgroundColor: "#fff",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* =================================================
            LEFT PANEL
        ================================================= */}

        <LeftPanel
          title={title}
          actions={leftPanelData.actions || actions}
          leadDetails={leftPanelData.leadDetails || {}}
          handleActionClick={
            leftPanelData.handleActionClick || handleActionClick
          }
          profile={leftPanelData.profile}
          sectionTitle={leftPanelData.sectionTitle}
          showProfileEdit={leftPanelData.showProfileEdit}
          showProfileImage={leftPanelData.showProfileImage}
        />

        {/* =================================================
            MIDDLE PANEL
        ================================================= */}

        <MiddlePanel action={action}>
          {children}
        </MiddlePanel>

        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <RightPanel
          summaryTitle={leftPanelData.summaryTitle}
          summaryText={leftPanelData.summaryText}
        />
      </Box>
    </MainLayout>
  );
}
