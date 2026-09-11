// import React, { useEffect, useState } from "react";

// import { Box, Typography } from "@mui/material";

// import { useParams } from "react-router-dom";

// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CommonButton from "../../../../../Components/common/CommonButton";

// import ScheduleMeeting from "../../../../Leads/components/Tabs/Meetings/ScheduleMeeting";

// import MeetingCard from "./MeetingCard";

// import api from "../../../../../services/api";

// export default function MeetingDetails({
//   tabs,
//   module,
//   moduleId,
// }) {
//   const { dealId, ticketId } = useParams();

//   const finalModule = String(
//     module || (ticketId ? "ticket" : "deal")
//   )
//     .toLowerCase()
//     .trim();

//   const finalModuleId =
//     moduleId ||
//     ticketId ||
//     dealId;

//   const [activeTab, setActiveTab] = useState("Meetings");

//   const [openCreateMeeting, setOpenCreateMeeting] =
//     useState(false);

//   const [meetings, setMeetings] = useState([]);

//   const [loading, setLoading] = useState(false);

//   // =========================================================
//   // FETCH MEETINGS
//   // =========================================================

//   const fetchMeetings = async () => {
//     if (!finalModuleId) {
//       console.error("Related record ID not found");
//       setMeetings([]);
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("=================================");
//       console.log("FETCHING MEETINGS");
//       console.log("MODULE:", finalModule);
//       console.log("MODULE ID:", finalModuleId);
//       console.log("=================================");

//       const response = await api.get(
//   `/activities/meeting/${finalModule}/${finalModuleId}/`
// );

//       console.log(
//         "MEETINGS RESPONSE:",
//         response.data
//       );

//       const meetingData = Array.isArray(
//         response.data
//       )
//         ? response.data
//         : response.data?.results || [];

//       const filteredMeetings =
//         meetingData.filter((meeting) => {
//           const meetingModule = String(
//             meeting?.module || ""
//           )
//             .toLowerCase()
//             .trim();

//           const relatedId =
//             meeting?.module_id ??
//             meeting?.object_id ??
//             meeting?.lead?.id ??
//             meeting?.deal?.id ??
//             meeting?.company?.id ??
//             meeting?.ticket?.id;

//           return (
//             meetingModule === finalModule &&
//             Number(relatedId) ===
//               Number(finalModuleId)
//           );
//         });

//       console.log(
//         "FILTERED MEETINGS:",
//         filteredMeetings
//       );

//       setMeetings(filteredMeetings);
//     } catch (error) {
//       console.error(
//         "FETCH MEETINGS ERROR:",
//         error.response?.data || error
//       );

//       console.error(
//         "STATUS:",
//         error.response?.status
//       );

//       setMeetings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // LOAD MEETINGS
//   // =========================================================

//   useEffect(() => {
//     if (finalModuleId) {
//       fetchMeetings();
//     }
//   }, [finalModule, finalModuleId]);

//   // =========================================================
//   // OPEN CREATE MEETING
//   // =========================================================

//   const handleOpenCreateMeeting = () => {
//     if (!finalModuleId) {
//       console.error(
//         `${finalModule} ID not found`
//       );
//       return;
//     }

//     setOpenCreateMeeting(true);
//   };

//   // =========================================================
//   // CLOSE CREATE MEETING
//   // =========================================================

//   const handleCloseCreateMeeting = async () => {
//     setOpenCreateMeeting(false);
//     await fetchMeetings();
//   };

//   // =========================================================
//   // RETURN
//   // =========================================================

//   return (
//     <Box
//       sx={{
//         p: 3,
//         mx: -2,
//       }}
//     >
//       {/* =====================================================
//           ACTIVITY TABS
//           ===================================================== */}

//       <Box>
//         <CommonActivityTabs
//           tabs={tabs}
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//         />
//       </Box>

//       {/* =====================================================
//           HEADER
//           ===================================================== */}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mt: 3,
//           mb: 1,
//         }}
//       >
//         <Typography variant="h6">
//           Meetings
//         </Typography>

//         <CommonButton
//           variant="contained"
//           onClick={handleOpenCreateMeeting}
//         >
//           Create Meeting
//         </CommonButton>
//       </Box>

//       {/* =====================================================
//           CREATE MEETING DRAWER
//           ===================================================== */}

//       <ScheduleMeeting
//         open={openCreateMeeting}
//         onClose={handleCloseCreateMeeting}
//         module={finalModule}
//         moduleId={finalModuleId}
//       />

