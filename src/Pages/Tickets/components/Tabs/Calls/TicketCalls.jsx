import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, CircularProgress } from "@mui/material";

import TicketLeftPanel from "../../TicketLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";

import { ticketTabs } from "../TicketTabs";
import api from "../../../../../services/api";

export default function TicketCalls() {
  const { ticketId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");

  const [ticket, setTicket] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  // ============================================================
  // FETCH TICKET
  // ============================================================

  const fetchTicket = async () => {
    if (!ticketId) {
      return;
    }

    try {
      const response = await api.get(`/tickets/${ticketId}/`);

      console.log("TICKET RESPONSE:", response.data);

      setTicket(response.data);
    } catch (error) {
      console.error("ERROR FETCHING TICKET:", error.response?.data || error);

      setTicket(null);
    }
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

      // ========================================================
      // CORRECT BACKEND ENDPOINT
      // ========================================================

      const response = await api.get(
        `/activities/activity/ticket/${ticketId}/call/`,
      );

      console.log("TICKET CALLS RESPONSE:", response.data);

      // ========================================================
      // BACKEND RESPONSE:
      //
      // {
      //   module: "ticket",
      //   module_id: 1,
      //   activity_type: "call",
      //   activities: [...]
      // }
      // ========================================================

      const ticketCalls = response.data?.activities || [];

      console.log("TICKET CALLS:", ticketCalls);

      setCalls(ticketCalls);
    } catch (error) {
      console.error(
        "ERROR FETCHING TICKET CALLS:",
        error.response?.data || error,
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
  // TICKET OWNER
  // ============================================================

  const ticketOwnerName = ticket?.ticket_owner || "";

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <TicketLeftPanel onCallCreated={fetchCalls}>
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* ====================================================
            ACTIVITY TABS
        ==================================================== */}

        <CommonActivityTabs
          tabs={ticketTabs(ticketId)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* ====================================================
            CALL HEADER
        ==================================================== */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography variant="h6">Calls</Typography>

          <CommonButton
            variant="contained"
            onClick={() => setOpenCreateLogCall(true)}
          >
            Make a Phone Call
          </CommonButton>
        </Box>

        {/* ====================================================
            LOG CALL DRAWER
        ==================================================== */}

        <CreateLogCall
          open={openCreateLogCall}
          onClose={() => setOpenCreateLogCall(false)}
          relatedModule="ticket"
          objectId={ticketId}
          connectedName={ticketName}
          onCallCreated={fetchCalls}
        />

        {/* ====================================================
            CALLS
        ==================================================== */}

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
          calls.map((call) => <CallCard key={call.id} call={call} />)
        )}
      </Box>
    </TicketLeftPanel>
  );
}
