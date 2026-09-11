

// import React, { useEffect, useState } from "react";

// import {
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";

// import { useParams } from "react-router-dom";

// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CommonButton from "../../../../../Components/common/CommonButton";

// import CallCard from "./CallCard";

// import LeadsLeftPanel from "../../LeadsLeftPanel";
// import { getLeadTabs } from "../LeadTabs";

// import { getLeadById } from "../../../../../services/leads";
// import api from "../../../../../services/api";


// export default function Leadcalls() {

//   const { leadId } = useParams();

//   const [calls, setCalls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [lead, setLead] = useState(null);


//   // =====================================================
//   // FETCH LEAD
//   // =====================================================

//   const fetchLead = async () => {

//     try {

//       const response = await getLeadById(leadId);

//       console.log(
//         "LEAD DETAILS:",
//         response.data
//       );

//       setLead(response.data);

//     } catch (error) {

//       console.error(
//         "ERROR FETCHING LEAD:",
//         error.response?.data || error.message
//       );

//       setLead(null);
//     }
//   };


//   // =====================================================
//   // FETCH CALLS
//   // =====================================================

//   const fetchCalls = async () => {

//     if (!leadId) {

//       setCalls([]);
//       setLoading(false);

//       return;
//     }

//     try {

//       setLoading(true);

//       const response = await api.get(
//         `/activities/activity/lead/${leadId}/call/`
//       );

//       console.log(
//         "LEAD CALLS API RESPONSE:",
//         response.data
//       );


//       const callData = Array.isArray(response.data)
//         ? response.data
//         : response.data?.activities || [];


//       console.log(
//         "CALL DATA FOR CARDS:",
//         callData
//       );


//       setCalls(callData);

//     } catch (error) {

//       console.error(
//         "ERROR FETCHING LEAD CALLS:",
//         error.response?.data || error.message
//       );

//       setCalls([]);

//     } finally {

//       setLoading(false);

//     }
//   };


//   // =====================================================
//   // LOAD DATA
//   // =====================================================

//   useEffect(() => {

//     if (leadId) {

//       fetchLead();
//       fetchCalls();

//     }

//   }, [leadId]);


//   // =====================================================
//   // MAKE PHONE CALL
//   // =====================================================

//   const handleMakePhoneCall = () => {

//     const phoneNumber =
//       lead?.phone_number ||
//       lead?.phone ||
//       "";

//     if (!phoneNumber) {

//       alert("Phone number is not available for this lead.");

//       return;
//     }


//     // Remove spaces, brackets, etc.
//     const cleanPhoneNumber = String(phoneNumber)
//       .replace(/[^\d+]/g, "");


//     window.location.href =
//       `tel:${cleanPhoneNumber}`;
//   };


//   // =====================================================
//   // UI
//   // =====================================================

//   return (

//     <div>

//       {/* <LeadsLeftPanel leadId={leadId}> */}

//         <LeadsLeftPanel
//   leadId={leadId}
//   onCallCreated={fetchCalls}
// >

//         <Box
//           sx={{
//             p: 3,
//             mx: -2,
//           }}
//         >

//           {/* ============================================
//               TABS
//           ============================================ */}

//           <CommonActivityTabs
//             tabs={getLeadTabs(leadId)}
//             activeTab="Calls"
//           />


//           {/* ============================================
//               HEADER
//           ============================================ */}

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mt: 3,
//               mb: 2,
//             }}
//           >

//             <Typography variant="h6">
//               Calls
//             </Typography>


//             <CommonButton
//               variant="contained"
//               onClick={handleMakePhoneCall}
//             >
//               Make a Phone Call
//             </CommonButton>

//           </Box>


//           {/* ============================================
//               LOADING
//           ============================================ */}

//           {loading && (

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 py: 5,
//               }}
//             >

//               <CircularProgress />

//             </Box>

//           )}


//           {/* ============================================
//               EMPTY
//           ============================================ */}

//           {!loading && calls.length === 0 && (

//             <Typography
//               sx={{
//                 py: 5,
//                 textAlign: "center",
//                 color: "text.secondary",
//               }}
//             >
//               No calls found for this lead.
//             </Typography>

//           )}


//           {/* ============================================
//               CALL LIST
//           ============================================ */}

//           {!loading && calls.length > 0 && (

//             <Box>

//               {calls.map((call) => (

//                 <CallCard
//                   key={call.id}
//                   call={call}
//                 />

//               ))}

//             </Box>

//           )}

//         </Box>

//       </LeadsLeftPanel>

//     </div>
//   );
// }


