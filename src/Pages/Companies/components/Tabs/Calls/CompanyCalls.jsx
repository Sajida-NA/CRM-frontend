// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { Box, Typography, CircularProgress } from "@mui/material";

// import CompanyLeftPanel from "../../CompanyLeftPanel";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CommonButton from "../../../../../Components/common/CommonButton";

// import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

// import { getCompanyTabs } from "../CompanyTabs";
// import api from "../../../../../services/api";

// export default function CompanyCalls() {
//   const { companyId } = useParams();

//   const [activeTab, setActiveTab] = useState("Calls");
//   const [company, setCompany] = useState(null);
//   const [calls, setCalls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ============================================================
//   // DEBUG
//   // ============================================================

//   console.log("========== COMPANY CALLS ==========");
//   console.log("Company ID:", companyId);
//   console.log("Current URL:", window.location.pathname);

//   // ============================================================
//   // FETCH COMPANY
//   // ============================================================

//   const fetchCompany = async () => {
//     if (!companyId) {
//       console.error("Company ID is missing");
//       return;
//     }

//     try {
//       const response = await api.get(`/companies/${companyId}/`);

//       console.log("COMPANY RESPONSE:", response.data);

//       setCompany(response.data);
//     } catch (error) {
//       console.error("ERROR FETCHING COMPANY:", error.response?.data || error);

//       setCompany(null);
//     }
//   };

//   // ============================================================
//   // FETCH COMPANY CALLS
//   // ============================================================

//   const fetchCalls = async () => {
//     console.log("========== FETCH COMPANY CALLS ==========");

//     if (!companyId) {
//       console.error("Company ID is missing");

//       setCalls([]);
//       setLoading(false);

//       return;
//     }

//     try {
//       setLoading(true);

//       const url = `/activities/activity/company/${companyId}/call/`;

//       console.log("COMPANY CALL API:", url);

//       const response = await api.get(url);

//       console.log("COMPANY CALLS API RESPONSE:", response.data);

//       const companyCalls = response.data?.activities || [];

//       console.log("COMPANY CALL DATA:", companyCalls);

//       setCalls(companyCalls);
//     } catch (error) {
//       console.error(
//         "ERROR FETCHING COMPANY CALLS:",
//         error.response?.data || error,
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
//     if (!companyId) {
//       return;
//     }

//     fetchCompany();
//     fetchCalls();
//   }, [companyId]);

//   // ============================================================
//   // COMPANY NAME
//   // ============================================================

//   const companyName =
//     company?.company_name || company?.name || `Company #${companyId}`;

//   // ============================================================
//   // COMPANY PHONE
//   // ============================================================

//   const companyPhone = company?.phone_number || company?.phone || "";

//   // ============================================================
//   // MAKE PHONE CALL
//   // ============================================================

//   const handleMakePhoneCall = () => {
//     if (!companyPhone) {
//       alert("Company phone number is not available.");

//       return;
//     }

//     const phoneNumber = String(companyPhone).trim();

//     const cleanPhoneNumber = phoneNumber.replace(/\s+/g, "");

//     console.log("Calling Company:", companyName);

//     console.log("Phone Number:", cleanPhoneNumber);

//     window.location.href = `tel:${cleanPhoneNumber}`;
//   };

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <CompanyLeftPanel onCallCreated={fetchCalls}>
//       <Box
//         sx={{
//           p: 3,
//           mx: -2,
//         }}
//       >
//         {/* ====================================================
//             ACTIVITY TABS
//         ==================================================== */}

//         <CommonActivityTabs
//           tabs={getCompanyTabs(companyId)}
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//         />

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
//           <Typography variant="h6">Calls</Typography>

//           <CommonButton variant="contained" onClick={handleMakePhoneCall}>
//             Make a Phone Call
//           </CommonButton>
//         </Box>

