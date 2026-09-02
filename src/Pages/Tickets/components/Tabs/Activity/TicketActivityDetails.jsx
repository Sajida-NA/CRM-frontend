import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import TicketActivityCard from "./TicketActivityCard";
import { ticketTabs } from "../TicketTabs";

export default function TicketActivityDetails() {
  const { ticketId } = useParams();

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
        <CommonActivityTabs
          tabs={ticketTabs(ticketId)}
          activeTab="Activity"
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Upcoming
      </Typography>

      {/* Activity Card 1 */}
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
            sx={{
              color: "text.secondary",
            }}
          >
            moved ticket to
          </Box>{" "}
          <Box
            component="span"
            sx={{
              color: "text.secondary",
            }}
          >
            new.
          </Box>
        </Typography>
      </TicketActivityCard>

      {/* Activity Card 2 */}
      <TicketActivityCard>
        <Typography sx={{ fontSize: 14 }}>
          <Box
            component="span"
            sx={{
              color: "text.secondary",
            }}
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

