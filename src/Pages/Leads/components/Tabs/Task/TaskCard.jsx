import { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Radio,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

export default function TaskCard({ task }) {
  const [open, setOpen] = useState(false);

  // ========================================
  // ASSIGNED USERS
  // ========================================

  const getAssignedToNames = () => {
    // New format:
    // assigned_to: [
    //   { id: 1, name: "User 1" },
    //   { id: 2, name: "User 2" }
    // ]

    if (Array.isArray(task.assigned_to)) {
      if (task.assigned_to.length === 0) {
        return "Unassigned";
      }

      return task.assigned_to
        .map(
          (user) =>
            user?.name ||
            user?.email ||
            `User ${user?.id || ""}`
        )
        .filter(Boolean)
        .join(", ");
    }

    // Backward compatibility:
    // assigned_to: { id: 1, name: "User" }

    if (
      task.assigned_to &&
      typeof task.assigned_to === "object"
    ) {
      return (
        task.assigned_to.name ||
        task.assigned_to.email ||
        "Unassigned"
      );
    }

    // Old API format:
    // assigned_to_name: "User"

    if (task.assigned_to_name) {
      return task.assigned_to_name;
    }

    return "Unassigned";
  };

  const assignedToName = getAssignedToNames();

  // ========================================
  // CHECK NOTE
  // ========================================

  const hasNote =
    task.note &&
    task.note !== "<p><br></p>" &&
    task.note
      .replace(/<[^>]*>/g, "")
      .trim() !== "";

  // ========================================
  // DATE
  // ========================================

  const formattedDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )
    : "-";

  // ========================================
  // TIME
  // ========================================

  const formattedTime = task.time
    ? new Date(
        `1970-01-01T${task.time}`
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "-";

  // ========================================
  // OVERDUE
  // ========================================

  const isOverdue = () => {
    if (!task.due_date || !task.time) {
      return false;
    }

    const dueDateTime = new Date(
      `${task.due_date}T${task.time}`
    );

    return dueDateTime < new Date();
  };

  const overdue = isOverdue();

  // ========================================
  // PRIORITY
  // ========================================

  const priority = task.priority
    ? task.priority.charAt(0).toUpperCase() +
      task.priority.slice(1)
    : "-";

  // ========================================
  // TASK TYPE
  // ========================================

  const taskTypeMap = {
    follow_up: "Follow Up",
    call: "Call",
    meeting: "Meeting",
    email: "Email",
    other: "Other",
  };

  const taskType =
    taskTypeMap[task.task_type] ||
    task.task_type ||
    "-";

  // ========================================
  // UI
  // ========================================

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        mt: 1,
        p: 2,
      }}
    >
      {/* ========================================
          TOP SECTION
      ======================================== */}

      <Box
        sx={{
          width: 650,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT */}

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            mb: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ p: 0 }}
          >
            {open ? (
              <KeyboardArrowDownIcon
                color="primary"
                fontSize="small"
              />
            ) : (
              <KeyboardArrowRightIcon
                color="primary"
                fontSize="small"
              />
            )}
          </IconButton>

          <Box>
            {/* ========================================
                TASK ASSIGNED
            ======================================== */}

            <Typography
              sx={{
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              <strong>
                Task assigned to {assignedToName}
              </strong>
            </Typography>
          </Box>
        </Box>

        {/* RIGHT */}

        <Box
          sx={{
            width: 250,
            display: "flex",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <CalendarTodayOutlinedIcon
            sx={{
              color: overdue
                ? "#ff4d4f"
                : "text.secondary",
              fontSize: 18,
            }}
          />

          <Typography
            sx={{
              fontSize: 13,
              color: overdue
                ? "#ff4d4f"
                : "text.secondary",
              fontWeight: overdue ? 600 : 400,
              whiteSpace: "nowrap",
            }}
          >
            {overdue ? "Overdue" : "Due"}:
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            {formattedDate} at {formattedTime}
          </Typography>
        </Box>
      </Box>

      {/* ========================================
          TASK NAME / RADIO
      ======================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          mx: 1,
        }}
      >
        <Radio />

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mt: 1.8,
          }}
        >
          {task.task_name || "-"}
        </Typography>
      </Box>

      {/* ========================================
          EXPANDED CONTENT
      ======================================== */}

      <Collapse in={open}>
        {/* ========================================
            INFO BOX
        ======================================== */}

        <Box
          sx={{
            bgcolor: "#eef3f8",
            borderRadius: 1,
            p: 2,
            mt: 2,
          }}
        >
          <Grid
            container
            spacing={13}
          >
            {/* DUE DATE */}

            <Grid size={4}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Due Date & Time
              </Typography>

              <Typography fontWeight={500}>
                {formattedDate} at {formattedTime}
              </Typography>
            </Grid>

            {/* PRIORITY */}

            <Grid size={4}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Priority
              </Typography>

              <Typography fontWeight={500}>
                {priority}
              </Typography>
            </Grid>

            {/* TYPE */}

            <Grid size={4}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Type
              </Typography>

              <Typography fontWeight={500}>
                {taskType}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* ========================================
            DESCRIPTION / NOTE
        ======================================== */}

        <Box
          sx={{
            mt: 2,

            // Main Note Color
            color: "#1F2937",

            fontSize: 14,

            // ====================================
            // PARAGRAPHS
            // ====================================

            "& p": {
              margin: "0 0 8px",
            },

            // ====================================
            // BOLD
            // ====================================

            "& strong": {
              fontWeight: 700,
            },

            // ====================================
            // ITALIC
            // ====================================

            "& em": {
              fontStyle: "italic",
            },

            // ====================================
            // UNDERLINE
            // ====================================

            "& u": {
              textDecoration: "underline",
            },

            // ====================================
            // STRIKETHROUGH
            // ====================================

            "& s": {
              textDecoration: "line-through",
            },

            // ====================================
            // ORDERED LIST
            // ====================================

            "& ol": {
              paddingLeft: "24px",
              marginTop: "8px",
              marginBottom: "8px",
            },

            // ====================================
            // BULLET LIST
            // ====================================

            "& ul": {
              paddingLeft: "24px",
              marginTop: "8px",
              marginBottom: "8px",
            },

            // ====================================
            // LIST ITEMS
            // ====================================

            "& li": {
              marginBottom: "4px",
            },

            // ====================================
            // HEADINGS
            // ====================================

            "& h1": {
              fontSize: "24px",
              fontWeight: 700,
              margin: "8px 0",
            },

            "& h2": {
              fontSize: "20px",
              fontWeight: 700,
              margin: "8px 0",
            },

            "& h3": {
              fontSize: "17px",
              fontWeight: 700,
              margin: "8px 0",
            },

            // ====================================
            // BLOCKQUOTE
            // ====================================

            "& blockquote": {
              borderLeft:
                "4px solid #D1D5DB",
              paddingLeft: "12px",
              margin: "8px 0",
              color: "#4B5563",
            },

            // ====================================
            // LINKS
            // ====================================

            "& a": {
              color: "#1976D2",
              textDecoration: "underline",
            },
          }}
        >
          {hasNote ? (
            <div
              dangerouslySetInnerHTML={{
                __html: task.note,
              }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: 14,
                color: "#1F2937",
              }}
            >
              No description
            </Typography>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}

