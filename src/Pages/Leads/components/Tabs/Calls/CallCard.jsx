

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

  // ==========================================================
  // UPDATE LOCAL CALL WHEN PARENT DATA CHANGES
  // ==========================================================

  useEffect(() => {
    setCurrentCall(call);
  }, [call]);

  // ==========================================================
  // CLEAN HTML
  // ==========================================================

  const cleanNote = (html) => {
    if (!html) {
      return "";
    }

    const temp = document.createElement("div");
    temp.innerHTML = html;

    return temp.textContent || temp.innerText || "";
  };

  // ==========================================================
  // REMOVE EMAIL FROM DISPLAY NAME
  // Example:
  // Saji Jubi (saji@example.com)
  // becomes:
  // Saji Jubi
  // ==========================================================

  const getNameWithoutEmail = (value) => {
    if (!value) {
      return "Unknown";
    }

    return String(value)
      .replace(/\s*\([^)]*@[^)]*\)\s*/g, "")
      .trim();
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleDateString("en-CA");
  };

  // ==========================================================
  // FORMAT TIME
  //
  // Backend may return:
  // 15:20:21.232715
  //
  // Display:
  // 03:20 PM
  // ==========================================================

  const formatTime = (value) => {
    if (!value) {
      return "";
    }

    const cleanTime = String(value)
      .split(".")[0]
      .trim();

    const parts = cleanTime.split(":");

    if (parts.length < 2) {
      return cleanTime;
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    const seconds =
      parts.length >= 3
        ? Number(parts[2])
        : 0;

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes) ||
      Number.isNaN(seconds)
    ) {
      return cleanTime;
    }

    const date = new Date();

    date.setHours(
      hours,
      minutes,
      seconds,
      0
    );

    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ==========================================================
  // OUTCOME OPTIONS
  // ==========================================================

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

  // ==========================================================
  // NORMALIZE OUTCOME
  // ==========================================================

  const normalizeOutcome = (value) => {
    if (!value) {
      return "";
    }

    return String(value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");
  };

  const normalizedOutcome = normalizeOutcome(
    currentCall?.call_outcome
  );

  // ==========================================================
  // FORMAT DURATION
  // ==========================================================

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

  // ==========================================================
  // SYNC CALL WITH TWILIO
  // ==========================================================

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

      if (response?.call) {
        setCurrentCall(response.call);
      } else if (response) {
        setCurrentCall(response);
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

  // ==========================================================
  // TOGGLE DETAILS
  // ==========================================================

  const handleToggle = async () => {
    const nextOpen = !open;

    setOpen(nextOpen);

    if (nextOpen) {
      await handleSyncCall();
    }
  };

  // ==========================================================
  // UPDATE OUTCOME
  // ==========================================================

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

      // Optimistic update
      setCurrentCall((prev) => ({
        ...prev,
        call_outcome: newOutcome,
      }));

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

      setCurrentCall(response.data);
    } catch (error) {
      console.error(
        "UPDATE OUTCOME ERROR:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setCurrentCall(previousCall);
    } finally {
      setSavingOutcome(false);
    }
  };

  // ==========================================================
  // CALLER
  // CRM USER WHO CREATED THE CALL
  // ==========================================================

  const callerRawName =
    currentCall?.created_by?.name ||
    currentCall?.created_by?.full_name ||
    "Unknown";

  const callerName =
    getNameWithoutEmail(
      callerRawName
    );

  // ==========================================================
  // CONNECTED RECORD
  // LEAD / COMPANY / DEAL / TICKET
  // ==========================================================

  const connectedRawName =
    currentCall?.connected?.name ||
    currentCall?.connected?.company_name ||
    currentCall?.connected?.title ||
    "Unknown";

  const connectedName =
    getNameWithoutEmail(
      connectedRawName
    );

  // ==========================================================
  // FORMATTED DATE / TIME
  // ==========================================================

  const displayDate = formatDate(
    currentCall?.date
  );

  const displayTime = formatTime(
    currentCall?.time
  );

  // ==========================================================
  // UI
  // ==========================================================

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
      {/* ====================================================
          HEADER
      ===================================================== */}

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

      {/* ====================================================
          CONNECTED RECORD
      ===================================================== */}

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

      {/* ====================================================
          NOTE
      ===================================================== */}

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

      {/* ====================================================
          EXPANDED DETAILS
      ===================================================== */}

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
            {/* ============================================
                OUTCOME
            ============================================= */}

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
                  value={normalizedOutcome}
                  options={outcomeOptions}
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

            {/* ============================================
                DURATION
            ============================================= */}

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
                      color:
                        "#98A2B3",
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