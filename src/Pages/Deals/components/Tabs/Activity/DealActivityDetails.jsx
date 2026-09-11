
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import { getDealTabs } from "../DealTabs";
import DealActivityCard from "./DealActivityCard";

import api from "../../../../../services/api";

export default function DealActivityDetails({ dealId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const dealTabs = getDealTabs(dealId);

  // =====================================================
  // FETCH DEAL ACTIVITIES
  // =====================================================

  useEffect(() => {
    const fetchActivities = async () => {
      if (!dealId) {
        setActivities([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await api.get(
          `/activities/activity/deal/${dealId}/`
        );

        console.log(
          "DEAL ACTIVITY RESPONSE:",
          response.data
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

    fetchActivities();
  }, [dealId]);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // =====================================================
  // GET ACTIVITY DATA
  // =====================================================

  const getActivityData = (activity) => {
    if (activity.data) {
      return activity.data;
    }

    if (activity.note) {
      return activity.note;
    }

    if (activity.call) {
      return activity.call;
    }

    if (activity.task) {
      return activity.task;
    }

    if (activity.meeting) {
      return activity.meeting;
    }

    if (activity.email) {
      return activity.email;
    }

    return null;
  };

  // =====================================================
  // GET CREATED BY NAME
  // =====================================================

  const getCreatedByName = (activity) => {
    if (activity.created_by_name) {
      return activity.created_by_name;
    }

    if (activity.created_by) {
      if (typeof activity.created_by === "string") {
        return activity.created_by;
      }

      return (
        activity.created_by.name ||
        activity.created_by.email ||
        ""
      );
    }

    return "";
  };

  // =====================================================
  // RENDER ACTIVITY
  // =====================================================

  const renderActivity = (activity) => {
    const data = getActivityData(activity);
    const createdBy = getCreatedByName(activity);

    // ===================================================
    // NOTE
    // ===================================================

    if (
      activity.activity_type === "note" &&
      data
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
              {createdBy}
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

          {data.note && (
            <Typography
              sx={{
                mt: 1,
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              {data.note}
            </Typography>
          )}
        </>
      );
    }

    // ===================================================
    // CALL
    // ===================================================

    if (
      activity.activity_type === "call" &&
      data
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
              {createdBy}
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

          {data.note && (
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "text.secondary",
                          mb: 0.5,
                        }}
                      >
                        {data.note}
                      </Typography>
                    )}
        </>
      );
    }

    // // ===================================================
    // // TASK
    // // ===================================================

    // if (
    //   activity.activity_type === "task" &&
    //   data
    // ) {
    //   return (
    //     <>
    //       <Typography sx={{ fontSize: 14 }}>
    //         <Box
    //           component="span"
    //           sx={{
    //             color: "text.secondary",
    //             fontWeight: 600,
    //           }}
    //         >
    //           {createdBy}
    //         </Box>{" "}
    //         <Box
    //           component="span"
    //           sx={{
    //             color: "text.secondary",
    //           }}
    //         >
    //           created a task
    //         </Box>
    //       </Typography>

    //       {data.task_name && (
    //         <Typography
    //           sx={{
    //             mt: 1,
    //             fontSize: 14,
    //             color: "text.secondary",
    //           }}
    //         >
    //           {data.task_name}
    //         </Typography>
    //       )}

    //       {data.due_date && (
    //         <Typography
    //           sx={{
    //             mt: 0.5,
    //             fontSize: 13,
    //             color: "text.secondary",
    //           }}
    //         >
    //           Due: {data.due_date}
    //         </Typography>
    //       )}

    //       {data.time && (
    //         <Typography
    //           sx={{
    //             mt: 0.5,
    //             fontSize: 13,
    //             color: "text.secondary",
    //           }}
    //         >
    //           Time: {data.time}
    //         </Typography>
    //       )}

    //       {data.task_type && (
    //         <Typography
    //           sx={{
    //             mt: 0.5,
    //             fontSize: 13,
    //             color: "text.secondary",
    //           }}
    //         >
    //           Type: {data.task_type}
    //         </Typography>
    //       )}

    //       {data.priority && (
    //         <Typography
    //           sx={{
    //             mt: 0.5,
    //             fontSize: 13,
    //             color: "text.secondary",
    //           }}
    //         >
    //           Priority: {data.priority}
    //         </Typography>
    //       )}
    //     </>
    //   );
    // }


    // ===================================================
// TASK
// ===================================================

if (
  activity.activity_type === "task" &&
  data
) {
  return (
    <>
      {/* CREATED BY */}

      <Typography sx={{ fontSize: 14 }}>
        <Box
          component="span"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          {createdBy}
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

      {/* TASK NAME ONLY */}

      {data.task_name && (
        <Typography
          sx={{
            mt: 1,
            fontSize: 14,
            color: "text.secondary",
          }}
        >
          {data.task_name}
        </Typography>
      )}
    </>
  );
}

    // ===================================================
    // MEETING
    // ===================================================

    if (
      activity.activity_type === "meeting" &&
      data
    ) {
      return (
        <>
          {/* Meeting title only */}
          {data.title && (
            <Typography
              sx={{
                fontSize: 14,
                color: "text.primary",
                fontWeight: 600,
              }}
            >
              {data.title}
            </Typography>
          )}

          {/* Date */}
          {data.start_date && (
            <Typography
              sx={{
                mt: 1,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Date: {data.start_date}
            </Typography>
          )}

          {/* Time */}
          {data.start_time && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Time: {data.start_time}
              {data.end_time
                ? ` - ${data.end_time}`
                : ""}
            </Typography>
          )}

          {/* Location */}
          {data.location && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Location: {data.location}
            </Typography>
          )}

          {/* Reminder */}
          {data.reminder && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Reminder: {data.reminder}
            </Typography>
          )}

          {/* Note */}
          {data.note && (
            <Typography
              component="div"
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
              dangerouslySetInnerHTML={{
                __html: data.note,
              }}
            />
          )}

          {/* Attendees */}
          {data.attendees &&
            Array.isArray(data.attendees) &&
            data.attendees.length > 0 && (
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Attendees:{" "}
                {data.attendees
                  .map((attendee) =>
                    typeof attendee === "string"
                      ? attendee
                      : attendee.name
                  )
                  .filter(Boolean)
                  .join(", ")}
              </Typography>
            )}
        </>
      );
    }

    // ===================================================
    // EMAIL
    // ===================================================

    if (
      activity.activity_type === "email" &&
      data
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
              {createdBy}
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

          {data.subject && (
            <Typography
              sx={{
                mt: 1,
                fontSize: 14,
                color: "text.secondary",
                fontWeight: 600,
              }}
            >
              {data.subject}
            </Typography>
          )}
        </>
      );
    }

    // ===================================================
    // FALLBACK
    // ===================================================

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

  // =====================================================
  // UI
  // =====================================================

  return (
    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
        mx: -2,
      }}
    >
      {/* TABS */}

      <Box>
        <CommonActivityTabs
          tabs={dealTabs}
          activeTab="Activity"
        />
      </Box>

      {/* HEADING */}

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 1,
        }}
      >
        Upcoming
      </Typography>

      {/* NO DEAL ID */}

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

      {/* LOADING */}

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

      {/* NO ACTIVITIES */}

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

      {/* ACTIVITIES */}

      {dealId &&
        !loading &&
        activities.length > 0 &&
        activities.map((activity) => (
          <DealActivityCard
            key={activity.id}
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

