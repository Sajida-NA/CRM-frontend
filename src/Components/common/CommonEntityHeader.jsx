import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box } from "@mui/material";

// Icons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";

// Components
import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";

export default function CommonEntityHeader({
  // activeTab,
  // setActiveTab,

  title,
  leftPanelData = {},
}) {
  // Handle quick action clicks
  const handleActionClick = (type) => {
    const tabMap = {
      Note: "Notes",
      Email: "Emails",
      Call: "Calls",
      Task: "Tasks",
      Meeting: "Meetings",
    };

    // if (tabMap[type]) {
    //   setActiveTab(tabMap[type]);
    // }
  };

  // Quick action buttons
  const actions = [
    { label: "Note", icon: <NoteAltIcon /> },
    { label: "Email", icon: <EmailIcon /> },
    { label: "Call", icon: <CallIcon /> },
    { label: "Task", icon: <TaskIcon /> },
    { label: "Meeting", icon: <EventIcon /> },
  ];

  // Lead details
  const leadDetails = [
    { label: "Email", value: "janecooper@gmail.com" },
    { label: "First Name", value: "Jane" },
    { label: "Last Name", value: "Cooper" },
    { label: "Phone Number", value: "078 5432 8505" },
    { label: "Lead Status", value: "New" },
    { label: "Job Title", value: "Salesperson" },
    { label: "Created Date", value: "04/08/2025 2:31 PM GMT+5:30" },
  ];

  return (
    <MainLayout title={title}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          backgroundColor: "#fff",
        }}
      >
        {/* Left Panel */}
        {/* <LeftPanel
          actions={actions}
          leadDetails={leadDetails}
          handleActionClick={handleActionClick}
          title={title}
        /> */}

        <LeftPanel
          actions={leftPanelData.actions || actions}
          leadDetails={leftPanelData.leadDetails || leadDetails}
          handleActionClick={
            leftPanelData.handleActionClick || handleActionClick
          }
          title={title}
        />

        {/* Middle Panel */}
        <MiddlePanel
        // activeTab={activeTab}
        // setActiveTab={setActiveTab}
        />

        {/* Right Panel */}
        <RightPanel />
      </Box>
    </MainLayout>
  );
}
