// import { useState } from "react";
// import {
//   Paper,
//   Box,
//   Typography,
//   IconButton,
//   Collapse,
//   Grid,
// } from "@mui/material";

// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";

// import SelectField from "../../../../../Components/common/SelectField";
// import CommonSelect from "../../../../../Components/common/CommonSelect";

// export default function CallCard({ call }) {
//   const [open, setOpen] = useState(call.expanded);

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
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//         }}
//       >
//         {/* Left */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             mb: 1,
//           }}
//         >
//           <IconButton size="small" onClick={() => setOpen(!open)} sx={{ p: 0 }}>
//             {open ? (
//               <KeyboardArrowRightIcon color="primary" fontSize="small" />
//             ) : (
//               <KeyboardArrowDownIcon color="primary" fontSize="small" />
//             )}
//           </IconButton>

//           <Typography>
//             <strong>Call </strong>from {call.name}
//           </Typography>
//         </Box>

//         {/* Right */}

//         <Typography color="text.secondary">
//           {call.date} at {call.time}
//         </Typography>
//       </Box>

//       <Typography variant="body2" color="text.secondary" mt={0.5}>
//         {call.description}
//       </Typography>
      

//       <Collapse in={open}>
//         <Box sx={{ mt: 2.5 }}>
//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, md: 5 }}>
//               <CommonSelect
//                 label="Outcome"
//                 required
//                 placeholder="Choose"
//                 fullWidth
//                 options={[
//                   { label: "Interested", value: "interested" },
//                   { label: "Not Interested", value: "not_interested" },
//                   { label: "Follow Up", value: "follow_up" },
//                 ]}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 3 }}>
//               <CommonSelect
//                 label="Duration"
//                 required
//                 placeholder="Choose"
//                 fullWidth
//                 options={[
//                   { label: "5 mins", value: "5" },
//                   { label: "10 mins", value: "10" },
//                   { label: "15 mins", value: "15" },
//                   { label: "30 mins", value: "30" },
//                 ]}
//                 endAdornment={<AccessTimeIcon sx={{ color: "#98A2B3" }} />}
//               />
//             </Grid>
//           </Grid>
//         </Box>
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
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function CallCard({ call }) {
  const [open, setOpen] = useState(false);

  if (!call) return null;

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const creatorName =
    call.created_by?.name ||
    call.created_by_name ||
    "Unknown user";

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
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => setOpen((prev) => !prev)}
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

          <Typography>
            <strong>Call</strong> from {creatorName}
          </Typography>
        </Box>

        <Typography color="text.secondary">
          {formatDate(call.date)} at {formatTime(call.time)}
        </Typography>
      </Box>

      {/* Note */}
      <Typography
        variant="body2"
        color="text.secondary"
        mt={1}
      >
        {call.note || ""}
      </Typography>

      {/* Expanded Details */}
      <Collapse in={open}>
        <Box
          sx={{
            mt: 2.5,
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          {/* Outcome */}
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Outcome
            </Typography>

            <Typography variant="body2">
              {call.call_outcome || "-"}
            </Typography>
          </Box>

          {/* Time */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AccessTimeIcon
              sx={{
                color: "#98A2B3",
                fontSize: 20,
              }}
            />

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Time
              </Typography>

              <Typography variant="body2">
                {formatTime(call.time) || "-"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}