// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";

// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
// import Createnote from "../../Leads/components/Tabs/Note/Createnote";
// import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog";
// import ScheduleMeeting from "../../Leads/components/Tabs/Meetings/ScheduleMeeting";
// import CreateTaskDrawer from "../../Leads/components/Tabs/Task/CreateTaskDrawer";

// import api from "../../../services/api";

// export default function TicketLeftPanel({
//   children,
//   onCallCreated,
//   onNoteCreated,
//   onEmailCreated,
//   onTaskCreated,
// }) {
//   const { ticketId } = useParams();

//   const [ticket, setTicket] = useState(null);
//   const [status, setStatus] = useState("");
//   const [activeDrawer, setActiveDrawer] = useState(null);

//   // ============================================================
//   // FETCH TICKET DETAILS
//   // ============================================================

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const response = await api.get(`/tickets/${ticketId}/`);

//         console.log("TICKET DETAILS:", response.data);

//         setTicket(response.data);

//         setStatus(
//           response.data.ticket_status
//             ? response.data.ticket_status
//                 .toLowerCase()
//                 .replace(/\b\w/g, (char) => char.toUpperCase())
//             : "",
//         );
//       } catch (error) {
//         console.error(
//           "Fetch Ticket Details Error:",
//           error.response?.data || error,
//         );
//       }
//     };

