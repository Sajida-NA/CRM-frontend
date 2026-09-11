

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
      try {
        setLoading(true);
        const response = await api.get("/dashboard/sales-report/",{
          params: {
            period: period,
          },
        });

        console.log("Dashboard sales report:", response.data);

        const formattedData = response.data.map((item) => ({
          month: item.month,
          sales: Number(item.revenue),
        }));

        setData(formattedData);
      } catch (error) {
        console.error(
          "Failed to fetch sales report:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSalesReport();
  }, [period]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        bgcolor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Sales Reports
        </Typography>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            sx={{
              height: 42,
              borderRadius: "12px",
              bgcolor: "#fff",

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D1D5DB",
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6C63FF",
              },
            }}
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <Box sx={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#F1F5F9"
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#1F2937",
                fontSize: 14,
                fontWeight: 600,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
              tick={{
                fill: "#1F2937",
                fontSize: 14,
                fontWeight: 600,
              }}
            />

            <Tooltip cursor={{ fill: "rgba(108,99,255,0.08)" }} />

            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.95} />
                <stop offset="95%" stopColor="#6C63FF" stopOpacity={0.25} />
              </linearGradient>
            </defs>

            <Bar
              dataKey="sales"
              fill="url(#salesGradient)"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SalesReports;

