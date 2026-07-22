import React, { useState } from "react";
import { Box, Typography, Stack, IconButton, Collapse } from "@mui/material";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import Createnote from "../../../../Leads/components/Tabs/Note/Createnote";
import CommonButton from "../../../../../Components/common/CommonButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NoteDetails({tabs}) {
  const [activeTab, setActiveTab] = useState("Notes");
  const [openCreateNote, setOpenCreateNote] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Box
        sx={{
          p: 3,
          mx: -2,
        }}
      >
        {/* ACTIVITY TABS */}
        <Box>
          {/* <CommonActivityTabs activeTab={activeTab} onTabChange={() => {}} /> */}

          <CommonActivityTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
        </Box>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 1,
          }}
        >
          <Typography variant="h6">Notes</Typography>

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

        <Typography variant="h6">June 2025</Typography>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            mt: 1,
          }}
        >
          <Box
            onClick={() => setOpen(!open)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              px: 1,
              py: 2,
              cursor: "pointer",
            }}
          >
            {/* Left Side */}
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <IconButton size="small" sx={{ p: 0 }}>
                {open ? (
                  <KeyboardArrowRightIcon color="primary" fontSize="small"/>
                ) : (
                  <KeyboardArrowDownIcon color="primary" fontSize="small"/>
                )}
              </IconButton>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Note
                  <Typography
                    component="span"
                    sx={{
                      ml: 0.5,
                      color:"text.secondary",
                      fontWeight: 400,
                    }}
                  >
                    by Maria Johnson
                  </Typography>
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    color: "text.secondary",
                  }}
                >
                  Sample Note
                </Typography>
              </Box>
            </Stack>

            {/* Right Side */}
            <Typography
              sx={{
                color: "text.secondary",
                whiteSpace: "nowrap",
                fontSize: 14,
              }}
            >
              June 24, 2025 at 5:30PM
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
