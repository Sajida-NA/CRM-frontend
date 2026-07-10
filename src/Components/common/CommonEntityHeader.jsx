import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

import MainLayout from "../../layout/MainLayout";

// Icons
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Task";
import EventIcon from "@mui/icons-material/Event";
import SearchIcon from "@mui/icons-material/Search";
import EditSquareIcon from "@mui/icons-material/EditSquare";

import CommonActivityTabs from "./CommonActivityTab";

export default function CommonEntityHeader() {


  // STATE: Controls which tab is active

  const [activeTab, setActiveTab] = useState("Activity");

  // ACTION ICON CLICK HANDLER
 
  const handleActionClick = (type) => {
    console.log("Action clicked:", type);

    // Map left-side actions to tab names
    const tabMap = {
      Note: "Notes",
      Email: "Emails",
      Call: "Calls",
      Task: "Tasks",
      Meeting: "Meetings",
    };

   // Switch tab when clicking an action icon
    if (tabMap[type]) {
      setActiveTab(tabMap[type]);
    }
  };


// LEFT PANEL ACTION BUTTONS

  const actions = [
    { label: "Note", icon: <NoteAltIcon /> },
    { label: "Email", icon: <EmailIcon /> },
    { label: "Call", icon: <CallIcon /> },
    { label: "Task", icon: <TaskIcon /> },
    { label: "Meeting", icon: <EventIcon /> },
  ];


// LEAD DETAILS LIST

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
    <MainLayout>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#fff",
        }}
      >
      
            {/* LEFT PANEL — Lead Profile + Actions + Details  */}
      
        <Box
          sx={{
            width: 320,
            backgroundColor: "#fff",
            borderTopLeftRadius: "17px",
            borderBottomLeftRadius: "19px",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 2 }}>Leads</Typography>

          {/* Lead Profile Section */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {/* Placeholder Profile Image */}
            <Box
              sx={{
                width: 72,
                height: 72,
                backgroundColor: "#D9D9D9",
                borderRadius: "12px",
              }}
            />

            {/* Lead Name + Email */}
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
                Jane Cooper
              </Typography>

              <Typography sx={{ fontSize: "14px", color: "#33475B" }}>
                SalesPerson
              </Typography>

              {/* Email + Edit Icon */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: "14px", color: "#33475B" }}>
                  janecooper@gmail.com
                </Typography>

                <EditSquareIcon
                  sx={{
                    fontSize: 14,
                    color: "#5A45E5",
                    cursor: "pointer",
                  }}
                  onClick={() => console.log("Copy or Edit Email")}
                />
              </Box>
            </Box>
          </Box>

          {/* Quick Action Buttons (Note, Email, Call, etc.) */}
          <Box
            sx={{
              backgroundColor: "#F7F7FA",
              borderRadius: "8px",
              p: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {actions.map((item) => (
              <Box
                key={item.label}
                sx={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => handleActionClick(item.label)}
              >
                {/* Icon Box */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    border: "1px solid #E0E3EB",
                    borderRadius: "5px",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: 18, color: "#5948DB" },
                  })}
                </Box>

                <Typography sx={{ fontSize: "10px", mt: 0.5 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* About This Lead Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                color: "#33475B",
              }}
            >
              About this lead
            </Typography>

            <EditSquareIcon
              sx={{
                fontSize: 14,
                color: "#5A45E5",
                cursor: "pointer",
              }}
              onClick={() => console.log("Edit lead clicked")}
            />
          </Box>

          {/* Lead Details List */}
          <Box>
            {leadDetails.map((item) => (
              <Box key={item.label} sx={{ mb: 2 }}>
                <Typography sx={{ color: "#516F90", fontSize: "13px" }}>
                  {item.label}
                </Typography>

                <Typography sx={{ fontSize: "15px", color: "#1E1E1E" }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

    
            {/* MIDDLE PANEL — Search + Tabs */}
      
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            p: 3,
          }}
        >
          {/* Search + Convert Button */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Search activities"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#bdb7b7" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "50px",
                  backgroundColor: "#F9F9FB",
                },
                "& fieldset": {
                  border: "1px solid #DDDFE9",
                  borderRadius: "8px",
                },
                
              }}
            />

            <Button
              sx={{
                width: "150px",
                bgcolor: "#5A45E5",
                color: "#fff",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#4C39D2" },
              }}
            >
              Convert
            </Button>
          </Box>

          {/* Activity Tabs */}
          <Box sx={{ mt: 2 }}>
            <CommonActivityTabs
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />
          </Box>
        </Box>

      
            {/* RIGHT PANEL — AI Summary + Attachments */}
        
        <Box
          sx={{
            width: 330,
            backgroundColor: "#fff",
            borderTopRightRadius: "12px",
            p: 2,
          }}
        >
          {/* AI Summary Box */}
          <Box
            sx={{
              border: "1px solid #5948DB",
              backgroundColor: "#F7F7FA",
              borderRadius: "8px",
              p: 2,
              mb: 3,
            }}
          >
            <Typography sx={{ fontWeight: 700, color: "#5948DB" }}>
              AI Lead Summary
            </Typography>

            <Typography sx={{ mt: 2 }}>
              There are no activities associated with this lead and further
              details are needed to provide a comprehensive summary.
            </Typography>
          </Box>

          {/* Attachments Section */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 700 }}>Attachments</Typography>
              <Typography sx={{ fontWeight: 600, color: "#5948DB" }}>
                + Add
              </Typography>
            </Box>

            <Typography sx={{ mt: 1, color: "#516F90" }}>
              See the files attached to your activities or uploaded to this
              record.
            </Typography>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
