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

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
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