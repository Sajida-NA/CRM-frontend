import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";

import TicketActivityCard from "./TicketActivityCard";

import { getTicketTabs } from "../TicketTabs";

export default function TicketActivityDetails({ ticketId }) {
  const [activeTab, setActiveTab] = useState("Activity");

  const tabs = getTicketTabs(ticketId);

  return (
    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
        mx: -2,
      }}
    >
      <Box>
        <CommonActivityTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Upcoming
      </Typography>

      <TicketActivityCard
        title="Ticket activity"
        date="June 24, 2025 at 5:30PM"
      >
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

          <Box
            component="span"
            sx={{ color: "text.secondary" }}
          >
            moved ticket to
          </Box>{" "}

          <Box
            component="span"
            sx={{ color: "text.secondary" }}
          >
            new.
          </Box>
        </Typography>
      </TicketActivityCard>

      <TicketActivityCard>
        <Typography sx={{ fontSize: 14 }}>
          <Box
            component="span"
            sx={{ color: "text.secondary" }}
          >
            This ticket was created by
          </Box>{" "}

          <Box
            component="span"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}
          >
            Maria Johnson
          </Box>
        </Typography>
      </TicketActivityCard>
    </Box>
  );
}