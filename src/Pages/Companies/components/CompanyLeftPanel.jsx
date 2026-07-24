import React, { useState } from "react";
import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";

export default function CompanyLeftPanel({ children }) {
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  const companyDetails = [
    {
      label: "Company Domain Name",
      value: "trustsphere.com",
    },
    {
      label: "Company Name",
      value: "TrustSphere",
    },
    {
      label: "Industry",
      value: "Real Estate",
    },
    {
      label: "Phone Number",
      value: "078 5432 8505",
    },
    {
      label: "Company Owner",
      value: "Brooklyn Simmons",
    },
    {
      label: "City",
      value: "Bangalore",
    },
    {
      label: "Country/Region",
      value: "India",
    },
    {
      label: "No. of Employees",
      value: "100-120",
    },
    {
      label: "Annual Revenue",
      value: "20,000,00,000.00",
    },
    {
      label: "Created Date",
      value: "04/08/2025 2:31 PM GMT+5:30",
    },
  ];

  const leftPanelData = {
    profile: {
      name: "TrustSphere",
      subTitle: "Real Estate",
      email: "trustsphere.com",
    },

     showProfileEdit: true, 

    showProfileImage: true,

    sectionTitle: "About this Company",

    leadDetails: companyDetails,

    summaryTitle: "AI Company Summary",

    summaryText:
      'The company "TechNova Solutions" currently has no associated conversation, call, or note transcripts.',
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
