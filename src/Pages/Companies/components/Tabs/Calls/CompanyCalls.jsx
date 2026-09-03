// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import CompanyLeftPanel from "../../CompanyLeftPanel";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import CommonButton from "../../../../../Components/common/CommonButton";
// import calls from "../../../../Leads/components/Tabs/Calls/callData";
// import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
// import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";
// import { getCompanyTabs } from "../CompanyTabs";


// export default function CompanyCalls() {
//     const { id } = useParams();
//   // const [activeTab, setActiveTab] = useState("Calls");
//       const [activeTab, setActiveTab] = useState();
//       const [openCreateLogCall, setOpenCreateLogCall] = useState(false);
//   return (
//     <div>
//       <CompanyLeftPanel>
//       <Box
//         sx={{
//           p: 3,
//           mx:-2
//         }}
//       >
//         {/* ACTIVITY TABS */}

//         <Box>
//           {/* <CommonActivityTabs activeTab={activeTab} onTabChange={() => {}} /> */}

//            <CommonActivityTabs
//   tabs={getCompanyTabs(id)}
//   activeTab="Calls"
// />


//         </Box>

//         {/* Header */}

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 5,
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
//       </CompanyLeftPanel>
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

import CompanyLeftPanel from "../../CompanyLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { getCompanyTabs } from "../CompanyTabs";
import api from "../../../../../services/api";


export default function CompanyCalls() {

  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");
  const [company, setCompany] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);


  // ============================================================
  // FETCH COMPANY
  // ============================================================

  const fetchCompany = async () => {

    if (!id) return;

    try {

      const response = await api.get(
        `/companies/${id}/`
      );

      console.log(
        "Company response:",
        response.data
      );

      setCompany(response.data);

    } catch (error) {

      console.error(
        "Error fetching company:",
        error.response?.data || error
      );

      setCompany(null);
    }
  };


  // ============================================================
  // FETCH CALLS
  // ============================================================

  const fetchCalls = async () => {

    if (!id) {

      setCalls([]);
      setLoading(false);

      return;
    }

    try {

      setLoading(true);

      const response = await api.get(
        "/activities/call/"
      );

      console.log(
        "ALL CALLS FROM API:",
        response.data
      );

      console.log(
        "CURRENT COMPANY ID:",
        id
      );


      // --------------------------------------------------------
      // GET ARRAY
      // --------------------------------------------------------

      const allCalls = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];


      // --------------------------------------------------------
      // FILTER CURRENT COMPANY CALLS
      // --------------------------------------------------------

      const companyCalls = allCalls.filter((call) => {

        const module = String(
          call.module || ""
        )
          .trim()
          .toLowerCase();


        const companyId =
          call.company?.id;


        console.log(
          "Checking call:",
          {
            callId: call.id,
            module,
            companyId,
            currentCompanyId: id,
          }
        );


        return (
          module === "company" &&
          Number(companyId) === Number(id)
        );
      });


      console.log(
        "FILTERED COMPANY CALLS:",
        companyCalls
      );


      setCalls(companyCalls);

    } catch (error) {

      console.error(
        "Error fetching company calls:",
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

    if (!id) return;

    fetchCompany();
    fetchCalls();

  }, [id]);


  // ============================================================
  // COMPANY NAME
  // ============================================================

  const companyName =
    company?.company_name ||
    company?.name ||
    `Company #${id}`;


  // ============================================================
  // COMPANY PHONE
  // ============================================================

  const companyPhone =
    company?.phone_number ||
    company?.phone ||
    "";


  // ============================================================
  // MAKE A PHONE CALL
  // ============================================================

  const handleMakePhoneCall = () => {

    if (!companyPhone) {

      alert(
        "Company phone number is not available."
      );

      return;
    }


    const phoneNumber =
      String(companyPhone).trim();


    const cleanPhoneNumber =
      phoneNumber.replace(/\s+/g, "");


    console.log(
      "Calling Company:",
      companyName
    );

    console.log(
      "Phone Number:",
      cleanPhoneNumber
    );


    // DO NOT CHANGE THIS.
    // It opens the phone dialer.

    window.location.href =
      `tel:${cleanPhoneNumber}`;
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
          tabs={getCompanyTabs(id)}
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


          {/* ==================================================
              EXISTING PHONE BUTTON
              DO NOT CHANGE
          ================================================== */}

          <CommonButton
            variant="contained"
            onClick={handleMakePhoneCall}
          >
            Make a Phone Call
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
              call={{
                ...call,

                name: companyName,

                description:
                  call.note || "",

                date:
                  call.date || "",

                time:
                  call.time || "",

                call_outcome:
                  call.call_outcome ||
                  call.outcome ||
                  "",

                duration:
                  call.duration !== null &&
                  call.duration !== undefined
                    ? Number(call.duration)
                    : null,
              }}
            />

          ))

        )}

      </Box>

    </CompanyLeftPanel>
  );
}