//         {/* ====================================================
//             CALLS
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
//             <CircularProgress size={28} />
//           </Box>
//         ) : calls.length === 0 ? (
//           <Typography
//             color="text.secondary"
//             sx={{
//               mt: 2,
//             }}
//           >
//             No calls found for this company.
//           </Typography>
//         ) : (
//           calls.map((call) => <CallCard key={call.id} call={call} />)
//         )}
//       </Box>
//     </CompanyLeftPanel>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import CompanyLeftPanel from "../../CompanyLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { getCompanyTabs } from "../CompanyTabs";
import api from "../../../../../services/api";

export default function CompanyCalls() {
  const { companyId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");
  const [company, setCompany] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);

  // ============================================================
  // DEBUG
  // ============================================================

  console.log("========== COMPANY CALLS ==========");
  console.log("Company ID:", companyId);
  console.log("Current URL:", window.location.pathname);

  // ============================================================
  // FETCH COMPANY
  // ============================================================

  const fetchCompany = async () => {
    if (!companyId) {
      console.error("Company ID is missing");
      return;
    }

    try {
      const response = await api.get(
        `/companies/${companyId}/`
      );

      console.log(
        "COMPANY RESPONSE:",
        response.data
      );

      setCompany(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING COMPANY:",
        error.response?.data || error
      );

      setCompany(null);
    }
  };

  // ============================================================
  // FETCH COMPANY CALLS
  // ============================================================

  const fetchCalls = async () => {
    console.log(
      "========== FETCH COMPANY CALLS =========="
    );

    if (!companyId) {
      console.error("Company ID is missing");

      setCalls([]);
      setLoading(false);

      return;
    }

    try {
      setLoading(true);

      const url =
        `/activities/activity/company/${companyId}/call/`;

      console.log(
        "COMPANY CALL API:",
        url
      );

      const response = await api.get(url);

      console.log(
        "COMPANY CALLS API RESPONSE:",
        response.data
      );

      const companyCalls = Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.activities || [];

      console.log(
        "COMPANY CALL DATA:",
        companyCalls
      );

      setCalls(companyCalls);

    } catch (error) {
      console.error(
        "ERROR FETCHING COMPANY CALLS:",
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
    if (!companyId) {
      return;
    }

    fetchCompany();
    fetchCalls();

  }, [companyId]);

  // ============================================================
  // COMPANY NAME
  // ============================================================

  const companyName =
    company?.company_name ||
    company?.name ||
    `Company #${companyId}`;

  // ============================================================
  // MAKE SERVER-SIDE PHONE CALL
  // ============================================================

  const handleMakePhoneCall = async () => {
    if (!companyId) {
      alert("Company ID is missing.");
      return;
    }

    try {
      setCalling(true);

      console.log(
        "========== START COMPANY SERVER CALL =========="
      );

      console.log(
        "Company ID:",
        companyId
      );

      console.log(
        "Company:",
        companyName
      );

      // ========================================================
      // SEND REQUEST TO DJANGO
      // ========================================================

      const response = await api.post(
        "/activities/call/start/",
        {
          module: "company",
          module_id: Number(companyId),
        }
      );

      console.log(
        "SERVER CALL RESPONSE:",
        response.data
      );

      // ========================================================
      // REFRESH CALLS
      // ========================================================

      await fetchCalls();

      // ========================================================
      // SUCCESS MESSAGE
      // ========================================================

      alert(
        response.data?.message ||
        "Phone call started successfully."
      );

    } catch (error) {

      console.error(
        "SERVER PHONE CALL ERROR:",
        error.response?.data || error
      );

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Unable to start the phone call.";

      alert(errorMessage);

    } finally {
      setCalling(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <CompanyLeftPanel
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

        <CommonActivityTabs
          tabs={getCompanyTabs(companyId)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

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
            disabled={calling}
          >
            {calling
              ? "Calling..."
              : "Make a Phone Call"}
          </CommonButton>

        </Box>

        {/* ====================================================
            CALLS
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
            No calls found for this company.
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
    </CompanyLeftPanel>
  );
}
