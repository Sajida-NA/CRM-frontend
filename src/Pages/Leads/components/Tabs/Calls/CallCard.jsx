
import { useEffect, useState } from "react";

import {
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
  CircularProgress,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import CommonSelect from "../../../../../Components/common/CommonSelect";

import { syncCall } from "../../../../../services/callService";
import api from "../../../../../services/api";

export default function CallCard({ call }) {
  const [open, setOpen] = useState(false);
  const [currentCall, setCurrentCall] = useState(call);
  const [syncing, setSyncing] = useState(false);
  const [savingOutcome, setSavingOutcome] = useState(false);

  // =========================================================
  // KEEP CURRENT CALL IN SYNC WITH PARENT
  // =========================================================

  useEffect(() => {
    setCurrentCall(call);
  }, [call]);

  // =========================================================
  // CLEAN HTML NOTE
  // =========================================================

  const cleanNote = (html) => {
    if (!html) return "";

    const temp = document.createElement("div");
    temp.innerHTML = html;

    return temp.textContent || temp.innerText || "";
  };

  // =========================================================
  // REMOVE EMAIL FROM DISPLAY NAME
  // =========================================================

  const getNameWithoutEmail = (value) => {
    if (!value) return "Unknown";

    return String(value)
      .replace(/\s*\([^)]*@[^)]*\)\s*/g, "")
      .trim();
  };

  // =========================================================
  // FORMAT DATE
  //
  // IMPORTANT:
  // Backend already saves the date in UAE local time.
  // Do NOT use new Date() here.
  // =========================================================

  const formatDate = (value) => {
    if (!value) return "";

    const dateString = String(value).trim();

    const parts = dateString.split("-");

    if (parts.length === 3) {
      const [year, month, day] = parts;

      return `${year}-${month}-${day}`;
    }

    return dateString;
  };

  // =========================================================
  // FORMAT TIME
  //
  // IMPORTANT:
  // Backend already saves the time in UAE local time.
  // Do NOT use new Date() here.
  // =========================================================

  const formatTime = (value) => {
    if (!value) return "";

    const cleanTime = String(value)
      .split(".")[0]
      .trim();

    const parts = cleanTime.split(":");

    if (parts.length < 2) {
      return cleanTime;
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      return cleanTime;
    }

    const period = hours >= 12 ? "PM" : "AM";

    const displayHour =
      hours % 12 === 0
        ? 12
        : hours % 12;

    return `${displayHour}:${String(minutes).padStart(
      2,
      "0"
    )} ${period}`;
  };

  // =========================================================
  // OUTCOME OPTIONS
  // =========================================================

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

  // =========================================================
  // NORMALIZE OUTCOME
  // =========================================================

  const normalizeOutcome = (value) => {
    if (!value) return "";

    return String(value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");
  };

  const normalizedOutcome = normalizeOutcome(
    currentCall?.call_outcome
  );

  // =========================================================
  // FORMAT DURATION
  // =========================================================

  const formatDuration = (seconds) => {
    if (
      seconds === null ||
      seconds === undefined ||
      seconds === ""
    ) {
      return "0 sec";
    }

    const totalSeconds = Number(seconds);

    if (
      Number.isNaN(totalSeconds) ||
      totalSeconds < 0
    ) {
      return "0 sec";
    }

    if (totalSeconds < 60) {
      return `${totalSeconds} sec`;
    }

    const minutes = Math.floor(
      totalSeconds / 60
    );

    const remainingSeconds =
      totalSeconds % 60;

    if (remainingSeconds === 0) {
      return `${minutes} min`;
    }

    return `${minutes} min ${remainingSeconds} sec`;
  };

  // =========================================================
  // SYNC CALL WITH TWILIO
  // =========================================================

  const handleSyncCall = async () => {
    if (!currentCall?.id) {
      console.error(
        "Cannot sync call: Call ID missing."
      );

      return;
    }

    try {
      setSyncing(true);

      console.log(
        "Syncing call with Twilio:",
        currentCall.id
      );

      const response = await syncCall(
        currentCall.id
      );

      console.log(
        "SYNC CALL RESPONSE:",
        response
      );

      // IMPORTANT:
      // Do NOT replace currentCall with response.
      //
      // The sync endpoint only returns Twilio fields.
      // Keep created_by, connected, date, time, note, etc.

      if (response?.success) {
        setCurrentCall((prev) => ({
          ...prev,

          call_outcome:
            response.call_outcome ??
            prev.call_outcome,

          duration:
            response.duration ??
            prev.duration,

          twilio_status:
            response.twilio_status ??
            prev.twilio_status,

          twilio_call_sid:
            response.twilio_call_sid ??
            prev.twilio_call_sid,
        }));
      }
    } catch (error) {
      console.error(
        "SYNC CALL ERROR:",
        error?.response?.data ||
          error?.message ||
          error
      );
    } finally {
      setSyncing(false);
    }
  };

  // =========================================================
  // TOGGLE DETAILS
  // =========================================================

  const handleToggle = async () => {
    const nextOpen = !open;

    setOpen(nextOpen);

    if (nextOpen) {
      await handleSyncCall();
    }
  };

  // =========================================================
  // UPDATE OUTCOME
  // =========================================================

  const handleOutcomeChange = async (event) => {
    const newOutcome =
      event?.target?.value ?? event;

    if (
      !newOutcome ||
      !currentCall?.id
    ) {
      return;
    }

    const previousCall = currentCall;

    try {
      setSavingOutcome(true);

      // -----------------------------------------------------
      // Optimistic UI update
      // -----------------------------------------------------

      setCurrentCall((prev) => ({
        ...prev,
        call_outcome: newOutcome,
      }));

      // -----------------------------------------------------
      // Update backend
      // -----------------------------------------------------

      const response = await api.patch(
        `/activities/call/${currentCall.id}/`,
        {
          call_outcome: newOutcome,
        }
      );

      console.log(
        "OUTCOME UPDATED:",
        response.data
      );

      // -----------------------------------------------------
      // Merge backend response
      // -----------------------------------------------------

      if (response?.data) {
        setCurrentCall((prev) => ({
          ...prev,
          ...response.data,

          created_by:
            response.data.created_by ??
            prev.created_by,

          connected:
            response.data.connected ??
            prev.connected,

          date:
            response.data.date ??
            prev.date,

          time:
            response.data.time ??
            prev.time,

          duration:
            response.data.duration ??
            prev.duration,

          call_outcome:
            response.data.call_outcome ??
            prev.call_outcome,
        }));
      }
    } catch (error) {
      console.error(
        "UPDATE OUTCOME ERROR:",
        error?.response?.data ||
          error?.message ||
          error
      );

      // Restore previous state
      setCurrentCall(previousCall);
    } finally {
      setSavingOutcome(false);
    }
  };

  // =========================================================
  // CALLER
  // =========================================================

  const callerRawName =
    currentCall?.created_by?.name ||
    currentCall?.created_by?.full_name ||
    "Unknown";

  const callerName =
    getNameWithoutEmail(
      callerRawName
    );

  // =========================================================
  // CONNECTED CRM RECORD
  // =========================================================

  const connectedRawName =
    currentCall?.connected?.name ||
    currentCall?.connected?.company_name ||
    currentCall?.connected?.title ||
    currentCall?.connected?.deal_name ||
    currentCall?.connected?.ticket_name ||
    currentCall?.connected?.subject ||
    "Unknown";

  const connectedName =
    getNameWithoutEmail(
      connectedRawName
    );

  // =========================================================
  // DATE / TIME
  // =========================================================

  const displayDate = formatDate(
    currentCall?.date
  );

  const displayTime = formatTime(
    currentCall?.time
  );

  // =========================================================
  // UI
  // =========================================================

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
            onClick={handleToggle}
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
            <strong>Call </strong>
            from {callerName}
          </Typography>
        </Box>

        <Typography color="text.secondary">
          {displayDate}

          {displayDate && displayTime
            ? " at "
            : ""}

          {displayTime}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          ml: 4,
          mt: -0.5,
        }}
      >
        To: {connectedName}
      </Typography>

      {currentCall?.note && (
        <Typography
          variant="body2"
          color="text.secondary"
          mt={0.5}
        >
          {cleanNote(
            currentCall.note
          )}
        </Typography>
      )}

      <Collapse in={open}>
        <Box sx={{ mt: 2.5 }}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              size={{
                xs: 12,
                md: 5,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <CommonSelect
                  label="Outcome"
                  required
                  placeholder="Choose"
                  fullWidth
                  value={
                    normalizedOutcome
                  }
                  options={
                    outcomeOptions
                  }
                  disabled={
                    savingOutcome ||
                    syncing
                  }
                  onChange={
                    handleOutcomeChange
                  }
                />

                {savingOutcome && (
                  <CircularProgress
                    size={18}
                    sx={{
                      position:
                        "absolute",
                      right: 12,
                      top: 35,
                    }}
                  />
                )}
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 3,
              }}
            >
              <Box
                sx={{
                  position:
                    "relative",
                  width: "100%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.7,
                    color:
                      "text.primary",
                  }}
                >
                  Duration
                </Typography>

                <Box
                  sx={{
                    minHeight: 40,
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
                    backgroundColor:
                      "background.paper",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {syncing ? (
                      <CircularProgress
                        size={16}
                      />
                    ) : (
                      formatDuration(
                        currentCall?.duration
                      )
                    )}
                  </Typography>

                  <AccessTimeIcon
                    sx={{
                      color: "#98A2B3",
                      fontSize: 20,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}
