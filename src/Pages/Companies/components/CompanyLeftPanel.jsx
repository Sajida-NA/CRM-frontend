// import React, { useState } from "react";
// import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
// import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";

// export default function CompanyLeftPanel({ children }) {
//   const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

//   const companyDetails = [
//     {
//       label: "Company Domain Name",
//       value: "trustsphere.com",
//     },
//     {
//       label: "Company Name",
//       value: "TrustSphere",
//     },
//     {
//       label: "Industry",
//       value: "Real Estate",
//     },
//     {
//       label: "Phone Number",
//       value: "078 5432 8505",
//     },
//     {
//       label: "Company Owner",
//       value: "Brooklyn Simmons",
//     },
//     {
//       label: "City",
//       value: "Bangalore",
//     },
//     {
//       label: "Country/Region",
//       value: "India",
//     },
//     {
//       label: "No. of Employees",
//       value: "100-120",
//     },
//     {
//       label: "Annual Revenue",
//       value: "20,000,00,000.00",
//     },
//     {
//       label: "Created Date",
//       value: "04/08/2025 2:31 PM GMT+5:30",
//     },
//   ];

//   const leftPanelData = {
//     profile: {
//       name: "TrustSphere",
//       subTitle: "Real Estate",
//       email: "trustsphere.com",
//     },

//      showProfileEdit: true, 

//     showProfileImage: true,

//     sectionTitle: "About this Company",

//     leadDetails: companyDetails,

//     summaryTitle: "AI Company Summary",

//     summaryText:
//       'The company "TechNova Solutions" currently has no associated conversation, call, or note transcripts.',
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

export default function CompanyLeftPanel({ children }) {

  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  useEffect(() => {

    if (!id) return;

    const fetchCompany = async () => {

      try {

        const response = await api.get(
          `/companies/${id}/`
        );

        setCompany(response.data);

      } catch (error) {

        console.error(
          "Failed to fetch company:",
          error
        );

      }

    };

    fetchCompany();

  }, [id]);


  if (!company) {
    return <div>Loading company...</div>;
  }


  const companyDetails = [
    {
      label: "Company Domain Name",
      value: company.domain_name,
    },
    {
      label: "Company Name",
      value: company.company_name,
    },
    {
      label: "Industry",
      value: company.industry,
    },
    {
      label: "Phone Number",
      value: company.phone_number,
    },
    {
      label: "Company Owner",
      value: company.company_owner_name,
    },
    {
      label: "City",
      value: company.city,
    },
    {
      label: "Country/Region",
      value: company.country_region,
    },
    {
      label: "No. of Employees",
      value: company.no_of_employees,
    },
    {
      label: "Annual Revenue",
      value: company.annual_revenue,
    },
    {
      label: "Created Date",
      value: company.created_date,
    },
  ];


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

    summaryText:
      `The company "${company.company_name}" currently has no associated conversation, call, or note transcripts.`,
  };


  return (
    <>
      <CommonEntityHeader
        title="Companies"
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