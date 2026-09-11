
import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "./CallCard";

import LeadsLeftPanel from "../../LeadsLeftPanel";
import { getLeadTabs } from "../LeadTabs";

import { getLeadById } from "../../../../../services/leads";
import api from "../../../../../services/api";

export default function Leadcalls() {
  const { leadId } = useParams();

  // =====================================================
  // STATE
  // =====================================================

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState(null);

  // NEW:
  // Used while the Twilio call is being started.
  const [calling, setCalling] = useState(false);

  // =====================================================
  // FETCH LEAD
  // =====================================================

  const fetchLead = async () => {
    if (!leadId) {
      setLead(null);
      return;
    }

    try {
      const response = await getLeadById(leadId);

      console.log("LEAD DETAILS:", response.data);

      setLead(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD:",
        error.response?.data || error.message
      );

      setLead(null);
    }
  };

  // =====================================================
  // FETCH CALLS
  // =====================================================

  const fetchCalls = async () => {
    if (!leadId) {
      setCalls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/lead/${leadId}/call/`
      );

      console.log(
        "LEAD CALLS API RESPONSE:",
        response.data
      );

      // Backend can return either:
      //
      // [
      //   {...},
      //   {...}
      // ]
      //
      // OR:
      //
      // {
      //   module: "lead",
      //   module_id: 5,
      //   activity_type: "call",
      //   activities: [...]
      // }

      const callData = Array.isArray(response.data)
        ? response.data
        : response.data?.activities || [];

      console.log(
        "CALL DATA FOR CARDS:",
        callData
      );

      setCalls(callData);
    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD CALLS:",
        error.response?.data || error.message
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    if (!leadId) {
      return;
    }

    fetchLead();
    fetchCalls();
  }, [leadId]);

  // =====================================================
  // CALL CREATED
  // =====================================================

  const handleCallCreated = async () => {
    console.log(
      "Call created. Refreshing calls..."
    );

    await fetchCalls();
  };

  // =====================================================
  // MAKE REAL TWILIO PHONE CALL
  //
  // Frontend sends ONLY:
  //
  // module
  // module_id
  //
  // Backend gets:
  //
  // - logged-in CRM user
  // - logged-in user's phone
  // - lead/customer phone
  // - Twilio credentials
  //
  // Backend endpoint:
  //
  // POST /api/activities/call/start/
  // =====================================================

  const handleMakePhoneCall = async () => {
    if (!leadId) {
      alert("Lead ID is missing.");
      return;
    }

    if (calling) {
      return;
    }

    // -----------------------------------------------------
    // Optional frontend validation
    // -----------------------------------------------------

    const customerPhone =
      lead?.phone_number ||
      lead?.phone ||
      "";

    if (!customerPhone) {
      alert(
        "Phone number is not available for this lead."
      );
      return;
    }

    try {
      setCalling(true);

      console.log(
        "Starting Twilio call for lead:",
        leadId
      );

      // ---------------------------------------------------
      // IMPORTANT:
      //
      // Do NOT send user phone number.
      // Do NOT send customer phone number.
      // Backend gets both.
      // ---------------------------------------------------

      const response = await api.post(
        "/activities/call/start/",
        {
          module: "lead",
          module_id: Number(leadId),
        }
      );

      console.log(
        "TWILIO CALL START RESPONSE:",
        response.data
      );

      // ---------------------------------------------------
      // Refresh calls
      //
      // This allows the newly-created CallCard to appear.
      // ---------------------------------------------------

      await fetchCalls();

      alert(
        response.data?.message ||
          "Your phone call has been started."
      );
    } catch (error) {
      console.error(
        "ERROR STARTING PHONE CALL:",
        error.response?.data ||
          error.message
      );

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to start phone call.";

      alert(errorMessage);
    } finally {
      setCalling(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div>

      {/* =================================================
          LEAD LEFT PANEL

          Existing drawer functionality remains unchanged.

          LeadsLeftPanel can continue to handle:

          onCallCreated={handleCallCreated}

          and its normal CreateLogCall drawer.
      ================================================= */}

      <LeadsLeftPanel
        leadId={leadId}
        onCallCreated={handleCallCreated}
      >

        <Box
          sx={{
            p: 3,
            mx: -2,
          }}
        >

          {/* =============================================
              ACTIVITY TABS
          ============================================== */}

          <CommonActivityTabs
            tabs={getLeadTabs(leadId)}
            activeTab="Calls"
          />

          {/* =============================================
              HEADER
          ============================================== */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              mb: 2,
            }}
          >

            <Typography variant="h6">
              Calls
            </Typography>

            {/* ==========================================
                MAKE A PHONE CALL

                This button starts the REAL Twilio flow.

                It does NOT open CreateLogCall.
            ========================================== */}

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

          {/* =============================================
              LOADING
          ============================================== */}

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* =============================================
              EMPTY STATE
          ============================================== */}

          {!loading && calls.length === 0 && (
            <Typography
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              No calls found for this lead.
            </Typography>
          )}

          {/* =============================================
              CALL LIST
          ============================================== */}

          {!loading && calls.length > 0 && (
            <Box>
              {calls.map((call) => (
                <CallCard
                  key={call.id}
                  call={call}
                />
              ))}
            </Box>
          )}

        </Box>

      </LeadsLeftPanel>

    </div>
  );
}