// import React, { useEffect, useState } from "react"; 
// import { 
// Box, 
// Typography, 
// CircularProgress, 
// } from "@mui/material"; 
// import { useParams } from "react-router-dom"; 
// import CommonActivityTabs from 
// "../../../../../Components/common/CommonActivityTab"; 
// import CommonButton from "../../../../../Components/common/CommonButton"; 
// import CreateLogCall from "./CreateLogCall"; 
// import CallCard from "./CallCard"; 
// import LeadsLeftPanel from "../../LeadsLeftPanel"; 
// import { getLeadTabs } from "../LeadTabs"; 
// import api from "../../../../../services/api"; 
// export default function Leadcalls() { 
// const { leadId } = useParams(); 
// const [openCreateLogCall, setOpenCreateLogCall] = useState(false); 
// const [calls, setCalls] = useState([]); 
// const [loading, setLoading] = useState(true); 
// // ===================================================== 
// // FETCH CALLS 
// // ===================================================== 
// const fetchCalls = async () => { 
// if (!leadId) { 
// setCalls([]); 
//       setLoading(false); 
 
//       return; 
//     } 
 
//     try { 
 
//       setLoading(true); 
 
//       const response = await api.get( 
//         `/activities/activity/lead/${leadId}/call/` 
//       ); 
 
//       console.log( 
//         "LEAD CALLS API RESPONSE:", 
//         response.data 
//       ); 
 
 
//       // ================================================= 
//       // BACKEND RETURNS: 
//       // 
//       // { 
//       //   module: "lead", 
//       //   module_id: 5, 
//       //   activity_type: "call", 
//       //   activities: [...] 
//       // } 
//       // ================================================= 
 
//       const callData = Array.isArray(response.data) 
//         ? response.data 
//         : response.data?.activities || []; 
 
 
//       console.log( 
//         "CALL DATA FOR CARDS:", 
//         callData 
//       ); 
 
 
//       setCalls(callData); 
 
//     } catch (error) { 
 
//       console.error( 
//         "ERROR FETCHING LEAD CALLS:", 
//         error.response?.data || error.message 
//       ); 
 
//       setCalls([]); 
 
//     } finally { 
 
//       setLoading(false); 
 
//     } 
//   }; 
 
 
//   // ===================================================== 
//   // LOAD WHEN LEAD CHANGES 
//   // ===================================================== 
 
//   useEffect(() => { 
 
//     fetchCalls(); 
 
//   }, [leadId]); 
 
 
//   // ===================================================== 
//   // CALL CREATED 
//   // ===================================================== 
 
//   const handleCallCreated = async () => { 
 
//     console.log( 
//       "Call created. Refreshing calls..." 
//     ); 
// setOpenCreateLogCall(false); 
// await fetchCalls(); 
// }; 
// // ===================================================== 
// // UI 
// // ===================================================== 
// return ( 
// <div> 
// <LeadsLeftPanel leadId={leadId}> 
// <Box 
// sx={{ 
// p: 3, 
// mx: -2, 
// }} 
// > 
// {/* ============================================ 
// TABS 
// ============================================ */} 
// <CommonActivityTabs 
// tabs={getLeadTabs(leadId)} 
// activeTab="Calls" 
// /> 
// {/* ============================================ 
// HEADER 
// ============================================ */} 
// <Box 
// sx={{ 
// display: "flex", 
// justifyContent: "space-between", 
// alignItems: "center", 
// mt: 3, 
// mb: 2, 
// }} 
// > 
// <Typography variant="h6"> 
// Calls 
// </Typography> 
// <CommonButton 
// variant="contained" 
// onClick={() => setOpenCreateLogCall(true)} 
// > 
// Make a Phone Call 
// </CommonButton> 
// </Box> 
// {/* ============================================ 
// LOADING 
// ============================================ */} 
// {loading && ( 
// <Box 
// sx={{ 
// display: "flex", 
// justifyContent: "center", 
// py: 5, 
// }} 
// > 
// <CircularProgress /> 
// </Box> 
// )} 
// {/* ============================================ 
// EMPTY 
// ============================================ */} 
// {!loading && calls.length === 0 && ( 
// <Typography 
// sx={{ 
// py: 5, 
// textAlign: "center", 
// color: "text.secondary", 
// }} 
// > 
// No calls found for this lead. 
// </Typography> 
// )} 
// {/* ============================================ 
// CALL LIST 
// ============================================ */} 
// {!loading && calls.length > 0 && ( 
// <Box> 
// {calls.map((call) => ( 
// <CallCard 
// key={call.id} 
// call={call} 
// /> 
// ))} 
// </Box> 
// )} 
// </Box> 
// </LeadsLeftPanel> 
// {/* ================================================ 
// CREATE CALL DRAWER 
// ================================================ */} 
// <CreateLogCall 
// open={openCreateLogCall} 
// onClose={() => 
// setOpenCreateLogCall(false) 
// } 
// relatedModule="lead" 
// objectId={leadId} 
// onCallCreated={handleCallCreated} 
// /> 
// </div> 
// ); 
// }



