// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import DealLeftPanel from "../../DealLeftPanel";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CommonButton from "../../../../../Components/common/CommonButton";
// import calls from "../../../../Leads/components/Tabs/Calls/callData";
// import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
// import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";
// import { dealTabs } from "../DealTabs";

// export default function DealCalls() {
//   const [activeTab, setActiveTab] = useState();
//   // const [activeTab, setActiveTab] = useState("Calls");
//   const [openCreateLogCall, setOpenCreateLogCall] = useState(false);
//   return (
//     <div>
//       <DealLeftPanel>
//       <Box
//         sx={{
//           p: 3,
//           mx:-2
//         }}
//       >
//         {/* ACTIVITY TABS */}

//         <Box>
//           {/* <CommonActivityTabs activeTab={activeTab} onTabChange={() => {}} /> */}

//             <CommonActivityTabs
//             tabs={dealTabs}
//             activeTab="Calls"
//           />

//         </Box>

//         {/* Header */}

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 3,
//             mb: 1,
//           }}
//         >
//           <Typography variant="h6">Calls</Typography>

//           <CommonButton
//             variant="contained"
//             // onClick={() => setOpenCreateLogCall(true)}
//           >
//             Make a Phone Call
//           </CommonButton>
//         </Box>

//         <Typography variant="h6">June 2025</Typography>

//         {calls.map((call) => (
//           <CallCard key={call.id} call={call} />
//         ))}
//       </Box>
//       </DealLeftPanel>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import DealLeftPanel from "../../DealLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";

import { getDealTabs } from "../DealTabs";
import api from "../../../../../services/api";

export default function DealCalls() {
  const { dealId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");

  const [deal, setDeal] = useState(null);
  const [calls, setCalls] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openCreateCall, setOpenCreateCall] = useState(false);

  // ============================================================
  // GET DEAL DETAILS
  // ============================================================

  const fetchDeal = async () => {
    try {
      const response = await api.get(`/deals/${dealId}/`);

      console.log("DEAL DETAILS:", response.data);

      setDeal(response.data);
    } catch (error) {
      console.error(
        "Error fetching deal:",
        error.response?.data || error
      );
    }
  };

  // ============================================================
  // GET CALLS
  // ============================================================

  const fetchCalls = async () => {
    try {
      setLoading(true);

      const response = await api.get("/activities/call/");

      console.log("ALL CALL API RESPONSE:", response.data);

      const allCalls = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      console.log("ALL CALLS:", allCalls);

      // ========================================================
      // FILTER CALLS FOR CURRENT DEAL
      // ========================================================

      const dealCalls = allCalls.filter((call) => {
        const moduleName =
          call.module?.toLowerCase() ||
          "";

        const connectedDealId =
          call.deal?.id ??
          call.object_id ??
          call.module_id;

        return (
          moduleName === "deal" &&
          Number(connectedDealId) === Number(dealId)
        );
      });

      console.log("DEAL CALLS:", dealCalls);

      // ========================================================
      // NORMALIZE CALL DATA
      // ========================================================

      const formattedCalls = dealCalls.map((call) => ({
        ...call,

        // Lead / person name
        name: contactNameFromDeal(call),

        // Note
        description: call.note || "",

        // Date
        date: call.date || "",

        // Time
        time: call.time || "",

        // Outcome
        call_outcome: call.call_outcome || "",

        // Duration
        duration:
          call.duration !== null &&
          call.duration !== undefined &&
          call.duration !== ""
            ? Number(call.duration)
            : "",
      }));

      console.log(
        "FORMATTED DEAL CALLS:",
        formattedCalls
      );

      setCalls(formattedCalls);
    } catch (error) {
      console.error(
        "Error fetching calls:",
        error.response?.data || error
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // GET CONTACT NAME FROM DEAL
  // ============================================================

  const contactNameFromDeal = (call) => {
    // The Deal API provides lead_name.
    // This function mainly exists as a safe fallback.

    if (deal?.lead_name) {
      return deal.lead_name;
    }

    if (call?.lead?.name) {
      return call.lead.name;
    }

    if (call?.lead_name) {
      return call.lead_name;
    }

    return "Unknown";
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    if (!dealId) {
      return;
    }

    fetchDeal();
  }, [dealId]);

  // ============================================================
  // FETCH CALLS AFTER DEAL IS LOADED
  // ============================================================

  useEffect(() => {
    if (!dealId) {
      return;
    }

    fetchCalls();
  }, [dealId, deal]);

  // ============================================================
  // ASSOCIATED LEAD NAME
  // ============================================================

  const contactName =
    deal?.lead_name ||
    (
      `${deal?.lead?.first_name || ""} ${
        deal?.lead?.last_name || ""
      }`
    ).trim() ||
    "Unknown";

  // ============================================================
  // CALL CREATED
  // ============================================================

  const handleCallCreated = () => {
    setOpenCreateCall(false);

    fetchCalls();
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <DealLeftPanel>
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* ======================================================
            ACTIVITY TABS
        ====================================================== */}

        <Box>
          <CommonActivityTabs
            tabs={getDealTabs(dealId)}
            activeTab="Calls"
            onTabChange={setActiveTab}
          />
        </Box>

        {/* ======================================================
            HEADER
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
            onClick={() => setOpenCreateCall(true)}
          >
            Make a Phone Call
          </CommonButton>
        </Box>

        {/* ======================================================
            MONTH
        ====================================================== */}

        <Typography variant="h6">
          June 2025
        </Typography>

        {/* ======================================================
            LOADING
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
            No calls found for this deal.
          </Typography>
        ) : (
          /* ====================================================
             CALL LIST
          ==================================================== */

          calls.map((call) => (
            <CallCard
              key={call.id}
              call={{
                ...call,

                // Lead name
                name: contactName,

                // Note
                description: call.note || "",

                // Date
                date: call.date || "",

                // Time
                time: call.time || "",

                // Outcome
                call_outcome:
                  call.call_outcome || "",

                // Duration
                duration:
                  call.duration !== null &&
                  call.duration !== undefined &&
                  call.duration !== ""
                    ? Number(call.duration)
                    : "",
              }}
            />
          ))
        )}
      </Box>

      {/* ========================================================
          CREATE / LOG CALL DRAWER
      ======================================================== */}

      <CreateLogCall
        open={openCreateCall}
        onClose={() => setOpenCreateCall(false)}
        relatedModule="deal"
        objectId={dealId}
        connectedName={contactName}
        onCallCreated={handleCallCreated}
      />
    </DealLeftPanel>
  );
}

