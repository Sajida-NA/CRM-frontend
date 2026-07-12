import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box } from "@mui/material";

// Icons used for default quick action buttons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";

// Common child components
// LeftPanel  -> Profile details + Quick actions
// MiddlePanel -> Activity area
// RightPanel -> AI summary + Attachments
import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";

export default function CommonEntityHeader({
  // Dynamic page title
  // Example:
  // Lead Profile
  // Deal Profile
  // Company Profile
  // Ticket Profile
  title,

  // Object containing dynamic data from parent entity page
  // Example:
  // profile details
  // custom actions
  // summary information
  leftPanelData = {},
}) {
  /*
    Handles quick action button click.

    Example:
    Clicking "Note" button
    can navigate/open Notes activity tab.

    This function can be overridden
    from the parent component.
  */
  const handleActionClick = (type) => {
    // Action name to activity tab mapping
    const tabMap = {
      Note: "Notes",

      Email: "Emails",

      Call: "Calls",

      Task: "Tasks",

      Meeting: "Meetings",
    };

    // Future implementation:
    // const selectedTab = tabMap[type];
    // setActiveTab(selectedTab);
  };

  /*
    Default quick action buttons.

    These are used when entity pages
    do not provide custom actions.

    Example:
    Lead page can use these default actions,
    Deal page can replace them.
  */
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

  /*
    Default entity details.

    These values are displayed
    inside LeftPanel.

    Parent pages can replace this data
    using leftPanelData.leadDetails.
  */
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
    /*
      MainLayout provides common application layout.

      Title changes based on entity page.
      Example:
      "Lead"
      "Company"
      "Deal"
    */
    <MainLayout title={title}>
      {/* 
        Main three-column container

        Layout:
        ---------------------------------
        | Left |      Middle      | Right |
        ---------------------------------

        Left:
        Profile information

        Middle:
        Activities

        Right:
        AI Summary
      */}
      <Box
        sx={{
          width: "100%",

          height: "100vh",

          display: "flex",

          backgroundColor: "#fff",
        }}
      >
        /* LEFT PANEL Displays: - Entity title - Profile information - Quick
        actions - About details Data is reusable for all entities. */
        <LeftPanel
          // Page/entity title
          title={title}
          // Use custom actions if provided,
          // otherwise use default actions
          actions={leftPanelData.actions || actions}
          // Use custom details if provided,
          // otherwise use default details
          leadDetails={leftPanelData.leadDetails || leadDetails}
          // Use custom handler if available
          handleActionClick={
            leftPanelData.handleActionClick || handleActionClick
          }
          // Profile information
          // Example:
          // Name, Email, Role
          profile={leftPanelData.profile}
          // Section heading
          // Example:
          // About this lead
          // About this company
          sectionTitle={leftPanelData.sectionTitle}
        />
        /* MIDDLE PANEL Displays: - Search activities - Convert button -
        Activity tabs Future: Notes Emails Calls Tasks Meetings */
        <MiddlePanel

        // activeTab={activeTab}

        // setActiveTab={setActiveTab}
        />
        /* RIGHT PANEL Displays: - AI Summary card - Attachments section Data
        comes from entity page. */
        <RightPanel
          // Dynamic AI summary title
          summaryTitle={leftPanelData.summaryTitle}
          // Dynamic AI summary description
          summaryText={leftPanelData.summaryText}
        />
      </Box>
    </MainLayout>
  );
}
