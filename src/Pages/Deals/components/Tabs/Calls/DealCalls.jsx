import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";

import DealLeftPanel from "../../DealLeftPanel";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { getDealTabs } from "../DealTabs";

import api from "../../../../../services/api";

import {
  startDirectCall,
  startBridgeCall,
} from "../../../../../services/callService";

export default function DealCalls() {
  const { dealId } = useParams();

  // =====================================================
  // STATE
  // =====================================================

  const [activeTab, setActiveTab] = useState("Calls");

  const [deal, setDeal] = useState(null);

  const [calls, setCalls] = useState([]);

  const [loading, setLoading] = useState(true);

  const [calling, setCalling] = useState(false);

  // =====================================================
  // CALL MODE
  //
  // direct:
  // CRM → Twilio → Customer
  //
  // bridge:
  // CRM → Twilio → CRM User → Customer
  //
  // CURRENTLY USING DIRECT BECAUSE TWILIO IS TRIAL.
  //
  // AFTER TWILIO UPGRADE:
  //
  // const [callMode] = useState("bridge");
  // =====================================================

  const [callMode] = useState("direct");

  // =====================================================
  // FETCH DEAL
  // =====================================================

  const fetchDeal = async () => {
    if (!dealId) {
      setDeal(null);
      return;
    }

    try {
      const response = await api.get(
        `/deals/${dealId}/`
      );

      console.log(
        "DEAL DETAILS:",
        response.data
      );

      setDeal(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING DEAL:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setDeal(null);
    }
  };

  // =====================================================
  // SORT CALLS - LATEST FIRST
  // =====================================================

  const sortCallsLatestFirst = (callList) => {
    return [...callList].sort((a, b) => {
      const dateTimeA = new Date(
        `${a?.date || ""}T${a?.time || "00:00:00"}`
      ).getTime();

      const dateTimeB = new Date(
        `${b?.date || ""}T${b?.time || "00:00:00"}`
      ).getTime();

      if (
        !Number.isNaN(dateTimeA) &&
        !Number.isNaN(dateTimeB)
      ) {
        return dateTimeB - dateTimeA;
      }

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
  // FETCH DEAL CALLS
  // =====================================================

  const fetchCalls = async () => {
    if (!dealId) {
      setCalls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/activities/activity/deal/${dealId}/call/`
      );

      console.log(
        "DEAL CALLS API RESPONSE:",
        response.data
      );

      const callData =
        Array.isArray(response.data)
          ? response.data
          : Array.isArray(
              response.data?.activities
            )
          ? response.data.activities
          : [];

      console.log(
        "RAW DEAL CALL DATA:",
        callData
      );

      const sortedCalls =
        sortCallsLatestFirst(
          callData
        );

      console.log(
        "SORTED DEAL CALL DATA:",
        sortedCalls
      );

      console.log(
        "DEAL CALL IDS:",
        sortedCalls.map((call) => ({
          id: call?.id,
          date: call?.date,
          time: call?.time,
          created_at:
            call?.created_at,
          call_outcome:
            call?.call_outcome,
          twilio_status:
            call?.twilio_status,
        }))
      );

      setCalls(sortedCalls);
    } catch (error) {
      console.error(
        "ERROR FETCHING DEAL CALLS:",
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
    if (!dealId) {
      setDeal(null);
      setCalls([]);
      setLoading(false);
      return;
    }

    fetchDeal();
    fetchCalls();
  }, [dealId]);

  // =====================================================
  // CALL CREATED
  // =====================================================

  const handleCallCreated = async () => {
    console.log(
      "DEAL CALL CREATED - REFRESHING CALLS..."
    );

    await fetchCalls();

    // Give Twilio time to update status/duration.
    setTimeout(async () => {
      console.log(
        "REFRESHING DEAL CALLS AFTER TWILIO UPDATE..."
      );

      await fetchCalls();
    }, 3000);
  };

  // =====================================================
  // GET ASSOCIATED LEAD NAME
  // =====================================================

  const leadName =
    deal?.lead_name ||
    deal?.lead?.name ||
    `${deal?.lead?.first_name || ""} ${
      deal?.lead?.last_name || ""
    }`.trim() ||
    "Unknown";

  // =====================================================
  // GET ASSOCIATED LEAD PHONE
  // =====================================================

  const leadPhone =
    deal?.lead_phone ||
    deal?.lead?.phone_number ||
    deal?.lead?.phone ||
    deal?.lead?.mobile ||
    "";

  // =====================================================
  // MAKE PHONE CALL
  //
  // DIRECT:
  // CRM → Django → Twilio → Customer
  //
  // BRIDGE:
  // CRM → Django → Twilio → CRM User → Customer
  // =====================================================

  const handleMakePhoneCall = async () => {
    if (!dealId) {
      alert("Deal ID is missing.");
      return;
    }

    if (calling) {
      return;
    }

    // =================================================
    // CHECK LEAD PHONE
    // =================================================

    if (!leadPhone) {
      alert(
        "Lead phone number is not available for this deal."
      );

      return;
    }

    try {
      setCalling(true);

      console.log(
        "===================================="
      );

      console.log(
        "STARTING DEAL TWILIO CALL"
      );

      console.log(
        "Deal ID:",
        dealId
      );

      console.log(
        "Lead Name:",
        leadName
      );

      console.log(
        "Lead Phone:",
        leadPhone
      );

      console.log(
        "Call Mode:",
        callMode
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
          "deal",
          Number(dealId)
        );
      }

      // =================================================
      // BRIDGE CALL
      //
      // CRM → Twilio → CRM USER → CUSTOMER
      // =================================================

      else if (callMode === "bridge") {
        response = await startBridgeCall(
          "deal",
          Number(dealId)
        );
      }

      // =================================================
      // INVALID CALL MODE
      // =================================================

      else {
        throw new Error(
          `Invalid call mode: ${callMode}`
        );
      }

      console.log(
        "DEAL TWILIO CALL RESPONSE:",
        response
      );

      // =================================================
      // IMMEDIATE REFRESH
      // =================================================

      await fetchCalls();

      // =================================================
      // REFRESH AFTER TWILIO UPDATE
      // =================================================

      setTimeout(async () => {
        console.log(
          "REFRESHING DEAL CALL DETAILS AFTER TWILIO..."
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
        "ERROR STARTING DEAL PHONE CALL:",
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
    <DealLeftPanel
      onCallCreated={handleCallCreated}
    >
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* =================================================
            ACTIVITY TABS
        ================================================= */}

        <Box>
          <CommonActivityTabs
            tabs={getDealTabs(dealId)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Box>

        {/* =================================================
            CALL HEADER
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography variant="h6">
            Calls
          </Typography>

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

        {/* =================================================
            MONTH
        ================================================= */}

        <Typography variant="h6">
          June 2025
        </Typography>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress size={28} />
          </Box>
        ) : calls.length === 0 ? (
          /* ===============================================
             EMPTY STATE
          =============================================== */

          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
            }}
          >
            No calls found for this deal.
          </Typography>
        ) : (
          /* ===============================================
             CALL LIST
          =============================================== */

          calls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
            />
          ))
        )}
      </Box>
    </DealLeftPanel>
  );
}
