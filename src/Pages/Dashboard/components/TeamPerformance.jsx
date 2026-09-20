import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import api from "../../../services/api";

// =====================================================
// CSV HELPER
// =====================================================

const escapeCSV = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  return `"${stringValue.replace(/"/g, '""')}"`;
};

// =====================================================
// TEAM PERFORMANCE
// =====================================================

const TeamPerformance = () => {
  // ===================================================
  // STATE
  // ===================================================

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===================================================
  // FETCH TEAM PERFORMANCE
  // ===================================================

  useEffect(() => {
    const fetchTeamPerformance = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/dashboard/team-performance/"
        );

        console.log(
          "Dashboard team performance:",
          response.data
        );

        const employees = Array.isArray(response.data)
          ? response.data
          : [];

        const formattedData = employees.map(
          (employee, index) => ({
            id: employee.id ?? index,

            name:
              `${employee.first_name || ""} ${
                employee.last_name || ""
              }`.trim() || "Unknown",

            active: Number(
              employee.active_deals || 0
            ),

            closed: Number(
              employee.closed_deals || 0
            ),

            revenue: Number(
              employee.revenue || 0
            ),

            change:
              employee.revenue_change ?? "0%",
          })
        );

        console.log(
          "Formatted team performance:",
          formattedData
        );

        setRows(formattedData);
      } catch (error) {
        console.error(
          "Team Performance API Error:",
          error.response?.data ||
            error.message
        );

        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamPerformance();
  }, []);

  // ===================================================
  // EXPORT CSV
  // ===================================================

  const exportCSV = () => {
    if (rows.length === 0) {
      return;
    }

    const header = [
      "Name",
      "Active Deals",
      "Closed Deals",
      "Revenue Amount",
      "Revenue % Change",
    ];

    const csvRows = [
      header.map(escapeCSV).join(","),

      ...rows.map((row) =>
        [
          row.name,
          row.active,
          row.closed,
          `$${Number(row.revenue).toFixed(2)}`,
          row.change,
        ]
          .map(escapeCSV)
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "team_performance.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  // ===================================================
  // REVENUE CHANGE COLOR
  // ===================================================

  const getChangeColor = (change) => {
    const changeString = String(
      change ?? "0%"
    ).trim();

    if (changeString.startsWith("-")) {
      return "error.main";
    }

    return "success.main";
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "none",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

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
            color: "text.primary",
          }}
        >
          Team Performance
        </Typography>

        <Button
          variant="outlined"
          onClick={exportCSV}
          disabled={
            loading || rows.length === 0
          }
          sx={{
            textTransform: "none",
            borderRadius: 1,
          }}
        >
          Export CSV
        </Button>
      </Box>

      {/* =================================================
          TABLE
      ================================================= */}

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
          {/* =================================================
              TABLE HEADER
          ================================================= */}

          <Box component="thead">
            <Box component="tr">

              {/* NAME */}

              <Box
                component="th"
                sx={{
                  textAlign: "left",
                  p: 2,
                  fontSize: 13,
                  color: "text.secondary",
                  fontWeight: 600,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                Name
              </Box>

              {/* ACTIVE DEALS */}

              <Box
                component="th"
                sx={{
                  textAlign: "center",
                  p: 2,
                  fontSize: 13,
                  color: "text.secondary",
                  fontWeight: 600,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                Active Deals
              </Box>

              {/* CLOSED DEALS */}

              <Box
                component="th"
                sx={{
                  textAlign: "center",
                  p: 2,
                  fontSize: 13,
                  color: "text.secondary",
                  fontWeight: 600,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                Closed Deals
              </Box>

              {/* REVENUE */}

              <Box
                component="th"
                sx={{
                  textAlign: "right",
                  p: 2,
                  fontSize: 13,
                  color: "text.secondary",
                  fontWeight: 600,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                Revenue
              </Box>

            </Box>
          </Box>

          {/* =================================================
              TABLE BODY
          ================================================= */}

          <Box component="tbody">

            {/* LOADING */}

            {loading && (
              <Box component="tr">
                <Box
                  component="td"
                  colSpan={4}
                  sx={{
                    textAlign: "center",
                    p: 3,
                    fontSize: 13,
                    color: "text.secondary",
                  }}
                >
                  Loading team performance...
                </Box>
              </Box>
            )}

            {/* EMPTY */}

            {!loading &&
              rows.length === 0 && (
                <Box component="tr">
                  <Box
                    component="td"
                    colSpan={4}
                    sx={{
                      textAlign: "center",
                      p: 3,
                      fontSize: 13,
                      color: "text.secondary",
                    }}
                  >
                    No team performance data
                    available.
                  </Box>
                </Box>
              )}

            {/* DATA */}

            {!loading &&
              rows.length > 0 &&
              rows.map((row) => (
                <Box
                  component="tr"
                  key={row.id}
                >

                  {/* NAME */}

                  <Box
                    component="td"
                    sx={{
                      p: 2,
                      fontSize: 14,
                      color: "text.primary",
                      borderBottom: "1px solid",
                      borderColor: "#F3F4F6",
                    }}
                  >
                    {row.name}
                  </Box>

                  {/* ACTIVE DEALS */}

                  <Box
                    component="td"
                    sx={{
                      textAlign: "center",
                      p: 2,
                      fontSize: 14,
                      color: "text.primary",
                      borderBottom: "1px solid",
                      borderColor: "#F3F4F6",
                    }}
                  >
                    {row.active}
                  </Box>

                  {/* CLOSED DEALS */}

                  <Box
                    component="td"
                    sx={{
                      textAlign: "center",
                      p: 2,
                      fontSize: 14,
                      color: "text.primary",
                      borderBottom: "1px solid",
                      borderColor: "#F3F4F6",
                    }}
                  >
                    {row.closed}
                  </Box>

                  {/* REVENUE - SINGLE COLUMN */}

                  <Box
                    component="td"
                    sx={{
                      textAlign: "right",
                      p: 2,
                      fontSize: 14,
                      color: "text.primary",
                      borderBottom: "1px solid",
                      borderColor: "#F3F4F6",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {/* Revenue Amount */}

                      <Typography
                        component="span"
                        sx={{
                          fontSize: 14,
                          color: "text.primary",
                        }}
                      >
                        $
                        {row.revenue.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </Typography>

                      {/* Revenue Change */}

                      <Typography
                        component="span"
                        sx={{
                          fontSize: 14,
                          color: getChangeColor(
                            row.change
                          ),
                        }}
                      >
                        {String(row.change)}
                      </Typography>
                    </Box>
                  </Box>

                </Box>
              ))}

          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TeamPerformance;
