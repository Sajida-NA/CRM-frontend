<<<<<<< HEAD
=======


>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography, CircularProgress } from "@mui/material";

import DealLeftPanel from "../../DealLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { getDealTabs } from "../DealTabs";
import api from "../../../../../services/api";

export default function DealCalls() {
  const { dealId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");
  const [deal, setDeal] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  const [openCreateCall, setOpenCreateCall] = useState(false);

=======
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
  // ============================================================
  // FETCH DEAL
  // ============================================================

  const fetchDeal = async () => {
    if (!dealId) {
      return;
    }

    try {
      const response = await api.get(`/deals/${dealId}/`);

      console.log("DEAL RESPONSE:", response.data);

      setDeal(response.data);
    } catch (error) {
<<<<<<< HEAD
      console.error("ERROR FETCHING DEAL:", error.response?.data || error);
=======
      console.error(
        "ERROR FETCHING DEAL:",
        error.response?.data || error
      );
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f

      setDeal(null);
    }
  };

  // ============================================================
  // FETCH DEAL CALLS
  // ============================================================

  const fetchCalls = async () => {
    if (!dealId) {
      setCalls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
<<<<<<< HEAD
        `/activities/activity/deal/${dealId}/call/`,
      );

      console.log("DEAL CALLS API RESPONSE:", response.data);

      const dealCalls = response.data?.activities || [];

      console.log("DEAL CALL DATA:", dealCalls);
=======
        `/activities/activity/deal/${dealId}/call/`
      );

      console.log(
        "DEAL CALLS API RESPONSE:",
        response.data
      );

      const dealCalls = Array.isArray(response.data)
        ? response.data
        : response.data?.activities || [];

      console.log(
        "DEAL CALL DATA:",
        dealCalls
      );
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f

      setCalls(dealCalls);
    } catch (error) {
      console.error(
        "ERROR FETCHING DEAL CALLS:",
<<<<<<< HEAD
        error.response?.data || error,
=======
        error.response?.data || error
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    if (!dealId) {
      return;
    }

    fetchDeal();
    fetchCalls();
  }, [dealId]);

  // ============================================================
  // LEAD NAME
  // ============================================================

  const leadName =
    deal?.lead_name ||
    deal?.lead?.name ||
<<<<<<< HEAD
    `${deal?.lead?.first_name || ""} ${deal?.lead?.last_name || ""}`.trim() ||
    "Unknown";

  // ============================================================
  // DEAL NAME
  // ============================================================

  const dealName = deal?.deal_name || deal?.name || `Deal #${dealId}`;

=======
    `${deal?.lead?.first_name || ""} ${
      deal?.lead?.last_name || ""
    }`.trim() ||
    "Unknown";

>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
  // ============================================================
  // LEAD PHONE NUMBER
  // ============================================================

<<<<<<< HEAD
  const leadPhone = deal?.lead_phone || deal?.lead?.phone_number || "";
=======
  const leadPhone =
    deal?.lead_phone ||
    deal?.lead?.phone_number ||
    deal?.lead?.phone ||
    "";
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f

  // ============================================================
  // MAKE PHONE CALL
  // ============================================================

  const handleMakePhoneCall = () => {
    if (!leadPhone) {
      alert("Lead phone number is not available.");
<<<<<<< HEAD

=======
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
      return;
    }

    const phoneNumber = String(leadPhone).trim();

<<<<<<< HEAD
    const cleanPhoneNumber = phoneNumber.replace(/\s+/g, "");

    console.log("Calling Lead:", leadName);

    console.log("Phone Number:", cleanPhoneNumber);

    window.location.href = `tel:${cleanPhoneNumber}`;
  };

  // ============================================================
  // OPEN LOG CALL
  // ============================================================

  const handleOpenCreateCall = () => {
    setOpenCreateCall(true);
  };

  // ============================================================
  // CALL CREATED
  // ============================================================

  const handleCallCreated = async () => {
    setOpenCreateCall(false);

    await fetchCalls();
  };

=======
    const cleanPhoneNumber = phoneNumber.replace(
      /[^\d+]/g,
      ""
    );

    console.log("Calling Lead:", leadName);
    console.log("Phone Number:", cleanPhoneNumber);

    // IMPORTANT:
    // This only makes the actual phone call.
    // It does NOT open CreateLogCall drawer.
    window.location.href = `tel:${cleanPhoneNumber}`;
  };

>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
  // ============================================================
  // RENDER
  // ============================================================

  return (
<<<<<<< HEAD
    <DealLeftPanel>
=======
    <DealLeftPanel
      onCallCreated={fetchCalls}
    >
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* ====================================================
            ACTIVITY TABS
        ==================================================== */}

        <Box>
          <CommonActivityTabs
            tabs={getDealTabs(dealId)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Box>

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
<<<<<<< HEAD
          <Typography variant="h6">Calls</Typography>

          <CommonButton variant="contained" onClick={handleOpenCreateCall}>
=======
          <Typography variant="h6">
            Calls
          </Typography>

          <CommonButton
            variant="contained"
            onClick={handleMakePhoneCall}
          >
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
            Make a Phone Call
          </CommonButton>
        </Box>

        {/* ====================================================
            MONTH
        ==================================================== */}

<<<<<<< HEAD
        <Typography variant="h6">June 2025</Typography>
=======
        <Typography variant="h6">
          June 2025
        </Typography>
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f

        {/* ====================================================
            LOADING
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
            No calls found for this deal.
          </Typography>
        ) : (
<<<<<<< HEAD
          calls.map((call) => <CallCard key={call.id} call={call} />)
        )}
      </Box>

      {/* ======================================================
          CREATE / LOG CALL DRAWER
      ====================================================== */}

      <CreateLogCall
        open={openCreateCall}
        onClose={() => setOpenCreateCall(false)}
        relatedModule="deal"
        objectId={dealId}
        connectedName={dealName}
        onCallCreated={handleCallCreated}
      />
    </DealLeftPanel>
  );
}
=======
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
>>>>>>> 1011e65cdd73d614c29396060edf8d61202ec74f
