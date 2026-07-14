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
  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      variant="scrollable"
      scrollButtons={false}
      sx={{
        minHeight: 44,
        borderBottom: "1px solid #EAECF0",

        "& .MuiTabs-flexContainer": {
          gap: 1.5,
        },

        "& .MuiTabs-indicator": {
          backgroundColor: "#5A45E5",
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab}
          disableRipple
          label={tab}
          sx={{
            textTransform: "none",
            minHeight: 44,
            minWidth: "auto",
            px: 0.5,
            fontSize: 14,
            fontWeight: 500,
            color: "#667085",

            "&.Mui-selected": {
              color: "#5A45E5",
              fontWeight: 600,
            },
          }}
        />
      ))}
    </Tabs>
  );
}