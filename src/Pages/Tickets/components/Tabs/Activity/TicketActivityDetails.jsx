
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import ActivityTimeline from "../../../../Leads/components/Tabs/Activity/ActivityTimeline";
import { ticketTabs } from "../TicketTabs";
import api from "../../../../../services/api";

export default function TicketActivityDetails({ ticketId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    if (!ticketId) {
      setActivities([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      console.log("1. TICKET ACTIVITY START");
      console.log("2. TICKET ID:", ticketId);
      console.log(
        "3. CALLING URL:",
        `/activities/activity/ticket/${ticketId}/`
      );

      const response = await api.get(
        `/activities/activity/ticket/${ticketId}/`
      );

      console.log("4. TICKET ACTIVITY RESPONSE:", response);
      console.log("5. TICKET ACTIVITY DATA:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      setActivities(data);
    } catch (error) {
      console.error("6. TICKET ACTIVITY ERROR");
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);
      console.error("MESSAGE:", error.message);
      console.error("FULL ERROR:", error);

      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
        mx: -2,
      }}
    >
      <CommonActivityTabs
        tabs={ticketTabs(ticketId)}
        activeTab="Activity"
      />

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 1,
        }}
      >
        Upcoming
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 4,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      ) : activities.length === 0 ? (
        <Typography
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          No activities found for this ticket.
        </Typography>
      ) : (
        activities.map((activity) => (
          <ActivityTimeline
            key={activity.id}
            activity={activity}
          />
        ))
      )}
    </Box>
  );
}