//       {/* =====================================================
//           MEETING LIST
//           ===================================================== */}

//       {loading ? (
//         <Typography
//           sx={{
//             mt: 3,
//             color: "text.secondary",
//           }}
//         >
//           Loading meetings...
//         </Typography>
//       ) : meetings.length === 0 ? (
//         <Typography
//           sx={{
//             color: "#667085",
//             mt: 3,
//           }}
//         >
//           No meetings found.
//         </Typography>
//       ) : (
//         meetings.map((meeting, index) => (
//           <MeetingCard
//             key={meeting.id || index}
//             meeting={meeting}
//           />
//         ))
//       )}
//     </Box>
//   );
// }


// import React, { useEffect, useState } from "react"; 
// import { Box, Typography } from "@mui/material"; 
// import { useParams } from "react-router-dom"; 
// import CommonActivityTabs from 
// "../../../../../Components/common/CommonActivityTab"; 
// import CommonButton from "../../../../../Components/common/CommonButton"; 
// import ScheduleMeeting from 
// "../../../../Leads/components/Tabs/Meetings/ScheduleMeeting"; 
// import MeetingCard from "./MeetingCard"; 
// import api from "../../../../../services/api"; 
// export default function MeetingDetails({ 
// tabs, 
// module, 
// moduleId, 
// }) { 
// const { 
// leadId, 
// dealId, 
// ticketId, 
// } = useParams(); 
// // ========================================================= 
// // DETERMINE MODULE 
// // ========================================================= 
// const finalModule = String( 
// module || 
// (leadId 
// ? "lead" 
// : ticketId 
// ? "ticket" 
// : "deal") 
// ) 
// .toLowerCase() 
// .trim(); 
// // ========================================================= 
// // DETERMINE MODULE ID 
// // ========================================================= 
// const finalModuleId = 
// moduleId || 
// leadId || 
// ticketId || 
// dealId; 
// console.log("================================="); 
// console.log("MEETING DETAILS"); 
// console.log("MODULE PROP:", module); 
// console.log("MODULE ID PROP:", moduleId); 
// console.log("URL LEAD ID:", leadId); 
// console.log("URL DEAL ID:", dealId); 
// console.log("URL TICKET ID:", ticketId); 
// console.log("FINAL MODULE:", finalModule); 
// console.log("FINAL MODULE ID:", finalModuleId); 
// console.log("================================="); 
// const [activeTab, setActiveTab] = 
// useState("Meetings"); 
// const [ 
// openCreateMeeting, 
// setOpenCreateMeeting, 
// ] = useState(false); 
// const [meetings, setMeetings] = 
// useState([]); 
// const [loading, setLoading] = 
// useState(false); 
// // ========================================================= 
// // FETCH MEETINGS 
// // ========================================================= 
// const fetchMeetings = async () => { 
// if (!finalModuleId) { 
// console.error( 
// "Related record ID not found" 
// ); 
// setMeetings([]); 
// return; 
// } 
// try { 
// setLoading(true); 
// console.log( 
// "FETCHING MEETINGS:", 
// finalModule, 
// finalModuleId 
// ); 
// const response = await api.get( 
// `/activities/meeting/${finalModule}/${finalModuleId}/` 
// ); 
// console.log( 
// "MEETINGS RESPONSE:", 
// response.data 
// ); 
// const meetingData = 
// Array.isArray(response.data) 
// ? response.data 
// : response.data?.results || []; 
// const filteredMeetings = 
// meetingData.filter((meeting) => { 
// const meetingModule = String( 
// meeting?.module || "" 
// ) 
// .toLowerCase() 
// .trim(); 
// const relatedId = 
// meeting?.module_id ?? 
// meeting?.object_id ?? 
// meeting?.lead?.id ?? 
// meeting?.deal?.id ?? 
// meeting?.company?.id ?? 
// meeting?.ticket?.id; 
// return ( 
// meetingModule === finalModule && 
// Number(relatedId) === 
// Number(finalModuleId) 
// ); 
// }); 
// console.log( 
// "FILTERED MEETINGS:", 
// filteredMeetings 
// ); 
// setMeetings(filteredMeetings); 
// } catch (error) { 
// console.error( 
// "FETCH MEETINGS ERROR:", 
// error.response?.data || 
// error.message || 
// error 
// ); 
// console.error( 
// "STATUS:", 
// error.response?.status 
// ); 
// setMeetings([]); 
// } finally { 
// setLoading(false); 
// } 
// }; 
// // ========================================================= 
// // LOAD MEETINGS 
// // ========================================================= 
// useEffect(() => { 
// if (finalModuleId) { 
// fetchMeetings(); 
// } 
// }, [finalModule, finalModuleId]); 
// // ========================================================= 
// // OPEN CREATE MEETING 
// // ========================================================= 
// const handleOpenCreateMeeting = () => { 
// console.log( 
// "CREATE MEETING CLICKED" 
// ); 
// console.log( 
// "MODULE:", 
// finalModule 
// ); 
// console.log( 
// "MODULE ID:", 
// finalModuleId 
// ); 
// if (!finalModuleId) { 
// console.error( 
// `${finalModule} ID not found` 
// ); 
// return; 
// } 
// setOpenCreateMeeting(true); 
// }; 
// // ========================================================= 
// // CLOSE CREATE MEETING 
// // ========================================================= 
// const handleCloseCreateMeeting = async () => { 
// setOpenCreateMeeting(false); 
// await fetchMeetings(); 
// }; 
// // ========================================================= 
// // RETURN 
// // ========================================================= 
// return ( 
// <Box 
// sx={{ 
// p: 3, 
// mx: -2, 
// }} 
// > 
// {/* ===================================================== 
// ACTIVITY TABS 
// ===================================================== */} 
// <Box> 
// <CommonActivityTabs 
// tabs={tabs} 
// activeTab={activeTab} 
// onTabChange={setActiveTab} 
// /> 
// </Box> 
// {/* ===================================================== 
// HEADER 
// ===================================================== */} 
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
// Meetings 
// </Typography> 
// <CommonButton 
// variant="contained" 
// onClick={handleOpenCreateMeeting} 
// > 
// Create Meeting 
// </CommonButton> 
// </Box> 
// {/* ===================================================== 
// CREATE MEETING DRAWER 
// ===================================================== */} 
// <ScheduleMeeting 
// open={openCreateMeeting} 
// onClose={handleCloseCreateMeeting} 
// module={finalModule} 
// moduleId={finalModuleId} 
// /> 
// {/* ===================================================== 
// MEETING LIST 
// ===================================================== */} 
// {loading ? ( 
// <Typography 
// sx={{ 
// mt: 3, 
// color: "text.secondary", 
// }} 
// > 
// Loading meetings... 
// </Typography> 
// ) : meetings.length === 0 ? ( 
// <Typography 
// sx={{ 
// color: "#667085", 
// mt: 3, 
// }} 
// > 
// No meetings found. 
// </Typography> 
// ) : ( 
// meetings.map((meeting, index) => ( 
// <MeetingCard 
// key={meeting.id || index} 
// meeting={meeting} 
// /> 
// )) 
// )} 
// </Box> 
// ); 
// } 


