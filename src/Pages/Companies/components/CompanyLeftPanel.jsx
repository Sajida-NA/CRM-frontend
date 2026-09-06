


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CreateLogCall from "../../Leads/components/Tabs/Calls/CreateLogCall";
import api from "../../../services/api";

export default function CompanyLeftPanel({ children , onCallCreated}) {
  const { companyId } = useParams();

  const [company, setCompany] = useState(null);
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  useEffect(() => {
   if (!companyId) return;

    const fetchCompany = async () => {
      try {
        const response = await api.get(`/companies/${companyId}/`);

        console.log("Company loaded:", response.data);

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

  if (!company) {
    return <div>Loading company...</div>;
  }

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
    value: company.company_owner_name || "-",
  },
  {
    label: "City",
    value: company.city || "-",
  },
  {
    label: "Country/Region",
    value: company.country_region || "-",
  },
  {
    label: "No. of Employees",
    value: company.no_of_employees || "-",
  },
  {
    label: "Annual Revenue",
    value: company.annual_revenue || "-",
  },
  {
    label: "Created Date",
    value: company.created_date || "-",
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

    summaryText: `The company "${company.company_name}" currently has no associated conversation, call, or note transcripts.`,
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

      {/* Existing Log Call drawer */}
      {/* <CreateLogCall
        open={openCreateLogCall}
        onClose={() => setOpenCreateLogCall(false)}
        relatedModule="company"
        objectId={id}
        connectedName={company.company_name}
      /> */}

      <CreateLogCall
  open={openCreateLogCall}
  onClose={() => setOpenCreateLogCall(false)}
  relatedModule="company"
  objectId={companyId}
  connectedName={company.company_name}
  onCallCreated={async (createdCall) => {
    setOpenCreateLogCall(false);

    if (onCallCreated) {
      await onCallCreated(createdCall);
    }
  }}
/>
    </>
  );
}