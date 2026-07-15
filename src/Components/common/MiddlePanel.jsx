import React from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

// import CommonActivityTabs from "./CommonActivityTab";

export default function MiddlePanel(
  searchValue = "",
  onSearchChange = () => {},
  onConvert = () => {},
  activeTab = "Activity",
  setActiveTab = () => {},
) {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#fff",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search activities"
          variant="outlined"
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
          onClick={onConvert}
          sx={{
            width: "150px",
            bgcolor: "#5A45E5",
            color: "#fff",
            borderRadius: 1,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#4C39D2",
            },
          }}
        >
          Convert
        </Button>
      </Box>

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