//     if (ticketId) {
//       fetchTicket();
//     }
//   }, [ticketId]);

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (!ticket) {
//     return null;
//   }

//   // ============================================================
//   // TICKET DATA
//   // ============================================================

//   const ticketName = ticket.ticket_name || ticket.name || "-";

//   const description = ticket.description || "-";

//   const ownerName =
//     ticket.ticket_owner ||
//     ticket.owner_name ||
//     ticket.owner?.name ||
//     ticket.owner?.username ||
//     "-";

//   const priority = ticket.priority || "-";

//   const createdDate = ticket.created_date || ticket.created_at || "-";

//   // ============================================================
//   // TICKET DETAILS
//   // ============================================================

//   const ticketDetails = [
//     {
//       label: "Ticket Description",
//       value: description,
//     },
//     {
//       label: "Ticket Owner",
//       value: ownerName,
//     },
//     {
//       label: "Priority",
//       value: priority,
//     },
//     {
//       label: "Created Date",
//       value: createdDate,
//     },
//   ];

//   // ============================================================
//   // CLOSE DRAWER
//   // ============================================================

//   const closeDrawer = () => {
//     setActiveDrawer(null);
//   };

//   // ============================================================
//   // ACTIVITY CREATED CALLBACKS
//   // ============================================================

//   const handleCallCreated = async (createdCall) => {
//     console.log("Ticket call created:", createdCall);

//     setActiveDrawer(null);

//     if (onCallCreated) {
//       await onCallCreated(createdCall);
//     }
//   };

//   const handleNoteCreated = async (createdNote) => {
//     console.log("Ticket note created:", createdNote);

//     setActiveDrawer(null);

//     if (onNoteCreated) {
//       await onNoteCreated(createdNote);
//     }
//   };

//   const handleEmailCreated = async (createdEmail) => {
//     console.log("Ticket email created:", createdEmail);

//     setActiveDrawer(null);

//     if (onEmailCreated) {
//       await onEmailCreated(createdEmail);
//     }
//   };

//   const handleTaskCreated = async (createdTask) => {
//     console.log("Ticket task created:", createdTask);

//     setActiveDrawer(null);

//     if (onTaskCreated) {
//       await onTaskCreated(createdTask);
//     }
//   };

//   // ============================================================
//   // LEFT PANEL DATA
//   // ============================================================

//   const leftPanelData = {
//     profile: {
//       name: ticketName,

//       status: status,

//       setStatus: setStatus,

//       email: "",
//     },

//     showProfileEdit: false,

//     showProfileImage: false,

//     sectionTitle: "About this Ticket",

//     leadDetails: ticketDetails,

//     summaryTitle: "AI Ticket Summary",

//     summaryText: `The ticket "${ticketName}" currently has a ${
//       status || "-"
//     } status with ${priority} priority.`,
//   };

//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <>
//       <CommonEntityHeader
//         title="Tickets"
//         leftPanelData={leftPanelData}
//         onCallClick={() => setActiveDrawer("call")}
//         onNoteClick={() => setActiveDrawer("note")}
//         onEmailClick={() => setActiveDrawer("email")}
//         onTaskClick={() => setActiveDrawer("task")}
//         onMeetingClick={() => setActiveDrawer("meeting")}
//       >
//         {children}
//       </CommonEntityHeader>

//       {/* ========================================================
//           CREATE / LOG CALL
//       ======================================================== */}

//       <CreateLogCall
//         open={activeDrawer === "call"}
//         onClose={closeDrawer}
//         relatedModule="ticket"
//         objectId={ticketId}
//         connectedName={ticketName}
//         onCallCreated={handleCallCreated}
//       />

//       {/* ========================================================
//           CREATE NOTE
//       ======================================================== */}

//       <Createnote
//         open={activeDrawer === "note"}
//         onClose={closeDrawer}
//         module="ticket"
//         moduleId={ticketId}
//         onSuccess={handleNoteCreated}
//       />

//       {/* ========================================================
//           SEND EMAIL
//       ======================================================== */}

//       <NewEmailDialog
//         open={activeDrawer === "email"}
//         onClose={closeDrawer}
//         relatedModule="ticket"
//         objectId={ticketId}
//         onEmailCreated={handleEmailCreated}
//       />

//       {/* ========================================================
//           CREATE TASK
//       ======================================================== */}

//       <CreateTaskDrawer
//         open={activeDrawer === "task"}
//         onClose={closeDrawer}
//         module="ticket"
//         moduleId={ticketId}
//         onTaskCreated={handleTaskCreated}
//       />

//       {/* ========================================================
//           SCHEDULE MEETING
//       ======================================================== */}

//       <ScheduleMeeting
//         open={activeDrawer === "meeting"}
//         onClose={closeDrawer}
//         relatedModule="ticket"
//         objectId={ticketId}
//       />
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";

import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
import Createnote from "../../Leads/components/Tabs/Note/Createnote";
import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog";
import ScheduleMeeting from "../../Leads/components/Tabs/Meetings/ScheduleMeeting";
import CreateTaskDrawer from "../../Leads/components/Tabs/Task/CreateTaskDrawer";

import api from "../../../services/api";

export default function TicketLeftPanel({
  children,
  onCallCreated,
  onNoteCreated,
  onEmailCreated,
  onTaskCreated,
}) {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [activeDrawer, setActiveDrawer] = useState(null);

  // =========================================================
  // FETCH TICKET DETAILS
  // =========================================================

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${ticketId}/`);

        console.log("TICKET DETAILS:", response.data);

        setTicket(response.data);

        // Convert backend status to display status
        const statusMap = {
          NEW: "New",
          OPEN: "Open",
          IN_PROGRESS: "In Progress",
          WAITING_ON_CONTACT: "Waiting on Contact",
          WAITING_ON_US: "Waiting on Us",
          CLOSED: "Closed",
        };

        const backendStatus = response.data.ticket_status;

        setStatus(statusMap[backendStatus] || "");
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

  // =========================================================
  // UPDATE TICKET STATUS
  // =========================================================

  const handleStatusChange = async (newStatus) => {
    try {
      // Frontend display value -> backend value
      const statusMap = {
        New: "NEW",
        Open: "OPEN",
        "In Progress": "IN_PROGRESS",
        "Waiting on Contact": "WAITING_ON_CONTACT",
        "Waiting on Us": "WAITING_ON_US",
        Closed: "CLOSED",
      };

      const backendStatus = statusMap[newStatus];

      if (!backendStatus) {
        console.error("Invalid ticket status:", newStatus);
        return;
      }

      console.log("Updating ticket status:", backendStatus);

      // Update backend
      const response = await api.patch(`/tickets/${ticketId}/`, {
        ticket_status: backendStatus,
      });

      console.log("STATUS UPDATE RESPONSE:", response.data);

      // Update local status
      setStatus(newStatus);

      // Update ticket state
      setTicket((prev) => ({
        ...prev,
        ticket_status: backendStatus,
      }));
    } catch (error) {
      console.error(
        "Ticket Status Update Error:",
        error.response?.data || error
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!ticket) {
    return null;
  }

  // =========================================================
  // TICKET DATA
  // =========================================================

  const ticketName = ticket.ticket_name || ticket.name || "-";

  const description = ticket.description || "-";

  const ownerName =
    ticket.ticket_owner ||
    ticket.owner_name ||
    ticket.owner?.name ||
    ticket.owner?.username ||
    "-";

  const priority = ticket.priority || "-";

  const createdDate =
    ticket.created_date ||
    ticket.created_at ||
    "-";

  // =========================================================
  // ABOUT TICKET DETAILS
  // =========================================================

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

  // =========================================================
  // CLOSE DRAWER
  // =========================================================

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  // =========================================================
  // CALL CREATED
  // =========================================================

  const handleCallCreated = async (createdCall) => {
    console.log("Ticket call created:", createdCall);

    setActiveDrawer(null);

    if (onCallCreated) {
      await onCallCreated(createdCall);
    }
  };

  // =========================================================
  // NOTE CREATED
  // =========================================================

  const handleNoteCreated = async (createdNote) => {
    console.log("Ticket note created:", createdNote);

    setActiveDrawer(null);

    if (onNoteCreated) {
      await onNoteCreated(createdNote);
    }
  };

  // =========================================================
  // EMAIL CREATED
  // =========================================================

  const handleEmailCreated = async (createdEmail) => {
    console.log("Ticket email created:", createdEmail);

    setActiveDrawer(null);

    if (onEmailCreated) {
      await onEmailCreated(createdEmail);
    }
  };

  // =========================================================
  // TASK CREATED
  // =========================================================

  const handleTaskCreated = async (createdTask) => {
    console.log("Ticket task created:", createdTask);

    setActiveDrawer(null);

    if (onTaskCreated) {
      await onTaskCreated(createdTask);
    }
  };

  // =========================================================
  // LEFT PANEL DATA
  // =========================================================

  const leftPanelData = {
    profile: {
      name: ticketName,

      status: status,

      setStatus: handleStatusChange,

      email: "",
    },

    showProfileEdit: false,

    showProfileImage: false,

    sectionTitle: "About this Ticket",

    leadDetails: ticketDetails,

    summaryTitle: "AI Ticket Summary",

    summaryText: `The ticket "${ticketName}" currently has a ${
      status || "-"
    } status with ${priority} priority.`,
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <>
      <CommonEntityHeader
        title="Tickets"
        leftPanelData={leftPanelData}
        onCallClick={() => setActiveDrawer("call")}
        onNoteClick={() => setActiveDrawer("note")}
        onEmailClick={() => setActiveDrawer("email")}
        onTaskClick={() => setActiveDrawer("task")}
        onMeetingClick={() => setActiveDrawer("meeting")}
      >
        {children}
      </CommonEntityHeader>

      {/* =====================================================
          CALL
      ===================================================== */}

      <CreateLogCall
        open={activeDrawer === "call"}
        onClose={closeDrawer}
        relatedModule="ticket"
        objectId={ticketId}
        connectedName={ticketName}
        onCallCreated={handleCallCreated}
      />

      {/* =====================================================
          NOTE
      ===================================================== */}

      <Createnote
        open={activeDrawer === "note"}
        onClose={closeDrawer}
        module="ticket"
        moduleId={ticketId}
        onSuccess={handleNoteCreated}
      />

      {/* =====================================================
          EMAIL
      ===================================================== */}

      <NewEmailDialog
        open={activeDrawer === "email"}
        onClose={closeDrawer}
        relatedModule="ticket"
        objectId={ticketId}
        onEmailCreated={handleEmailCreated}
      />

      {/* =====================================================
          TASK
      ===================================================== */}

      <CreateTaskDrawer
        open={activeDrawer === "task"}
        onClose={closeDrawer}
        module="ticket"
        moduleId={ticketId}
        onTaskCreated={handleTaskCreated}
      />

      {/* =====================================================
          MEETING
      ===================================================== */}

      <ScheduleMeeting
        open={activeDrawer === "meeting"}
        onClose={closeDrawer}
        relatedModule="ticket"
        objectId={ticketId}
      />
    </>
  );
}
