

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import CommonEntityHeader from "../../../Components/common/CommonEntityHeader";
import CommonButton from "../../../Components/common/CommonButton";

import CreateLogCall from "./Tabs/Calls/CreateLogCall";
import Createnote from "./Tabs/Note/Createnote";
import NewEmailDialog from "./Tabs/Emails/NewEmailDialog";
import ScheduleMeeting from "./Tabs/Meetings/ScheduleMeeting";
import CreateTaskDrawer from "./Tabs/Task/CreateTaskDrawer";

import { getLeadById } from "../../../services/leads";

export default function LeadsLeftPanel({
  children,
  leadId,

  // Activity callbacks
  onCallCreated,
  onNoteCreated,
  onEmailCreated,
  onTaskCreated,
  onMeetingCreated,
}) {
  // ============================================================
  // STATE
  // ============================================================

  const [activeDrawer, setActiveDrawer] = useState(null);

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ============================================================
  // FETCH LEAD
  // ============================================================

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

  // ============================================================
  // LOADING
  // ============================================================

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

  // ============================================================
  // LEAD NOT FOUND
  // ============================================================

  if (!lead) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">
          Lead not found
        </Typography>
      </Box>
    );
  }

  // ============================================================
  // LEAD NAME
  // ============================================================

  const leadName =
    lead.name ||
    `${lead.first_name || ""} ${lead.last_name || ""}`.trim() ||
    "-";

  // ============================================================
  // LEAD DETAILS
  // ============================================================

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

  // ============================================================
  // CHECK CONVERTED STATUS
  // ============================================================

  const isConverted =
    lead.lead_status?.toLowerCase() === "converted";

  // ============================================================
  // CLOSE ACTIVE DRAWER
  // ============================================================

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  // ============================================================
  // CALL CREATED
  // ============================================================

  const handleCallCreated = async (createdCall) => {
    console.log("Lead call created:", createdCall);

    setActiveDrawer(null);

    if (onCallCreated) {
      await onCallCreated(createdCall);
    }
  };

  // ============================================================
  // NOTE CREATED
  // ============================================================

  const handleNoteCreated = async (createdNote) => {
    console.log("Lead note created:", createdNote);

    setActiveDrawer(null);

    if (onNoteCreated) {
      await onNoteCreated(createdNote);
    }
  };

  // ============================================================
  // EMAIL CREATED
  // ============================================================

  const handleEmailCreated = async (createdEmail) => {
    console.log("Lead email created:", createdEmail);

    setActiveDrawer(null);

    if (onEmailCreated) {
      await onEmailCreated(createdEmail);
    }
  };

  // ============================================================
  // TASK CREATED
  // ============================================================

  const handleTaskCreated = async (createdTask) => {
    console.log("Lead task created:", createdTask);

    setActiveDrawer(null);

    if (onTaskCreated) {
      await onTaskCreated(createdTask);
    }
  };

  // ============================================================
  // MEETING CREATED
  // ============================================================

  const handleMeetingCreated = async (createdMeeting) => {
    console.log("Lead meeting created:", createdMeeting);

    setActiveDrawer(null);

    if (onMeetingCreated) {
      await onMeetingCreated(createdMeeting);
    }
  };

  // ============================================================
  // LEFT PANEL DATA
  // ============================================================

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

  // ============================================================
  // CONVERT LEAD
  // ============================================================

  const handleConvert = () => {
    console.log("Converting Lead:", {
      id: leadId,
      name: leadName,
    });

    navigate("/dealslist", {
      state: {
        convertLeadId: leadId,
      },
    });
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* ======================================================
          COMMON ENTITY HEADER
      ====================================================== */}

      <CommonEntityHeader
        title="Leads"
        leftPanelData={leftPanelData}

        // ====================================================
        // CONVERT BUTTON
        // ====================================================

        action={
          !isConverted ? (
            <CommonButton onClick={handleConvert}>
              Convert
            </CommonButton>
          ) : null
        }

        // ====================================================
        // QUICK ACTIONS
        // ====================================================

        onCallClick={() => setActiveDrawer("call")}

        onNoteClick={() => setActiveDrawer("note")}

        onEmailClick={() => setActiveDrawer("email")}

        onTaskClick={() => setActiveDrawer("task")}

        onMeetingClick={() => setActiveDrawer("meeting")}
      >
        {children}
      </CommonEntityHeader>

      {/* ======================================================
          CREATE / LOG CALL
      ====================================================== */}

      <CreateLogCall
        open={activeDrawer === "call"}
        onClose={closeDrawer}
        relatedModule="lead"
        objectId={leadId}
        connectedName={leadName}
        onCallCreated={handleCallCreated}
      />

      {/* ======================================================
          CREATE NOTE
      ====================================================== */}

      <Createnote
        open={activeDrawer === "note"}
        onClose={closeDrawer}
        module="lead"
        moduleId={leadId}
        onSuccess={handleNoteCreated}
      />

      {/* ======================================================
          SEND EMAIL
      ====================================================== */}

      <NewEmailDialog
        open={activeDrawer === "email"}
        onClose={closeDrawer}
        relatedModule="lead"
        objectId={leadId}
        onEmailCreated={handleEmailCreated}
      />

      {/* ======================================================
          CREATE TASK
      ====================================================== */}

      <CreateTaskDrawer
        open={activeDrawer === "task"}
        onClose={closeDrawer}
        module="lead"
        moduleId={leadId}
        onTaskCreated={handleTaskCreated}
      />

      {/* ======================================================
          SCHEDULE MEETING
      ====================================================== */}

      <ScheduleMeeting
        open={activeDrawer === "meeting"}
        onClose={closeDrawer}
        relatedModule="lead"
        objectId={leadId}
        onMeetingCreated={handleMeetingCreated}
      />
    </>
  );
}


