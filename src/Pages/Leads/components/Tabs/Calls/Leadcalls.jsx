
import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CreateLogCall from "./CreateLogCall";
import CallCard from "./CallCard";

import LeadsLeftPanel from "../../LeadsLeftPanel";
import { getLeadTabs } from "../LeadTabs";

import api from "../../../../../services/api";


export default function Leadcalls() {

  const { leadId } = useParams();

  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);


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
      // BACKEND RETURNS:
      //
      // {
      //   module: "lead",
      //   module_id: 5,
      //   activity_type: "call",
      //   activities: [...]
      // }
      // =================================================

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
  // LOAD WHEN LEAD CHANGES
  // =====================================================

  useEffect(() => {

    fetchCalls();

  }, [leadId]);


  // =====================================================
  // CALL CREATED
  // =====================================================

  const handleCallCreated = async () => {

    console.log(
      "Call created. Refreshing calls..."
    );

    setOpenCreateLogCall(false);

    await fetchCalls();
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div>

      <LeadsLeftPanel leadId={leadId}>

        <Box
          sx={{
            p: 3,
            mx: -2,
          }}
        >

          {/* ============================================
              TABS
          ============================================ */}

          <CommonActivityTabs
            tabs={getLeadTabs(leadId)}
            activeTab="Calls"
          />


          {/* ============================================
              HEADER
          ============================================ */}

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


            <CommonButton
              variant="contained"
              onClick={() => setOpenCreateLogCall(true)}
            >
              Make a Phone Call
            </CommonButton>

          </Box>


          {/* ============================================
              LOADING
          ============================================ */}

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


          {/* ============================================
              EMPTY
          ============================================ */}

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


          {/* ============================================
              CALL LIST
          ============================================ */}

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


      {/* ================================================
          CREATE CALL DRAWER
      ================================================ */}

      <CreateLogCall
        open={openCreateLogCall}

        onClose={() =>
          setOpenCreateLogCall(false)
        }

        relatedModule="lead"

        objectId={leadId}

        onCallCreated={handleCallCreated}
      />

    </div>
  );
}