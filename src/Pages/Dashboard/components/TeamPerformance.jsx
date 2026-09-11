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
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import api from "../../../services/api";

const TeamPerformance = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamPerformance = async () => {
      try {
        const response = await api.get(
          "/dashboard/team-performance/"
        );

        const formattedRows = (response.data || []).map((item) => ({
          id: item.id,
          name: `${item.first_name || ""} ${item.last_name || ""}`.trim() || "Unknown",
          active: Number(item.active_deals || 0),
          closed: Number(item.closed_deals || 0),
          revenue: Number(item.revenue || 0),
          change: item.revenue_change || "0%",
        }));

        setRows(formattedRows);
      } catch (error) {
        console.error("Dashboard team performance error:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamPerformance();
  }, []);

  const escapeCSV = (value) => {
    const stringValue = String(value ?? "");

    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

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
      ...rows.map((row) =>
        [
          escapeCSV(row.name),
          row.active,
          row.closed,
          `$${row.revenue}`,
          escapeCSV(row.change),
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "team_performance.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: 19,
            fontWeight: "bold",
            color: "#191b1e",
          }}
        >
          Team Performance
        </Typography>

        <Button
          variant="outlined"
          onClick={exportCSV}
          sx={{
            textTransform: "none",
            borderRadius: 1,
          }}
        >
          Export CSV
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Box
          component="table"
          sx={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <Box component="thead">
            <Box component="tr">
              <Box
                component="th"
                sx={{
                  textAlign: "left",
                  p: 2,
                  fontSize: 13,
                  color: "#6B7280",
                  fontWeight: 600,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                Name
              </Box>

              <Box
                component="th"
                sx={{
                  textAlign: "center",
                  p: 2,
                  fontSize: 13,
                  color: "#6B7280",
                  fontWeight: 600,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                Active Deals
              </Box>

              <Box
                component="th"
                sx={{
                  textAlign: "center",
                  p: 2,
                  fontSize: 13,
                  color: "#6B7280",
                  fontWeight: 600,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                Closed Deals
              </Box>

              <Box
                component="th"
                sx={{
                  textAlign: "right",
                  p: 2,
                  fontSize: 13,
                  color: "#6B7280",
                  fontWeight: 600,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                Revenue Amount
              </Box>

              <Box
                component="th"
                sx={{
                  textAlign: "right",
                  p: 2,
                  fontSize: 13,
                  color: "#6B7280",
                  fontWeight: 600,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                Revenue % Change
              </Box>
            </Box>
          </Box>

          <Box component="tbody">
            {loading ? (
              <Box component="tr">
                <Box
                  component="td"
                  colSpan={5}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    fontSize: 13,
                    color: "#6B7280",
                  }}
                >
                  Loading team performance...
                </Box>
              </Box>
            ) : rows.length === 0 ? (
              <Box component="tr">
                <Box
                  component="td"
                  colSpan={5}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    fontSize: 13,
                    color: "#6B7280",
                  }}
                >
                  No team performance data available.
                </Box>
              </Box>
            ) : (
              rows.map((row) => (
                <Box component="tr" key={row.id}>
                  <Box
                    component="td"
                    sx={{
                      p: 2,
                      fontSize: 14,
                      color: "#1F2937",
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {row.name}
                  </Box>

                  <Box
                    component="td"
                    sx={{
                      textAlign: "center",
                      p: 2,
                      fontSize: 14,
                      color: "#1F2937",
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {row.active}
                  </Box>

                  <Box
                    component="td"
                    sx={{
                      textAlign: "center",
                      p: 2,
                      fontSize: 14,
                      color: "#1F2937",
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {row.closed}
                  </Box>

                  <Box
                    component="td"
                    sx={{
                      textAlign: "right",
                      p: 2,
                      fontSize: 14,
                      color: "#1F2937",
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    ${row.revenue.toLocaleString()}
                  </Box>

                  <Box
                    component="td"
                    sx={{
                      textAlign: "right",
                      p: 2,
                      fontSize: 14,
                      color: row.change.startsWith("-")
                        ? "red"
                        : "green",
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {row.change}
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TeamPerformance;