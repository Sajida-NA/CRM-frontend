import React, { useEffect, useState } from "react";

import {
  useParams,
  useOutletContext,
} from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { getCompanyTabs } from "../CompanyTabs";

import api from "../../../../../services/api";

import {
  startDirectCall,
  startBridgeCall,
} from "../../../../../services/callService";

export default function CompanyCalls() {
  const { companyId } = useParams();

  // ============================================================
  // REFRESH KEY FROM COMPANY LEFT PANEL
  // ============================================================

  const { refreshKey } = useOutletContext();

  // ============================================================
  // STATE
  // ============================================================

  const [company, setCompany] = useState(null);

  const [calls, setCalls] = useState([]);

  const [loading, setLoading] = useState(true);

  const [calling, setCalling] = useState(false);

  // ============================================================
  // SNACKBAR
  // ============================================================

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ============================================================
  // CALL MODE
  //
  // direct:
  // CRM → Django → Twilio → Customer
  //
  // bridge:
  // CRM → Django → Twilio → CRM User → Customer
  //
  // CURRENTLY USING DIRECT BECAUSE TWILIO IS TRIAL.
  // ============================================================

  const [callMode] = useState("direct");

  // ============================================================
  // DEBUG
  // ============================================================

  console.log(
    "========== COMPANY CALLS =========="
  );

  console.log(
    "Company ID:",
    companyId
  );

  console.log(
    "Current URL:",
    window.location.pathname
  );

  console.log(
    "Refresh Key:",
    refreshKey
  );

  // ============================================================
  // FETCH COMPANY
  // ============================================================

  const fetchCompany = async () => {
    if (!companyId) {
      console.error(
        "Company ID is missing"
      );

      setCompany(null);

      return;
    }

    try {
      const response = await api.get(
        `/companies/${companyId}/`
      );

      console.log(
        "COMPANY RESPONSE:",
        response.data
      );

      setCompany(response.data);
    } catch (error) {
      console.error(
        "ERROR FETCHING COMPANY:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setCompany(null);
    }
  };

  // ============================================================
  // SORT CALLS - LATEST FIRST
  // ============================================================

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

  // ============================================================
  // FETCH COMPANY CALLS
  // ============================================================

  const fetchCalls = async () => {
    console.log(
      "========== FETCH COMPANY CALLS =========="
    );

    if (!companyId) {
      console.error(
        "Company ID is missing"
      );

      setCalls([]);

      setLoading(false);

      return;
    }

    try {
      setLoading(true);

      const url =
        `/activities/activity/company/${companyId}/call/`;

      console.log(
        "COMPANY CALL API:",
        url
      );

      const response = await api.get(url);

      console.log(
        "COMPANY CALLS API RESPONSE:",
        response.data
      );

      const companyCalls =
        Array.isArray(response.data)
          ? response.data
          : Array.isArray(
              response.data?.activities
            )
          ? response.data.activities
          : [];

      console.log(
        "COMPANY CALL DATA:",
        companyCalls
      );

      const sortedCalls =
        sortCallsLatestFirst(
          companyCalls
        );

      console.log(
        "SORTED COMPANY CALL DATA:",
        sortedCalls
      );

      console.log(
        "COMPANY CALL IDS:",
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
          call_mode:
            call?.call_mode,
          duration:
            call?.duration,
        }))
      );

      setCalls(sortedCalls);
    } catch (error) {
      console.error(
        "ERROR FETCHING COMPANY CALLS:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD / REFRESH
  // ============================================================

  useEffect(() => {
    if (!companyId) {
      setCompany(null);
      setCalls([]);
      setLoading(false);

      return;
    }

    fetchCompany();
    fetchCalls();
  }, [companyId, refreshKey]);

  // ============================================================
  // COMPANY NAME
  // ============================================================

  const companyName =
    company?.company_name ||
    company?.name ||
    `Company #${companyId}`;

  // ============================================================
  // COMPANY PHONE
  // ============================================================

  const companyPhone =
    company?.phone_number ||
    company?.phone ||
    company?.mobile ||
    company?.contact_phone ||
    "";

  // ============================================================
  // MAKE PHONE CALL
  // ============================================================

  const handleMakePhoneCall = async () => {
    // ========================================================
    // CHECK COMPANY ID
    // ========================================================

    if (!companyId) {
      setSnackbar({
        open: true,
        message: "Company ID is missing.",
        severity: "error",
      });

      return;
    }

    // ========================================================
    // PREVENT MULTIPLE CALL REQUESTS
    // ========================================================

    if (calling) {
      return;
    }

    // ========================================================
    // CHECK COMPANY PHONE
    // ========================================================

    if (!companyPhone) {
      setSnackbar({
        open: true,
        message:
          "Company phone number is not available.",
        severity: "error",
      });

      return;
    }

    try {
      setCalling(true);

      // ======================================================
      // SHOW CALLING MESSAGE
      // ======================================================

      setSnackbar({
        open: true,
        message: "Calling...",
        severity: "info",
      });

      console.log(
        "===================================="
      );

      console.log(
        "STARTING COMPANY TWILIO CALL"
      );

      console.log(
        "Company ID:",
        companyId
      );

      console.log(
        "Company Name:",
        companyName
      );

      console.log(
        "Company Phone:",
        companyPhone
      );

      console.log(
        "Call Mode:",
        callMode
      );

      console.log(
        "===================================="
      );

      let response;

      // ========================================================
      // DIRECT CALL
      //
      // CRM → Django → Twilio → Customer
      // ========================================================

      if (callMode === "direct") {
        response = await startDirectCall(
          "company",
          Number(companyId)
        );
      }

      // ========================================================
      // BRIDGE CALL
      //
      // CRM → Django → Twilio → CRM USER → CUSTOMER
      // ========================================================

      else if (callMode === "bridge") {
        response = await startBridgeCall(
          "company",
          Number(companyId)
        );
      }

      // ========================================================
      // INVALID CALL MODE
      // ========================================================

      else {
        throw new Error(
          `Invalid call mode: ${callMode}`
        );
      }

      console.log(
        "COMPANY TWILIO CALL RESPONSE:",
        response
      );

      // ========================================================
      // IMMEDIATE REFRESH
      // ========================================================

      await fetchCalls();

      // ========================================================
      // REFRESH AFTER TWILIO UPDATE
      // ========================================================

      setTimeout(async () => {
        console.log(
          "REFRESHING COMPANY CALL DETAILS AFTER TWILIO..."
        );

        await fetchCalls();
      }, 3000);

      // ========================================================
      // SUCCESS MESSAGE
      // ========================================================

      setSnackbar({
        open: true,
        message:
          response?.message ||
          response?.detail ||
          "Your phone call has been started.",
        severity: "success",
      });

    } catch (error) {
      console.error(
        "ERROR STARTING COMPANY PHONE CALL:",
        error?.response?.data ||
          error?.message ||
          error
      );

      // ========================================================
      // ERROR MESSAGE
      // ========================================================

      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to start phone call.";

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });

    } finally {
      setCalling(false);
    }
  };

  // ============================================================
  // CLOSE SNACKBAR
  // ============================================================

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box
      sx={{
        p: 3,
        mx: -2,
      }}
    >
      {/* ====================================================
          ACTIVITY TABS
      ==================================================== */}

      <CommonActivityTabs
        tabs={getCompanyTabs(companyId)}
      />

      {/* ====================================================
          CALL HEADER
      ==================================================== */}

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

      {/* ====================================================
          CALLS
      ==================================================== */}

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
        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
          }}
        >
          No calls found for this company.
        </Typography>
      ) : (
        calls.map((call) => (
          <CallCard
            key={call.id}
            call={call}
          />
        ))
      )}

      {/* ====================================================
          SNACKBAR
      ==================================================== */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={handleCloseSnackbar}
          sx={{
            width: "100%",
            minWidth: "280px",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}