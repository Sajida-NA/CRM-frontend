

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
// import api from "../../../services/api";

// export default function TicketLeftPanel({ children }) {
//   const { ticketId } = useParams();

//   const [ticket, setTicket] = useState(null);
//   const [status, setStatus] = useState("");

//   const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

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
//               .toLowerCase()
//               .replace(/\b\w/g, (char) => char.toUpperCase())
//             : ""
//         );
//       } catch (error) {
//         console.error(
//           "Fetch Ticket Details Error:",
//           error.response?.data || error
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

//   const ticketName =
//     ticket.ticket_name ||
//     ticket.name ||
//     "-";

//   const description =
//     ticket.description ||
//     "-";

//   const ownerName =
//     ticket.ticket_owner ||
//     ticket.owner_name ||
//     ticket.owner?.name ||
//     ticket.owner?.username ||
//     "-";

//   const priority =
//     ticket.priority ||
//     "-";

//   const createdDate =
//     ticket.created_date ||
//     ticket.created_at ||
//     "-";

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

//     summaryText:
//       `The ticket "${ticketName}" currently has a ${status || "-"} status with ${priority} priority.`,
//   };

//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <>
//       <CommonEntityHeader
//         title="Tickets"
//         leftPanelData={leftPanelData}
//         onCallClick={() => setOpenCreateLogCall(true)}
//       >
//         {children}
//       </CommonEntityHeader>

//       {/* ========================================================
//           CREATE / LOG CALL
//       ======================================================== */}

//       {/* <CreateLogCall
//         open={openCreateLogCall}
//         onClose={() => setOpenCreateLogCall(false)}
//         relatedModule="ticket"
//         objectId={ticketId}
//         connectedName={ticketName}
//       /> */}

//       <CreateLogCall
//   open={openCreateLogCall}
//   onClose={() => setOpenCreateLogCall(false)}
//   relatedModule="ticket"
//   objectId={ticketId}
//   connectedName={ownerName}
// />
//     </>
//   );
// }


import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import CommonEntityHeader from "../../../Components/common/CommonEntityHeader"; 
import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall"; 
import Createnote from "../../Leads/components/Tabs/Note/Createnote"; 
import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog"; 
import ScheduleMeeting from 
"../../Leads/components/Tabs/Meetings/ScheduleMeeting"; 
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
// CLOSE DRAWER 
// ============================================================ 
const closeDrawer = () => { 
setActiveDrawer(null); 
}; 
// ============================================================ 
// ACTIVITY CREATED CALLBACKS 
// ============================================================ 
const handleCallCreated = async (createdCall) => { 
console.log("Ticket call created:", createdCall); 
setActiveDrawer(null); 
if (onCallCreated) { 
await onCallCreated(createdCall); 
} 
}; 
const handleNoteCreated = async (createdNote) => { 
console.log("Ticket note created:", createdNote); 
setActiveDrawer(null); 
if (onNoteCreated) { 
      await onNoteCreated(createdNote); 
    } 
  }; 
 
  const handleEmailCreated = async (createdEmail) => { 
    console.log("Ticket email created:", createdEmail); 
 
    setActiveDrawer(null); 
 
    if (onEmailCreated) { 
      await onEmailCreated(createdEmail); 
    } 
  }; 
 
  const handleTaskCreated = async (createdTask) => { 
    console.log("Ticket task created:", createdTask); 
 
    setActiveDrawer(null); 
 
    if (onTaskCreated) { 
      await onTaskCreated(createdTask); 
    } 
  }; 
 
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
summaryText: `The ticket "${ticketName}" currently has a ${ 
status || "-" 
} status with ${priority} priority.`, 
}; 
// ============================================================ 
// RETURN 
// ============================================================ 
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
{/* ======================================================== 
CREATE / LOG CALL 
======================================================== */} 
<CreateLogCall 
open={activeDrawer === "call"} 
onClose={closeDrawer} 
relatedModule="ticket" 
objectId={ticketId} 
connectedName={ticketName} 
onCallCreated={handleCallCreated} 
/> 
{/* ======================================================== 
CREATE NOTE 
======================================================== */} 
<Createnote 
open={activeDrawer === "note"} 
onClose={closeDrawer} 
module="ticket" 
moduleId={ticketId} 
onSuccess={handleNoteCreated} 
/> 
{/* ======================================================== 
SEND EMAIL 
======================================================== */} 
<NewEmailDialog 
open={activeDrawer === "email"} 
onClose={closeDrawer} 
relatedModule="ticket" 
objectId={ticketId} 
onEmailCreated={handleEmailCreated} 
/> 
{/* ======================================================== 
CREATE TASK 
======================================================== */} 
<CreateTaskDrawer 
open={activeDrawer === "task"} 
onClose={closeDrawer} 
module="ticket" 
moduleId={ticketId} 
onTaskCreated={handleTaskCreated} 
/> 
{/* ======================================================== 
SCHEDULE MEETING 
======================================================== */} 
<ScheduleMeeting 
open={activeDrawer === "meeting"} 
onClose={closeDrawer} 
relatedModule="ticket" 
objectId={ticketId} 
/> 
</> 
); 
}