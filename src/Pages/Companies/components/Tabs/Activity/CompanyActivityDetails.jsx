import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  useLocation,
  useParams,
} from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CompanyActivityCard from "./CompanyActivityCard";
import ActivityTimeline from "../../../../Leads/components/Tabs/Activity/ActivityTimeline";
import { companyTabs } from "../CompanyTabs";

import api from "../../../../../services/api";

export default function CompanyActivityDetails() {
  const { companyId } = useParams();
  const location = useLocation();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = companyTabs(companyId);

  const activeTab =
    tabs.find((tab) => tab.path === location.pathname)?.label || "";

  const fetchActivities = async () => {
    if (!companyId) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/company/${companyId}/`
      );

      console.log("COMPANY ACTIVITY RESPONSE:", response.data);

      const activityData = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      setActivities(activityData);
    } catch (error) {
      console.error(
        "FETCH COMPANY ACTIVITIES ERROR:",
        error.response?.data || error
      );

      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [companyId]);

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
          tabs={tabs}
          activeTab={activeTab}
        />
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      ) : activities.length === 0 ? (
        <Typography
          sx={{
            mt: 3,
            color: "#667085",
          }}
        >
          No activities found.
        </Typography>
      ) : (
        <>
          {/* Upcoming */}
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              mb: 1,
            }}
          >
            Upcoming
          </Typography>

          {activities.map((activity) => (
            <CompanyActivityCard
              key={activity.id}
              title={activity.title || activity.activity_type}
              user={
                activity.created_by?.name ||
                activity.created_by?.email ||
                "Unknown"
              }
              action={activity.action || ""}
              entity={
                activity.related_object?.name ||
                activity.entity ||
                ""
              }
              date={activity.created_at || ""}
            />
          ))}

          {/* Activity Timeline */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
              }}
            >
              Activity
            </Typography>

            {activities.map((activity) => (
              <ActivityTimeline
                key={`timeline-${activity.id}`}
                highlightedText={
                  activity.activity_type ||
                  activity.title ||
                  "Activity"
                }
                normalText={
                  activity.created_by?.name
                    ? `by ${activity.created_by.name}`
                    : ""
                }
                description={
                  activity.description ||
                  activity.note ||
                  ""
                }
                date={activity.created_at || ""}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}