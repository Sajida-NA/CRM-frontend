import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import Createnote from "../../../../Leads/components/Tabs/Note/Createnote";
import CommonButton from "../../../../../Components/common/CommonButton";

export default function NoteDetails() {
  const [activeTab, setActiveTab] = useState("Notes");
  const [openCreateNote, setOpenCreateNote] = useState(false);

  return (
    <div>
      <Box
        sx={{
          p: 3,
          position: "absolute",
          top: 80,
          left: 430,
          width: "calc(100% - 680px)",
          // border:'4px solid black'
        }}
      >
        {/* ACTIVITY TABS */}

        <Box
          sx={{
            mt: 10,
            mx: -2,
          }}
        >
          <CommonActivityTabs
            activeTab={activeTab}
            // onTabChange={setActiveTab}
            onTabChange={() => {}}
          />
        </Box>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            marginTop: "35px",
            marginLeft: "1px",
            // border:'1px solid black',
          }}
        >
          <Typography variant="h6" fontWeight={100}>
            Notes
          </Typography>

          <CommonButton
            variant="contained"
            onClick={() => setOpenCreateNote(true)}
          >
            Create Note
          </CommonButton>
        </Box>

        {/* Drawer */}
        <Createnote
          open={openCreateNote}
          onClose={() => setOpenCreateNote(false)}
        />

        {/* Note detail */}

        <Box
          sx={{
            width: 800,
            height: 105,
            // border:'1px solid black'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
            }}
          >
            June 2025
          </Typography>

          <Box
            sx={{
              width: 800,
              height: 72,

              borderRadius: 1,
              boxShadow: 1,
              border: "3px",
              borderColor: " #868686",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // mb: 3,
                marginTop: "4px",
                marginLeft: "1px",
                paddingLeft: 1,
              }}
            >
              <Typography sx={{ mt: 2, color: "#33475B" }}>
                <b>Note</b> <span> by Maria Johnson </span>{" "}
              </Typography>
              <Typography sx={{ mt: 2, mx: 1, color: "#33475B" }}>
                June 24, 2025 at 5:30PM
              </Typography>
            </Box>

            <Box
              sx={{
                width: 800,
                height: 24,

                paddingLeft: 1,

                marginTop: 1,
                color: "#33475B",
              }}
            >
              Sample Note
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
