import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  useParams,
  useOutletContext,
} from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "./CallCard";

import { getLeadTabs } from "../LeadTabs";

import { getLeadById } from "../../../../../services/leads";

import {
  startDirectCall,
  startBridgeCall,
} from "../../../../../services/callService";

import api from "../../../../../services/api";

export default function Leadcalls() {
  const { leadId } = useParams();
  const { refreshKey } = useOutletContext();

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState(null);
  const [calling, setCalling] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Current call mode
  const [callMode] = useState("direct");

  // -----------------------------------------
  // FETCH LEAD
  // -----------------------------------------
  const fetchLead = async () => {
    if (!leadId) {
      setLead(null);
      return;
    }

    try {
      const response = await getLeadById(leadId);

      console.log("LEAD DETAILS:", response.data);

      setLead(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setLead(null);
    }
  };

  // -----------------------------------------
  // SORT CALLS - LATEST FIRST
  // -----------------------------------------
  const sortCallsLatestFirst = (callList) => {
    return [...callList].sort((a, b) => {
      const dateTimeA = new Date(
        `${a?.date || ""}T${a?.time || "00:00:00"}`
      ).getTime();

      const dateTimeB = new Date(
        `${b?.date || ""}T${b?.time || "00:00:00"}`
      ).getTime();

      if (
        !Number.isNaN(dateTimeA) &&
        !Number.isNaN(dateTimeB)
      ) {
        return dateTimeB - dateTimeA;
      }

      const createdA = new Date(
        a?.created_at || 0
      ).getTime();

      const createdB = new Date(
        b?.created_at || 0
      ).getTime();

      return createdB - createdA;
    });
  };

  // -----------------------------------------
  // FETCH CALLS
  // -----------------------------------------
  const fetchCalls = async () => {
    if (!leadId) {
      setCalls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/lead/${leadId}/call/`
      );

      console.log(
        "LEAD CALLS API RESPONSE:",
        response.data
      );

      const callData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.activities)
        ? response.data.activities
        : [];

      console.log("RAW CALL DATA:", callData);

      const sortedCalls =
        sortCallsLatestFirst(callData);

      console.log(
        "SORTED CALL DATA:",
        sortedCalls
      );

      console.log(
        "CALL IDS:",
        sortedCalls.map((call) => ({
          id: call?.id,
          date: call?.date,
          time: call?.time,
          created_at: call?.created_at,
          call_outcome: call?.call_outcome,
          twilio_status: call?.twilio_status,
          call_mode: call?.call_mode,
          duration: call?.duration,
        }))
      );

      setCalls(sortedCalls);
    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD CALLS:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // INITIAL LOAD / REFRESH
  // -----------------------------------------
  useEffect(() => {
    if (!leadId) {
      setCalls([]);
      setLead(null);
      setLoading(false);
      return;
    }

    fetchLead();
    fetchCalls();
  }, [leadId, refreshKey]);

  // -----------------------------------------
  // MAKE PHONE CALL
  // -----------------------------------------
  const handleMakePhoneCall = async () => {
    if (!leadId) {
      setSnackbar({
        open: true,
        message: "Lead ID is missing.",
        severity: "error",
      });

      return;
    }

    if (calling) {
      return;
    }

    // Get customer's phone number
    const customerPhone =
      lead?.phone_number ||
      lead?.phone ||
      lead?.mobile ||
      "";

    console.log(
      "CUSTOMER PHONE:",
      customerPhone
    );

    // Check phone number exists
    if (!customerPhone) {
      setSnackbar({
        open: true,
        message:
          "Phone number is not available for this lead.",
        severity: "error",
      });

      return;
    }

    try {
      setCalling(true);

      // Show calling message
      setSnackbar({
        open: true,
        message: "Calling...",
        severity: "info",
      });

      console.log(
        "===================================="
      );

      console.log("STARTING TWILIO CALL");
      console.log("Lead ID:", leadId);
      console.log("Call Mode:", callMode);
      console.log(
        "Customer Phone:",
        customerPhone
      );

      console.log(
        "===================================="
      );

      let response;

      // -----------------------------------------
      // DIRECT CALL
      // CRM → Django → Twilio → Customer
      // -----------------------------------------
      if (callMode === "direct") {
        response = await startDirectCall(
          "lead",
          Number(leadId)
        );
      }

      // -----------------------------------------
      // BRIDGE CALL
      // CRM → Django → Twilio → CRM User
      // → Customer
      // -----------------------------------------
      else if (callMode === "bridge") {
        response = await startBridgeCall(
          "lead",
          Number(leadId)
        );
      }

      else {
        throw new Error(
          `Invalid call mode: ${callMode}`
        );
      }

      console.log(
        "TWILIO CALL START RESPONSE:",
        response
      );

      // Refresh immediately
      await fetchCalls();

      // Refresh again after Twilio updates
      setTimeout(async () => {
        console.log(
          "REFRESHING CALL DETAILS AFTER TWILIO..."
        );

        await fetchCalls();
      }, 3000);

      // Show backend success message
      setSnackbar({
        open: true,
        message:
          response?.message ||
          response?.detail ||
          "Your phone call has been started.",
        severity: "success",
      });

    } catch (error) {
      console.error(
        "ERROR STARTING PHONE CALL:",
        error?.response?.data ||
          error?.message ||
          error
      );

      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to start phone call.";

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });

    } finally {
      setCalling(false);
    }
  };

  // -----------------------------------------
  // CLOSE SNACKBAR
  // -----------------------------------------
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------
  return (
    <div>
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* Activity Tabs */}
        <CommonActivityTabs
          tabs={getLeadTabs(leadId)}
          activeTab="Calls"
        />

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 2,
          }}
        >
          <Typography variant="h6">
            Calls
          </Typography>

          <CommonButton
            variant="contained"
            onClick={handleMakePhoneCall}
            disabled={calling}
          >
            {calling
              ? "Calling..."
              : "Make a Phone Call"}
          </CommonButton>
        </Box>

        {/* Loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 5,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* No Calls */}
        {!loading &&
          calls.length === 0 && (
            <Typography
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              No calls found for this lead.
            </Typography>
          )}

        {/* Call List */}
        {!loading &&
          calls.length > 0 && (
            <Box>
              {calls.map((call) => (
                <CallCard
                  key={call.id}
                  call={call}
                />
              ))}
            </Box>
          )}

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            severity={snackbar.severity}
            variant="filled"
            onClose={handleCloseSnackbar}
            sx={{
              width: "100%",
              minWidth: "280px",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}


