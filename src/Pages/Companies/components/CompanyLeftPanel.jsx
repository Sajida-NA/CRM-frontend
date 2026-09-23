
// import React, { useEffect, useState } from "react";
// import { useParams, Outlet } from "react-router-dom";

// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
// import Createnote from "../../Leads/components/Tabs/Note/Createnote";
// import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog";
// import ScheduleMeeting from "../../Leads/components/Tabs/Meetings/ScheduleMeeting";
// import CreateTaskDrawer from "../../Leads/components/Tabs/Task/CreateTaskDrawer";

// import api from "../../../services/api";

// export default function CompanyLeftPanel() {
//   const { companyId } = useParams();

//   const [company, setCompany] = useState(null);
//   const [activeDrawer, setActiveDrawer] = useState(null);

//   // Used to tell the current tab to refresh its data
//   const [refreshKey, setRefreshKey] = useState(0);

//   // ============================================================
//   // FETCH COMPANY DETAILS
//   // ============================================================

//   useEffect(() => {
//     if (!companyId) return;

//     const fetchCompany = async () => {
//       try {
//         const response = await api.get(
//           `/companies/${companyId}/`
//         );

//         setCompany(response.data);
//       } catch (error) {
//         console.error(
//           "Error fetching company:",
//           error
//         );
//       }
//     };

