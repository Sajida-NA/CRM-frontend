import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { ticketTabs } from "../TicketTabs";

import api from "../../../../../services/api";

import {
  startDirectCall,
  startBridgeCall,
} from "../../../../../services/callService";

export default function TicketCalls() {
  const { ticketId } = useParams();

  // ============================================================
  // REFRESH KEY FROM TICKET LEFT PANEL
  // ============================================================

  const { refreshKey } = useOutletContext();

  // ============================================================
  // STATE
  // ============================================================

  const [activeTab, setActiveTab] = useState("Calls");

  const [ticket, setTicket] = useState(null);

  const [calls, setCalls] = useState([]);

  const [loading, setLoading] = useState(true);

  const [calling, setCalling] = useState(false);

  // ============================================================
  // SNACKBAR STATE
  // ============================================================

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ============================================================
  // CALL MODE
  //
  // direct = CRM → Django → Twilio → Customer
  //
  // bridge = CRM → Django → Twilio → CRM User → Customer
  // ============================================================

  const [callMode] = useState("direct");

  // ============================================================
  // FETCH TICKET
  // ============================================================

  const fetchTicket = async () => {
    if (!ticketId) {
      setTicket(null);
      return;
    }

    try {
      const response = await api.get(`/tickets/${ticketId}/`);

      console.log("====================================");
      console.log("TICKET RESPONSE:", response.data);
      console.log("TICKET ID:", ticketId);
      console.log(
        "TICKET ASSOCIATED DEAL:",
        response.data?.associated_deal
      );
      console.log("====================================");

      setTicket(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING TICKET:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setTicket(null);
    }
  };

  // ============================================================
  // SORT CALLS - LATEST FIRST
  // ============================================================

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

  // ============================================================
  // FETCH TICKET CALLS
  // ============================================================

  const fetchCalls = async () => {
    if (!ticketId) {
      setCalls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/ticket/${ticketId}/call/`
      );

      console.log(
        "TICKET CALLS RESPONSE:",
        response.data
      );

      const ticketCalls =
        Array.isArray(response.data)
          ? response.data
          : Array.isArray(
              response.data?.activities
            )
          ? response.data.activities
          : [];

      console.log(
        "RAW TICKET CALLS:",
        ticketCalls
      );

      const sortedCalls =
        sortCallsLatestFirst(ticketCalls);

      console.log(
        "SORTED TICKET CALLS:",
        sortedCalls
      );

      console.log(
        "TICKET CALL IDS:",
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
        "ERROR FETCHING TICKET CALLS:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    if (!ticketId) {
      setTicket(null);
      setCalls([]);
      setLoading(false);
      return;
    }

    fetchTicket();
    fetchCalls();
  }, [ticketId]);

  // ============================================================
  // TICKET NAME
  // ============================================================

  const ticketName =
    ticket?.ticket_name ||
    ticket?.name ||
    ticket?.title ||
    `Ticket #${ticketId}`;

  // ============================================================
  // MAKE PHONE CALL
  //
  // Ticket
  //   ↓
  // associated_deal
  //   ↓
  // associated_lead
  //   ↓
  // phone_number
  // ============================================================

  const handleMakePhoneCall = async () => {
    if (!ticketId) {
      setSnackbar({
        open: true,
        message: "Ticket ID is missing.",
        severity: "error",
      });

      return;
    }

    if (calling) {
      return;
    }

    try {
      setCalling(true);

      // ========================================================
      // SHOW CALLING STATUS
      // ========================================================

      setSnackbar({
        open: true,
        message: "Calling...",
        severity: "info",
      });

      console.log(
        "===================================="
      );

      console.log(
        "STARTING TICKET TWILIO CALL"
      );

      console.log(
        "Ticket ID:",
        ticketId
      );

      console.log(
        "Ticket Name:",
        ticketName
      );

      console.log(
        "Call Mode:",
        callMode
      );

      console.log(
        "===================================="
      );

      let response;

      // ========================================================
      // DIRECT CALL
      //
      // CRM → Django → Twilio → Customer
      // ========================================================

      if (callMode === "direct") {
        response = await startDirectCall(
          "ticket",
          Number(ticketId)
        );
      }

      // ========================================================
      // BRIDGE CALL
      //
      // CRM → Django → Twilio → CRM USER → CUSTOMER
      // ========================================================

      else if (callMode === "bridge") {
        response = await startBridgeCall(
          "ticket",
          Number(ticketId)
        );
      }

      // ========================================================
      // INVALID CALL MODE
      // ========================================================

      else {
        throw new Error(
          `Invalid call mode: ${callMode}`
        );
      }

      console.log(
        "TICKET TWILIO CALL RESPONSE:",
        response
      );

      // ========================================================
      // IMMEDIATE REFRESH
      // ========================================================

      await fetchCalls();

      // ========================================================
      // REFRESH AFTER TWILIO STATUS UPDATE
      // ========================================================

      setTimeout(async () => {
        console.log(
          "REFRESHING TICKET CALL DETAILS AFTER TWILIO..."
        );

        await fetchCalls();
      }, 3000);

      // ========================================================
      // SUCCESS MESSAGE
      // ========================================================

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
        "ERROR STARTING TICKET PHONE CALL:",
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

      // ========================================================
      // ERROR MESSAGE
      // ========================================================

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setCalling(false);
    }
  };

  // ============================================================
  // CLOSE SNACKBAR
  // ============================================================

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box
      sx={{
        p: 3,
        mx: -2,
      }}
    >
      {/* ======================================================
          ACTIVITY TABS
      ====================================================== */}

      <CommonActivityTabs
        tabs={ticketTabs(ticketId)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ======================================================
          CALL HEADER
      ====================================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
          mb: 1,
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

      {/* ======================================================
          CALLS
      ====================================================== */}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      ) : calls.length === 0 ? (
        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
          }}
        >
          No calls found for this ticket.
        </Typography>
      ) : (
        calls.map((call) => (
          <CallCard
            key={call.id}
            call={call}
          />
        ))
      )}

      {/* ======================================================
          CALL STATUS SNACKBAR
      ====================================================== */}

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
  );
}
