// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   Select,
//   MenuItem,
//   Paper,
// } from "@mui/material";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// const data = [
//   { month: "Jan", sales: 400 },
//   { month: "Feb", sales: 1000 },
//   { month: "Mar", sales: 200 },
//   { month: "Apr", sales: 600 },
//   { month: "May", sales: 800 },
//   { month: "Jun", sales: 500 },
//   { month: "Jul", sales: 700 },
//   { month: "Aug", sales: 900 },
//   { month: "Sep", sales: 300 },
//   { month: "Oct", sales: 400 },
//   { month: "Nov", sales: 600 },
//   { month: "Dec", sales: 750 },
// ];

// const SalesReports = () => {
//   const [period, setPeriod] = useState("Monthly");

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 3,
//         borderRadius: "16px",
//         border: "1px solid #E5E7EB",
//         bgcolor: "#fff",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "100%",
//           mb: 3,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: 20,
//             fontWeight: 700,
//             color: "#111827",
//           }}
//         >
//           Sales Reports
//         </Typography>

//         <FormControl size="small" sx={{ minWidth: 140 }}>
//           <Select
//             value={period}
//             onChange={(e) => setPeriod(e.target.value)}
//             sx={{
//               height: 42,
//               borderRadius: "12px",
//               bgcolor: "#fff",

//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#E5E7EB",
//               },

//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#D1D5DB",
//               },

//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "#6C63FF",
//               },
//             }}
//           >
//             <MenuItem value="Monthly">Monthly</MenuItem>
//             <MenuItem value="Quarterly">Quarterly</MenuItem>
//             <MenuItem value="Yearly">Yearly</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Chart */}
//       <Box sx={{ width: "100%", height: 320 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{
//               top: 10,
//               right: 20,
//               left: 10,
//               bottom: 0,
//             }}
//           >
//             <CartesianGrid
//               stroke="#F1F5F9"
//               vertical={false}
//               strokeDasharray="3 3"
//             />

//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{
//                 fill: "#1F2937",
//                 fontSize: 14,
//                 fontWeight: 600,
//               }}
//             />

//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tickFormatter={(value) => `$${value}`}
//               tick={{
//                 fill: "#1F2937",
//                 fontSize: 14,
//                 fontWeight: 600,
//               }}
//             />

//             <Tooltip cursor={{ fill: "rgba(108,99,255,0.08)" }} />

//             <defs>
//               <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.95} />
//                 <stop offset="95%" stopColor="#6C63FF" stopOpacity={0.25} />
//               </linearGradient>
//             </defs>

//             <Bar
//               dataKey="sales"
//               fill="url(#salesGradient)"
//               radius={[4, 4, 0, 0]}
//               barSize={24}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>
//     </Paper>
//   );
// };

// export default SalesReports;


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
        const response = await api.get(
          `/dashboard/sales-report/?period=${period}`
        );

        const formattedData = (response.data || []).map((item) => ({
          month: item.month,
          sales: Number(item.revenue || 0),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Dashboard sales report error:", error);
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
