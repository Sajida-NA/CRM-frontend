
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import api from "../../../services/api";

const SalesReports = () => {
  const [period, setPeriod] = useState("Monthly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesReport = async () => {
      setLoading(true);

      try {
        const response = await api.get("/dashboard/sales-report/", {
          params: {
            period: period,
          },
        });

        console.log("Dashboard sales report:", response.data);

        const formattedData = (response.data || []).map((item) => ({
          month: item.month,
          sales: Number(item.revenue || 0),
        }));

        setData(formattedData);
      } catch (error) {
        console.error(
          "Failed to fetch sales report:",
          error.response?.data || error.message
        );

        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesReport();
  }, [period]);

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          pt: 3,
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
          Sales Reports
        </Typography>

        <FormControl
          size="small"
          sx={{
            minWidth: 140,
          }}
        >
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            sx={{
              fontSize: 13,
            }}
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <Box
        sx={{
          width: "100%",
          height: 320,
          mt: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              cursor={{
                fill: "rgba(108,99,255,0.08)",
              }}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#6C63FF" />
                <stop offset="100%" stopColor="#9B96FF" />
              </linearGradient>
            </defs>

            <Bar
              dataKey="sales"
              fill="url(#salesGradient)"
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Loading */}
      {loading && (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: 12,
            color: "#6B7280",
          }}
        >
          Loading sales report...
        </Typography>
      )}
    </Paper>
  );
};

export default SalesReports;
