



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import CompanyLeftPanel from "../../CompanyLeftPanel";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";

import { getCompanyTabs } from "../CompanyTabs";
import api from "../../../../../services/api";

export default function CompanyCalls() {
  const { companyId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");
  const [company, setCompany] = useState(null);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH COMPANY
  // ============================================================

  const fetchCompany = async () => {
    if (!companyId) return;

    try {
      const response = await api.get(
        `/companies/${companyId}/`
      );

//       const response = await api.get(
//   `/activities/activity/company/${companyId}/call/`
// );

      console.log("COMPANY:", response.data);

      setCompany(response.data);

    } catch (error) {
      console.error(
        "Error fetching company:",
        error.response?.data || error
      );

      setCompany(null);
    }
  };

  // ============================================================
  // FETCH COMPANY CALLS
  // ============================================================

  const fetchCalls = async () => {
    if (!companyId) {
      setCalls([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * Get activities belonging to THIS company.
       *
       * Example:
       * /activities/timeline/company/5/
       *
       * Then only keep activity_type === "call".
       */

      const response = await api.get(
        `/activities/timeline/company/${companyId}/`
      );

      
      // const response = await api.get(
      //   "/activities/call/"
      // );

      console.log(
        "COMPANY ACTIVITY TIMELINE:",
        response.data
      );

      const activities = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      // ========================================================
      // ONLY CALL ACTIVITIES
      // ========================================================

      const companyCalls = activities.filter(
        (activity) =>
          activity.activity_type === "call" &&
          activity.data
      );

      console.log(
        "COMPANY CALLS:",
        companyCalls
      );

      setCalls(companyCalls);

    } catch (error) {
      console.error(
        "Error fetching company calls:",
        error.response?.data || error
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
    if (!companyId) return;

    fetchCompany();
    fetchCalls();

  }, [companyId]);

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
    "";

  // ============================================================
  // MAKE PHONE CALL
  // ============================================================

  const handleMakePhoneCall = () => {
    if (!companyPhone) {
      alert(
        "Company phone number is not available."
      );

      return;
    }

    const phoneNumber =
      String(companyPhone).trim();

    const cleanPhoneNumber =
      phoneNumber.replace(/\s+/g, "");

    console.log(
      "Calling Company:",
      companyName
    );

    console.log(
      "Phone Number:",
      cleanPhoneNumber
    );

    window.location.href =
      `tel:${cleanPhoneNumber}`;
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <CompanyLeftPanel
      onCallCreated={fetchCalls}
    >
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
          activeTab={activeTab}
          onTabChange={setActiveTab}
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
          >
            Make a Phone Call
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

          calls.map((activity) => {

            /*
             * The actual Call information is inside:
             *
             * activity.data
             */

            const call = activity.data;

            return (
              <CallCard
                key={activity.id}
                call={{
                  ...call,

                  /*
                   * Company information
                   */

                  name: companyName,

                  /*
                   * Description / note
                   */

                  description:
                    call.note ||
                    "",

                  /*
                   * Call date
                   */

                  date:
                    call.date ||
                    call.created_at ||
                    "",

                  /*
                   * Call time
                   */

                  time:
                    call.time ||
                    "",

                  /*
                   * Outcome
                   */

                  call_outcome:
                    call.call_outcome ||
                    "",

                  /*
                   * Duration
                   */

                  duration:
                    call.duration !== null &&
                    call.duration !== undefined
                      ? Number(call.duration)
                      : null,
                }}
              />
            );
          })

        )}

      </Box>
    </CompanyLeftPanel>
  );
}

