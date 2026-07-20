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
  // Page title
  title,

  // Dynamic data for the left panel
  leftPanelData = {},
}) {
  // Handles quick action button clicks
  const handleActionClick = (type) => {
    const tabMap = {
      Note: "Notes",
      Email: "Emails",
      Call: "Calls",
      Task: "Tasks",
      Meeting: "Meetings",
    };

    // Future implementation
    // const selectedTab = tabMap[type];
    // setActiveTab(selectedTab);
  };

  // Default quick action buttons
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

  // Default profile details
  

  const leadDetails = [
    {
      label: "Email",
      value: "janecooper@gmail.com",
    },
    {
      label: "First Name",
      value: "Jane",
    },
    {
      label: "Last Name",
      value: "Cooper",
    },
    {
      label: "Phone Number",
      value: "078 5432 8505",
    },
    {
      label: "Lead Status",
      value: "New",
    },
    {
      label: "Job Title",
      value: "Salesperson",
    },
    {
      label: "Created Date",
      value: "04/08/2025 2:31 PM GMT+5:30",
    },
  ];

  return (
    // Main layout
    <MainLayout title={title}>
      <Box
        sx={{
          width: "100%",
          // height: "100vh",
          display: "flex",
          alignItems: "stretch",
          backgroundColor: "#fff",
          borderRadius: 2,
        }}
      >
        {/* Left panel */}
        <LeftPanel
          title={title}
          actions={leftPanelData.actions || actions}
          leadDetails={leftPanelData.leadDetails || leadDetails}
          handleActionClick={
            leftPanelData.handleActionClick || handleActionClick
          }
          profile={leftPanelData.profile}
          sectionTitle={leftPanelData.sectionTitle}
        />

        {/* Middle panel */}
        <MiddlePanel
        // activeTab={activeTab}
        // setActiveTab={setActiveTab}
        />

        {/* Right panel */}
        <RightPanel
          summaryTitle={leftPanelData.summaryTitle}
          summaryText={leftPanelData.summaryText}
        />
      </Box>
    </MainLayout>
  );
}
