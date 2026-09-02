// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CompanyActivityCard from "./CompanyActivityCard";
// import ActivityTimeline from "../../../../Leads/components/Tabs/Activity/ActivityTimeline";
// import { companyTabs } from "../CompanyTabs";
// import { useParams } from "react-router-dom";

// export default function CompanyActivityDetails() {
 

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
//         <CommonActivityTabs tabs={companyTabs} activeTab="Activity" />
//       </Box>
//       <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
//         Upcoming
//       </Typography>

//       <CompanyActivityCard
//         title="Ticket activity"
//         user="Maria Johnson"
//         action="created"
//         entity="Ticket 1"
//         date="June 24, 2025 at 5:30PM"
//       />
//       <CompanyActivityCard
//         title="Ticket activity"
//         user="Maria Johnson"
//         action="created"
//         entity="Ticket 1"
//         date="June 24, 2025 at 5:30PM"
//       />

//       <Box>
//         <Typography
//           variant="h6"
//           sx={{
//             mb: 3,
//             fontWeight: 600,
//           }}
//         >
//           June 2025
//         </Typography>

//         <ActivityTimeline
//           highlightedText="Call"
//           normalText="from Maria Johnson"
//           description="Brought Maria through our latest product line. She's interested and is going to get back to me."
//           date="June 24, 2025 at 5:30PM"
//         />

//         <ActivityTimeline
//           highlightedText="Meeting Maria Johnson and Jane Cooper"
//           description="Let's discuss our new product line."
//           date="June 24, 2025 at 5:30PM"
//         />

//         <ActivityTimeline
//           highlightedText="Email tracking"
//           description="Jane Cooper opened Hello there"
//           date="June 24, 2025 at 5:30PM"
//         />

//         <ActivityTimeline
//           highlightedText="Note"
//           normalText="by Maria Johnson"
//           description="Sample Note"
//           date="June 24, 2025 at 5:30PM"
//         />
//       </Box>
//     </Box>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import { useParams } from "react-router-dom";

// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CompanyActivityCard from "./CompanyActivityCard";
// import ActivityTimeline from "../../../../Leads/components/Tabs/Activity/ActivityTimeline";

// import { companyTabs } from "../CompanyTabs";
// import { getActivityTimeline } from "../../../../../services/activityService";

// export default function CompanyActivityDetails() {

//   const { id } = useParams();

//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     if (!id) return;

//     const fetchActivities = async () => {

//       try {

//         setLoading(true);

//         const response = await getActivityTimeline(
//           "company",
//           id
//         );

//         setActivities(response.data);

//       } catch (error) {

//         console.error(
//           "Error fetching company activities:",
//           error
//         );

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
//           tabs={companyTabs}
//           activeTab="Activity"
//         />
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


//       {/* No Activities */}
//       {!loading && activities.length === 0 && (
//         <Typography
//           sx={{
//             mt: 4,
//             textAlign: "center",
//             color: "text.secondary",
//           }}
//         >
//           No activities found for this company.
//         </Typography>
//       )}


//       {/* Activities */}
//       {!loading && activities.length > 0 && (

//         <Box sx={{ mt: 3 }}>

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
import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import ActivityTimeline from "../../../../Leads/components/Tabs/Activity/ActivityTimeline";

import { companyTabs } from "../CompanyTabs";
import { getActivityTimeline } from "../../../../../services/activityservice";

export default function CompanyActivityDetails() {

  const { id } = useParams();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchActivities = async () => {

      if (!id) {
        console.log("Company ID not found");
        return;
      }

      try {

        setLoading(true);

        console.log("Fetching company activities for ID:", id);

        const response = await getActivityTimeline(
          "company",
          id
        );

        console.log("Company activities:", response.data);

        setActivities(response.data);

      } catch (error) {

        console.error(
          "Error fetching company activities:",
          error
        );

        setActivities([]);

      } finally {

        setLoading(false);

      }

    };

    fetchActivities();

  }, [id]);


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
          tabs={companyTabs}
          activeTab="Activity"
        />
      </Box>


      {/* Loading */}

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


      {/* No activities */}

      {!loading && activities.length === 0 && (
        <Typography
          variant="body1"
          sx={{
            mt: 5,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          No activities found for this company.
        </Typography>
      )}


      {/* Activities */}

      {!loading && activities.length > 0 && (
        <Box sx={{ mt: 4 }}>

          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
            }}
          >
            Activities
          </Typography>

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