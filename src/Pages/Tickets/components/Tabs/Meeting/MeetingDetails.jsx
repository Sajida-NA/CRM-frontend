import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import { useParams } from "react-router-dom";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import ScheduleMeeting from "../../../../Leads/components/Tabs/Meetings/ScheduleMeeting";

import MeetingCard from "./MeetingCard";

import api from "../../../../../services/api";


export default function MeetingDetails({
  tabs,
}) {

  const { dealId } = useParams();

  const [
    activeTab,
    setActiveTab,
  ] = useState("Meetings");

  const [
    openCreateMeeting,
    setOpenCreateMeeting,
  ] = useState(false);

  const [
    meetings,
    setMeetings,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);


  // =========================================================
  // FETCH DEAL MEETINGS
  // =========================================================

  const fetchMeetings = async () => {

    if (!dealId) {

      console.error(
        "Deal ID not found"
      );

      return;
    }

    try {

      setLoading(true);

      console.log(
        "================================="
      );

      console.log(
        "FETCHING MEETINGS FOR DEAL:",
        dealId
      );

      console.log(
        "URL:",
        `/activities/meeting/deal/${dealId}/`
      );

      console.log(
        "================================="
      );

      const response = await api.get(
        `/activities/meeting/deal/${dealId}/`
      );

      console.log(
        "MEETINGS RESPONSE:",
        response.data
      );

      const meetingData = Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.results || [];

      setMeetings(
        meetingData
      );

    } catch (error) {

      console.error(
        "FETCH MEETINGS ERROR:",
        error.response?.data || error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      setMeetings([]);

    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // LOAD MEETINGS
  // =========================================================

  useEffect(() => {

    fetchMeetings();

  }, [dealId]);


  // =========================================================
  // OPEN CREATE MEETING
  // =========================================================

  const handleOpenCreateMeeting = () => {

    setOpenCreateMeeting(
      true
    );

  };


  // =========================================================
  // CLOSE CREATE MEETING
  // =========================================================

  const handleCloseCreateMeeting = () => {

    setOpenCreateMeeting(
      false
    );

    // Refresh meetings after closing
    fetchMeetings();

  };


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <Box
      sx={{
        p: 3,
        mx: -2,
      }}
    >

      {/* =====================================================
          ACTIVITY TABS
          ===================================================== */}

      <Box>

        <CommonActivityTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          title="Deal"
        />

      </Box>


      {/* =====================================================
          HEADER
          ===================================================== */}

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
          Meetings
        </Typography>


        <CommonButton
          variant="contained"
          onClick={
            handleOpenCreateMeeting
          }
        >
          Create Meeting
        </CommonButton>

      </Box>


      {/* =====================================================
          CREATE MEETING DRAWER
          ===================================================== */}

      <ScheduleMeeting
        open={openCreateMeeting}
        onClose={
          handleCloseCreateMeeting
        }
      />


      {/* =====================================================
          MEETING LIST
          ===================================================== */}

      {loading ? (

        <Typography
          sx={{
            mt: 3,
            color: "text.secondary",
          }}
        >
          Loading meetings...
        </Typography>

      ) : meetings.length === 0 ? (

        <Typography
          sx={{
            color: "#667085",
            mt: 3,
          }}
        >
          No meetings found.
        </Typography>

      ) : (

        meetings.map(
          (meeting, index) => (

            <MeetingCard
              key={
                meeting.id ||
                index
              }
              meeting={meeting}
            />

          )
        )

      )}

    </Box>
  );
}