import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "./CallCard";

import LeadsLeftPanel from "../../LeadsLeftPanel";
import { getLeadTabs } from "../LeadTabs";

import { getLeadById } from "../../../../../services/leads";
import api from "../../../../../services/api";

export default function Leadcalls() {
  const { leadId } = useParams();

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lead, setLead] = useState(null);

  // =====================================================
  // FETCH LEAD
  // =====================================================

  const fetchLead = async () => {
    try {
      const response = await getLeadById(leadId);

      console.log(
        "LEAD DETAILS:",
        response.data
      );

      setLead(response.data);

    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD:",
        error.response?.data || error.message
      );

      setLead(null);
    }
  };

  // =====================================================
  // FETCH CALLS
  // =====================================================

  const fetchCalls = async () => {
    if (!leadId) {
      setCalls([]);
      setLoading(false);

      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/lead/${leadId}/call/`
      );

      console.log(
        "LEAD CALLS API RESPONSE:",
        response.data
      );

      // =================================================
      // BACKEND RETURNS:
      //
      // {
      //   module: "lead",
      //   module_id: 5,
      //   activity_type: "call",
      //   activities: [...]
      // }
      // =================================================

      const callData = Array.isArray(response.data)
        ? response.data
        : response.data?.activities || [];

      console.log(
        "CALL DATA FOR CARDS:",
        callData
      );

      setCalls(callData);

    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD CALLS:",
        error.response?.data || error.message
      );

      setCalls([]);

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    if (leadId) {
      fetchLead();
      fetchCalls();
    }
  }, [leadId]);

  // =====================================================
  // CALL CREATED
  // =====================================================

  const handleCallCreated = async () => {
    console.log(
      "Call created. Refreshing calls..."
    );

    await fetchCalls();
  };

  // =====================================================
  // MAKE PHONE CALL
  // =====================================================

  const handleMakePhoneCall = () => {
    const phoneNumber =
      lead?.phone_number ||
      lead?.phone ||
      "";

    if (!phoneNumber) {
      alert(
        "Phone number is not available for this lead."
      );

      return;
    }

    // Remove spaces, brackets, hyphens, etc.
    const cleanPhoneNumber = String(phoneNumber)
      .replace(/[^\d+]/g, "");

    // IMPORTANT:
    // This only makes the actual phone call.
    // It does NOT open CreateLogCall.
    window.location.href =
      `tel:${cleanPhoneNumber}`;
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div>

      {/* =================================================
          LEAD LEFT PANEL

          DO NOT CHANGE THIS.

          The call button inside LeadsLeftPanel will
          continue to open the CreateLogCall drawer.

          LeadsLeftPanel already handles:

          onCallClick={() => setActiveDrawer("call")}

          and passes:

          relatedModule="lead"
          objectId={leadId}
          connectedName={leadName}
      ================================================= */}

      <LeadsLeftPanel
        leadId={leadId}
        onCallCreated={handleCallCreated}
      >

        <Box
          sx={{
            p: 3,
            mx: -2,
          }}
        >

          {/* ============================================
              TABS
          ============================================ */}

          <CommonActivityTabs
            tabs={getLeadTabs(leadId)}
            activeTab="Calls"
          />

          {/* ============================================
              HEADER
          ============================================ */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              mb: 2,
            }}
          >

            <Typography variant="h6">
              Calls
            </Typography>

            {/* ==========================================
                MAKE A PHONE CALL

                THIS NO LONGER OPENS THE DRAWER.

                It only calls the lead's phone number.
            ========================================== */}

            <CommonButton
              variant="contained"
              onClick={handleMakePhoneCall}
            >
              Make a Phone Call
            </CommonButton>

          </Box>

          {/* ============================================
              LOADING
          ============================================ */}

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* ============================================
              EMPTY
          ============================================ */}

          {!loading && calls.length === 0 && (
            <Typography
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              No calls found for this lead.
            </Typography>
          )}

          {/* ============================================
              CALL LIST
          ============================================ */}

          {!loading && calls.length > 0 && (
            <Box>
              {calls.map((call) => (
                <CallCard
                  key={call.id}
                  call={call}
                />
              ))}
            </Box>
          )}

        </Box>

      </LeadsLeftPanel>

    </div>
  );
}


