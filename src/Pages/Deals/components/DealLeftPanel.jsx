// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
// import api from "../../../services/api";

// export default function DealLeftPanel({ children }) {
//   const { dealId } = useParams();

//   const [deal, setDeal] = useState(null);
//   const [stage, setStage] = useState("");
//   const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

//   // Fetch deal details
//   useEffect(() => {
//     const fetchDeal = async () => {
//       try {
//         const response = await api.get(`/deals/${dealId}/`);

//         console.log("DEAL DETAILS:", response.data);

//         setDeal(response.data);

//         // Set stage from backend
//         setStage(response.data.stage || "");
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

//   // Loading
//   if (!deal) {
//     return null;
//   }

//   // Owner name
//   const ownerName =
//     deal.owner_name ||
//     deal.owner?.name ||
//     deal.owner?.username ||
//     deal.owner ||
//     "-";

//   // Lead name
//   const leadName =
//     deal.lead_name ||
//     deal.lead?.name ||
//     deal.lead?.first_name ||
//     deal.lead ||
//     "-";

//   // Deal details
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
//       value: deal.created_at || deal.created_date || "-",
//     },
//     {
//       label: "Lead Name",
//       value: leadName,
//     },
//   ];

//   // Data for CommonEntityHeader
//   const leftPanelData = {
//     profile: {
//       name: deal.deal_name || deal.name || "-",

//       subTitle: `Amount : $${deal.amount || 0}`,

//       stage: stage,

//       setStage: setStage,

//       email: "",
//     },

//     sectionTitle: "About this Deal",

//     leadDetails: dealDetails,

//     summaryTitle: "AI Deal Summary",

//     summaryText:
//       `The deal "${deal.deal_name || deal.name || "-"}" is currently in the ${
//         stage || "-"
//       } stage with an expected value of $${deal.amount || 0}.`,
//   };

//   return (
//     <>
//       <CommonEntityHeader
//         title="Deals"
//         leftPanelData={leftPanelData}
//         onCallClick={() => setOpenCreateLogCall(true)}
//       >
//         {children}
//       </CommonEntityHeader>

//       <CreateLogCall
//         open={openCreateLogCall}
//         onClose={() => setOpenCreateLogCall(false)}
//       />
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
import api from "../../../services/api";

export default function DealLeftPanel({ children }) {
  const { dealId } = useParams();

  const [deal, setDeal] = useState(null);
  const [stage, setStage] = useState("");
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

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
  // ============================================================

  const ownerName =
    deal.deal_owner ||
    deal.owner_name ||
    deal.owner?.name ||
    deal.owner?.username ||
    "-";

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
  // DATA FOR COMMON ENTITY HEADER
  // ============================================================

  const leftPanelData = {
    profile: {
      name: deal.deal_name || deal.name || "-",

      subTitle: `Amount : $${deal.amount || 0}`,

      stage: stage,

      setStage: setStage,

      email: "",
    },

    sectionTitle: "About this Deal",

    leadDetails: dealDetails,

    summaryTitle: "AI Deal Summary",

    summaryText:
      `The deal "${deal.deal_name || deal.name || "-"}" is currently in the ${
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
        onCallClick={() => setOpenCreateLogCall(true)}
      >
        {children}
      </CommonEntityHeader>

      <CreateLogCall
        open={openCreateLogCall}
        onClose={() => setOpenCreateLogCall(false)}
      />
    </>
  );
}

