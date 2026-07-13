import React from "react";
import { Tabs, Tab } from "@mui/material";

const tabs = [
  "Activity",
  "Notes",
  "Emails",
  "Calls",
  "Tasks",
  "Meetings",
];

export default function ActivityTabs({
  value,
  onChange,
}) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      sx={{
        mt: 2,
        minHeight: 48,

        "& .MuiTabs-flexContainer": {
          gap: 1,
        },

        "& .MuiTab-root": {
          minHeight: 48,
          minWidth: "auto",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "14px",
          color: "#727680",
          px: 2,
        },

        "& .Mui-selected": {
          color: "#6C63FF",
          fontWeight: 600,
        },

        "& .MuiTabs-indicator": {
          backgroundColor: "#6C63FF",
          height: 3,
          borderRadius: "2px",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab}
          label={tab}
        />
      ))}
    </Tabs>
  );
}