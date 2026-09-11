


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import {
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";

// import DealLeftPanel from "../../DealLeftPanel";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CommonButton from "../../../../../Components/common/CommonButton";

// import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
// import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";

// import { getDealTabs } from "../DealTabs";
// import api from "../../../../../services/api";


// export default function DealCalls() {

//   const { dealId } = useParams();

//   const [activeTab, setActiveTab] = useState("Calls");

//   const [deal, setDeal] = useState(null);

//   const [calls, setCalls] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [openCreateCall, setOpenCreateCall] = useState(false);


//   // ============================================================
//   // FETCH DEAL
//   // ============================================================

//   const fetchDeal = async () => {

//     if (!dealId) return;

//     try {

//       const response = await api.get(
//         `/deals/${dealId}/`
//       );
//       // api.get(`/activities/activity/deal/${dealId}/call/`)

//       console.log(
//         "Deal response:",
//         response.data
//       );

//       setDeal(response.data);

//     } catch (error) {

//       console.error(
//         "Error fetching deal:",
//         error.response?.data || error
//       );

//       setDeal(null);
//     }
//   };


//   // ============================================================
//   // FETCH CALLS
//   // ============================================================

//   const fetchCalls = async () => {

//     if (!dealId) return;

//     try {

//       setLoading(true);

//       const response = await api.get(
//         "/activities/call/"
//       );

//       console.log(
//         "Calls API response:",
//         response.data
//       );

//       const allCalls = Array.isArray(response.data)
//         ? response.data
//         : response.data?.results || [];

 

//       // ========================================================
//       // FILTER CALLS FOR CURRENT DEAL
//       // ========================================================

//       const dealCalls = allCalls.filter((call) => {

//         const module =
//           call.module?.toLowerCase();

//         const callDealId =
//           call.deal?.id ??
//           call.object_id ??
//           call.module_id;

//         return (
//           module === "deal" &&
//           Number(callDealId) === Number(dealId)
//         );
//       });


//       console.log(
//         "Filtered Deal Calls:",
//         dealCalls
//       );

//       setCalls(dealCalls);

//     } catch (error) {

//       console.error(
//         "Error fetching calls:",
//         error.response?.data || error
//       );

//       setCalls([]);

//     } finally {

//       setLoading(false);
//     }
//   };


//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================

//   useEffect(() => {

//     if (!dealId) return;

//     fetchDeal();

//     fetchCalls();

//   }, [dealId]);


//   // ============================================================
//   // LEAD NAME
//   // ============================================================

//   const leadName =
//     deal?.lead_name ||
//     deal?.lead?.name ||
//     (
//       `${deal?.lead?.first_name || ""} ${
//         deal?.lead?.last_name || ""
//       }`
//     ).trim() ||
//     "Unknown";


//   // ============================================================
//   // DEAL NAME
//   // ============================================================

//   const dealName =
//     deal?.deal_name ||
//     deal?.name ||
//     `Deal #${dealId}`;


//   // ============================================================
//   // LEAD PHONE NUMBER
//   //
//   // Backend:
//   // Lead.phone_number
//   //
//   // Deal serializer returns:
//   // lead_phone
//   // ============================================================

//   const leadPhone =
//     deal?.lead_phone ||
//     deal?.lead?.phone_number ||
//     "";


//   // ============================================================
//   // MAKE PHONE CALL
//   // ============================================================

//   const handleMakePhoneCall = () => {

//     if (!leadPhone) {

//       alert(
//         "Lead phone number is not available."
//       );

//       return;
//     }


//     // Convert to string
//     const phoneNumber =
//       String(leadPhone).trim();


//     // Remove spaces from phone number
//     const cleanPhoneNumber =
//       phoneNumber.replace(/\s+/g, "");


//     console.log(
//       "Calling Lead:",
//       leadName
//     );

//     console.log(
//       "Phone Number:",
//       cleanPhoneNumber
//     );


//     // ========================================================
//     // OPEN PHONE DIALER
//     // ========================================================

//     window.location.href =
//       `tel:${cleanPhoneNumber}`;
//   };


//   // ============================================================
//   // CALL CREATED
//   // ============================================================

//   const handleCallCreated = async () => {

//     setOpenCreateCall(false);

//     await fetchCalls();
//   };


//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (

//     <DealLeftPanel>

//       <Box
//         sx={{
//           p: 3,
//           mx: -2,
//         }}
//       >

//         {/* ====================================================
//             ACTIVITY TABS
//         ==================================================== */}

//         <Box>

//           <CommonActivityTabs
//             tabs={getDealTabs(dealId)}
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//           />

//         </Box>


//         {/* ====================================================
//             CALL HEADER
//         ==================================================== */}

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 3,
//             mb: 1,
//           }}
//         >

//           <Typography variant="h6">
//             Calls
//           </Typography>


//           {/* ==================================================
//               MAKE PHONE CALL BUTTON
//           ================================================== */}

//           <CommonButton
//             variant="contained"
//             onClick={handleMakePhoneCall}
//           >
//             Make a Phone Call
//           </CommonButton>

//         </Box>


//         {/* ====================================================
//             MONTH
//         ==================================================== */}

//         <Typography variant="h6">
//           June 2025
//         </Typography>


//         {/* ====================================================
//             LOADING
//         ==================================================== */}

//         {loading ? (

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               py: 4,
//             }}
//           >

//             <CircularProgress
//               size={28}
//             />

//           </Box>

//         ) : calls.length === 0 ? (

//           /* ==================================================
//              EMPTY STATE
//           ================================================== */

//           <Typography
//             color="text.secondary"
//             sx={{
//               mt: 2,
//             }}
//           >
//             No calls found for this deal.
//           </Typography>

//         ) : (

//           /* ==================================================
//              CALL LIST
//           ================================================== */

//           calls.map((call) => (

//             <CallCard
//               key={call.id}
//               call={{

//                 ...call,

//                 // Lead name
//                 name: leadName,

//                 // Call description
//                 description:
//                   call.note || "",

//                 // Call date
//                 date:
//                   call.date || "",

//                 // Call time
//                 time:
//                   call.time || "",

//                 // Call outcome
//                 call_outcome:
//                   call.call_outcome ||
//                   call.outcome ||
//                   "",

//                 // Call duration
//                 duration:
//                   call.duration !== null &&
//                   call.duration !== undefined
//                     ? Number(call.duration)
//                     : null,

//               }}
//             />

//           ))
//         )}

//       </Box>


//       {/* ======================================================
//           CREATE / LOG CALL DRAWER
//       ====================================================== */}

//       <CreateLogCall

//         open={openCreateCall}

//         onClose={() =>
//           setOpenCreateCall(false)
//         }

//         relatedModule="deal"

//         objectId={dealId}

//         connectedName={leadName}

//         onCallCreated={
//           handleCallCreated
//         }

//       />

//     </DealLeftPanel>
//   );
// }




// import React, { useEffect, useState } from "react"; 
// import { useParams } from "react-router-dom"; 
// import { 
// Box, 
// Typography, 
// CircularProgress, 
// } from "@mui/material"; 
// import DealLeftPanel from "../../DealLeftPanel"; 
// import CommonActivityTabs from 
// "../../../../../Components/common/CommonActivityTab"; 
// import CommonButton from "../../../../../Components/common/CommonButton"; 
// import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard"; 
// import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall"; 
// import { getDealTabs } from "../DealTabs"; 
// import api from "../../../../../services/api"; 
// export default function DealCalls() { 
// const { dealId } = useParams(); 
// const [activeTab, setActiveTab] = useState("Calls"); 
// const [deal, setDeal] = useState(null); 
// const [calls, setCalls] = useState([]); 
// const [loading, setLoading] = useState(true); 
// const [openCreateCall, setOpenCreateCall] = useState(false); 
// // ============================================================ 
// // FETCH DEAL 
// // ============================================================ 
// const fetchDeal = async () => { 
// if (!dealId) { 
// return; 
// } 
// try { 
// const response = await api.get( 
// `/deals/${dealId}/` 
// ); 
// console.log( 
// "DEAL RESPONSE:", 
// response.data 
// ); 
// setDeal(response.data); 
// } catch (error) { 
// console.error( 
// "ERROR FETCHING DEAL:", 
// error.response?.data || error 
// ); 
// setDeal(null); 
// } 
// }; 
// // ============================================================ 
// // FETCH DEAL CALLS 
// // ============================================================ 
// const fetchCalls = async () => { 
// if (!dealId) { 
// setCalls([]); 
// setLoading(false); 
// return; 
// } 
// try { 
// setLoading(true); 
// const response = await api.get( 
// `/activities/activity/deal/${dealId}/call/` 
// ); 
// console.log( 
// "DEAL CALLS API RESPONSE:", 
// response.data 
// ); 
// const dealCalls = 
// response.data?.activities || []; 
// console.log( 
// "DEAL CALL DATA:", 
// dealCalls 
// ); 
// setCalls(dealCalls); 
// } catch (error) { 
// console.error( 
// "ERROR FETCHING DEAL CALLS:", 
// error.response?.data || error 
// ); 
// setCalls([]); 
// } finally { 
// setLoading(false); 
// } 
// }; 
// // ============================================================ 
// // INITIAL LOAD 
// // ============================================================ 
// useEffect(() => { 
// if (!dealId) { 
// return; 
// } 
// fetchDeal(); 
// fetchCalls(); 
// }, [dealId]); 
// // ============================================================ 
// // LEAD NAME 
// // ============================================================ 
// const leadName = 
// deal?.lead_name || 
// deal?.lead?.name || 
// ( 
// `${deal?.lead?.first_name || ""} ${ 
// deal?.lead?.last_name || "" 
// }` 
// ).trim() || 
// "Unknown"; 
// // ============================================================ 
// // DEAL NAME 
// // ============================================================ 
// const dealName = 
// deal?.deal_name || 
// deal?.name || 
// `Deal #${dealId}`; 
// // ============================================================ 
// // LEAD PHONE NUMBER 
// // ============================================================ 
// const leadPhone = 
// deal?.lead_phone || 
// deal?.lead?.phone_number || 
// ""; 
// // ============================================================ 
// // MAKE PHONE CALL 
// // ============================================================ 
// const handleMakePhoneCall = () => { 
// if (!leadPhone) { 
// alert( 
// "Lead phone number is not available." 
// ); 
// return; 
// } 
// const phoneNumber = 
// String(leadPhone).trim(); 
// const cleanPhoneNumber = 
// phoneNumber.replace(/\s+/g, ""); 
// console.log( 
// "Calling Lead:", 
// leadName 
// ); 
// console.log( 
// "Phone Number:", 
// cleanPhoneNumber 
// ); 
// window.location.href = 
// `tel:${cleanPhoneNumber}`; 
// }; 
// // ============================================================ 
// // OPEN LOG CALL 
// // ============================================================ 
// const handleOpenCreateCall = () => { 
// setOpenCreateCall(true); 
// }; 
// // ============================================================ 
// // CALL CREATED 
// // ============================================================ 
// const handleCallCreated = async () => { 
// setOpenCreateCall(false); 
// await fetchCalls(); 
// }; 
// // ============================================================ 
// // RENDER 
// // ============================================================ 
// return ( 
// <DealLeftPanel> 
// <Box 
// sx={{ 
// p: 3, 
// mx: -2, 
// }} 
// > 
// {/* ==================================================== 
// ACTIVITY TABS 
// ==================================================== */} 
// <Box> 
// <CommonActivityTabs 
// tabs={getDealTabs(dealId)} 
// activeTab={activeTab} 
// onTabChange={setActiveTab} 
// /> 
// </Box> 
// {/* ==================================================== 
// CALL HEADER 
// ==================================================== */} 
// <Box 
// sx={{ 
// display: "flex", 
// justifyContent: "space-between", 
// alignItems: "center", 
// mt: 3, 
// mb: 1, 
// }} 
// > 
// <Typography variant="h6"> 
// Calls 
// </Typography> 
// <CommonButton 
// variant="contained" 
// onClick={handleOpenCreateCall} 
// > 
// Make a Phone Call 
// </CommonButton> 
// </Box> 
// {/* ==================================================== 
// MONTH 
// ==================================================== */} 
// <Typography variant="h6"> 
// June 2025 
// </Typography> 
// {/* ==================================================== 
// LOADING 
// ==================================================== */} 
// {loading ? ( 
// <Box 
// sx={{ 
// display: "flex", 
// justifyContent: "center", 
// alignItems: "center", 
// py: 4, 
// }} 
// > 
// <CircularProgress size={28} /> 
// </Box> 
// ) : calls.length === 0 ? ( 
// <Typography 
// color="text.secondary" 
// sx={{ 
// mt: 2, 
// }} 
// > 
// No calls found for this deal. 
// </Typography> 
// ) : ( 
// calls.map((call) => ( 
// <CallCard 
// key={call.id} 
// call={call} 
// /> 
// )) 
// )} 
// </Box> 
// {/* ====================================================== 
// CREATE / LOG CALL DRAWER 
// ====================================================== */} 
// <CreateLogCall 
// open={openCreateCall} 
// onClose={() => 
// setOpenCreateCall(false) 
// } 
// relatedModule="deal" 
// objectId={dealId} 
// connectedName={dealName} 
// onCallCreated={handleCallCreated} 
// /> 
// </DealLeftPanel> 
// ); 
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

import { getDealTabs } from "../DealTabs";
import api from "../../../../../services/api";

export default function DealCalls() {
  const { dealId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");
  const [deal, setDeal] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH DEAL
  // ============================================================

  const fetchDeal = async () => {
    if (!dealId) {
      return;
    }

    try {
      const response = await api.get(`/deals/${dealId}/`);

      console.log("DEAL RESPONSE:", response.data);

      setDeal(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING DEAL:",
        error.response?.data || error
      );

      setDeal(null);
    }
  };

  // ============================================================
  // FETCH DEAL CALLS
  // ============================================================

  const fetchCalls = async () => {
    if (!dealId) {
      setCalls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/deal/${dealId}/call/`
      );

      console.log(
        "DEAL CALLS API RESPONSE:",
        response.data
      );

      const dealCalls = Array.isArray(response.data)
        ? response.data
        : response.data?.activities || [];

      console.log(
        "DEAL CALL DATA:",
        dealCalls
      );

      setCalls(dealCalls);
    } catch (error) {
      console.error(
        "ERROR FETCHING DEAL CALLS:",
        error.response?.data || error
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
    if (!dealId) {
      return;
    }

    fetchDeal();
    fetchCalls();
  }, [dealId]);

  // ============================================================
  // LEAD NAME
  // ============================================================

  const leadName =
    deal?.lead_name ||
    deal?.lead?.name ||
    `${deal?.lead?.first_name || ""} ${
      deal?.lead?.last_name || ""
    }`.trim() ||
    "Unknown";

  // ============================================================
  // LEAD PHONE NUMBER
  // ============================================================

  const leadPhone =
    deal?.lead_phone ||
    deal?.lead?.phone_number ||
    deal?.lead?.phone ||
    "";

  // ============================================================
  // MAKE PHONE CALL
  // ============================================================

  const handleMakePhoneCall = () => {
    if (!leadPhone) {
      alert("Lead phone number is not available.");
      return;
    }

    const phoneNumber = String(leadPhone).trim();

    const cleanPhoneNumber = phoneNumber.replace(
      /[^\d+]/g,
      ""
    );

    console.log("Calling Lead:", leadName);
    console.log("Phone Number:", cleanPhoneNumber);

    // IMPORTANT:
    // This only makes the actual phone call.
    // It does NOT open CreateLogCall drawer.
    window.location.href = `tel:${cleanPhoneNumber}`;
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <DealLeftPanel
      onCallCreated={fetchCalls}
    >
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* ====================================================
            ACTIVITY TABS
        ==================================================== */}

        <Box>
          <CommonActivityTabs
            tabs={getDealTabs(dealId)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Box>

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
          <Typography variant="h6">
            Calls
          </Typography>

          <CommonButton
            variant="contained"
            onClick={handleMakePhoneCall}
          >
            Make a Phone Call
          </CommonButton>
        </Box>

        {/* ====================================================
            MONTH
        ==================================================== */}

        <Typography variant="h6">
          June 2025
        </Typography>

        {/* ====================================================
            LOADING
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
            No calls found for this deal.
          </Typography>
        ) : (
          calls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
            />
          ))
        )}
      </Box>
    </DealLeftPanel>
  );
}