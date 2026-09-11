


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
// import api from "../../../services/api";

// export default function CompanyLeftPanel({ children , onCallCreated}) {
//   const { companyId } = useParams();

//   const [company, setCompany] = useState(null);
//   const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

//   useEffect(() => {
//    if (!companyId) return;

//     const fetchCompany = async () => {
//       try {
//         const response = await api.get(`/companies/${companyId}/`);

//         console.log("Company loaded:", response.data);

//         setCompany(response.data);
//       } catch (error) {
//         console.error(
//           "Failed to fetch company:",
//           error.response?.data || error
//         );
//       }
//     };

//     fetchCompany();
//   }, [companyId]);

//   if (!company) {
//     return <div>Loading company...</div>;
//   }

//   const companyDetails = [
//   {
//     label: "Company Domain Name",
//     value: company.domain_name || "-",
//   },
//   {
//     label: "Company Name",
//     value: company.company_name || "-",
//   },
//   {
//     label: "Industry",
//     value: company.industry || "-",
//   },
//   {
//     label: "Phone Number",
//     value: company.phone_number || "-",
//   },
//   {
//     label: "Company Owner",
//     value: company.company_owner_name || "-",
//   },
//   {
//     label: "City",
//     value: company.city || "-",
//   },
//   {
//     label: "Country/Region",
//     value: company.country_region || "-",
//   },
//   {
//     label: "No. of Employees",
//     value: company.no_of_employees || "-",
//   },
//   {
//     label: "Annual Revenue",
//     value: company.annual_revenue || "-",
//   },
//   {
//     label: "Created Date",
//     value: company.created_date || "-",
//   },
// ];
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

//   return (
//     <>
//       <CommonEntityHeader
//         title="Companies"
//         leftPanelData={leftPanelData}
//         onCallClick={() => setOpenCreateLogCall(true)}
//       >
//         {children}
//       </CommonEntityHeader>

//       {/* Existing Log Call drawer */}
//       {/* <CreateLogCall
//         open={openCreateLogCall}
//         onClose={() => setOpenCreateLogCall(false)}
//         relatedModule="company"
//         objectId={id}
//         connectedName={company.company_name}
//       /> */}

//       <CreateLogCall
//   open={openCreateLogCall}
//   onClose={() => setOpenCreateLogCall(false)}
//   relatedModule="company"
//   objectId={companyId}
//   connectedName={company.company_name}
//   onCallCreated={async (createdCall) => {
//     setOpenCreateLogCall(false);

//     if (onCallCreated) {
//       await onCallCreated(createdCall);
//     }
//   }}
// />
//     </>
//   );
// }


