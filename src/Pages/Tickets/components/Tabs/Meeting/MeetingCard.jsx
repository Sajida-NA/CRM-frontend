import React, {
  useState,
} from "react";

import {
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";


export default function MeetingCard({
  meeting,
}) {

  const [
    open,
    setOpen,
  ] = useState(false);


  if (!meeting) {
    return null;
  }


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formattedDate = meeting.start_date
    ? new Date(
        `${meeting.start_date}T00:00:00`
      ).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )
    : "";


  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (time) => {

    if (!time) {
      return "";
    }

    const [
      hours,
      minutes,
    ] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };


  const startTime = formatTime(
    meeting.start_time
  );

  const endTime = formatTime(
    meeting.end_time
  );


  // =========================================================
  // DURATION
  // =========================================================

  const calculateDuration = () => {

    if (
      !meeting.start_time ||
      !meeting.end_time
    ) {
      return "-";
    }

    const [
      startHour,
      startMinute,
    ] = meeting.start_time
      .split(":")
      .map(Number);

    const [
      endHour,
      endMinute,
    ] = meeting.end_time
      .split(":")
      .map(Number);

    const start =
      startHour * 60 +
      startMinute;

    const end =
      endHour * 60 +
      endMinute;

    const difference =
      end - start;

    if (difference <= 0) {
      return "-";
    }

    const hours =
      Math.floor(
        difference / 60
      );

    const minutes =
      difference % 60;

    if (
      hours > 0 &&
      minutes > 0
    ) {
      return `${hours} hr ${minutes} min`;
    }

    if (hours > 0) {
      return `${hours} hr`;
    }

    return `${minutes} min`;
  };


  const duration =
    calculateDuration();


  // =========================================================
  // ORGANIZER
  // =========================================================

  const organizer =
    meeting.created_by?.name ||
    meeting.owner?.name ||
    "Unknown";


  // =========================================================
  // ATTENDEES
  // =========================================================

  const attendees =
    meeting.attendees || [];


  // =========================================================
  // DISPLAY DATE / TIME
  // =========================================================

  const dateTime =
    `${formattedDate} at ${startTime}`;


  // =========================================================
  // NOTE HTML
  // =========================================================

  const noteHtml =
    meeting.note || "";


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "10px",
        bgcolor: "background.paper",
        mt: 2,
        overflow: "hidden",
      }}
    >

      {/* =====================================================
          HEADER
          ===================================================== */}

      <Box
        onClick={() =>
          setOpen(!open)
        }
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          px: 2,
          py: 2,
          cursor: "pointer",
        }}
      >

        {/* LEFT */}

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >

          <IconButton
            size="small"
            sx={{
              p: 0,
              mt: 0.3,
              mr: 1,
            }}
          >

            {open ? (

              <KeyboardArrowDownIcon
                color="primary"
              />

            ) : (

              <KeyboardArrowRightIcon
                color="primary"
              />

            )}

          </IconButton>


          <Box>

            {/* MEETING TITLE */}

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: "text.primary",
              }}
            >
              {meeting.title}
            </Typography>


            {/* COLLAPSED NOTE */}

            {!open && noteHtml && (

              <Box
                sx={{
                  mt: 0.5,
                  color: "text.secondary",
                  fontSize: 14,

                  "& p": {
                    margin: 0,
                  },

                  "& br": {
                    display: "block",
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: noteHtml,
                }}
              />

            )}

          </Box>

        </Box>


        {/* DATE */}

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: 14,
            whiteSpace: "nowrap",
          }}
        >
          {dateTime}
        </Typography>

      </Box>


      {/* =====================================================
          EXPANDED
          ===================================================== */}

      {open && (

        <Box
          sx={{
            px: 2,
            pb: 2,
          }}
        >

          {/* ORGANIZER */}

          <Typography
            sx={{
              color: "text.secondary",
              mb: 1,
              fontSize: 15,
            }}
          >
            Organized by {organizer}
          </Typography>


          {/* =================================================
              DETAILS
              ================================================= */}

          <Grid
            container
            sx={{
              bgcolor: "#EEF3F8",
              borderRadius: 1,
              p: 2,
              mb: 1,
            }}
          >

            {/* DATE & TIME */}

            <Grid size={4}>

              <Typography
                sx={{
                  color: "#516F90",
                  fontSize: 14,
                }}
              >
                Date & Time
              </Typography>


              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  mt: 0.5,
                }}
              >
                {dateTime}
              </Typography>

            </Grid>


            {/* DURATION */}

            <Grid size={4}>

              <Typography
                sx={{
                  color: "#516F90",
                  fontSize: 14,
                }}
              >
                Duration
              </Typography>


              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  mt: 0.5,
                }}
              >
                {duration}
              </Typography>

            </Grid>


            {/* ATTENDEES */}

            <Grid size={4}>

              <Typography
                sx={{
                  color: "#516F90",
                  fontSize: 14,
                }}
              >
                Attendees
              </Typography>


              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  mt: 0.5,
                }}
              >
                {attendees.length}
              </Typography>

            </Grid>

          </Grid>


          {/* =================================================
              NOTE
              ================================================= */}

          {noteHtml && (

            <Box
              sx={{
                color: "#516F90",
                fontSize: 15,

                "& p": {
                  marginTop: 0,
                  marginBottom: "8px",
                },

                "& ul": {
                  paddingLeft: "20px",
                },

                "& ol": {
                  paddingLeft: "20px",
                },

                "& strong": {
                  fontWeight: 600,
                },
              }}
              dangerouslySetInnerHTML={{
                __html: noteHtml,
              }}
            />

          )}

        </Box>

      )}

    </Box>
  );
}

