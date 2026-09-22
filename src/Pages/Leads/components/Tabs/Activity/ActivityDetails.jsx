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
        mx: -2,

        // ====================================
        // WIDTH / OVERFLOW FIX
        // ====================================

        width: "100%",
        maxWidth: "100%",
        minWidth: 0,

        boxSizing: "border-box",

        overflowX: "hidden",
      }}
    >
      {/* ========================================
          ACTIVITY TABS
      ======================================== */}

      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <CommonActivityTabs
          tabs={getLeadTabs(leadId)}
          activeTab="Activity"
        />
      </Box>

      {/* ========================================
          LOADING
      ======================================== */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 5,
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            boxSizing: "border-box",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* ========================================
          NO ACTIVITIES
      ======================================== */}

      {!loading &&
        activities.length === 0 && (
          <Box
            sx={{
              py: 5,
              width: "100%",
              maxWidth: "100%",
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <Typography
              color="text.secondary"
              textAlign="center"
              sx={{
                maxWidth: "100%",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              No activities found for this lead.
            </Typography>
          </Box>
        )}

      {/* ========================================
          ACTIVITY LIST
      ======================================== */}

      {!loading &&
        activities.length > 0 && (
          <Box
            sx={{
              mt: 3,

              width: "100%",
              maxWidth: "100%",
              minWidth: 0,

              boxSizing: "border-box",

              overflowX: "hidden",
            }}
          >
            {activities.map((activity) => (
              <Box
                key={activity.id}
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  minWidth: 0,

                  boxSizing: "border-box",

                  overflowX: "hidden",
                }}
              >
                <ActivityTimeline
                  activity={activity}
                />
              </Box>
            ))}
          </Box>
        )}
    </Box>
  );
}