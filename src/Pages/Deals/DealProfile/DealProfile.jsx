import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

// Components
import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CommonActivityTabs from "../../../Components/common/CommonActivityTab";

// Icons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";

export default function DealProfile() {
  const [activeTab, setActiveTab] = useState("Activity");

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

  const dealDetails = [
    {
      label: "Deal Owner",
      value: "Jane Cooper",
    },
    {
      label: "Priority",
      value: "High",
    },
    {
      label: "Created Date",
      value: "04/08/2025 2:31 PM GMT+5:30",
    },
    {
      label: "Lead Name",
      value: "Lead Name",
    },
  ];

  const leftPanelData = {
    profile: {
      name: "Website Revamp - Atlas Corp",
      subTitle: "Amount : $12,500",
      email: "Stage : Appointment Scheduled",
    },

    sectionTitle: "About This Deal",

    summaryTitle: "AI Deal Summary",

    summaryText:
      "There are no activities associated with this deal and further details are needed to provide a comprehensive summary.",

    actions,

    leadDetails: dealDetails,
  };

  const activities = [
    {
      title: "Deal activity",
      description:
        "Maria Johnson moved deal to Appointment scheduled.",
      date: "Jun 24, 2025 at 5:30PM",
    },
    {
      title: "",
      description:
        "This deal was created by Maria Johnson Jun 23, 2025 at 11:22 AM",
      date: "",
    },
  ];

  return (
    <>
      <CommonEntityHeader
        title="Deals"
        leftPanelData={leftPanelData}
      />

      Middle Content
      <Box
        sx={{
          position: "absolute",
          top: 80,
          left: 430,
          width: "calc(100% - 680px)",
          p: 2,
        }}
      >
        {/* Tabs */}
        <Box
          sx={{
            mt: 10,
            mx: -2,
          }}
        >
          <CommonActivityTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Box>

        {/* Upcoming */}
        <Typography
          sx={{
            mt: 3,
            mb: 2,
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Upcoming
        </Typography>

        {activities.map((item, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              width: 640,
              borderRadius: 2,
              boxShadow: "none",
              border: "1px solid #E5E7EB",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  {item.title && (
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#6B7280",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>

                {item.date && (
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#6B7280",
                    }}
                  >
                    {item.date}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}