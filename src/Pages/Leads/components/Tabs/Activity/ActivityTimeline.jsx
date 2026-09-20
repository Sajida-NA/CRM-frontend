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
      {/* Activity Title */}
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

      {/* Created By */}
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

      {/* =========================
          CALL
      ========================= */}
      {type === "call" && (
        <>
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

      {/* =========================
          TASK
      ========================= */}
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

      {/* =========================
          NOTE - RICH TEXT
      ========================= */}
      {type === "note" && data.note && (
        <Box
          sx={{
            fontSize: "13px",
            color: "text.primary",
            mb: 0.5,

            /* Paragraphs */
            "& p": {
              margin: 0,
              marginBottom: "8px",
            },

            /* Bold */
            "& strong, & b": {
              fontWeight: 700,
            },

            /* Italic */
            "& em, & i": {
              fontStyle: "italic",
            },

            /* Underline */
            "& u": {
              textDecoration: "underline",
            },

            /* Strikethrough */
            "& s, & strike": {
              textDecoration: "line-through",
            },

            /* Unordered list */
            "& ul": {
              display: "block",
              paddingLeft: "24px",
              margin: "8px 0",
              listStyleType: "disc",
            },

            /* Ordered list */
            "& ol": {
              display: "block",
              paddingLeft: "24px",
              margin: "8px 0",
              listStyleType: "decimal",
            },

            /* List items */
            "& li": {
              display: "list-item",
              marginBottom: "4px",
            },

            /* Quill bullet list */
            "& li[data-list='bullet']": {
              display: "list-item",
              listStyleType: "disc",
            },

            /* Quill ordered list */
            "& li[data-list='ordered']": {
              display: "list-item",
              listStyleType: "decimal",
            },

            /* Links */
            "& a": {
              textDecoration: "underline",
            },

            /* Images */
            "& img": {
              maxWidth: "100%",
              height: "auto",
            },
          }}
          dangerouslySetInnerHTML={{
            __html: data.note || "",
          }}
        />
      )}

      {/* =========================
          MEETING
      ========================= */}
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

      {/* =========================
          EMAIL
      ========================= */}
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

      {/* Created Date */}
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

