import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CompanyLeftPanel from "../../CompanyLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import calls from "../../../../Leads/components/Tabs/Calls/callData";
import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";
import { companyTabs } from "../CompanyTabs";


export default function CompanyCalls() {
  // const [activeTab, setActiveTab] = useState("Calls");
      const [activeTab, setActiveTab] = useState();
      const [openCreateLogCall, setOpenCreateLogCall] = useState(false);
  return (
    <div>
      <CompanyLeftPanel>
      <Box
        sx={{
          p: 3,
          mx:-2
        }}
      >
        {/* ACTIVITY TABS */}

        <Box>
          {/* <CommonActivityTabs activeTab={activeTab} onTabChange={() => {}} /> */}

            <CommonActivityTabs
            tabs={companyTabs}
            activeTab="Calls"
          />


        </Box>

        {/* Header */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
            mb: 1,
          }}
        >
          <Typography variant="h6">Calls</Typography>

          <CommonButton
            variant="contained"
            // onClick={() => setOpenCreateLogCall(true)}
          >
            Make a Phone Call
          </CommonButton>
        </Box>

        <Typography variant="h6">June 2025</Typography>

        {calls.map((call) => (
          <CallCard key={call.id} call={call} />
        ))}
      </Box>
      </CompanyLeftPanel>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import { useParams } from "react-router-dom";

// import CompanyLeftPanel from "../../CompanyLeftPanel";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CommonButton from "../../../../../Components/common/CommonButton";

// import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
// import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";

// import { companyTabs } from "../CompanyTabs";

// import {
//   getActivityType,
//   createCall,
// } from "../../../../../services/activityservice";

// import api from "../../../../../services/api";

// export default function CompanyCalls() {

//   // Company ID from:
//   // /companies/:id/activity/calls
//   const { id } = useParams();

//   const [activeTab, setActiveTab] = useState("Calls");

//   const [calls, setCalls] = useState([]);

//   const [company, setCompany] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

//   const [openPhoneDialog, setOpenPhoneDialog] = useState(false);

//   /*
//    * Fetch company details
//    */
//   const fetchCompany = async () => {
//     if (!id) return;

//     try {
//       const response = await api.get(`/companies/${id}/`);

//       console.log("Company:", response.data);

//       setCompany(response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching company:",
//         error
//       );
//     }
//   };

//   /*
//    * Fetch calls for this company
//    */
//   const fetchCalls = async () => {
//     if (!id) {
//       console.log("Company ID not found");
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log(
//         "Fetching calls for company ID:",
//         id
//       );

//       const response = await getActivityType(
//         "company",
//         id,
//         "call"
//       );

//       console.log(
//         "Company calls:",
//         response.data
//       );

//       setCalls(response.data || []);

//     } catch (error) {

//       console.error(
//         "Error fetching company calls:",
//         error
//       );

//       setCalls([]);

//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//    * Load company and calls
//    */
//   useEffect(() => {

//     if (id) {
//       fetchCompany();
//       fetchCalls();
//     }

//   }, [id]);

//   /*
//    * Save new call
//    */
//   const handleCreateCall = async (payload) => {

//     try {

//       console.log(
//         "Creating call:",
//         payload
//       );

//       await createCall(payload);

//       /*
//        * Refresh calls after successful save
//        */
//       await fetchCalls();

//     } catch (error) {

//       console.error(
//         "Error creating call:",
//         error
//       );

//       throw error;
//     }
//   };

//   /*
//    * Make Phone Call button
//    *
//    * This is NOT the Log Call button.
//    * It has its own purpose.
//    */
//   const handleMakePhoneCall = () => {

//     setOpenPhoneDialog(true);

//   };

//   return (
//     <div>

//       <CompanyLeftPanel>

//         <Box
//           sx={{
//             p: 3,
//             mx: -2,
//           }}
//         >

//           {/* ACTIVITY TABS */}

//           <Box>
//             <CommonActivityTabs
//               tabs={companyTabs}
//               activeTab="Calls"
//             />
//           </Box>


//           {/* HEADER */}

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mt: 5,
//               mb: 1,
//             }}
//           >

//             <Typography variant="h6">
//               Calls
//             </Typography>


//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 2,
//               }}
//             >

//               {/* EXISTING MAKE A PHONE CALL BUTTON */}

//               <CommonButton
//                 variant="contained"
//                 onClick={handleMakePhoneCall}
//               >
//                 Make a Phone Call
//               </CommonButton>


//               {/* LOG CALL BUTTON */}

//               <CommonButton
//                 variant="outlined"
//                 onClick={() =>
//                   setOpenCreateLogCall(true)
//                 }
//               >
//                 Log a Call
//               </CommonButton>

//             </Box>

//           </Box>


//           {/* MONTH */}

//           <Typography
//             variant="h6"
//             sx={{
//               mt: 3,
//               mb: 2,
//             }}
//           >
//             Calls
//           </Typography>


//           {/* LOADING */}

//           {loading && (
//             <Typography
//               color="text.secondary"
//             >
//               Loading calls...
//             </Typography>
//           )}


//           {/* NO CALLS */}

//           {!loading &&
//             calls.length === 0 && (
//               <Typography
//                 color="text.secondary"
//               >
//                 No calls found for this company.
//               </Typography>
//             )}


//           {/* CALL LIST */}

//           {!loading &&
//             calls.map((call) => (

//               <CallCard
//                 key={call.id}
//                 call={call}
//               />

//             ))}

//         </Box>


//         {/* =========================
//             LOG CALL DRAWER
//         ========================== */}

//         <CreateLogCall
//           open={openCreateLogCall}
//           onClose={() =>
//             setOpenCreateLogCall(false)
//           }
//           company={company}
//           onSaved={handleCreateCall}
//         />


//         {/* =========================
//             MAKE PHONE CALL DIALOG
//         ========================== */}

//         <Dialog
//           open={openPhoneDialog}
//           onClose={() =>
//             setOpenPhoneDialog(false)
//           }
//         >

//           <DialogTitle>
//             Make a Phone Call
//           </DialogTitle>

//           <DialogContent>

//             <Typography>
//               Calling{" "}
//               <strong>
//                 {company?.company_name ||
//                   "Company"}
//               </strong>
//             </Typography>

//             {company?.phone_number && (
//               <Typography
//                 color="text.secondary"
//                 sx={{ mt: 1 }}
//               >
//                 {company.phone_number}
//               </Typography>
//             )}

//           </DialogContent>

//           <DialogActions>

//             <CommonButton
//               onClick={() =>
//                 setOpenPhoneDialog(false)
//               }
//             >
//               Close
//             </CommonButton>

//           </DialogActions>

//         </Dialog>

//       </CompanyLeftPanel>

//     </div>
//   );
// }