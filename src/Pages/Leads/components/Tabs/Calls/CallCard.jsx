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
  Grid,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import CommonSelect from "../../../../../Components/common/CommonSelect";

export default function CallCard({ call }) {
  const [open, setOpen] = useState(call.expanded ?? false);

  // ============================================
  // CLEAN NOTE HTML
  // ============================================

  const cleanNote = (html) => {
    if (!html) return "";

    const temp = document.createElement("div");
    temp.innerHTML = html;

    return temp.textContent || temp.innerText || "";
  };

  // ============================================
  // FORMAT DURATION
  // ============================================

  const formatDuration = (duration) => {
    if (
      duration === null ||
      duration === undefined ||
      duration === ""
    ) {
      return "";
    }

    const minutes = Number(duration);

    if (Number.isNaN(minutes)) {
      return duration;
    }

    if (minutes === 1) {
      return "1 min";
    }

    return `${minutes} mins`;
  };

  // ============================================
  // CALL OUTCOME OPTIONS
  // ============================================

  const outcomeOptions = [
    {
      label: "Connected",
      value: "connected",
    },
    {
      label: "No Answer",
      value: "no_answer",
    },
    {
      label: "Busy",
      value: "busy",
    },
    {
      label: "Left Voicemail",
      value: "left_voicemail",
    },
    {
      label: "Wrong Number",
      value: "wrong_number",
    },
    {
      label: "Callback Requested",
      value: "callback_requested",
    },
    {
      label: "Not Interested",
      value: "not_interested",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  // ============================================
  // DURATION OPTIONS
  // ============================================

  const durationOptions = [
    {
      label: "5 mins",
      value: "5",
    },
    {
      label: "10 mins",
      value: "10",
    },
    {
      label: "15 mins",
      value: "15",
    },
    {
      label: "30 mins",
      value: "30",
    },
    {
      label: "45 mins",
      value: "45",
    },
    {
      label: "60 mins",
      value: "60",
    },
  ];

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
      {/* ==========================================
          HEADER
      ========================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
              <KeyboardArrowRightIcon
                color="primary"
                fontSize="small"
              />
            ) : (
              <KeyboardArrowDownIcon
                color="primary"
                fontSize="small"
              />
            )}
          </IconButton>

          <Typography>
            <strong>Call </strong>
            from {call.name || "Unknown"}
          </Typography>
        </Box>

        <Typography color="text.secondary">
          {call.date || ""} at {call.time || ""}
        </Typography>
      </Box>

      {/* ==========================================
          NOTE
      ========================================== */}

      {call.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
        >
          {cleanNote(call.description)}
        </Typography>
      )}

      {/* ==========================================
          EXPANDED CONTENT
      ========================================== */}

      <Collapse in={open}>
        <Box sx={{ mt: 2.5 }}>
          <Grid container spacing={2}>

            {/* OUTCOME */}

            <Grid size={{ xs: 12, md: 5 }}>
              <CommonSelect
                label="Outcome"
                required
                placeholder="Choose"
                fullWidth
                value={call.call_outcome || ""}
                options={outcomeOptions}
                disabled
              />
            </Grid>

            {/* DURATION */}

            <Grid size={{ xs: 12, md: 3 }}>
              <CommonSelect
                label="Duration"
                required
                placeholder="Choose"
                fullWidth
                value={
                  call.duration !== null &&
                  call.duration !== undefined
                    ? String(call.duration)
                    : ""
                }
                options={durationOptions}
                disabled
                endAdornment={
                  <AccessTimeIcon
                    sx={{
                      color: "#98A2B3",
                    }}
                  />
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}

