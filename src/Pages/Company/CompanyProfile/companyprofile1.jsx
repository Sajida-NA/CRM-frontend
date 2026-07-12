import React, { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

// Components
import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CommonActivityTabs from "../../../Components/common/CommonActivityTab";
import CommonButton from "../../../Components/common/CommonButton";

// Icons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";


export default function CompanyProfile() {

  const [activeTab, setActiveTab] = useState("Activity");
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);
  const [openCards, setOpenCards] = useState({});


  const toggleCard = (index) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const colors = {
    textSecondary: "#6B7280",
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


  const companyDetails = [
    {
      label: "Company Domain Name",
      value: "trustsphere.com",
    },
    {
      label: "Company Name",
      value: "TrustSphere",
    },
    {
      label: "Industry",
      value: "Real Estate",
    },
    {
      label: "Phone Number",
      value: "078 5432 8505",
    },
    {
      label: "Company Owner",
      value: "Brooklyn Simmons",
    },
    {
      label: "City",
      value: "Bangalore",
    },
    {
      label: "Country/Region",
      value: "India",
    },
    {
      label: "No. of Employees",
      value: "100-120",
    },
    {
      label: "Annual Revenue",
      value: "20,000,00,000.00",
    },
    {
      label: "Created Date",
      value: "04/08/2025 2:31 PM GMT+5:30",
    },
  ];


  const leftPanelData = {

    profile: {
      name: "TrustSphere",
      subTitle: "Real Estate",
      email: "trustsphere.com",
    },

    sectionTitle: "About this Company",

    summaryTitle: "AI Company Summary",

    summaryText:
      "There are no activities associated with this company and further details are needed to provide a comprehensive summary.",

    actions,

    leadDetails: companyDetails,

  };


  const meetings = [
    {
      title: "Project Discussion",
      date: "18 Jul 2026",
      time: "10:00 AM",
      duration: "30 Minutes",
      attendees: "John, David",
      organizer: "Brooklyn Simmons",
      description:
        "Discussion about project requirements and upcoming milestones.",
    },

    {
      title: "Sales Review Meeting",
      date: "20 Jul 2026",
      time: "02:00 PM",
      duration: "45 Minutes",
      attendees: "Sales Team",
      organizer: "Brooklyn Simmons",
      description:
        "Monthly sales review and future planning discussion.",
    },
  ];



  return (

    <>

      <CommonEntityHeader
        title="Companies"
        leftPanelData={leftPanelData}
      />


      {/* Middle Content */}

      <Box
        sx={{
          p: 3,
          position: "absolute",
          top: 80,
          left: 430,
          width: "calc(100% - 680px)",
        }}
      >


        {/* Activity Tabs */}

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
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            mt:5,
            mb:1,
          }}
        >

          <Typography variant="h6">
            Meetings
          </Typography>


          <CommonButton
            variant="contained"
            onClick={() =>
              setOpenCreateMeeting(true)
            }
          >
            Create Meeting
          </CommonButton>


        </Box>



        {/* Meeting Cards */}


        <Box
          sx={{
            width:800,
            mt:2,
          }}
        >


          {
            [...meetings, ...meetings].map((m,index)=>(


              <Card
                key={index}
                sx={{
                  width:630,
                  borderRadius:2,
                  boxShadow:
                  "0px 1px 4px rgba(0,0,0,0.08)",
                  mt:2,
                }}
              >


                <CardContent
                  sx={{
                    p:"16px 20px",
                  }}
                >


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
                        cursor:"pointer",
                        flex:1,
                      }}

                      onClick={() =>
                        toggleCard(index)
                      }
                    >

                      {
                        openCards[index]
                        ?
                        <ExpandLessIcon/>
                        :
                        <ExpandMoreIcon/>
                      }


                      <Typography
                        fontWeight={600}
                        fontSize="15px"
                      >
                        {m.title}
                      </Typography>


                    </Stack>



                    <Typography>
                      {m.date} at {m.time}
                    </Typography>



                  </Stack>





                  {
                    openCards[index]
                    ?

                    <Box mt={2}>


                      <Typography
                        fontSize="13px"
                        color={colors.textSecondary}
                      >
                        Organized by {m.organizer}
                      </Typography>




                      <Box
                        sx={{
                          background:"#F4F8FC",
                          borderRadius:"10px",
                          p:2,
                          mt:2,
                          display:"flex",
                          gap:4,
                          flexWrap:"wrap",
                        }}
                      >


                        <Box>

                          <Typography
                            fontSize="12px"
                            color="#7B8794"
                          >
                            Date & Time
                          </Typography>


                          <Typography fontWeight={600}>
                            {m.date} at {m.time}
                          </Typography>


                        </Box>




                        <Box>

                          <Typography
                            fontSize="12px"
                            color="#7B8794"
                          >
                            Duration
                          </Typography>


                          <Typography fontWeight={600}>
                            {m.duration}
                          </Typography>


                        </Box>




                        <Box>

                          <Typography
                            fontSize="12px"
                            color="#7B8794"
                          >
                            Attendees
                          </Typography>


                          <Typography fontWeight={600}>
                            {m.attendees}
                          </Typography>


                        </Box>


                      </Box>




                      <Typography
                        mt={2}
                        color="#4B5563"
                        fontSize="14px"
                      >
                        {m.description}
                      </Typography>



                    </Box>


                    :


                    <Typography
                      mt={1}
                      color="#6B7280"
                      fontSize="13px"
                    >
                      {m.description}
                    </Typography>

                  }



                </CardContent>


              </Card>


            ))
          }


        </Box>


      </Box>


    </>

  );

}