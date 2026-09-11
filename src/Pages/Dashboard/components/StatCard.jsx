// import React from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
// } from "@mui/material";

// import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
// import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

// const stats = [
//   {
//     label: "Total Leads",
//     value: "1,250",
//     color: "#6c63ff",
//     icon: (
//       <PeopleAltOutlinedIcon
//         sx={{ fontSize: 28 }}
//       />
//     ),
//   },
//   {
//     label: "Active Deals",
//     value: "136",
//     color: "#0be8c0",
//     icon: (
//       <BusinessCenterOutlinedIcon
//         sx={{ fontSize: 28 }}
//       />
//     ),
//   },
//   {
//     label: "Closed Deals",
//     value: "136",
//     color: "#ffc2b9",
//     icon: (
//       <BusinessCenterOutlinedIcon
//         sx={{ fontSize: 28 }}
//       />
//     ),
//   },
//   {
//     label: "Monthly Revenue",
//     value: "45,000",
//     color: "#ece02d",
//     icon: (
//       <AttachMoneyOutlinedIcon
//         sx={{ fontSize: 28 }}
//       />
//     ),
//   },
// ];

// const StatsCards = () => {
//   return (
//     <Grid container spacing={8}>
//       {stats.map((item) => (
//         <Grid
//           size={{ xs: 12, sm: 6, md: 3 }}
//           key={item.label}
//         >
//           <Card
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               p: 4,
//               borderRadius: 2,
//               gap: 2,
//               width: "100%",
//               height: "100%",
//               boxSizing: "border-box",
//             }}
//           >
//             {/* Left side: text */}

//             <CardContent
//               sx={{
//                 flexGrow: 1,
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 color="textSecondary"
//               >
//                 {item.label}
//               </Typography>

//               <Typography
//                 variant="h4"
//                 fontWeight="bold"
//               >
//                 {item.value}
//               </Typography>
//             </CardContent>

//             {/* Right side: circular icon with blurred bg */}

//             <Box
//               sx={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: "50%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 bgcolor: `${item.color}30`,
//               }}
//             >
//               {/* Force icon color here */}

//               {React.cloneElement(item.icon, {
//                 sx: {
//                   color: item.color,
//                   fontSize: 26,
//                 },
//               })}
//             </Box>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default StatsCards;


import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import api from "../../../services/api";

const StatsCards = () => {
  const [summary, setSummary] = useState({
    total_leads: 0,
    active_deals: 0,
    closed_deals: 0,
    monthly_revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const response = await api.get("/dashboard/summary/");

        console.log("Dashboard summary:", response.data);

        setSummary(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch dashboard summary:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  const stats = [
    {
      label: "Total Leads",
      value: summary.total_leads,
      color: "#6c63ff",
      icon: <PeopleAltOutlinedIcon sx={{ fontSize: 28 }} />,
    },
    {
      label: "Active Deals",
      value: summary.active_deals,
      color: "#0be8c0",
      icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 28 }} />,
    },
    {
      label: "Closed Deals",
      value: summary.closed_deals,
      color: "#ffc2b9",
      icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 28 }} />,
    },
    {
      label: "Monthly Revenue",
      value: `$${Number(summary.monthly_revenue).toLocaleString()}`,
      color: "#ece02d",
      icon: <AttachMoneyOutlinedIcon sx={{ fontSize: 28 }} />,
    },
  ];

  return (
    <Grid container spacing={8}>
      {stats.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.label}>
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 4,
              borderRadius: 2,
              gap: 2,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Left side: text */}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" color="textSecondary">
                {item.label}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {loading ? "..." : item.value}
              </Typography>
            </CardContent>

            {/* Right side: circular icon with blurred bg */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: `${item.color}30`, // semi-transparent background
              }}
            >
              {/* Force icon color here */}
              {React.cloneElement(item.icon, {
                sx: { color: item.color, fontSize: 26 },
              })}
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;