//     fetchCompany();
//   }, [companyId]);

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (!company) {
//     return <div>Loading company...</div>;
//   }

//   // ============================================================
//   // COMPANY DETAILS
//   // ============================================================

//   const companyDetails = [
//     {
//       label: "Company Domain Name",
//       value: company.domain_name || "-",
//     },
//     {
//       label: "Company Name",
//       value: company.company_name || "-",
//     },
//     {
//       label: "Industry",
//       value: company.industry || "-",
//     },
//     {
//       label: "Phone Number",
//       value: company.phone_number || "-",
//     },
//     {
//       label: "Company Owner",
//       value: company.company_owner_name || "-",
//     },
//     {
//       label: "City",
//       value: company.city || "-",
//     },
//     {
//       label: "Country/Region",
//       value: company.country_region || "-",
//     },
//     {
//       label: "No. of Employees",
//       value: company.no_of_employees || "-",
//     },
//     {
//       label: "Annual Revenue",
//       value: company.annual_revenue || "-",
//     },
//     {
//       label: "Created Date",
//       value: company.created_date || "-",
//     },
//   ];

//   // ============================================================
//   // COMMON ENTITY HEADER DATA
//   // ============================================================

//   const leftPanelData = {
//     profile: {
//       name: company.company_name,
//       subTitle: company.industry,
//       email: company.domain_name,
//     },

//     showProfileEdit: true,
//     showProfileImage: true,

//     sectionTitle: "About this Company",

//     leadDetails: companyDetails,

//     summaryTitle: "AI Company Summary",

//     summaryText: `The company "${company.company_name}" currently has no associated conversation, call, or note transcripts.`,
//   };

//   // ============================================================
//   // CLOSE DRAWER
//   // ============================================================

//   const closeDrawer = () => {
//     setActiveDrawer(null);
//   };

//   // ============================================================
//   // ACTIVITY CREATED
//   // ============================================================

//   const handleActivityCreated = () => {
//     setActiveDrawer(null);

//     // Tell the current tab to refresh its data
//     setRefreshKey((prev) => prev + 1);
//   };

//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <>
//       <CommonEntityHeader
//         title="Companies"
//         leftPanelData={leftPanelData}

//         // ======================================================
//         // AI SUMMARY
//         // ======================================================

//         module="company"
//         objectId={companyId}

//         // ======================================================
//         // ACTIONS
//         // ======================================================

//         onCallClick={() =>
//           setActiveDrawer("call")
//         }

//         onNoteClick={() =>
//           setActiveDrawer("note")
//         }

//         onEmailClick={() =>
//           setActiveDrawer("email")
//         }

//         onTaskClick={() =>
//           setActiveDrawer("task")
//         }

//         onMeetingClick={() =>
//           setActiveDrawer("meeting")
//         }
//       >
//         <Outlet
//           context={{
//             refreshKey,
//           }}
//         />
//       </CommonEntityHeader>

//       {/* ========================================================
//           CREATE / LOG CALL
//       ======================================================== */}

//       <CreateLogCall
//         open={activeDrawer === "call"}
//         onClose={closeDrawer}
//         relatedModule="company"
//         objectId={companyId}
//         connectedName={company.company_name}
//         onCallCreated={handleActivityCreated}
//       />

//       {/* ========================================================
//           CREATE NOTE
//       ======================================================== */}

//       <Createnote
//         open={activeDrawer === "note"}
//         onClose={closeDrawer}
//         module="company"
//         moduleId={companyId}
//         onSuccess={handleActivityCreated}
//       />

//       {/* ========================================================
//           SEND EMAIL
//       ======================================================== */}

//       <NewEmailDialog
//         open={activeDrawer === "email"}
//         onClose={closeDrawer}
//         relatedModule="company"
//         objectId={companyId}
//         onEmailCreated={handleActivityCreated}
//       />

//       {/* ========================================================
//           CREATE TASK
//       ======================================================== */}

//       <CreateTaskDrawer
//         open={activeDrawer === "task"}
//         onClose={closeDrawer}
//         module="company"
//         moduleId={companyId}
//         onTaskCreated={handleActivityCreated}
//       />

//       {/* ========================================================
//           SCHEDULE MEETING
//       ======================================================== */}

//       <ScheduleMeeting
//         open={activeDrawer === "meeting"}
//         onClose={closeDrawer}
//         relatedModule="company"
//         objectId={companyId}
//       />
//     </>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { useParams, Outlet } from "react-router-dom";

// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";

// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
// import Createnote from "../../Leads/components/Tabs/Note/Createnote";
// import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog";
// import ScheduleMeeting from "../../Leads/components/Tabs/Meetings/ScheduleMeeting";
// import CreateTaskDrawer from "../../Leads/components/Tabs/Task/CreateTaskDrawer";

// import api from "../../../services/api";

// export default function CompanyLeftPanel() {
//   const { companyId } = useParams();

//   const [company, setCompany] = useState(null);
//   const [activeDrawer, setActiveDrawer] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   // ============================================================
//   // FETCH COMPANY
//   // ============================================================

//   useEffect(() => {
//     if (!companyId) return;

//     const fetchCompany = async () => {
//       try {
//         const response = await api.get(
//           `/companies/${companyId}/`
//         );

//         console.log(
//           "COMPANY DATA:",
//           response.data
//         );

//         setCompany(response.data);
//       } catch (error) {
//         console.error(
//           "ERROR FETCHING COMPANY:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     fetchCompany();
//   }, [companyId]);

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (!company) {
//     return <div>Loading company...</div>;
//   }

//   // ============================================================
//   // COMPANY DETAILS
//   // ============================================================

//   const companyDetails = [
//     {
//       label: "Company Domain Name",
//       value: company.domain_name || "-",
//     },
//     {
//       label: "Company Name",
//       value: company.company_name || "-",
//     },
//     {
//       label: "Industry",
//       value: company.industry || "-",
//     },
//     {
//       label: "Phone Number",
//       value: company.phone_number || "-",
//     },
//     {
//       label: "Company Owner",
//       value: company.company_owner_name || "-",
//     },
//     {
//       label: "City",
//       value: company.city || "-",
//     },
//     {
//       label: "Country/Region",
//       value: company.country_region || "-",
//     },
//     {
//       label: "No. of Employees",
//       value: company.no_of_employees || "-",
//     },
//     {
//       label: "Annual Revenue",
//       value: company.annual_revenue || "-",
//     },
//     {
//       label: "Created Date",
//       value: company.created_date || "-",
//     },
//   ];

//   // ============================================================
//   // LEFT PANEL DATA
//   // ============================================================

//   const leftPanelData = {
//     profile: {
//       name: company.company_name || "Company",
//       subTitle: company.industry || "",
//       email: company.domain_name || "",
//     },

//     showProfileEdit: true,
//     showProfileImage: true,

//     sectionTitle: "About this Company",

//     leadDetails: companyDetails,

//     summaryTitle: "AI Company Summary",

//     summaryText:
//       `The company "${company.company_name}" currently has no associated conversation, call, or note transcripts.`,
//   };

//   // ============================================================
//   // CLOSE DRAWER
//   // ============================================================

//   const closeDrawer = () => {
//     setActiveDrawer(null);
//   };

//   // ============================================================
//   // ACTIVITY CREATED
//   // ============================================================

//   const handleActivityCreated = () => {
//     setActiveDrawer(null);

//     setRefreshKey((prev) => prev + 1);
//   };

//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <>
//       <CommonEntityHeader
//         title="Companies"
//         leftPanelData={leftPanelData}

//         // ======================================================
//         // AI SUMMARY
//         // ======================================================

//         module="company"
//         objectId={companyId}
//         crmData={company}

//         // ======================================================
//         // ACTIONS
//         // ======================================================

//         onCallClick={() => {
//           setActiveDrawer("call");
//         }}

//         onNoteClick={() => {
//           setActiveDrawer("note");
//         }}

//         onEmailClick={() => {
//           setActiveDrawer("email");
//         }}

//         onTaskClick={() => {
//           setActiveDrawer("task");
//         }}

//         onMeetingClick={() => {
//           setActiveDrawer("meeting");
//         }}
//       >
//         <Outlet
//           context={{
//             refreshKey,
//           }}
//         />
//       </CommonEntityHeader>

//       {/* ========================================================
//           CALL
//       ======================================================== */}

//       <CreateLogCall
//         open={activeDrawer === "call"}
//         onClose={closeDrawer}
//         relatedModule="company"
//         objectId={companyId}
//         connectedName={company.company_name}
//         onCallCreated={handleActivityCreated}
//       />

//       {/* ========================================================
//           NOTE
//       ======================================================== */}

//       <Createnote
//         open={activeDrawer === "note"}
//         onClose={closeDrawer}
//         module="company"
//         moduleId={companyId}
//         onSuccess={handleActivityCreated}
//       />

//       {/* ========================================================
//           EMAIL
//       ======================================================== */}

//       <NewEmailDialog
//         open={activeDrawer === "email"}
//         onClose={closeDrawer}
//         relatedModule="company"
//         objectId={companyId}
//         onEmailCreated={handleActivityCreated}
//       />

//       {/* ========================================================
//           TASK
//       ======================================================== */}

//       <CreateTaskDrawer
//         open={activeDrawer === "task"}
//         onClose={closeDrawer}
//         module="company"
//         moduleId={companyId}
//         onTaskCreated={handleActivityCreated}
//       />

//       {/* ========================================================
//           MEETING
//       ======================================================== */}

//       <ScheduleMeeting
//         open={activeDrawer === "meeting"}
//         onClose={closeDrawer}
//         relatedModule="company"
//         objectId={companyId}
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

export default function CompanyLeftPanel() {
  const { companyId } = useParams();

  const [company, setCompany] = useState(null);
  const [activeDrawer, setActiveDrawer] = useState(null);

  // Used to refresh activity details
  const [refreshKey, setRefreshKey] = useState(0);

  // =========================================================
  // FETCH COMPANY
  // =========================================================

  useEffect(() => {
    if (!companyId) return;

    const fetchCompany = async () => {
      try {
        const response = await api.get(
          `/companies/${companyId}/`
        );

        console.log(
          "COMPANY DATA:",
          response.data
        );

        setCompany(response.data);
      } catch (error) {
        console.error(
          "ERROR FETCHING COMPANY:",
          error.response?.data ||
            error.message
        );
      }
    };

    fetchCompany();
  }, [companyId]);

  // =========================================================
  // LOADING
  // =========================================================

  if (!company) {
    return <div>Loading company...</div>;
  }

  // =========================================================
  // COMPANY DETAILS
  // =========================================================

  const companyDetails = [
    {
      label: "Company Domain Name",
      value: company.domain_name || "-",
    },
    {
      label: "Company Name",
      value: company.company_name || "-",
    },
    {
      label: "Industry",
      value: company.industry || "-",
    },
    {
      label: "Phone Number",
      value: company.phone_number || "-",
    },
    {
      label: "Company Owner",
      value:
        company.company_owner_name || "-",
    },
    {
      label: "City",
      value: company.city || "-",
    },
    {
      label: "Country/Region",
      value:
        company.country_region || "-",
    },
    {
      label: "No. of Employees",
      value:
        company.no_of_employees || "-",
    },
    {
      label: "Annual Revenue",
      value:
        company.annual_revenue || "-",
    },
    {
      label: "Created Date",
      value:
        company.created_date || "-",
    },
  ];

  // =========================================================
  // LEFT PANEL DATA
  // =========================================================

  const leftPanelData = {
    profile: {
      name:
        company.company_name ||
        "Company",

      subTitle:
        company.industry || "",

      email:
        company.domain_name || "",
    },

    showProfileEdit: true,

    showProfileImage: true,

    sectionTitle: "About this Company",

    leadDetails: companyDetails,

    summaryTitle: "AI Company Summary",

    summaryText:
      `The company "${company.company_name}" currently has no associated conversation, call, or note transcripts.`,
  };

  // =========================================================
  // CLOSE DRAWER
  // =========================================================

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  // =========================================================
  // ACTIVITY CREATED
  // =========================================================

  const handleActivityCreated = (
    activityData
  ) => {
    console.log(
      "ACTIVITY CREATED:",
      activityData
    );

    // Close the currently opened activity drawer
    setActiveDrawer(null);

    // Trigger activity details refresh
    setRefreshKey(
      (prev) => prev + 1
    );
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <CommonEntityHeader
        title="Companies"
        leftPanelData={leftPanelData}
        module="company"
        objectId={companyId}
        crmData={company}

        // =====================================================
        // ACTIVITY BUTTONS
        // =====================================================

        onCallClick={() =>
          setActiveDrawer("call")
        }

        onNoteClick={() =>
          setActiveDrawer("note")
        }

        onEmailClick={() =>
          setActiveDrawer("email")
        }

        onTaskClick={() =>
          setActiveDrawer("task")
        }

        onMeetingClick={() =>
          setActiveDrawer("meeting")
        }
      >
        {/* ===================================================
            CHILD ROUTES
            refreshKey is passed through Outlet context
        =================================================== */}

        <Outlet
          context={{
            refreshKey,
          }}
        />
      </CommonEntityHeader>

      {/* =====================================================
          CALL
      ===================================================== */}

      <CreateLogCall
        open={
          activeDrawer === "call"
        }
        onClose={closeDrawer}
        relatedModule="company"
        objectId={companyId}
        connectedName={
          company.company_name
        }
        onCallCreated={
          handleActivityCreated
        }
      />

      {/* =====================================================
          NOTE
      ===================================================== */}

      <Createnote
        open={
          activeDrawer === "note"
        }
        onClose={closeDrawer}
        module="company"
        moduleId={companyId}
        onSuccess={
          handleActivityCreated
        }
      />

      {/* =====================================================
          EMAIL
      ===================================================== */}

      <NewEmailDialog
        open={
          activeDrawer === "email"
        }
        onClose={closeDrawer}
        relatedModule="company"
        objectId={companyId}
        onEmailCreated={
          handleActivityCreated
        }
      />

      {/* =====================================================
          TASK
      ===================================================== */}

      <CreateTaskDrawer
        open={
          activeDrawer === "task"
        }
        onClose={closeDrawer}
        module="company"
        moduleId={companyId}
        onTaskCreated={
          handleActivityCreated
        }
      />

      {/* =====================================================
          MEETING
      ===================================================== */}

      <ScheduleMeeting
        open={
          activeDrawer === "meeting"
        }
        onClose={closeDrawer}
        relatedModule="company"
        objectId={companyId}

        // IMPORTANT:
        // ScheduleMeeting calls this after successful POST
        onMeetingCreated={
          handleActivityCreated
        }
      />
    </>
  );
}