import React, { useEffect, useState } from "react"; 
 
import { Box, Typography } from "@mui/material"; 
 
import { useParams } from "react-router-dom"; 
 
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab"; 
import CommonButton from "../../../../../Components/common/CommonButton"; 
 
import ScheduleMeeting from "../../../../Leads/components/Tabs/Meetings/ScheduleMeeting"; 
 
import MeetingCard from "./MeetingCard"; 
 
import api from "../../../../../services/api"; 
 
export default function MeetingDetails({ tabs, module, moduleId }) { 
  const { leadId, dealId, ticketId } = useParams(); 
 
  // ========================================================= 
  // DETERMINE MODULE 
  // ========================================================= 
 
  const finalModule = String( 
    module || (leadId ? "lead" : ticketId ? "ticket" : "deal"), 
  ) 
    .toLowerCase() 
    .trim(); 
 
  // ========================================================= 
  // DETERMINE MODULE ID 
  // ========================================================= 
 
  const finalModuleId = moduleId || leadId || ticketId || dealId; 
 
  console.log("================================="); 
  console.log("MEETING DETAILS"); 
  console.log("MODULE PROP:", module); 
  console.log("MODULE ID PROP:", moduleId); 
  console.log("URL LEAD ID:", leadId); 
  console.log("URL DEAL ID:", dealId); 
  console.log("URL TICKET ID:", ticketId); 
  console.log("FINAL MODULE:", finalModule); 
  console.log("FINAL MODULE ID:", finalModuleId); 
  console.log("================================="); 
 
  const [activeTab, setActiveTab] = useState("Meetings"); 
 
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false); 
 
  const [meetings, setMeetings] = useState([]); 
 
  const [loading, setLoading] = useState(false); 
 
  // ========================================================= 
  // FETCH MEETINGS 
  // ========================================================= 
 
  const fetchMeetings = async () => { 
    if (!finalModuleId) { 
      console.error("Related record ID not found"); 
 
      setMeetings([]); 
      return; 
    } 
 
    try { 
      setLoading(true); 
 
      console.log("FETCHING MEETINGS:", finalModule, finalModuleId); 
 
      const response = await api.get( 
        `/activities/meeting/${finalModule}/${finalModuleId}/`, 
      ); 
 
      console.log("MEETINGS RESPONSE:", response.data); 
 
      const meetingData = Array.isArray(response.data) 
        ? response.data 
        : response.data?.results || []; 
 
      const filteredMeetings = meetingData.filter((meeting) => { 
        const meetingModule = String(meeting?.module || "") 
          .toLowerCase() 
          .trim(); 
 
        const relatedId = 
          meeting?.module_id ?? 
          meeting?.object_id ?? 
          meeting?.lead?.id ?? 
          meeting?.deal?.id ?? 
          meeting?.company?.id ?? 
          meeting?.ticket?.id; 
 
        return ( 
          meetingModule === finalModule && 
          Number(relatedId) === Number(finalModuleId) 
        ); 
      }); 
 
      console.log("FILTERED MEETINGS:", filteredMeetings); 
 
      setMeetings(filteredMeetings); 
    } catch (error) { 
      console.error( 
        "FETCH MEETINGS ERROR:", 
        error.response?.data || error.message || error, 
      ); 
 
      console.error("STATUS:", error.response?.status); 
 
      setMeetings([]); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  // ========================================================= 
  // LOAD MEETINGS 
  // ========================================================= 
 
  useEffect(() => { 
    if (finalModuleId) { 
      fetchMeetings(); 
    } 
  }, [finalModule, finalModuleId]); 
 
  // ========================================================= 
  // OPEN CREATE MEETING 
  // ========================================================= 
 
  const handleOpenCreateMeeting = () => { 
    console.log("CREATE MEETING CLICKED"); 
 
    console.log("MODULE:", finalModule); 
 
    console.log("MODULE ID:", finalModuleId); 
 
    if (!finalModuleId) { 
      console.error(`${finalModule} ID not found`); 
 
      return; 
    } 
 
    setOpenCreateMeeting(true); 
  }; 
 
  // ========================================================= 
  // CLOSE CREATE MEETING 
  // ========================================================= 
 
  const handleCloseCreateMeeting = async () => { 
    setOpenCreateMeeting(false); 
 
    await fetchMeetings(); 
  }; 
 
  // ========================================================= 
  // RETURN 
  // ========================================================= 
 
  return ( 
    <Box 
      sx={{ 
        p: 3, 
        mx: -2, 
      }} 
    > 
      {/* ===================================================== 
          ACTIVITY TABS 
          ===================================================== */} 
 
      <Box> 
        <CommonActivityTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        /> 
      </Box> 
 
      {/* ===================================================== 
          HEADER 
          ===================================================== */} 
 
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mt: 3, 
          mb: 1, 
        }} 
      > 
        <Typography variant="h6">Meetings</Typography> 
 
        <CommonButton variant="contained" onClick={handleOpenCreateMeeting}> 
          Create Meeting 
        </CommonButton> 
      </Box> 
 
      {/* ===================================================== 
          CREATE MEETING DRAWER 
          ===================================================== */} 
 
      <ScheduleMeeting 
        open={openCreateMeeting} 
        onClose={handleCloseCreateMeeting} 
        module={finalModule} 
        moduleId={finalModuleId} 
      /> 
 
      {/* ===================================================== 
          MEETING LIST 
          ===================================================== */} 
 
      {loading ? ( 
        <Typography 
          sx={{ 
            mt: 3, 
            color: "text.secondary", 
          }} 
        > 
          Loading meetings... 
        </Typography> 
      ) : meetings.length === 0 ? ( 
        <Typography 
          sx={{ 
            color: "#667085", 
            mt: 3, 
          }} 
        > 
          No meetings found. 
        </Typography> 
      ) : ( 
        meetings.map((meeting, index) => ( 
          <MeetingCard key={meeting.id || index} meeting={meeting} /> 
        )) 
      )} 
    </Box> 
  ); 
} 
