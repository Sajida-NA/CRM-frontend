
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

import {
  startDirectCall,
  startBridgeCall,
} from "../../../../../services/callService";

import api from "../../../../../services/api";

export default function Leadcalls() {
  const { leadId } = useParams();

  // =====================================================
  // STATE
  // =====================================================

  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState(null);
  const [calling, setCalling] = useState(false);

  // =====================================================
  // CALL MODE
  //
  // direct:
  // CRM → Twilio → Customer
  //
  // bridge:
  // CRM → Twilio → CRM User → Customer
  // =====================================================

  const [callMode] = useState("bridge");

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

      console.log(
        "LEAD DETAILS:",
        response.data
      );

      setLead(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setLead(null);
    }
  };

  // =====================================================
  // SORT CALLS
  // =====================================================

  const sortCallsLatestFirst = (callList) => {
    return [...callList].sort((a, b) => {
      const dateTimeA = new Date(
        `${a?.date || ""}T${a?.time || "00:00:00"}`
      ).getTime();

      const dateTimeB = new Date(
        `${b?.date || ""}T${b?.time || "00:00:00"}`
      ).getTime();

      // If both dates are valid
      if (
        !Number.isNaN(dateTimeA) &&
        !Number.isNaN(dateTimeB)
      ) {
        return dateTimeB - dateTimeA;
      }

      // Fallback to created_at
      const createdA = new Date(
        a?.created_at || 0
      ).getTime();

      const createdB = new Date(
        b?.created_at || 0
      ).getTime();

      return createdB - createdA;
    });
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

      // =================================================
      // BACKEND CAN RETURN:
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
      //   module_id: 1,
      //   activity_type: "call",
      //   activities: [...]
      // }
      // =================================================

      const callData = Array.isArray(
        response.data
      )
        ? response.data
        : Array.isArray(
            response.data?.activities
          )
        ? response.data.activities
        : [];

      console.log(
        "RAW CALL DATA:",
        callData
      );

      // =================================================
      // SORT LATEST CALL FIRST
      // =================================================

      const sortedCalls =
        sortCallsLatestFirst(
          callData
        );

      console.log(
        "SORTED CALL DATA:",
        sortedCalls
      );

      console.log(
        "CALL IDS:",
        sortedCalls.map((call) => ({
          id: call?.id,
          date: call?.date,
          time: call?.time,
          created_at:
            call?.created_at,
          call_outcome:
            call?.call_outcome,
        }))
      );

      setCalls(sortedCalls);
    } catch (error) {
      console.error(
        "ERROR FETCHING LEAD CALLS:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (!leadId) {
      setCalls([]);
      setLead(null);
      setLoading(false);
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
      "CALL CREATED - REFRESHING CALLS..."
    );

    await fetchCalls();

    // Twilio may update status/duration
    // shortly after call creation.

    setTimeout(async () => {
      console.log(
        "REFRESHING CALLS AFTER TWILIO UPDATE..."
      );

      await fetchCalls();
    }, 3000);
  };

  // =====================================================
  // MAKE REAL TWILIO PHONE CALL
  // =====================================================

  const handleMakePhoneCall = async () => {
    if (!leadId) {
      alert(
        "Lead ID is missing."
      );

      return;
    }

    if (calling) {
      return;
    }

    // =================================================
    // CUSTOMER PHONE
    // =================================================

    const customerPhone =
      lead?.phone_number ||
      lead?.phone ||
      lead?.mobile ||
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
        "===================================="
      );

      console.log(
        "STARTING TWILIO CALL"
      );

      console.log(
        "Lead ID:",
        leadId
      );

      console.log(
        "Call Mode:",
        callMode
      );

      console.log(
        "Customer Phone:",
        customerPhone
      );

      console.log(
        "===================================="
      );

      let response;

      // =================================================
      // DIRECT CALL
      //
      // CRM → Twilio → Customer
      // =================================================

      if (callMode === "direct") {
        response = await startDirectCall(
          "lead",
          Number(leadId)
        );
      }

      // =================================================
      // BRIDGE CALL
      //
      // CRM → Twilio → CRM USER → CUSTOMER
      // =================================================

      else if (callMode === "bridge") {
        response = await startBridgeCall(
          "lead",
          Number(leadId)
        );
      }

      // =================================================
      // INVALID MODE
      // =================================================

      else {
        throw new Error(
          `Invalid call mode: ${callMode}`
        );
      }

      console.log(
        "TWILIO CALL START RESPONSE:",
        response
      );

      // =================================================
      // IMMEDIATE REFRESH
      // =================================================

      await fetchCalls();

      // =================================================
      // REFRESH AFTER TWILIO STATUS UPDATE
      // =================================================

      setTimeout(async () => {
        console.log(
          "REFRESHING CALL DETAILS AFTER TWILIO..."
        );

        await fetchCalls();
      }, 3000);

      alert(
        response?.message ||
          response?.detail ||
          "Your phone call has been started."
      );
    } catch (error) {
      console.error(
        "ERROR STARTING PHONE CALL:",
        error?.response?.data ||
          error?.message ||
          error
      );

      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
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
      <LeadsLeftPanel
        leadId={leadId}
        onCallCreated={
          handleCallCreated
        }
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
              justifyContent:
                "space-between",
              alignItems: "center",
              mt: 3,
              mb: 2,
            }}
          >
            <Typography variant="h6">
              Calls
            </Typography>

            <CommonButton
              variant="contained"
              onClick={
                handleMakePhoneCall
              }
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
                justifyContent:
                  "center",
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {/* =============================================
              EMPTY STATE
          ============================================== */}

          {!loading &&
            calls.length === 0 && (
              <Typography
                sx={{
                  py: 5,
                  textAlign: "center",
                  color:
                    "text.secondary",
                }}
              >
                No calls found for this
                lead.
              </Typography>
            )}

          {/* =============================================
              CALL LIST
          ============================================== */}

          {!loading &&
            calls.length > 0 && (
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

