import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";

// Search icon for activity search field
import SearchIcon from "@mui/icons-material/Search";

// Activity tabs component (can be enabled later)
// import CommonActivityTabs from "./CommonActivityTab";

export default function MiddlePanel(
  // Search input value
  searchValue = "",

  // Function to update search value
  onSearchChange = () => {},

  // Function for Convert button action
  onConvert = () => {},

  // Currently selected activity tab
  activeTab = "Activity",

  // Function to change active tab
  setActiveTab = () => {},
) {
  return (
    // Middle content area
    // Displays search, convert button and activity section
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#fff",
        p: 3,
      }}
    >
      {/* 
        Top Action Section
        Contains:
        - Activity search field
        - Convert button
      */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {/* 
          Search Activities Input
          Used to search notes, emails, calls, tasks etc.
        */}
        <TextField
          fullWidth
          // Placeholder text
          placeholder="Search activities"
          variant="outlined"
          // Search icon inside input
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#bdb7b7",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            // Customize input box
            "& .MuiOutlinedInput-root": {
              height: "50px",
              backgroundColor: "#F9F9FB",
            },

            // Customize border style
            "& fieldset": {
              border: "1px solid #DDDFE9",
              borderRadius: "8px",
            },
          }}
        />

        {/* 
          Convert Button
          Used to convert entity
        
        */}
        <Button
          // Button click handler
          onClick={onConvert}
          sx={{
            width: "150px",

            bgcolor: "#5A45E5",

            color: "#fff",

            borderRadius: 1,

            // Remove default uppercase text
            textTransform: "none",

            fontWeight: 600,

            // Hover styling
            "&:hover": {
              bgcolor: "#4C39D2",
            },
          }}
        >
          Convert
        </Button>
      </Box>

      {/* 
        Activity Tabs Section

        Displays:
        - Activity
        - Notes
        - Emails
        - Calls
        - Tasks
        - Meetings

        Currently disabled.
        Enable when CommonActivityTabs integration is needed.
      */}
      {/*
      <Box sx={{ mt: 2 }}>

        <CommonActivityTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

      </Box>
      */}
    </Box>
  );
}
