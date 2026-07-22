import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CompanyActivityCard from "./CompanyActivityCard";
import ActivityTimeline from "../../../../Leads/components/Tabs/Activity/ActivityTimeline";
import { companyTabs } from "../CompanyTabs";

export default function CompanyActivityDetails() {
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
        <CommonActivityTabs tabs={companyTabs} activeTab="Activity" />
      </Box>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Upcoming
      </Typography>

      <CompanyActivityCard
        title="Ticket activity"
        user="Maria Johnson"
        action="created"
        entity="Ticket 1"
        date="June 24, 2025 at 5:30PM"
      />
      <CompanyActivityCard
        title="Ticket activity"
        user="Maria Johnson"
        action="created"
        entity="Ticket 1"
        date="June 24, 2025 at 5:30PM"
      />

      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          June 2025
        </Typography>

        <ActivityTimeline
          highlightedText="Call"
          normalText="from Maria Johnson"
          description="Brought Maria through our latest product line. She's interested and is going to get back to me."
          date="June 24, 2025 at 5:30PM"
        />

        <ActivityTimeline
          highlightedText="Meeting Maria Johnson and Jane Cooper"
          description="Let's discuss our new product line."
          date="June 24, 2025 at 5:30PM"
        />

        <ActivityTimeline
          highlightedText="Email tracking"
          description="Jane Cooper opened Hello there"
          date="June 24, 2025 at 5:30PM"
        />

        <ActivityTimeline
          highlightedText="Note"
          normalText="by Maria Johnson"
          description="Sample Note"
          date="June 24, 2025 at 5:30PM"
        />
      </Box>
    </Box>
  );
}
