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

// import CommonSelect from "../../../../../Components/common/CommonSelect";

// export default function CallCard({ call }) {
//   // ============================================
//   // EXPAND / COLLAPSE
//   // ============================================

//   const [open, setOpen] = useState(false);

//   // ============================================
//   // CLEAN NOTE HTML
//   // ============================================

//   const cleanNote = (html) => {
//     if (!html) return "";

//     const temp = document.createElement("div");
//     temp.innerHTML = html;

//     return temp.textContent || temp.innerText || "";
//   };

//   // ============================================
//   // CALL OUTCOME OPTIONS
//   // ============================================

//   const outcomeOptions = [
//     {
//       label: "Connected",
//       value: "connected",
//     },
//     {
//       label: "No Answer",
//       value: "no_answer",
//     },
//     {
//       label: "Busy",
//       value: "busy",
//     },
//     {
//       label: "Left Voicemail",
//       value: "left_voicemail",
//     },
//     {
//       label: "Wrong Number",
//       value: "wrong_number",
//     },
//     {
//       label: "Callback Requested",
//       value: "callback_requested",
//     },
//     {
//       label: "Not Interested",
//       value: "not_interested",
//     },
//     {
//       label: "Other",
//       value: "other",
//     },
//   ];

//   // ============================================
//   // DURATION OPTIONS
//   // ============================================

//   const durationOptions = [
//     {
//       label: "5 mins",
//       value: "5",
//     },
//     {
//       label: "10 mins",
//       value: "10",
//     },
//     {
//       label: "15 mins",
//       value: "15",
//     },
//     {
//       label: "30 mins",
//       value: "30",
//     },
//     {
//       label: "45 mins",
//       value: "45",
//     },
//     {
//       label: "60 mins",
//       value: "60",
//     },
//   ];

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
//       {/* ==========================================
//           HEADER
//       ========================================== */}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//         }}
//       >
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
//               <KeyboardArrowDownIcon color="primary" fontSize="small" />
//             ) : (
//               <KeyboardArrowRightIcon color="primary" fontSize="small" />
//             )}
//           </IconButton>

//           <Typography>
//             <strong>Call </strong>
//             from {call.connected?.name || "Unknown"}
//           </Typography>
//         </Box>

//         <Typography color="text.secondary">
//           {call.date || ""} at {call.time || ""}
//         </Typography>
//       </Box>

//       {/* ==========================================
//           NOTE
//       ========================================== */}

//       {call.note && (
//         <Typography variant="body2" color="text.secondary" mt={0.5}>
//           {cleanNote(call.note)}
//         </Typography>
//       )}

//       {/* ==========================================
//           EXPANDED CONTENT
//       ========================================== */}

//       <Collapse in={open}>
//         <Box sx={{ mt: 2.5 }}>
//           <Grid container spacing={2}>
//             {/* ======================================
//                 OUTCOME
//             ====================================== */}

//             <Grid size={{ xs: 12, md: 5 }}>
//               <CommonSelect
//                 label="Outcome"
//                 required
//                 placeholder="Choose"
//                 fullWidth
//                 value={call.call_outcome || ""}
//                 options={outcomeOptions}
//                 disabled
//               />
//             </Grid>

//             {/* ======================================
//                 DURATION
//             ====================================== */}

//             <Grid size={{ xs: 12, md: 3 }}>
//               <CommonSelect
//                 label="Duration"
//                 required
//                 placeholder="Choose"
//                 fullWidth
//                 value={
//                   call.duration !== null && call.duration !== undefined
//                     ? String(call.duration)
//                     : ""
//                 }
//                 options={durationOptions}
//                 disabled
//                 endAdornment={
//                   <AccessTimeIcon
//                     sx={{
//                       color: "#98A2B3",
//                     }}
//                   />
//                 }
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
  Chip,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import CommonSelect from "../../../../../Components/common/CommonSelect";

