
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import ActivityTimeline from "./ActivityTimeline";
import { getLeadTabs } from "../LeadTabs";
import api from "../../../../../services/api";

export default function ActivityDetails() {
  const { leadId } = useParams();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH ACTIVITIES
  // ========================================

  const fetchActivities = useCallback(async () => {
    if (!leadId) return;

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/lead/${leadId}/`
      );

      console.log(
        "LEAD ACTIVITIES RESPONSE:",
        response.data
      );

      setActivities(
        Array.isArray(response.data)
          ? response.data
          : response.data?.results || []
      );

    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD ACTIVITIES:",
        error.response?.data || error.message
      );

      setActivities([]);

    } finally {
      setLoading(false);
    }
  }, [leadId]);

  // ========================================
  // LOAD ACTIVITIES
  // ========================================

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
      {/* ACTIVITY TABS */}

      <CommonActivityTabs
        tabs={getLeadTabs(leadId)}
        activeTab="Activity"
      />

      {/* LOADING */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* NO ACTIVITIES */}

      {!loading &&
        activities.length === 0 && (
          <Box sx={{ py: 5 }}>
            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No activities found for this lead.
            </Typography>
          </Box>
        )}

      {/* ACTIVITY LIST */}

      {!loading &&
        activities.length > 0 && (
          <Box sx={{ mt: 3 }}>
            {activities.map((activity) => (
              <ActivityTimeline
                key={activity.id}
                activity={activity}
              />
            ))}
          </Box>
        )}
    </Box>
  );
}