// import React from "react";
// import { Box, Typography } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// export default function ActivityTimeline({
//     title,
//     highlightedText,
//     normalText = "",
//     description,
//     date,
// }) {
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "flex-start",
//                 p: 1,
//                 mb: 1,
//                 border: "1px solid",
//                 borderColor: "divider",
//                 borderRadius: 1,
//                 bgcolor: "background.paper",
//             }}
//         >
//             {/* Left */}
//             <Box sx={{ flex: 1 }}>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 0.5,
//                     }}
//                 >
//                     <KeyboardArrowDownIcon
//                         sx={{
//                             fontSize: 18,
//                             color: "primary.main",
//                         }}
//                     />

//                     <Typography
//                         variant="body1"
//                         sx={{
//                             fontWeight: 600,
//                             color: "text.primary",
//                         }}
//                     >
//                         {highlightedText}
//                     </Typography>

//                     {normalText && (
//                         <Typography
//                             variant="body1"
//                             sx={{
//                                 color: "text.secondary",
//                             }}
//                         >
//                             {normalText}
//                         </Typography>
//                     )}
//                 </Box>

//                 <Typography
//                     variant="body2"
//                     sx={{
//                         mt: 1,
//                         ml: 3,
//                         color: "text.secondary",
//                     }}
//                 >
//                     {description}
//                 </Typography>
//             </Box>

//             {/* Right */}
//             <Typography
//                 variant="body2"
//                 sx={{
//                     ml: 3,
//                     whiteSpace: "nowrap",
//                     color: "text.secondary",
//                 }}
//             >
//                 {date}
//             </Typography>
//         </Box>
//     );
// }

import React from "react";
import { Box, Typography } from "@mui/material";

export default function ActivityTimeline({ activity }) {
  if (!activity) return null;

  const type = activity.activity_type;
  const data = activity.data || {};

  // Show user's name instead of user ID
  const createdBy = activity.created_by_name || "Unknown user";

  const getTitle = () => {
    switch (type) {
      case "call":
        return "Call";

      case "note":
        return "Note";

      case "task":
        return "Task";

      case "meeting":
        return "Meeting";

      case "email":
        return "Email";

      default:
        return type || "Activity";
    }
  };

//   const getDescription = () => {
//     switch (type) {
//       case "note":
//         return data.note || "";

//       case "call":
//         return data.call_outcome || "";

//       case "task":
//         return data.task_name || "";

//       case "meeting":
//         return data.title || "";

//       case "email":
//         return data.subject || "";

//       default:
//         return "";
//     }
//   };

const getDescription = () => {
  switch (type) {
    case "note":
      return data.note || "";

    case "call":
      return data.note || "";

    case "task":
      return data.task_name || "";

    case "meeting":
      return data.title || "";

    case "email":
      return data.subject || "";

    default:
      return "";
  }
};

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Activity icon */}
      <Box
        sx={{
          width: 40,
          height: 40,
          minWidth: 40,
          borderRadius: "50%",
          bgcolor: "grey.200",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
        }}
      >
        {type ? type.charAt(0).toUpperCase() : "A"}
      </Box>

      {/* Activity content */}
      <Box sx={{ flex: 1 }}>
        {/* Activity title */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          {getTitle()}
        </Typography>

        {/* Created by user name */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 0.5,
          }}
        >
          by {createdBy}
        </Typography>

        {/* Activity description */}
        <Typography
          variant="body2"
          sx={{
            mb: 0.5,
          }}
        >
          {getDescription()}
        </Typography>

        {/* Task details */}
        {type === "task" && (
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Due: {data.due_date || "-"} | Priority:{" "}
            {data.priority || "-"}
          </Typography>
        )}

        {/* Meeting details */}
        {type === "meeting" && (
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {data.start_date || ""}{" "}
            {data.start_time || ""}
            {data.location ? ` | ${data.location}` : ""}
          </Typography>
        )}
      </Box>

      {/* Activity date */}
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          whiteSpace: "nowrap",
        }}
      >
        {formatDate(activity.created_at)}
      </Typography>
    </Box>
  );
}