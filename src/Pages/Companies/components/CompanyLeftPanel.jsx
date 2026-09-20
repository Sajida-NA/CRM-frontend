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

   // Used to tell the current tab to refresh its data
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!companyId) return;

    const fetchCompany = async () => {
      try {
        const response = await api.get(`/companies/${companyId}/`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company:", error);
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

  const closeDrawer = () => {
    setActiveDrawer(null);
  };
  
    // Called after an activity is created
    const handleActivityCreated = () => {
    setActiveDrawer(null);

    // Tell the current tab to refresh its data
    // Increase the number
    // 0 → 1 → 2 → 3 ...
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <CommonEntityHeader
        title="Companies"
        leftPanelData={leftPanelData}
        onCallClick={() => setActiveDrawer("call")}
        onNoteClick={() => setActiveDrawer("note")}
        onEmailClick={() => setActiveDrawer("email")}
        onTaskClick={() => setActiveDrawer("task")}
        onMeetingClick={() => setActiveDrawer("meeting")}
      >
        <Outlet context={{ refreshKey }} />
      </CommonEntityHeader>

      <CreateLogCall
        open={activeDrawer === "call"}
        onClose={closeDrawer}
        relatedModule="company"
        objectId={companyId}
        connectedName={company.company_name}
        onCallCreated={handleActivityCreated}
      />

      <Createnote
        open={activeDrawer === "note"}
        onClose={closeDrawer}
        module="company"
        moduleId={companyId}
        onSuccess={handleActivityCreated}
      />

      <NewEmailDialog
        open={activeDrawer === "email"}
        onClose={closeDrawer}
        relatedModule="company"
        objectId={companyId}
        onEmailCreated={handleActivityCreated}
      />

      <CreateTaskDrawer
        open={activeDrawer === "task"}
        onClose={closeDrawer}
        module="company"
        moduleId={companyId}
        onTaskCreated={handleActivityCreated}
      />

      <ScheduleMeeting
        open={activeDrawer === "meeting"}
        onClose={closeDrawer}
        relatedModule="company"
        objectId={companyId}
      />
    </>
  );
}
