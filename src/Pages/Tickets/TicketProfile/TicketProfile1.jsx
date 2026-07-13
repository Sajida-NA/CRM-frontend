import React, { useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

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


export default function TicketProfile1() {

  const [activeTab, setActiveTab] = useState("Activity");
  const [openCards, setOpenCards] = useState({});
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);


  const toggleCard = (index) => {
    setOpenCards((prev)=>({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const actions = [
    {
      label:"Note",
      icon:<NoteAltIcon/>
    },
    {
      label:"Email",
      icon:<EmailIcon/>
    },
    {
      label:"Call",
      icon:<CallIcon/>
    },
    {
      label:"Task",
      icon:<TaskIcon/>
    },
    {
      label:"Meeting",
      icon:<EventIcon/>
    },
  ];



  const ticketDetails = [
    {
      label:"Ticket Description",
      value:"Description goes here",
    },
    {
      label:"Ticket Owner",
      value:"Jane Cooper",
    },
    {
      label:"Priority",
      value:"High",
    },
    {
      label:"Created Date",
      value:"04/08/2025 2:31 PM GMT+5:30",
    },
  ];



  const meetings = [
    {
      title:"Payment Discussion Meeting",
      date:"12/07/2026",
      time:"10:30 AM",
      duration:"30 Minutes",
      attendees:"Jane Cooper",
      organizer:"Admin",
      description:
      "Discussion about payment failure issue.",
    },
  ];



  const leftPanelData = {

    actions,

    profile:{
      name:"Payment Failure Issue",
      subTitle:"Status : New",
      email:"",
    },

    sectionTitle:"About this Ticket",

    leadDetails:ticketDetails,

    summaryTitle:"AI Ticket Summary",

    summaryText:
    'The ticket titled "Payment Failure Issue" currently has no associated conversation, call, or note transcripts.',
  };




return (

<Box>

  <CommonEntityHeader
    title="Tickets"
    leftPanelData={leftPanelData}
  />



  {/* Middle Content */}

  <Box
    sx={{
      p:3,
      position:"absolute",
      top:80,
      left:430,
      width:"calc(100% - 680px)",
    }}
  >



    <Box
      sx={{
        mt:10,
        mx:-2,
      }}
    >

      <CommonActivityTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

    </Box>





    {/* <Box
      sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        mt:5,
        mb:1,
      }}
    > */}

      {/* <Typography variant="h6">
        Meetings
      </Typography>


      <CommonButton
        variant="contained"
        onClick={()=>setOpenCreateMeeting(true)}
      >
        Create Meeting
      </CommonButton> */}


    {/* </Box> */}






    <Box
      sx={{
        width:800,
        mt:2,
      }}
    >


    {
      meetings.map((m,index)=>(


      <Card
        key={index}
        sx={{
          width:630,
          borderRadius:2,
          mt:2,
        }}
      >

      <CardContent>


        <Stack
          direction="row"
          justifyContent="space-between"
        >


          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={()=>toggleCard(index)}
            sx={{
              cursor:"pointer"
            }}
          >

          {
            openCards[index]
            ?
            <ExpandLessIcon/>
            :
            <ExpandMoreIcon/>
          }


          <Typography fontWeight={600}>
            {m.title}
          </Typography>


          </Stack>



          <Typography>
            {m.date} at {m.time}
          </Typography>



        </Stack>




        {
          openCards[index] &&

          <Box mt={2}>


            <Typography fontSize="13px">
              Organized by {m.organizer}
            </Typography>



            <Box
              sx={{
                background:"#F4F8FC",
                borderRadius:2,
                p:2,
                mt:2,
                display:"flex",
                gap:4,
              }}
            >


            <Box>
              <Typography fontSize="12px">
                Date & Time
              </Typography>

              <Typography fontWeight={600}>
                {m.date} {m.time}
              </Typography>
            </Box>



            <Box>
              <Typography fontSize="12px">
                Duration
              </Typography>

              <Typography fontWeight={600}>
                {m.duration}
              </Typography>
            </Box>



            <Box>
              <Typography fontSize="12px">
                Attendees
              </Typography>

              <Typography fontWeight={600}>
                {m.attendees}
              </Typography>
            </Box>


            </Box>



            <Typography mt={2}>
              {m.description}
            </Typography>


          </Box>


        }



      </CardContent>


      </Card>


      ))
    }


    </Box>


  </Box>


</Box>

);

}