// import React, { useEffect, useState } from "react";
// import { useParams ,  Outlet} from "react-router-dom";

// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";

// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
// import Createnote from "../../Leads/components/Tabs/Note/Createnote";
// import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog";
// import ScheduleMeeting from "../../Leads/components/Tabs/Meetings/ScheduleMeeting";
// import CreateTaskDrawer from "../../Leads/components/Tabs/Task/CreateTaskDrawer";

// import api from "../../../services/api";

// export default function DealLeftPanel() {
//   const { dealId } = useParams();

//   const [deal, setDeal] = useState(null);
//   const [stage, setStage] = useState("");
//   const [activeDrawer, setActiveDrawer] = useState(null);

//   // ============================================================
//   // FETCH DEAL DETAILS
//   // ============================================================

//   useEffect(() => {
//     const fetchDeal = async () => {
//       try {
//         const response = await api.get(`/deals/${dealId}/`);

//         console.log("DEAL DETAILS:", response.data);

//         setDeal(response.data);

//         // Backend field = deal_stage
//         setStage(response.data.deal_stage || "");
//       } catch (error) {
//         console.error(
//           "Fetch Deal Details Error:",
//           error.response?.data || error
//         );
//       }
//     };

//     if (dealId) {
//       fetchDeal();
//     }
//   }, [dealId]);

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (!deal) {
//     return null;
//   }

//   // ============================================================
//   // OWNER NAME
//   // Backend returns:
//   // deal_owners: ["Sajij Ubi", "Riya Mehwish"]
//   // ============================================================

//   const ownerName =
//     Array.isArray(deal.deal_owners) && deal.deal_owners.length > 0
//       ? deal.deal_owners.join(", ")
//       : "-";

//   // ============================================================
//   // LEAD NAME
//   // ============================================================

//   const leadName =
//     deal.lead_name ||
//     deal.lead?.name ||
//     (
//       `${deal.lead?.first_name || ""} ${
//         deal.lead?.last_name || ""
//       }`
//     ).trim() ||
//     "-";

//   // ============================================================
//   // DEAL NAME
//   // ============================================================

//   const dealName =
//     deal.deal_name ||
//     deal.name ||
//     "-";

//   // ============================================================
//   // DEAL DETAILS
//   // ============================================================

//   const dealDetails = [
//     {
//       label: "Deal Owner",
//       value: ownerName,
//     },
//     {
//       label: "Priority",
//       value: deal.priority || "-",
//     },
//     {
//       label: "Created Date",
//       value: deal.created_date || "-",
//     },
//     {
//       label: "Lead Name",
//       value: leadName,
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
//     console.log("Deal call created:", createdCall);

//     setActiveDrawer(null);

//     if (onCallCreated) {
//       await onCallCreated(createdCall);
//     }
//   };

//   const handleNoteCreated = async (createdNote) => {
//     console.log("Deal note created:", createdNote);

//     setActiveDrawer(null);

//     if (onNoteCreated) {
//       await onNoteCreated(createdNote);
//     }
//   };

//   const handleEmailCreated = async (createdEmail) => {
//     console.log("Deal email created:", createdEmail);

//     setActiveDrawer(null);

//     if (onEmailCreated) {
//       await onEmailCreated(createdEmail);
//     }
//   };

//   const handleTaskCreated = async (createdTask) => {
//     console.log("Deal task created:", createdTask);

//     setActiveDrawer(null);

//     if (onTaskCreated) {
//       await onTaskCreated(createdTask);
//     }
//   };

//   // ============================================================
//   // DATA FOR COMMON ENTITY HEADER
//   // ============================================================

//   const leftPanelData = {
//     profile: {
//       name: dealName,
//       subTitle: `Amount : $${deal.amount || 0}`,
//       stage: stage,
//       setStage: setStage,
//       email: "",
//     },

//     sectionTitle: "About this Deal",

//     leadDetails: dealDetails,

//     summaryTitle: "AI Deal Summary",

//     summaryText: `The deal "${dealName}" is currently in the ${
//       stage || "-"
//     } stage with an expected value of $${deal.amount || 0}.`,
//   };

//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <>
//       <CommonEntityHeader
//         title="Deals"
//         leftPanelData={leftPanelData}

//         // CALL
//         onCallClick={() => setActiveDrawer("call")}

//         // NOTE
//         onNoteClick={() => setActiveDrawer("note")}

//         // EMAIL
//         onEmailClick={() => setActiveDrawer("email")}

//         // TASK
//         onTaskClick={() => setActiveDrawer("task")}

//         // MEETING
//         onMeetingClick={() => setActiveDrawer("meeting")}
//       >
//         <Outlet />
//       </CommonEntityHeader>

//       {/* ========================================================
//           CREATE / LOG CALL
//       ======================================================== */}

//       <CreateLogCall
//         open={activeDrawer === "call"}
//         onClose={closeDrawer}
//         relatedModule="deal"
//         objectId={dealId}
//         connectedName={leadName}
//         onCallCreated={handleCallCreated}
//       />

//       {/* ========================================================
//           CREATE NOTE
//       ======================================================== */}

//       <Createnote
//         open={activeDrawer === "note"}
//         onClose={closeDrawer}
//         module="deal"
//         moduleId={dealId}
//         onSuccess={handleNoteCreated}
//       />

//       {/* ========================================================
//           SEND EMAIL
//       ======================================================== */}

//       <NewEmailDialog
//         open={activeDrawer === "email"}
//         onClose={closeDrawer}
//         relatedModule="deal"
//         objectId={dealId}
//         onEmailCreated={handleEmailCreated}
//       />

//       {/* ========================================================
//           CREATE TASK
//       ======================================================== */}

//       <CreateTaskDrawer
//         open={activeDrawer === "task"}
//         onClose={closeDrawer}
//         module="deal"
//         moduleId={dealId}
//         onTaskCreated={handleTaskCreated}
//       />

//       {/* ========================================================
//           SCHEDULE MEETING
//       ======================================================== */}

//       <ScheduleMeeting
//         open={activeDrawer === "meeting"}
//         onClose={closeDrawer}
//         relatedModule="deal"
//         objectId={dealId}
//       />
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";

import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";

import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
import Createnote from "../../Leads/components/Tabs/Note/Createnote";
import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog";
import ScheduleMeeting from "../../Leads/components/Tabs/Meetings/ScheduleMeeting";
import CreateTaskDrawer from "../../Leads/components/Tabs/Task/CreateTaskDrawer";

import api from "../../../services/api";

export default function DealLeftPanel() {
  const { dealId } = useParams();

  const [deal, setDeal] = useState(null);
  const [stage, setStage] = useState("");
  const [activeDrawer, setActiveDrawer] = useState(null);

  // ============================================================
  // FETCH DEAL DETAILS
  // ============================================================

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await api.get(`/deals/${dealId}/`);

        console.log("DEAL DETAILS:", response.data);

        setDeal(response.data);

        // Backend field = deal_stage
        setStage(response.data.deal_stage || "");
      } catch (error) {
        console.error(
          "Fetch Deal Details Error:",
          error.response?.data || error
        );
      }
    };

    if (dealId) {
      fetchDeal();
    }
  }, [dealId]);

  // ============================================================
  // LOADING
  // ============================================================

  if (!deal) {
    return null;
  }

  // ============================================================
  // OWNER NAME
  // Backend returns:
  // deal_owners: ["Sajij Ubi", "Riya Mehwish"]
  // ============================================================

  const ownerName =
    Array.isArray(deal.deal_owners) && deal.deal_owners.length > 0
      ? deal.deal_owners.join(", ")
      : "-";

  // ============================================================
  // LEAD NAME
  // ============================================================

  const leadName =
    deal.lead_name ||
    deal.lead?.name ||
    (
      `${deal.lead?.first_name || ""} ${
        deal.lead?.last_name || ""
      }`
    ).trim() ||
    "-";

  // ============================================================
  // DEAL NAME
  // ============================================================

  const dealName =
    deal.deal_name ||
    deal.name ||
    "-";

  // ============================================================
  // DEAL DETAILS
  // ============================================================

  const dealDetails = [
    {
      label: "Deal Owner",
      value: ownerName,
    },
    {
      label: "Priority",
      value: deal.priority || "-",
    },
    {
      label: "Created Date",
      value: deal.created_date || "-",
    },
    {
      label: "Lead Name",
      value: leadName,
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
    console.log("Deal call created:", createdCall);

    setActiveDrawer(null);
  };

  const handleNoteCreated = async (createdNote) => {
    console.log("Deal note created:", createdNote);

    setActiveDrawer(null);
  };

  const handleEmailCreated = async (createdEmail) => {
    console.log("Deal email created:", createdEmail);

    setActiveDrawer(null);
  };

  const handleTaskCreated = async (createdTask) => {
    console.log("Deal task created:", createdTask);

    setActiveDrawer(null);
  };

  // ============================================================
  // DATA FOR COMMON ENTITY HEADER
  // ============================================================

  const leftPanelData = {
    profile: {
      name: dealName,

      subTitle: `Amount : $${deal.amount || 0}`,

      stage: stage,

      setStage: setStage,

      email: "",
    },

    sectionTitle: "About this Deal",

    leadDetails: dealDetails,

    summaryTitle: "AI Deal Summary",

    summaryText: `The deal "${dealName}" is currently in the ${
      stage || "-"
    } stage with an expected value of $${deal.amount || 0}.`,
  };

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      <CommonEntityHeader
        title="Deals"
        leftPanelData={leftPanelData}

        // ======================================================
        // AI SUMMARY
        // ======================================================

        module="deal"
        objectId={dealId}

        // ======================================================
        // CALL
        // ======================================================

        onCallClick={() =>
          setActiveDrawer("call")
        }

        // ======================================================
        // NOTE
        // ======================================================

        onNoteClick={() =>
          setActiveDrawer("note")
        }

        // ======================================================
        // EMAIL
        // ======================================================

        onEmailClick={() =>
          setActiveDrawer("email")
        }

        // ======================================================
        // TASK
        // ======================================================

        onTaskClick={() =>
          setActiveDrawer("task")
        }

        // ======================================================
        // MEETING
        // ======================================================

        onMeetingClick={() =>
          setActiveDrawer("meeting")
        }
      >
        <Outlet />
      </CommonEntityHeader>

      {/* ========================================================
          CREATE / LOG CALL
      ======================================================== */}

      <CreateLogCall
        open={activeDrawer === "call"}
        onClose={closeDrawer}
        relatedModule="deal"
        objectId={dealId}
        connectedName={leadName}
        onCallCreated={handleCallCreated}
      />

      {/* ========================================================
          CREATE NOTE
      ======================================================== */}

      <Createnote
        open={activeDrawer === "note"}
        onClose={closeDrawer}
        module="deal"
        moduleId={dealId}
        onSuccess={handleNoteCreated}
      />

      {/* ========================================================
          SEND EMAIL
      ======================================================== */}

      <NewEmailDialog
        open={activeDrawer === "email"}
        onClose={closeDrawer}
        relatedModule="deal"
        objectId={dealId}
        onEmailCreated={handleEmailCreated}
      />

      {/* ========================================================
          CREATE TASK
      ======================================================== */}

      <CreateTaskDrawer
        open={activeDrawer === "task"}
        onClose={closeDrawer}
        module="deal"
        moduleId={dealId}
        onTaskCreated={handleTaskCreated}
      />

      {/* ========================================================
          SCHEDULE MEETING
      ======================================================== */}

      <ScheduleMeeting
        open={activeDrawer === "meeting"}
        onClose={closeDrawer}
        relatedModule="deal"
        objectId={dealId}
      />
    </>
  );
}

