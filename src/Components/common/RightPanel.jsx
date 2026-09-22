import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import api from "../../services/api";

export default function RightPanel({
  module = "lead",
  objectId,

  summaryTitle = "AI Lead Summary",

  summaryText =
    "There are no activities associated with this record and further details are needed to provide a comprehensive summary.",
}) {
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateAISummary = useCallback(async () => {
    if (!module || !objectId) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/ai/summary/",
        {
          module,
          object_id: Number(objectId),
        }
      );

      console.log(
        "AI SUMMARY RESPONSE:",
        response.data
      );

      setAiSummary(
        response.data?.summary || ""
      );

    } catch (error) {

      console.error(
        "ERROR GENERATING AI SUMMARY:",
        error.response?.data ||
          error.message
      );

      setAiSummary("");

      setError(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Failed to generate AI summary."
      );

    } finally {
      setLoading(false);
    }
  }, [module, objectId]);

  useEffect(() => {

    if (!module || !objectId) {
      setAiSummary("");
      setError("");
      return;
    }

    generateAISummary();

  }, [
    module,
    objectId,
    generateAISummary,
  ]);

  const displaySummary =
    aiSummary || summaryText;

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#fff",
        borderTopRightRadius: "12px",
        p: 2,
      }}
    >
      <Box
        sx={{
          border: "1px solid #5948DB",
          backgroundColor: "#F7F7FA",
          borderRadius: "8px",
          p: 2,
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#5948DB",
            mb: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AutoAwesomeOutlinedIcon
            color="primary"
            sx={{ mr: 1 }}
          />

          {summaryTitle}
        </Typography>

        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              py: 1,
            }}
          >
            <CircularProgress
              size={18}
              color="primary"
            />

            <Typography
              sx={{
                fontSize: "13px",
                color: "#516F90",
              }}
            >
              Generating summary...
            </Typography>
          </Box>
        )}

        {!loading && error && (
          <Typography
            sx={{
              fontSize: "13px",
              color: "error.main",
              lineHeight: 1.6,
            }}
          >
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <Typography
            sx={{
              fontSize: "14px",
              color: "#33475B",
              lineHeight: 1.6,
            }}
          >
            {displaySummary}
          </Typography>
        )}
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Attachments
          </Typography>

          <Typography
            sx={{
              fontWeight: 600,
              color: "#5948DB",
              cursor: "pointer",
            }}
          >
            + Add
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#516F90",
            lineHeight: 1.6,
          }}
        >
          See the files attached to your activities or uploaded to this record.
        </Typography>
      </Box>
    </Box>
  );
}