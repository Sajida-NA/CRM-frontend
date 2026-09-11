<<<<<<< HEAD
=======


>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, CircularProgress } from "@mui/material";

import TicketLeftPanel from "../../TicketLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { ticketTabs } from "../TicketTabs";
import api from "../../../../../services/api";

export default function TicketCalls() {
  const { ticketId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");
  const [ticket, setTicket] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

=======
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
  // ============================================================
  // FETCH TICKET
  // ============================================================

  const fetchTicket = async () => {
    if (!ticketId) {
      return;
    }

    try {
      const response = await api.get(`/tickets/${ticketId}/`);

<<<<<<< HEAD
      console.log("TICKET RESPONSE:", response.data);
=======
      console.log(
        "TICKET RESPONSE:",
        response.data
      );
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f

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
<<<<<<< HEAD
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
=======
        `/activities/activity/ticket/${ticketId}/call/`
      );

      console.log(
        "TICKET CALLS RESPONSE:",
        response.data
      );

      const ticketCalls =
        response.data?.activities || [];

      console.log(
        "TICKET CALLS:",
        ticketCalls
      );
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f

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
<<<<<<< HEAD
  // TICKET OWNER
  // ============================================================

  const ticketOwnerName = ticket?.ticket_owner || "";
=======
  // TICKET PHONE NUMBER
  // ============================================================

  const ticketPhone =
    ticket?.phone_number ||
    ticket?.phone ||
    ticket?.contact_phone ||
    ticket?.customer_phone ||
    "";

  // ============================================================
  // MAKE PHONE CALL
  // ============================================================

  const handleMakePhoneCall = () => {
    if (!ticketPhone) {
      alert(
        "Ticket phone number is not available."
      );
      return;
    }

    const cleanPhoneNumber = String(
      ticketPhone
    ).replace(/[^\d+]/g, "");

    console.log(
      "Calling Ticket:",
      ticketName
    );

    console.log(
      "Phone Number:",
      cleanPhoneNumber
    );

    // Only make the phone call.
    // DO NOT open CreateLogCall drawer.
    window.location.href =
      `tel:${cleanPhoneNumber}`;
  };
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f

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
<<<<<<< HEAD
            onClick={() => setOpenCreateLogCall(true)}
=======
            onClick={handleMakePhoneCall}
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
          >
            Make a Phone Call
          </CommonButton>
        </Box>

        {/* ====================================================
<<<<<<< HEAD
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
=======
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
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
<<<<<<< HEAD
          calls.map((call) => <CallCard key={call.id} call={call} />)
=======
          calls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
            />
          ))
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
        )}
      </Box>
    </TicketLeftPanel>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
