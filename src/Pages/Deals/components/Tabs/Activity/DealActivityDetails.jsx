import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import { dealTabs } from "../DealTabs";
import DealActivityCard from "./DealActivityCard";

export default function DealActivityDetails() {
  const [activeTab, setActiveTab] = useState();
  return (
    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
        mx: -2,
      }}
    >
      {/* Activity Tabs */}
      <Box>
        <CommonActivityTabs tabs={dealTabs} activeTab="Activity" />
      </Box>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Upcoming
      </Typography>

      {/* Activity Card 1*/}
      <DealActivityCard title="Deal activity" date="June 24, 2025 at 5:30PM">
        <Typography sx={{ fontSize: 14 }}>
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            Maria Johnson
          </Box>{" "}
          <Box component="span" sx={{ color: "text.secondary" }}>
            moved deal to
          </Box>{" "}
          <Box
            component="span"
            sx={{
              color: "text.secondary",
            }}
          >
            Appointment scheduled.
          </Box>
        </Typography>
      </DealActivityCard>

      {/* Activity Card 2*/}

      <DealActivityCard>
        <Typography sx={{ fontSize: 14 }}>
          <Box component="span" sx={{ color: "text.secondary" }}>
            This deal was created by
          </Box>{" "}
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            Maria Johnson
          </Box>{" "}
          <Box component="span" sx={{ color: "text.secondary" }}>
            Jun 23, 2025 at 11:22 AM
          </Box>
        </Typography>
      </DealActivityCard>
    </Box>
  );
}