import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import CommonEntityHeader from "../../../Components/common/CommonEntityHeader"; 
import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall"; 
import Createnote from "../../Leads/components/Tabs/Note/Createnote"; 
import NewEmailDialog from "../../Leads/components/Tabs/Emails/NewEmailDialog"; 
import ScheduleMeeting from 
"../../Leads/components/Tabs/Meetings/ScheduleMeeting"; 
import CreateTaskDrawer from "../../Leads/components/Tabs/Task/CreateTaskDrawer"; 
import api from "../../../services/api"; 
export default function CompanyLeftPanel({ 
children, 
onCallCreated, 
onNoteCreated, 
onEmailCreated, 
onTaskCreated, 
}) { 
// ======================================== 
// COMPANY ID 
// ======================================== 
const { companyId } = useParams(); 
// ======================================== 
// COMPANY DATA 
// ======================================== 
const [company, setCompany] = useState(null); 
// ======================================== 
// ACTIVE DRAWER 
// ======================================== 
// Possible values: 
// "call" 
// "note" 
// "email" 
// "task" 
// "meeting" 
// null 
const [activeDrawer, setActiveDrawer] = useState(null); 
// ======================================== 
// FETCH COMPANY 
// ======================================== 
useEffect(() => { 
if (!companyId) return; 
const fetchCompany = async () => { 
try { 
const response = await api.get( 
`/companies/${companyId}/` 
); 
console.log( 
"Company loaded:", 
response.data 
); 
setCompany(response.data); 
} catch (error) { 
console.error( 
"Failed to fetch company:", 
error.response?.data || error 
); 
} 
}; 
fetchCompany(); 
}, [companyId]); 
// ======================================== 
// LOADING 
// ======================================== 
if (!company) { 
return <div>Loading company...</div>; 
} 
// ======================================== 
// COMPANY DETAILS 
// ======================================== 
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
// ======================================== 
// LEFT PANEL DATA 
// ======================================== 
const leftPanelData = { 
profile: { 
name: company.company_name, 
subTitle: company.industry, 
email: company.domain_name, 
}, 
showProfileEdit: true, 
showProfileImage: true, 
sectionTitle: "About this Company", 
leadDetails: companyDetails, 
summaryTitle: "AI Company Summary", 
summaryText: `The company "${company.company_name}" currently has no 
associated conversation, call, or note transcripts.`, 
}; 
// ======================================== 
// CLOSE ACTIVE DRAWER 
// ======================================== 
const closeDrawer = () => { 
setActiveDrawer(null); 
}; 
// ======================================== 
// CALL CREATED 
// ======================================== 
const handleCallCreated = async ( 
createdCall 
) => { 
console.log( 
"Company call created:", 
createdCall 
); 
setActiveDrawer(null); 
if (onCallCreated) { 
      await onCallCreated(createdCall); 
    } 
  }; 
 
  // ======================================== 
  // NOTE CREATED 
  // ======================================== 
 
  const handleNoteCreated = async ( 
    createdNote 
  ) => { 
    console.log( 
      "Company note created:", 
      createdNote 
    ); 
 
    setActiveDrawer(null); 
 
    if (onNoteCreated) { 
      await onNoteCreated(createdNote); 
    } 
  }; 
 
  // ======================================== 
  // EMAIL CREATED 
  // ======================================== 
 
  const handleEmailCreated = async ( 
    createdEmail 
  ) => { 
    console.log( 
      "Company email created:", 
      createdEmail 
    ); 
 
    setActiveDrawer(null); 
 
    if (onEmailCreated) { 
      await onEmailCreated(createdEmail); 
    } 
}; 
// ======================================== 
// TASK CREATED 
// ======================================== 
const handleTaskCreated = async ( 
createdTask 
) => { 
console.log( 
"Company task created:", 
createdTask 
); 
setActiveDrawer(null); 
if (onTaskCreated) { 
await onTaskCreated(createdTask); 
} 
}; 
// ======================================== 
// UI 
// ======================================== 
return ( 
<> 
{/* ================================== 
COMPANY HEADER 
================================== */} 
<CommonEntityHeader 
title="Companies" 
leftPanelData={leftPanelData} 
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
        {children} 
      </CommonEntityHeader> 
 
      {/* ================================== 
          CREATE CALL 
      ================================== */} 
 
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
          handleCallCreated 
        } 
      /> 
 
      {/* ================================== 
          CREATE NOTE 
      ================================== */} 
 
      <Createnote 
        open={ 
          activeDrawer === "note" 
        } 
onClose={closeDrawer} 
module="company" 
moduleId={companyId} 
onSuccess={ 
handleNoteCreated 
} 
/> 
{/* ================================== 
CREATE EMAIL 
================================== */} 
<NewEmailDialog 
open={ 
activeDrawer === "email" 
} 
onClose={closeDrawer} 
relatedModule="company" 
objectId={companyId} 
onEmailCreated={ 
handleEmailCreated 
} 
/> 
{/* ================================== 
CREATE TASK 
================================== */} 
<CreateTaskDrawer 
open={ 
activeDrawer === "task" 
} 
onClose={closeDrawer} 
module="company" 
moduleId={companyId} 
onTaskCreated={ 
handleTaskCreated 
} 
/> 
{/* ================================== 
SCHEDULE MEETING 
================================== */} 
<ScheduleMeeting 
open={ 
activeDrawer === "meeting" 
} 
onClose={closeDrawer} 
relatedModule="company" 
objectId={companyId} 
/> 
</> 
); 
} 