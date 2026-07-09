import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ScheduleMeeting from "./ScheduleMeeting";
import CommonButton from "../../../../../Components/common/CommonButton";

export default function Meeting() {
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);

  return (
    <Box sx={{ p: 3 }}>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Meetings
        </Typography>

        <CommonButton
          variant="contained"
          onClick={() => setOpenCreateMeeting(true)}
        >
          Create Meeting
        </CommonButton>
      </Box>

      {/* Schedule Meeting Drawer */}
      <ScheduleMeeting
        open={openCreateMeeting}
        onClose={() => setOpenCreateMeeting(false)}
      />

    </Box>
  );
}