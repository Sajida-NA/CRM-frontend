import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function CommonActivityTabs({ tabs = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs.find(
    (tab) => tab.path === location.pathname
  )?.label;

  const handleClick = (tab) => {
    navigate(tab.path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        borderBottom: "1px solid #ddd",
        mb: 2,
      }}
    >
      {tabs.map((tab) => (
        <Box
          key={tab.label}
          onClick={() => handleClick(tab)}
          sx={{
            cursor: "pointer",
            pb: 1,
            borderBottom:
              activeTab === tab.label
                ? "2px solid #5948DB"
                : "2px solid transparent",
          }}
        >
          <Typography
            sx={{
              color:
                activeTab === tab.label
                  ? "#5948DB"
                  : "#666",
              fontWeight:
                activeTab === tab.label ? 600 : 400,
            }}
          >
            {tab.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
