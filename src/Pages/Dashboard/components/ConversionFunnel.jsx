import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import api from "../../../services/api";


const ConversionFunnel = () => {
  const [conversion, setConversion] = useState({
    contact: { count: 0, percentage: 0 },
    qualified_lead: { count: 0, percentage: 0 },
    proposal_sent: { count: 0, percentage: 0 },
    negotiation: { count: 0, percentage: 0 },
    closed_won: { count: 0, percentage: 0 },
    closed_lost: { count: 0, percentage: 0 },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversionData = async () => {
      try {
        const response = await api.get("/dashboard/conversion/");

        console.log("Dashboard conversion:", response.data);

        setConversion(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch dashboard conversion:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConversionData();
  }, []);

  const stages = [
    {
      label: "Contact",
      value: conversion.contact.percentage,
      color: "#6C63FF",
    },
    {
      label: "Qualified Lead",
      value: conversion.qualified_lead.percentage,
      color: "green",
    },
    {
      label: "Proposal Sent",
      value: conversion.proposal_sent.percentage,
      color: "goldenrod",
    },
    {
      label: "Negotiation",
      value: conversion.negotiation.percentage,
      color: "blue",
    },
    {
      label: "Closed Won",
      value: conversion.closed_won.percentage,
      color: "darkblue",
    },
    {
      label: "Closed Lost",
      value: conversion.closed_lost.percentage,
      color: "red",
    },
  ];

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

      {stages.map((stage) => (
        <Box key={stage.label} sx={{ mb: 2 }}>
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
            value={loading ? 0 : stage.value}
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
      ))}
    </Box>
  );
};

export default ConversionFunnel;
