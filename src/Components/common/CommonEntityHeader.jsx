import React from "react";
import MainLayout from "../../layout/MainLayout";
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
}) {
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
          height: "100vh",
          display: "flex",
          backgroundColor: "#fff",
        }}
      >
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

        <MiddlePanel
          // activeTab={activeTab}
          // setActiveTab={setActiveTab}
        />

        <RightPanel
          summaryTitle={leftPanelData.summaryTitle}
          summaryText={leftPanelData.summaryText}
        />
      </Box>
    </MainLayout>
  );
}