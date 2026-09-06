

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CommonButton from "../../../Components/common/CommonButton";
import CreateLogCall from "./Tabs/Calls/CreateLogCall";

import { getLeadById } from "../../../services/leads";

export default function LeadsLeftPanel({ children, leadId }) {
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);

        console.log("Fetching Lead ID:", leadId);

        const response = await getLeadById(leadId);

        console.log("Lead Details:", response.data);

        setLead(response.data);
      } catch (error) {
        console.error(
          "Error fetching lead:",
          error.response?.data || error.message
        );

        setLead(null);
      } finally {
        setLoading(false);
      }
    };

    if (leadId) {
      fetchLead();
    }
  }, [leadId]);

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Lead not found
  if (!lead) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">
          Lead not found
        </Typography>
      </Box>
    );
  }

  // Get lead name
  const leadName =
    lead.name ||
    `${lead.first_name || ""} ${lead.last_name || ""}`.trim() ||
    "-";

  // Dynamic lead details
  const leadDetails = [
    {
      label: "Email",
      value: lead.email || "-",
    },
    {
      label: "First Name",
      value: lead.first_name || "-",
    },
    {
      label: "Last Name",
      value: lead.last_name || "-",
    },
    {
      label: "Phone Number",
      value: lead.phone_number || "-",
    },
    {
      label: "Lead Status",
      value: lead.lead_status || "-",
    },
    {
      label: "Job Title",
      value: lead.job_title || "-",
    },
    {
      label: "Created Date",
      value: lead.created_date || "-",
    },
  ];

  const leftPanelData = {
    profile: {
      name: leadName,
      subTitle: lead.job_title || "",
      email: lead.email || "",
    },

    showProfileEdit: true,

    showProfileImage: true,

    sectionTitle: "About this lead",

    leadDetails,

    summaryTitle: "AI Lead Summary",

    summaryText:
      "There are no activities associated with this lead and further details are needed to provide a comprehensive summary.",
  };

  return (
    <>
      {/* <CommonEntityHeader
        title="Leads"
        leftPanelData={leftPanelData}
        action={<CommonButton>Convert</CommonButton>}
        onCallClick={() => setOpenCreateLogCall(true)}
      >
        {children}
      </CommonEntityHeader> */}

      <CommonEntityHeader
  title="Leads"
  leftPanelData={leftPanelData}
  action={
    <CommonButton onClick={() => navigate("/dealslist")}>
      Convert
    </CommonButton>
  }
  onCallClick={() => setOpenCreateLogCall(true)}
>
  {children}
</CommonEntityHeader>

      {/* Log Call Drawer */}
      <CreateLogCall
  open={openCreateLogCall}
  onClose={() => setOpenCreateLogCall(false)}
  relatedModule="lead"
  objectId={leadId}
  connectedName={leadName}
  onCallCreated={() => {
    setOpenCreateLogCall(false);
  }}
/>
    </>
  );
}