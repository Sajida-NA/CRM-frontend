

import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "../../Components/common/Header";
import Sidebar from "../../Components/common/Sidebar";
import StatsCards from "./components/StatCard";
import ConversionFunnel from "./components/ConversionFunnel";
import SalesReports from "./components/SalesReports";
import TeamPerformance from "./components/TeamPerformance";

const Dashboard = () => {
  return (
    <Box sx={{ bgcolor: "#F5F7FB", minHeight: "100vh" }}>
      <Header />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

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
                border: "1px solid #E5E7EB",
                borderRadius: 2,
                bgcolor: "#fff",
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
                border: "1px solid #E5E7EB",
                borderRadius: 2,
                bgcolor: "#fff",
                boxShadow: 1,
                overflow: "hidden",
              }}
            >
              <SalesReports />
            </Box>
          </Box>

          {/* Team Performance Tracking  */}
          <Box
            sx={{
              mt: 3,
              border: "1px solid #E5E7EB",
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: 1,
              p: 4,
            }}
          >
            <TeamPerformance />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
