
import React from "react";
import { Box, Typography } from "@mui/material";

export default function ActivityTimeline({ activity }) {
  if (!activity) return null;

  const type = activity.activity_type;
  const data = activity.data || {};
  const createdBy = activity.created_by_name || "Unknown user";

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getTitle = () => {
    switch (type) {
      case "call":
        return "Call";
      case "task":
        return "Task";
      case "note":
        return "Note";
      case "meeting":
        return "Meeting";
      case "email":
        return "Email";
      default:
        return "Activity";
    }
  };

  const getActionText = () => {
    switch (type) {
      case "call":
        return "made a call";

      case "task":
        return "created a task";

      case "note":
        return "created a note";

      case "meeting":
        return "created a meeting";

      case "email":
        return "sent an email";

      default:
        return "created an activity";
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fff",
        p: 2,
        mb: 2,
      }}
    >
      {/* Activity Type */}
      <Typography
        sx={{
          fontSize: "15px",
          fontWeight: 600,
          color: "#333",
          mb: 0.8,
        }}
      >
        {getTitle()}
      </Typography>

      {/* User action */}
      <Typography
        sx={{
          fontSize: "14px",
          color: "#333",
          mb: 0.8,
        }}
      >
        <strong>{createdBy}</strong>{" "}
        {getActionText()}
      </Typography>

      {/* Call details */}
      {type === "call" && (
        <>
          {/* {data.call_outcome && (
            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              Outcome: {data.call_outcome}
            </Typography>
          )} */}

          {data.note && (
            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              {data.note}
            </Typography>
          )}
        </>
      )}

      {/* Task details */}
      {type === "task" && data.task_name && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "text.secondary",
            mb: 0.5,
          }}
        >
          {data.task_name}
        </Typography>
      )}

      {/* Note details */}
      {type === "note" && data.note && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "text.secondary",
            mb: 0.5,
          }}
        >
          {data.note}
        </Typography>
      )}

      {/* Meeting details */}
      {type === "meeting" && data.title && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "text.secondary",
            mb: 0.5,
          }}
        >
          {data.title}
        </Typography>
      )}

      {/* Email details */}
      {type === "email" && data.subject && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "text.secondary",
            mb: 0.5,
          }}
        >
          {data.subject}
        </Typography>
      )}

      {/* Date */}
      <Typography
        sx={{
          fontSize: "12px",
          color: "#888",
          mt: 1,
        }}
      >
        {formatDate(activity.created_at)}
      </Typography>
    </Box>
  );
}