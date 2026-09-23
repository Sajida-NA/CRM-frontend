

// import React from "react";
// import { Box } from "@mui/material";

// import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import EmailIcon from "@mui/icons-material/Email";
// import CallIcon from "@mui/icons-material/Call";
// import TaskIcon from "@mui/icons-material/Task";
// import EventIcon from "@mui/icons-material/Event";

// import LeftPanel from "./LeftPanel";
// import MiddlePanel from "./MiddlePanel";
// import RightPanel from "./RightPanel";

// export default function CommonEntityHeader({
//   title,
//   leftPanelData = {},
//   children,
//   action,

//   module = "lead",
//   objectId,

//   onCallClick,
//   onNoteClick,
//   onEmailClick,
//   onTaskClick,
//   onMeetingClick,
// }) {
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

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "100%",
//         minWidth: 0,

//         minHeight: "calc(100vh - 64px)",

//         display: "flex",
//         alignItems: "stretch",

//         backgroundColor: "#fff",
//         borderRadius: 2,

//         overflow: "hidden",

//         boxSizing: "border-box",
//       }}
//     >
//       {/* =====================================================
//           LEFT PANEL
//       ===================================================== */}

//       <Box
//         sx={{
//           minWidth: 0,
//           flexShrink: 0,
//         }}
//       >
//         <LeftPanel
//           title={title}
//           actions={
//             leftPanelData.actions ||
//             actions
//           }
//           leadDetails={
//             leftPanelData.leadDetails ||
//             []
//           }
//           handleActionClick={
//             leftPanelData.handleActionClick ||
//             handleActionClick
//           }
//           profile={
//             leftPanelData.profile
//           }
//           sectionTitle={
//             leftPanelData.sectionTitle
//           }
//           showProfileEdit={
//             leftPanelData.showProfileEdit
//           }
//           showProfileImage={
//             leftPanelData.showProfileImage
//           }
//         />
//       </Box>

//       {/* =====================================================
//           MIDDLE PANEL
//       ===================================================== */}

//       <Box
//         sx={{
//           /*
//            * Middle panel takes all remaining space.
//            */
//           flex: "1 1 auto",

//           /*
//            * Allows the flex item to shrink
//            * without disappearing.
//            */
//           minWidth: 0,

//           /*
//            * IMPORTANT:
//            * Do NOT use width: 0 here.
//            */
//           maxWidth: "100%",

//           boxSizing: "border-box",
//         }}
//       >
//         <MiddlePanel action={action}>
//           {children}
//         </MiddlePanel>
//       </Box>

//       {/* =====================================================
//           RIGHT PANEL
//       ===================================================== */}

//       <Box
//         sx={{
//           width: 300,
//           minWidth: 300,
//           maxWidth: 300,

//           flexShrink: 0,

//           boxSizing: "border-box",

//           overflow: "hidden",
//         }}
//       >
//         <RightPanel
//           module={module}
//           objectId={objectId}
//           summaryTitle={
//             leftPanelData.summaryTitle ||
//             "AI Lead Summary"
//           }
//           summaryText={
//             leftPanelData.summaryText
//           }
//         />
//       </Box>
//     </Box>
//   );
// }






import React from "react";
import { Box } from "@mui/material";

import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";

import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";

export default function CommonEntityHeader({
  title,
  leftPanelData = {},
  children,
  action,

  // =====================================================
  // CRM MODULE
  // =====================================================

  module = "lead",

  // =====================================================
  // CRM RECORD ID
  // =====================================================

  objectId,

  // =====================================================
  // CRM RECORD DATA FOR AI
  // Works for Lead / Company / Deal / Ticket
  // =====================================================

  crmData = null,

  onCallClick,
  onNoteClick,
  onEmailClick,
  onTaskClick,
  onMeetingClick,
}) {
  // =====================================================
  // ACTION CLICK
  // =====================================================

  const handleActionClick = (type) => {
    switch (type) {
      case "Call":
        onCallClick?.();
        break;

      case "Note":
        onNoteClick?.();
        break;

      case "Email":
        onEmailClick?.();
        break;

      case "Task":
        onTaskClick?.();
        break;

      case "Meeting":
        onMeetingClick?.();
        break;

      default:
        console.log(
          "Unknown action:",
          type
        );
    }
  };

  // =====================================================
  // DEFAULT ACTIONS
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
  // RETURN
  // =====================================================

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,

        minHeight:
          "calc(100vh - 64px)",

        display: "flex",
        alignItems: "stretch",

        backgroundColor: "#fff",
        borderRadius: 2,

        overflow: "hidden",

        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
          LEFT PANEL
      ===================================================== */}

      <Box
        sx={{
          minWidth: 0,
          flexShrink: 0,
        }}
      >
        <LeftPanel
          title={title}
          actions={
            leftPanelData.actions ||
            actions
          }
          leadDetails={
            leftPanelData.leadDetails ||
            []
          }
          handleActionClick={
            leftPanelData.handleActionClick ||
            handleActionClick
          }
          profile={
            leftPanelData.profile
          }
          sectionTitle={
            leftPanelData.sectionTitle
          }
          showProfileEdit={
            leftPanelData.showProfileEdit
          }
          showProfileImage={
            leftPanelData.showProfileImage
          }
        />
      </Box>

      {/* =====================================================
          MIDDLE PANEL
      ===================================================== */}

      <Box
        sx={{
          flex: "1 1 auto",

          minWidth: 0,

          maxWidth: "100%",

          boxSizing: "border-box",
        }}
      >
        <MiddlePanel action={action}>
          {children}
        </MiddlePanel>
      </Box>

      {/* =====================================================
          RIGHT PANEL
      ===================================================== */}

      <Box
        sx={{
          width: 300,
          minWidth: 300,
          maxWidth: 300,

          flexShrink: 0,

          boxSizing: "border-box",

          overflow: "hidden",
        }}
      >
        <RightPanel
          // =================================================
          // WHICH CRM MODULE?
          // lead / company / deal / ticket
          // =================================================
          module={module}

          // =================================================
          // CURRENT RECORD ID
          // =================================================
          objectId={objectId}

          // =================================================
          // CURRENT CRM RECORD
          // =================================================
          crmData={crmData}

          // =================================================
          // AI TITLE
          // =================================================
          summaryTitle={
            leftPanelData.summaryTitle ||
            "AI Lead Summary"
          }

          // =================================================
          // DEFAULT TEXT
          // =================================================
          summaryText={
            leftPanelData.summaryText ||
            "There are no activities associated with this record and further details are needed to provide a comprehensive summary."
          }
        />
      </Box>
    </Box>
  );
}

