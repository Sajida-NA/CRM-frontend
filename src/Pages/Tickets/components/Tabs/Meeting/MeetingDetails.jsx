import React, { useState } from "react";
import {Box,Typography} from "@mui/material";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import ScheduleMeeting from "../../../../Leads/components/Tabs/Meetings/ScheduleMeeting";
import MeetingCard from "./MeetingCard";

export default function MeetingDetails() {
  const [activeTab, setActiveTab] = useState("Meetings");
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);

  const meetings = [
    {
      title: "Meeting Maria Johnson and Jane Cooper",
      date: "June 24, 2025",
      time: "5:30 PM",
      organizer: "Maria",
      duration: "1 Hour",
      attendees: "2 People",
      description: "Let's discuss our new product line.",
    },
  ];

  return (
    <Box
      sx={{
        p: 3,
        mx:-2
      }}
    >
      {/* Activity Tabs */}
      <Box>
        <CommonActivityTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          title="Ticket"
        />
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
          mb: 1,
        }}
      >
        <Typography variant="h6">Meeting</Typography>

        <CommonButton
          variant="contained"
          onClick={() => setOpenCreateMeeting(true)}
        >
          Create Meeting
        </CommonButton>
      </Box>

      {/* Drawer */}
      <ScheduleMeeting
        open={openCreateMeeting}
        onClose={() => setOpenCreateMeeting(false)}
      />
      
      <MeetingCard/>

    </Box>
  );
}