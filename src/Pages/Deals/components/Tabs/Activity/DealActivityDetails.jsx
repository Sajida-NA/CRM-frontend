// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import { dealTabs } from "../DealTabs";
// import DealActivityCard from "./DealActivityCard";

// export default function DealActivityDetails() {
//   const [activeTab, setActiveTab] = useState();
//   return (
//     <Box
//       sx={{
//         p: 3,
//         fontFamily: "Roboto, sans-serif",
//         mx: -2,
//       }}
//     >
//       {/* Activity Tabs */}
//       <Box>
//         <CommonActivityTabs tabs={dealTabs} activeTab="Activity" />
//       </Box>
//       <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
//         Upcoming
//       </Typography>

//       {/* Activity Card 1*/}
//       <DealActivityCard title="Deal activity" date="June 24, 2025 at 5:30PM">
//         <Typography sx={{ fontSize: 14 }}>
//           <Box
//             component="span"
//             sx={{
//               color: "text.secondary",
//               fontWeight: 600,
//             }}
//           >
//             Maria Johnson
//           </Box>{" "}
//           <Box component="span" sx={{ color: "text.secondary" }}>
//             moved deal to
//           </Box>{" "}
//           <Box
//             component="span"
//             sx={{
//               color: "text.secondary",
//             }}
//           >
//             Appointment scheduled.
//           </Box>
//         </Typography>
//       </DealActivityCard>

//       {/* Activity Card 2*/}

//       <DealActivityCard>
//         <Typography sx={{ fontSize: 14 }}>
//           <Box component="span" sx={{ color: "text.secondary" }}>
//             This deal was created by
//           </Box>{" "}
//           <Box
//             component="span"
//             sx={{
//               color: "text.secondary",
//               fontWeight: 600,
//             }}
//           >
//             Maria Johnson
//           </Box>{" "}
//           <Box component="span" sx={{ color: "text.secondary" }}>
//             Jun 23, 2025 at 11:22 AM
//           </Box>
//         </Typography>
//       </DealActivityCard>
//     </Box>
//   );
// }


import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import { getDealTabs } from "../DealTabs";
import DealActivityCard from "./DealActivityCard";

import api from "../../../../../services/api";

export default function DealActivityDetails({ dealId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // DEAL TABS
  // ==========================================

  const dealTabs = getDealTabs(dealId);

  // ==========================================
  // FETCH DEAL ACTIVITIES
  // ==========================================

  const fetchActivities = async () => {
    if (!dealId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/timeline/deal/${dealId}/`
      );

      setActivities(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Fetch Deal Activities Error:",
        error.response?.data || error
      );

      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH WHEN DEAL ID CHANGES
  // ==========================================

  useEffect(() => {
    fetchActivities();
  }, [dealId]);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // ==========================================
  // RENDER ACTIVITY
  // ==========================================

  const renderActivity = (activity) => {
    // ========================================
    // NOTE
    // ========================================

    if (
      activity.activity_type === "note" &&
      activity.note
    ) {
      return (
        <>
          <Typography sx={{ fontSize: 14 }}>
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {activity.created_by}
            </Box>{" "}

            <Box
              component="span"
              sx={{
                color: "text.secondary",
              }}
            >
              added a note
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            {activity.note.note}
          </Typography>
        </>
      );
    }

    // ========================================
    // CALL
    // ========================================

    if (
      activity.activity_type === "call" &&
      activity.call
    ) {
      return (
        <>
          <Typography sx={{ fontSize: 14 }}>
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {activity.created_by}
            </Box>{" "}

            <Box
              component="span"
              sx={{
                color: "text.secondary",
              }}
            >
              made a call
            </Box>
          </Typography>

          {activity.call.call_outcome && (
            <Typography
              sx={{
                mt: 1,
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              Outcome: {activity.call.call_outcome}
            </Typography>
          )}
        </>
      );
    }

    // ========================================
    // TASK
    // ========================================

    if (
      activity.activity_type === "task" &&
      activity.task
    ) {
      return (
        <>
          <Typography sx={{ fontSize: 14 }}>
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {activity.created_by}
            </Box>{" "}

            <Box
              component="span"
              sx={{
                color: "text.secondary",
              }}
            >
              created a task
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            {activity.task.task_name}
          </Typography>

          {activity.task.due_date && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Due: {activity.task.due_date}
            </Typography>
          )}

          {activity.task.priority && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Priority: {activity.task.priority}
            </Typography>
          )}
        </>
      );
    }

    // ========================================
    // MEETING
    // ========================================

    if (
      activity.activity_type === "meeting" &&
      activity.meeting
    ) {
      return (
        <>
          <Typography sx={{ fontSize: 14 }}>
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {activity.created_by}
            </Box>{" "}

            <Box
              component="span"
              sx={{
                color: "text.secondary",
              }}
            >
              created a meeting
            </Box>{" "}

            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {activity.meeting.title}
            </Box>
          </Typography>

          {activity.meeting.start_date && (
            <Typography
              sx={{
                mt: 1,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Date: {activity.meeting.start_date}
            </Typography>
          )}

          {activity.meeting.start_time && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Time: {activity.meeting.start_time}
            </Typography>
          )}

          {activity.meeting.location && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Location: {activity.meeting.location}
            </Typography>
          )}
        </>
      );
    }

    // ========================================
    // EMAIL
    // ========================================

    if (
      activity.activity_type === "email" &&
      activity.email
    ) {
      return (
        <>
          <Typography sx={{ fontSize: 14 }}>
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {activity.created_by}
            </Box>{" "}

            <Box
              component="span"
              sx={{
                color: "text.secondary",
              }}
            >
              sent an email
            </Box>
          </Typography>

          {activity.email.subject && (
            <Typography
              sx={{
                mt: 1,
                fontSize: 14,
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {activity.email.subject}
            </Typography>
          )}
        </>
      );
    }

    // ========================================
    // FALLBACK
    // ========================================

    return (
      <Typography
        sx={{
          fontSize: 14,
          color: "text.secondary",
        }}
      >
        {activity.activity_type}
      </Typography>
    );
  };

  // ==========================================
  // UI
  // ==========================================

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
          tabs={dealTabs}
          activeTab="Activity"
        />
      </Box>

      {/* Heading */}

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 1,
        }}
      >
        Upcoming
      </Typography>

      {/* No Deal ID */}

      {!dealId && (
        <Typography
          sx={{
            fontSize: 14,
            color: "text.secondary",
          }}
        >
          Deal ID not found.
        </Typography>
      )}

      {/* Loading */}

      {dealId && loading && (
        <Typography
          sx={{
            fontSize: 14,
            color: "text.secondary",
          }}
        >
          Loading activities...
        </Typography>
      )}

      {/* No Activities */}

      {dealId &&
        !loading &&
        activities.length === 0 && (
          <Typography
            sx={{
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            No activities found.
          </Typography>
        )}

      {/* Activities */}

      {dealId &&
        !loading &&
        activities.length > 0 &&
        activities.map((activity, index) => (
          <DealActivityCard
            key={`${activity.activity_type}-${index}`}
            title={
              activity.activity_type
                ? activity.activity_type
                    .charAt(0)
                    .toUpperCase() +
                  activity.activity_type.slice(1)
                : "Activity"
            }
            date={formatDate(
              activity.created_at
            )}
          >
            {renderActivity(activity)}
          </DealActivityCard>
        ))}
    </Box>
  );
}