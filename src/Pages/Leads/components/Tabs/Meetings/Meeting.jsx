import React, { useState } from "react";
import { Box, Typography,Button } from "@mui/material";
import ScheduleMeeting from "./ScheduleMeeting";
// import CommonButton from "../../../../../Components/common/CommonButton";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonEntityHeader from "../../../../../Components/common/CommonEntityHeader";
import CommonEditor from "../../../../../Components/common/CommonEditor";


export default function Meeting() {
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);

  return (
    <>
      <CommonEntityHeader />
    
     

      <Box
        sx={{
          p: 3,
          position: "absolute",
          top: 80,
          left: 330,
          width: "calc(100% - 350px)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            marginTop:"150px",
            marginLeft:"100px"
          }}
        >
          <Typography variant="h6" fontWeight={500}>
            Meetings
          </Typography>

          <Button
  variant="contained"
  sx={{
    position: "absalute",
    top: "50px",
    left:"3px"
  }}
  onClick={() => setOpenCreateMeeting(true)}
>
  Create Meeting
</Button>
        </Box>


        {/* Drawer */}
        <ScheduleMeeting
          open={openCreateMeeting}
          onClose={() => setOpenCreateMeeting(false)}
        />

      </Box>
    </>
  );
}