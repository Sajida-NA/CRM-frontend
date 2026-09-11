// import React from "react";
// import { Box, Typography, LinearProgress } from "@mui/material";

// const stages = [
//   { label: "Contact", value: 70, color: "#6C63FF" },
//   { label: "Qualified Lead", value: 50, color: "green" },
//   { label: "Proposal Sent", value: 40, color: "goldenrod" },
//   { label: "Negotiation", value: 30, color: "blue" },
//   { label: "Closed Won", value: 20, color: "darkblue" },
//   { label: "Closed Lost", value: 10, color: "red" },
// ];

// const ConversionFunnel = () => (
//   <Box>
//     <Typography
//       variant="h6"
//       gutterBottom
//       sx={{
//         textAlign: "left",
//         fontSize: 19,
//         fontWeight: "bold",
//         color: "#191b1e",
//       }}
//     >
//       Contact to Deal Conversion
//     </Typography>

//     {stages.map((stage) => (
//       <Box key={stage.label} sx={{ mb: 2 }}>
//         {/* Left-aligned stage label */}
//         <Typography
//           variant="subtitle2"
//           sx={{
//             textAlign: "left",
//             fontSize: 12,
//             fontWeight: 600,
//             color: "#1F2937",
//           }}
//         >
//           {stage.label}
//         </Typography>

//         <LinearProgress
//           variant="determinate"
//           value={stage.value}
//           sx={{
//             height: 10,
//             borderRadius: 5,
//             bgcolor: "#E5E7EB",
//             "& .MuiLinearProgress-bar": { bgcolor: stage.color },
//           }}
//         />
//       </Box>
//     ))}
//   </Box>
// );

// export default ConversionFunnel;


import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import api from "../../../services/api";

const stages = [
  {
    key: "contact",
    label: "Contact",
    color: "#6C63FF",
  },
  {
    key: "qualified_lead",
    label: "Qualified Lead",
    color: "green",
  },
  {
    key: "proposal_sent",
    label: "Proposal Sent",
    color: "goldenrod",
  },
  {
    key: "negotiation",
    label: "Negotiation",
    color: "blue",
  },
  {
    key: "closed_won",
    label: "Closed Won",
    color: "darkblue",
  },
  {
    key: "closed_lost",
    label: "Closed Lost",
    color: "red",
  },
];

const ConversionFunnel = () => {
  const [conversionData, setConversionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversionData = async () => {
      try {
        const response = await api.get("/dashboard/conversion/");
        setConversionData(response.data);
      } catch (error) {
        console.error("Dashboard conversion error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversionData();
  }, []);

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "left",
          fontSize: 19,
          fontWeight: "bold",
          color: "#191b1e",
        }}
      >
        Contact to Deal Conversion
      </Typography>

      {stages.map((stage) => {
        const stageData = conversionData[stage.key] || {};

        const percentage = Math.min(
          Math.max(Number(stageData.percentage || 0), 0),
          100
        );

        return (
          <Box key={stage.key} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "left",
                fontSize: 12,
                fontWeight: 600,
                color: "#1F2937",
              }}
            >
              {stage.label}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={loading ? 0 : percentage}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: "#E5E7EB",

                "& .MuiLinearProgress-bar": {
                  bgcolor: stage.color,
                },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default ConversionFunnel;
