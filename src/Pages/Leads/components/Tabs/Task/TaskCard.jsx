

// import { useState } from "react";
// import {
//   Paper,
//   Box,
//   Typography,
//   IconButton,
//   Collapse,
//   Grid,
//   Radio,
// } from "@mui/material";

// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

// export default function TaskCard({ task }) {
//   const [open, setOpen] = useState(false);

//   // ========================================
//   // ASSIGNED USER
//   // ========================================

//   const assignedToName =
//     typeof task.assigned_to === "object"
//       ? task.assigned_to?.name ||
//         task.assigned_to?.email ||
//         "Unassigned"
//       : task.assigned_to_name ||
//         "Unassigned";

//   // ========================================
//   // REMOVE HTML TAGS FROM NOTE
//   // ========================================

//   const getPlainText = (html) => {
//     if (!html) return "";

//     const temp = document.createElement("div");
//     temp.innerHTML = html;

//     return (
//       temp.textContent ||
//       temp.innerText ||
//       ""
//     ).trim();
//   };

//   const noteText =
//     getPlainText(task.note) || "No description";

//   // ========================================
//   // DATE
//   // ========================================

//   const formattedDate = task.due_date
//     ? new Date(task.due_date).toLocaleDateString(
//         "en-US",
//         {
//           month: "long",
//           day: "numeric",
//           year: "numeric",
//         }
//       )
//     : "-";

//   // ========================================
//   // TIME
//   // ========================================

//   const formattedTime = task.time
//     ? new Date(
//         `1970-01-01T${task.time}`
//       ).toLocaleTimeString(
//         "en-US",
//         {
//           hour: "numeric",
//           minute: "2-digit",
//         }
//       )
//     : "-";

//   // ========================================
//   // OVERDUE
//   // ========================================

//   const isOverdue = () => {
//     if (!task.due_date || !task.time) {
//       return false;
//     }

//     const dueDateTime = new Date(
//       `${task.due_date}T${task.time}`
//     );

//     return dueDateTime < new Date();
//   };

//   const overdue = isOverdue();

//   // ========================================
//   // PRIORITY
//   // ========================================

//   const priority = task.priority
//     ? task.priority.charAt(0).toUpperCase() +
//       task.priority.slice(1)
//     : "-";

//   // ========================================
//   // TASK TYPE
//   // ========================================

//   const taskTypeMap = {
//     follow_up: "Follow Up",
//     call: "Call",
//     meeting: "Meeting",
//     email: "Email",
//     other: "Other",
//   };

//   const taskType =
//     taskTypeMap[task.task_type] ||
//     task.task_type ||
//     "-";

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: 1,
//         mt: 1,
//         p: 2,
//       }}
//     >
//       {/* ========================================
//           TOP SECTION
//       ======================================== */}

//       <Box
//         sx={{
//           width: 650,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//         }}
//       >
//         {/* LEFT */}

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "flex-start",
//             gap: 1,
//             mb: 1,
//           }}
//         >
//           <IconButton
//             size="small"
//             onClick={() => setOpen(!open)}
//             sx={{ p: 0 }}
//           >
//             {open ? (
//               <KeyboardArrowDownIcon
//                 color="primary"
//                 fontSize="small"
//               />
//             ) : (
//               <KeyboardArrowRightIcon
//                 color="primary"
//                 fontSize="small"
//               />
//             )}
//           </IconButton>

//           <Box>
//             {/* TASK ASSIGNED */}

//             <Typography
//               sx={{
//                 fontSize: 14,
//                 color: "text.secondary",
//               }}
//             >
//               <strong>
//                 Task assigned to {assignedToName}
//               </strong>
//             </Typography>

//             {/* TASK NAME */}

//             <Typography
//               sx={{
//                 fontSize: 14,
//                 color: "text.secondary",
//                 mt: 0.5,
//               }}
//             >
//               {noteText}
//             </Typography>
//           </Box>
//         </Box>

//         {/* RIGHT */}

