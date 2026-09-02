import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import ScheduleMeeting from "../../../../Leads/components/Tabs/Meetings/ScheduleMeeting";

import MeetingCard from "./MeetingCard";

import api from "../../../../../services/api";


export default function MeetingDetails({
  tabs,
  module = "deal",
  moduleId,
}) {

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
  // FETCH MEETINGS
  // =========================================================

  const fetchMeetings = async () => {

    if (!moduleId) {

      console.error(
        `${module} ID not found`
      );

      setMeetings([]);

      return;
    }

    try {

      setLoading(true);

      const normalizedModule =
        String(module)
          .toLowerCase()
          .trim();


      console.log(
        "================================="
      );

      console.log(
        "FETCHING MEETINGS"
      );

      console.log(
        "MODULE:",
        normalizedModule
      );

      console.log(
        "MODULE ID:",
        moduleId
      );


      const url =
        `/activities/meeting/${normalizedModule}/${moduleId}/`;


      console.log(
        "URL:",
        url
      );

      console.log(
        "================================="
      );


      const response =
        await api.get(url);


      console.log(
        "MEETINGS RESPONSE:",
        response.data
      );


      const meetingData =
        Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];


      // =====================================================
      // DEBUG MEETING DATA
      // =====================================================

      meetingData.forEach(
        (meeting) => {

          console.log(
            "---------------------------------"
          );

          console.log(
            "MEETING ID:",
            meeting.id
          );

          console.log(
            "TITLE:",
            meeting.title
          );

          console.log(
            "START DATE:",
            meeting.start_date
          );

          console.log(
            "START TIME:",
            meeting.start_time
          );

          console.log(
            "END TIME:",
            meeting.end_time
          );

          console.log(
            "ATTENDEES:",
            meeting.attendees
          );

        }
      );


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

  }, [
    module,
    moduleId,
  ]);


  // =========================================================
  // OPEN CREATE MEETING
  // =========================================================

  const handleOpenCreateMeeting = () => {

    if (!moduleId) {

      console.error(
        `${module} ID not found`
      );

      return;
    }

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
        relatedModule={module}
        objectId={moduleId}
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
              meeting={
                meeting
              }
            />

          )
        )

      )}

    </Box>
  );
}