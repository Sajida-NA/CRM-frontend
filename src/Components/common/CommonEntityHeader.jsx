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
  onCallClick,
}) {

  // Handles quick action button clicks
  const handleActionClick = (type) => {

    if (type === "Call") {
      onCallClick?.();
      return;
    }

    const tabMap = {
      Note: "Notes",
      Email: "Emails",
      Task: "Tasks",
      Meeting: "Meetings",
    };

    console.log(tabMap[type]);
  };


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

        {/* Left Panel */}
        <LeftPanel
          title={title}
          actions={leftPanelData.actions || actions}
          leadDetails={leftPanelData.leadDetails || leadDetails}
          handleActionClick={
            leftPanelData.handleActionClick || handleActionClick
          }
          profile={leftPanelData.profile}
          sectionTitle={leftPanelData.sectionTitle}
          showProfileEdit={leftPanelData.showProfileEdit} 
            showProfileImage={leftPanelData.showProfileImage}
        />


        {/* Middle Panel */}
        <MiddlePanel action={action}>
          {children}
        </MiddlePanel>


        {/* Right Panel */}
        <RightPanel
          summaryTitle={leftPanelData.summaryTitle}
          summaryText={leftPanelData.summaryText}
        />

      </Box>

    </MainLayout>
  );
}