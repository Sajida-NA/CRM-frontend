

// import React, { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import { useParams } from "react-router-dom";

// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import ActivityTimeline from "../../../../Leads/components/Tabs/Activity/ActivityTimeline";

// import { getCompanyTabs } from "../CompanyTabs";
// import { getActivityTimeline } from "../../../../../services/activityservice";

// export default function CompanyActivityDetails() {

//   const { id } = useParams();

//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const fetchActivities = async () => {

//       if (!id) {
//         console.log("Company ID not found");
//         return;
//       }

//       try {

//         setLoading(true);

//         console.log("Fetching company activities for ID:", id);

//         const response = await getActivityTimeline(
//           "company",
//           id
//         );

//         console.log("Company activities:", response.data);

//         setActivities(response.data);

//       } catch (error) {

//         console.error(
//           "Error fetching company activities:",
//           error
//         );

//         setActivities([]);

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchActivities();

//   }, [id]);


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
//         <CommonActivityTabs
//   tabs={getCompanyTabs(id)}
//   activeTab="Activity"
// />
//       </Box>


//       {/* Loading */}

//       {loading && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             py: 5,
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       )}


//       {/* No activities */}

//       {!loading && activities.length === 0 && (
//         <Typography
//           variant="body1"
//           sx={{
//             mt: 5,
//             textAlign: "center",
//             color: "text.secondary",
//           }}
//         >
//           No activities found for this company.
//         </Typography>
//       )}


//       {/* Activities */}

//       {!loading && activities.length > 0 && (
//         <Box sx={{ mt: 4 }}>

//           <Typography
//             variant="h6"
//             sx={{
//               mb: 3,
//               fontWeight: 600,
//             }}
//           >
//             Activities
//           </Typography>

//           {activities.map((activity) => (
//             <ActivityTimeline
//               key={activity.id}
//               activity={activity}
//             />
//           ))}

//         </Box>
//       )}

//     </Box>
//   );
// }


import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import { getCompanyTabs } from "../CompanyTabs";
import CompanyActivityCard from "./CompanyActivityCard";

import api from "../../../../../services/api";

export default function CompanyActivityDetails() {
  const { id } = useParams();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const companyTabs = getCompanyTabs(id);

  // =====================================================
  // FETCH COMPANY ACTIVITIES
  // =====================================================

  useEffect(() => {
    const fetchActivities = async () => {
      if (!id) {
        setActivities([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await api.get(
          `/activities/activity/company/${id}/`
        );

        console.log(
          "COMPANY ACTIVITY RESPONSE:",
          response.data
        );

        setActivities(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        console.error(
          "Fetch Company Activities Error:",
          error.response?.data || error
        );

        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]);

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

          {data.call_outcome && (
            <Typography
              sx={{
                mt: 1,
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              Outcome: {data.call_outcome}
            </Typography>
          )}

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
    // TASK
    // ===================================================

    if (
      activity.activity_type === "task" &&
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
              created a task
            </Box>
          </Typography>

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

          {data.note && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              Note: {data.note}
            </Typography>
          )}

          {Array.isArray(data.attendees) &&
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
          tabs={companyTabs}
          activeTab="Activity"
        />
      </Box>

      {/* UPCOMING */}

      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 1,
        }}
      >
        Upcoming
      </Typography>

      {/* COMPANY ID NOT FOUND */}

      {!id && (
        <Typography
          sx={{
            fontSize: 14,
            color: "text.secondary",
          }}
        >
          Company ID not found.
        </Typography>
      )}

      {/* LOADING */}

      {id && loading && (
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

      {id &&
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

      {id &&
        !loading &&
        activities.length > 0 &&
        activities.map((activity) => (
          <CompanyActivityCard
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
          </CompanyActivityCard>
        ))}
    </Box>
  );
}

