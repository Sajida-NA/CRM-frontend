

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
import api from "../../../services/api";

export default function TicketLeftPanel({ children }) {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");

  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  // ============================================================
  // FETCH TICKET DETAILS
  // ============================================================

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${ticketId}/`);

        console.log("TICKET DETAILS:", response.data);

        setTicket(response.data);

        setStatus(
          response.data.ticket_status
            ? response.data.ticket_status
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())
            : ""
        );
      } catch (error) {
        console.error(
          "Fetch Ticket Details Error:",
          error.response?.data || error
        );
      }
    };

    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  // ============================================================
  // LOADING
  // ============================================================

  if (!ticket) {
    return null;
  }

  // ============================================================
  // TICKET DATA
  // ============================================================

  const ticketName =
    ticket.ticket_name ||
    ticket.name ||
    "-";

  const description =
    ticket.description ||
    "-";

  const ownerName =
    ticket.ticket_owner ||
    ticket.owner_name ||
    ticket.owner?.name ||
    ticket.owner?.username ||
    "-";

  const priority =
    ticket.priority ||
    "-";

  const createdDate =
    ticket.created_date ||
    ticket.created_at ||
    "-";

  // ============================================================
  // TICKET DETAILS
  // ============================================================

  const ticketDetails = [
    {
      label: "Ticket Description",
      value: description,
    },
    {
      label: "Ticket Owner",
      value: ownerName,
    },
    {
      label: "Priority",
      value: priority,
    },
    {
      label: "Created Date",
      value: createdDate,
    },
  ];

  // ============================================================
  // LEFT PANEL DATA
  // ============================================================

  const leftPanelData = {
    profile: {
      name: ticketName,

      status: status,

      setStatus: setStatus,

      email: "",
    },

    showProfileEdit: false,

    showProfileImage: false,

    sectionTitle: "About this Ticket",

    leadDetails: ticketDetails,

    summaryTitle: "AI Ticket Summary",

    summaryText:
      `The ticket "${ticketName}" currently has a ${status || "-"} status with ${priority} priority.`,
  };

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      <CommonEntityHeader
        title="Tickets"
        leftPanelData={leftPanelData}
        onCallClick={() => setOpenCreateLogCall(true)}
      >
        {children}
      </CommonEntityHeader>

      {/* ========================================================
          CREATE / LOG CALL
      ======================================================== */}

      {/* <CreateLogCall
        open={openCreateLogCall}
        onClose={() => setOpenCreateLogCall(false)}
        relatedModule="ticket"
        objectId={ticketId}
        connectedName={ticketName}
      /> */}

      <CreateLogCall
  open={openCreateLogCall}
  onClose={() => setOpenCreateLogCall(false)}
  relatedModule="ticket"
  objectId={ticketId}
  connectedName={ownerName}
/>
    </>
  );
}