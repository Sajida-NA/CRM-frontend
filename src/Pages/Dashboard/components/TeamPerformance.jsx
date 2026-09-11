// import React from "react";
// import { Box, Typography, Paper, Button } from "@mui/material";

// const rows = [
//   {
//     name: "Ethan Harper",
//     active: 25,
//     closed: 10,
//     revenue: 12000,
//     change: "+3.4%",
//   },
//   {
//     name: "Olivia Bennett",
//     active: 30,
//     closed: 15,
//     revenue: 15000,
//     change: "-0.1%",
//   },
//   {
//     name: "Liam Carter",
//     active: 22,
//     closed: 12,
//     revenue: 10000,
//     change: "+3.4%",
//   },
//   {
//     name: "Sophia Evans",
//     active: 28,
//     closed: 14,
//     revenue: 13000,
//     change: "+2.8%",
//   },
// ];

// const TeamPerformance = () => {
//   const exportCSV = () => {
//     const header = [
//       "Name",
//       "Active Deals",
//       "Closed Deals",
//       "Revenue Amount",
//       "Revenue % Change",
//     ];
//     const csvRows = [
//       header.join(","),
//       ...rows.map((r) =>
//         [r.name, r.active, r.closed, `$${r.revenue}`, r.change].join(","),
//       ),
//     ];
//     const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "team_performance.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <Box sx={{ mt: 3 }}>
//       {/* Title left, button right */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "100%",
//           mb: 4,
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{ fontSize: 20, fontWeight: "bold", color: "#1F2937" }}
//         >
//           Team Performance Tracking
//         </Typography>
//         <Button
//           variant="outlined"
//           sx={{
//             borderColor: "#6C63FF",
//             color: "#6C63FF",
//             borderRadius: "10px",
//             fontWeight: "bold",
//             fontSize: 12,
//             px: 3,
//             "&:hover": {
//               borderColor: "darkviolet",
//               color: "darkviolet",
//               backgroundColor: "#f3e8ff",
//             },
//           }}
//           onClick={exportCSV}
//         >
//           Export CSV
//         </Button>
//       </Box>

//       {/* Headings row inside a box */}
//       <Paper
//         sx={{
//           mb: 2,
//           p: 2,
//           border: "1px solid #E5E7EB",
//           borderRadius: 1,
//           display: "flex",
//           fontWeight: "bold",
//           bgcolor: "#F9FAFB",
//         }}
//       >
//         <Box sx={{ flex: 1 }}>Employee</Box>
//         <Box sx={{ flex: 1, textAlign: "right" }}>Active Deals</Box>
//         <Box sx={{ flex: 1, textAlign: "right" }}>Closed Deals</Box>
//         {/* Single Revenue header */}
//         <Box sx={{ flex: 2, textAlign: "center" }}>Revenue</Box>
//       </Paper>

//       {/* Each row also inside a box */}
//       {rows.map((row) => (
//         <Paper
//           key={row.name}
//           sx={{
//             mb: 2,
//             p: 1.5,
//             border: "1px solid rgba(229, 231, 235, 0.5)",
//             borderRadius: 1,
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>{row.name}</Box>
//           <Box sx={{ flex: 1, textAlign: "right" }}>{row.active}</Box>
//           <Box sx={{ flex: 1, textAlign: "right" }}>{row.closed}</Box>

//           {/* Revenue split into two mini-columns */}
//           <Box
//             sx={{
//               flex: 2,
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 2,
//             }}
//           >
//             <Box sx={{ textAlign: "right", flex: 1 }}>
//               ${row.revenue.toLocaleString()}
//             </Box>
//             <Box
//               sx={{
//                 textAlign: "left",
//                 flex: 1,
//                 color: row.change.startsWith("+") ? "green" : "red",
//                 fontWeight: "bold",
//               }}
//             >
//               {row.change}
//             </Box>
//           </Box>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default TeamPerformance;


import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import api from "../../../services/api";

const TeamPerformance = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchTeamPerformance = async () => {
      try {
        const response = await api.get("/dashboard/team-performance/");
        console.log("Dashboard team performance:", response.data);

        const formattedData = response.data.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          active: employee.active_deals,
          closed: employee.closed_deals,
          revenue: Number(employee.revenue),
          change: employee.revenue_change,
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Team Performance API Error:", error);
      }
    };

    fetchTeamPerformance();
  }, []);

  const exportCSV = () => {
    const header = [
      "Name",
      "Active Deals",
      "Closed Deals",
      "Revenue Amount",
      "Revenue % Change",
    ];

    const csvRows = [
      header.join(","),
      ...rows.map((r) =>
        [r.name, r.active, r.closed, `$${r.revenue}`, r.change].join(","),
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "team_performance.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* Title left, button right */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: 20, fontWeight: "bold", color: "#1F2937" }}
        >
          Team Performance Tracking
        </Typography>

        <Button
          variant="outlined"
          sx={{
            borderColor: "#6C63FF",
            color: "#6C63FF",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: 12,
            px: 3,
            "&:hover": {
              borderColor: "darkviolet",
              color: "darkviolet",
              backgroundColor: "#f3e8ff",
            },
          }}
          onClick={exportCSV}
        >
          Export CSV
        </Button>
      </Box>

      {/* Headings row inside a box */}
      <Paper
        sx={{
          mb: 2,
          p: 2,
          border: "1px solid #E5E7EB",
          borderRadius: 1,
          display: "flex",
          fontWeight: "bold",
          bgcolor: "#F9FAFB",
        }}
      >
        <Box sx={{ flex: 1 }}>Employee</Box>
        <Box sx={{ flex: 1, textAlign: "right" }}>Active Deals</Box>
        <Box sx={{ flex: 1, textAlign: "right" }}>Closed Deals</Box>
        {/* Single Revenue header */}
        <Box sx={{ flex: 2, textAlign: "center" }}>Revenue</Box>
      </Paper>

      {/* Each row also inside a box */}
      {rows.map((row) => (
        <Paper
          key={row.name}
          sx={{
            mb: 2,
            p: 1.5,
            border: "1px solid rgba(229, 231, 235, 0.5)",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>{row.name}</Box>
          <Box sx={{ flex: 1, textAlign: "right" }}>{row.active}</Box>
          <Box sx={{ flex: 1, textAlign: "right" }}>{row.closed}</Box>

          {/* Revenue split into two mini-columns */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: "right", flex: 1 }}>
              ${row.revenue.toLocaleString()}
            </Box>
            <Box
              sx={{
                textAlign: "left",
                flex: 1,
                color: row.change.startsWith("+") ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {row.change}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default TeamPerformance;
