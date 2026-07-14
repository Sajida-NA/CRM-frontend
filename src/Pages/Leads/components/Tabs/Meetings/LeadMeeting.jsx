import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CommonEntityHeader from "../../../../../Components/common/CommonEntityHeader";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import ScheduleMeeting from "./ScheduleMeeting";
import colors from "../../../../../theme/colors";

export default function LeadMeeting() {
  const [activeTab, setActiveTab] = useState("Meetings");
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);
  const [openCards, setOpenCards] = useState({
    0: false,
    1: true,
  });

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

  const toggleCard = (index) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <CommonEntityHeader

        title="Leads"
        
      />

      <Box
        sx={{
          p: 3,
          position: "absolute",
          top: 80,
          left: 430,
          width: "calc(100% - 680px)",
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

        {/* Header */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
            mb: 1,
          }}
        >
          <Typography variant="h6">Meetings</Typography>

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

        {/* Meeting Cards */}

        <Box
          sx={{
            width: 800,
            mt: 2,
          }}
        >
          {[...meetings, ...meetings].map((m, index) => (
            <Card
              key={index}
              sx={{
                width: 630,
                borderRadius: 2,
                boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
                mt: 2,
              }}
            >
              <CardContent
                sx={{
                  p: "16px 20px",
                }}
              >
                {/* Title row */}

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      cursor: "pointer",
                      flex: 1,
                    }}
                    onClick={() => toggleCard(index)}
                  >
                    {openCards[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                    <Typography fontWeight={600} fontSize="15px">
                      {m.title}
                    </Typography>
                  </Stack>

                  <Typography>
                    {m.date} at {m.time}
                  </Typography>
                </Stack>

                {openCards[index] ? (
                  <Box mt={2}>
                    <Typography fontSize="13px" color={colors.textSecondary}>
                      Organized by {m.organizer}
                    </Typography>

                    <Box
                      sx={{
                        background: "#F4F8FC",
                        borderRadius: "10px",
                        p: 2,
                        display: "flex",
                        gap: 4,
                        flexWrap: "wrap",
                      }}
                    >
                      <Box>
                        <Typography fontSize="12px" color="#7B8794">
                          Date & Time
                        </Typography>

                        <Typography fontWeight={600}>
                          {m.date} at {m.time}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography fontSize="12px" color="#7B8794">
                          Duration
                        </Typography>

                        <Typography fontWeight={600}>{m.duration}</Typography>
                      </Box>

                      <Box>
                        <Typography fontSize="12px" color="#7B8794">
                          Attendees
                        </Typography>

                        <Typography fontWeight={600}>{m.attendees}</Typography>
                      </Box>
                    </Box>

                    <Typography mt={2} color="#4B5563" fontSize="14px">
                      {m.description}
                    </Typography>
                  </Box>
                ) : (
                  <Typography mt={1} color="#6B7280" fontSize="13px">
                    {m.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}