//         <Box
//           sx={{
//             width: 250,
//             display: "flex",
//             alignItems: "flex-start",
//             gap: 0.5,
//           }}
//         >
//           <CalendarTodayOutlinedIcon
//             sx={{
//               color: overdue
//                 ? "#ff4d4f"
//                 : "text.secondary",
//               fontSize: 18,
//             }}
//           />

//           <Typography
//             sx={{
//               fontSize: 13,
//               color: overdue
//                 ? "#ff4d4f"
//                 : "text.secondary",
//               fontWeight: overdue ? 600 : 400,
//               whiteSpace: "nowrap",
//             }}
//           >
//             {overdue ? "Overdue" : "Due"}:
//           </Typography>

//           <Typography
//             color="text.secondary"
//             sx={{
//               fontSize: 13,
//               whiteSpace: "nowrap",
//             }}
//           >
//             {formattedDate} at {formattedTime}
//           </Typography>
//         </Box>
//       </Box>

//       {/* ========================================
//           NOTE / RADIO
//       ======================================== */}

//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "flex-start",
//           mx: 1,
//         }}
//       >
//         <Radio />

//         <Typography
//           variant="body2"
//           sx={{
//             color: "text.secondary",
//             mt: 1.8,
//           }}
//         >
//           {noteText}
//         </Typography>
//       </Box>

//       {/* ========================================
//           INFO BOX
//       ======================================== */}

//       <Collapse in={open}>
//         <Box
//           sx={{
//             bgcolor: "#eef3f8",
//             borderRadius: 1,
//             p: 2,
//             mt: 2,
//           }}
//         >
//           <Grid
//             container
//             spacing={13}
//           >
//             {/* DUE DATE */}

//             <Grid item xs={4}>
//               <Typography
//                 gutterBottom
//                 sx={{
//                   fontSize: 13,
//                   color: "text.secondary",
//                 }}
//               >
//                 Due Date & Time
//               </Typography>

//               <Typography fontWeight={500}>
//                 {formattedDate} at {formattedTime}
//               </Typography>
//             </Grid>

//             {/* PRIORITY */}

//             <Grid item xs={4}>
//               <Typography
//                 gutterBottom
//                 sx={{
//                   fontSize: 13,
//                   color: "text.secondary",
//                 }}
//               >
//                 Priority
//               </Typography>

//               <Typography fontWeight={500}>
//                 {priority}
//               </Typography>
//             </Grid>

//             {/* TYPE */}

//             <Grid item xs={4}>
//               <Typography
//                 gutterBottom
//                 sx={{
//                   fontSize: 13,
//                   color: "text.secondary",
//                 }}
//               >
//                 Type
//               </Typography>

//               <Typography fontWeight={500}>
//                 {taskType}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* DESCRIPTION */}

//         <Typography
//           sx={{
//             fontSize: 14,
//             color: "text.secondary",
//             mt: 2,
//           }}
//         >
//           {noteText}
//         </Typography>
//       </Collapse>
//     </Paper>
//   );
// }


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
  // ASSIGNED USER
  // ========================================

  const assignedToName =
    typeof task.assigned_to === "object"
      ? task.assigned_to?.name ||
        task.assigned_to?.email ||
        "Unassigned"
      : task.assigned_to_name ||
        "Unassigned";

  // ========================================
  // REMOVE HTML TAGS FROM NOTE
  // ========================================

  const getPlainText = (html) => {
    if (!html) return "";

    const temp = document.createElement("div");
    temp.innerHTML = html;

    return (
      temp.textContent ||
      temp.innerText ||
      ""
    ).trim();
  };

  const noteText =
    getPlainText(task.note) || "No description";

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

            {/* 
              REMOVED THE DUPLICATE TASK NAME HERE.

              Previously this was:

              <Typography>
                {noteText}
              </Typography>

              Since task.note already contains
              "Task assigned to Aron Paul", it caused
              the same text to appear twice.
            */}
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
          NOTE / RADIO
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
          INFO BOX
      ======================================== */}

      <Collapse in={open}>
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

        {/* DESCRIPTION */}

        <Typography
          sx={{
            fontSize: 14,
            color: "text.secondary",
            mt: 2,
          }}
        >
          {noteText}
        </Typography>
      </Collapse>
    </Paper>
  );
}