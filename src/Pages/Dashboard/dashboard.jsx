import React from "react";
import { Box, Grid } from "@mui/material";

import StatsCards from "./components/StatCard";
import ConversionFunnel from "./components/ConversionFunnel";
import SalesReports from "./components/SalesReports";
import TeamPerformance from "./components/TeamPerformance";

const Dashboard = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      {/* Main content area */}
      <Box sx={{ flex: 1, p: 4 }}>

        {/* Row 1: Stats cards */}
        <StatsCards />

        {/* Row 2: Funnel (fixed width) + Sales Reports (fills leftover space) */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 3,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          {/* Conversion Funnel */}
          <Box
            sx={{
              width: 300,
              flexShrink: 0,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
              p: 3,
              boxShadow: 1,
            }}
          >
            <ConversionFunnel />
          </Box>

          {/* Sales Reports */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: 1,
              overflow: "hidden",
            }}
          >
            <SalesReports />
          </Box>
        </Box>

        {/* Team Performance Tracking */}
        <Box
          sx={{
            mt: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: 1,
            p: 4,
          }}
        >
          <TeamPerformance />
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;