export default function CallCard({ call }) {
  const [open, setOpen] = useState(false);

  // ============================================
  // CLEAN NOTE HTML
  // ============================================

  const cleanNote = (html) => {
    if (!html) return "";

    const temp = document.createElement("div");

    temp.innerHTML = html;

    return (
      temp.textContent ||
      temp.innerText ||
      ""
    );
  };

  // ============================================
  // OUTCOME OPTIONS
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
  // FORMAT DURATION
  // Twilio duration is stored in seconds
  // ============================================

  const formatDuration = (seconds) => {
    if (
      seconds === null ||
      seconds === undefined ||
      seconds === ""
    ) {
      return "—";
    }

    const totalSeconds = Number(seconds);

    if (
      Number.isNaN(totalSeconds) ||
      totalSeconds < 0
    ) {
      return "—";
    }

    const minutes = Math.floor(
      totalSeconds / 60
    );

    const remainingSeconds =
      totalSeconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds} sec`;
    }

    if (remainingSeconds === 0) {
      return `${minutes} min`;
    }

    return `${minutes} min ${remainingSeconds} sec`;
  };

  // ============================================
  // STATUS LABEL
  // ============================================

  const getStatusLabel = (status) => {
    if (!status) {
      return "Unknown";
    }

    const statusMap = {
      queued: "Queued",
      initiated: "Initiated",
      ringing: "Ringing",
      "in-progress": "In Progress",
      completed: "Completed",
      busy: "Busy",
      "no-answer": "No Answer",
      canceled: "Canceled",
      failed: "Failed",
    };

    return (
      statusMap[status] ||
      status
    );
  };

  // ============================================
  // DATA
  // ============================================

  const callerName =
    call?.created_by?.name ||
    "Unknown";

  const connectedName =
    call?.connected?.name ||
    "Unknown";

  const callStatus =
    getStatusLabel(
      call?.twilio_status
    );

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
          HEADER
      ======================================== */}

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
            onClick={() =>
              setOpen(!open)
            }
            sx={{
              p: 0,
            }}
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
            <strong>Call</strong>{" "}
            from {callerName}
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
        >
          {call?.date || ""}{" "}
          at {call?.time || ""}
        </Typography>
      </Box>

      {/* ========================================
          CUSTOMER
      ======================================== */}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          ml: 4,
        }}
      >
        To: {connectedName}
      </Typography>

      {/* ========================================
          NOTE
      ======================================== */}

      {call?.note && (
        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
        >
          {cleanNote(call.note)}
        </Typography>
      )}

      {/* ========================================
          EXPANDED CONTENT
      ======================================== */}

      <Collapse in={open}>
        <Box
          sx={{
            mt: 2.5,
          }}
        >
          <Grid
            container
            spacing={2}
          >
            {/* ==================================
                OUTCOME
            ================================== */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <CommonSelect
                label="Outcome"
                required
                placeholder="Choose"
                fullWidth
                value={
                  call?.call_outcome ||
                  ""
                }
                options={
                  outcomeOptions
                }
                disabled
              />
            </Grid>

            {/* ==================================
                REAL DURATION
            ================================== */}

            <Grid
              size={{
                xs: 12,
                md: 3,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.8,
                    fontWeight: 500,
                  }}
                >
                  Duration
                </Typography>

                <Box
                  sx={{
                    height: 40,
                    border: "1px solid",
                    borderColor:
                      "divider",
                    borderRadius: 1,
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    px: 1.5,
                    color:
                      "text.secondary",
                  }}
                >
                  <Typography
                    variant="body2"
                  >
                    {formatDuration(
                      call?.duration
                    )}
                  </Typography>

                  <AccessTimeIcon
                    sx={{
                      color:
                        "#98A2B3",
                      fontSize: 20,
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* ==================================
                TWILIO STATUS
            ================================== */}

            <Grid
              size={{
                xs: 12,
                md: 3,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.8,
                    fontWeight: 500,
                  }}
                >
                  Status
                </Typography>

                <Chip
                  label={
                    callStatus
                  }
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>

          {/* ==================================
              TWILIO CALL SID
          ================================== */}

          {call?.twilio_call_sid && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 2,
              }}
            >
              Call ID:{" "}
              {call.twilio_call_sid}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
}

