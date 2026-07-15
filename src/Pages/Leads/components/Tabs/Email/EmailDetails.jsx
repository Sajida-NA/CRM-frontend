import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Dialog,
  IconButton,
} from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";
import EmailRecord from "./EmailRecord";
import emailData from "./emailData";

export default function EmailDetails() {
  const [activeTab, setActiveTab] = useState("Emails");
  const [openEmail, setOpenEmail] = useState(false);

  const [openCards, setOpenCards] = useState({
    0: true,
  });

  const toggleCard = (index) => {
    setOpenCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box
      sx={{
        p: 3,
        position: "absolute",
        top: 80,
        left: 430,
        width: "calc(100% - 680px)",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Activity Tabs */}
      <Box sx={{ mt: 10, mx: -2 }}>
        <CommonActivityTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          title="Ticket"
        />
      </Box>


      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          color="#333"
          fontSize={18}
        >
          Emails
        </Typography>


        <CommonButton
          variant="contained"
          onClick={() => setOpenEmail(true)}
        >
          Create Email
        </CommonButton>
      </Box>


      {/* Month */}
      <Typography
        variant="subtitle2"
        color="text.secondary"
        fontWeight={600}
        sx={{
          mt: 3,
          mb: 1.5,
          fontSize: "14px",
        }}
      >
        June 2025
      </Typography>


      {/* Email Cards */}
      <Stack spacing={2}>
        {emailData.map((email, index) => {
          const isOpen = openCards[index];

          return (
            <Box
              key={email.id}
              sx={{
                border: "1px solid #EAEAEA",
                borderRadius: 2,
                bgcolor: "#fff",
                p: 2,
                "&:hover": {
                  boxShadow:
                    "0px 2px 8px rgba(0,0,0,0.04)",
                },
              }}
            >

              {/* Header */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ cursor: "pointer" }}
                onClick={() => toggleCard(index)}
              >

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="flex-start"
                >

                  <IconButton
                    size="small"
                    sx={{
                      p: 0.2,
                      mt: 0.2,
                      color: "#5B4CE6",
                    }}
                  >
                    {isOpen ? (
                      <KeyboardArrowDownIcon fontSize="small" />
                    ) : (
                      <KeyboardArrowRightIcon fontSize="small" />
                    )}
                  </IconButton>


                  <Box>
                    <Stack
                      direction="row"
                      spacing={0.5}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight={700}
                      >
                        {email.subject}
                      </Typography>

                      <Typography
                        fontSize="14px"
                        color="text.secondary"
                      >
                        by {email.sender}
                      </Typography>
                    </Stack>


                    {!isOpen && (
                      <Typography
                        fontSize="13px"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          maxWidth: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {email.body.split("\n")[0]}
                      </Typography>
                    )}

                  </Box>

                </Stack>


                <Typography
                  fontSize="12px"
                  color="text.secondary"
                >
                  {email.date} at {email.time}
                </Typography>

              </Stack>


              {/* Body */}
              {isOpen && (
                <Box
                  sx={{
                    pl: 4,
                    mt: 2,
                  }}
                >

                  <Typography
                    fontSize="13px"
                    color="text.secondary"
                    mb={2}
                  >
                    To {email.receiver}
                  </Typography>


                  <Typography
                    fontSize="13px"
                    color="#444"
                    sx={{
                      whiteSpace: "pre-line",
                      lineHeight: 1.7,
                    }}
                  >
                    {email.body}
                  </Typography>

                </Box>
              )}

            </Box>
          );
        })}
      </Stack>


      {/* Create Email Modal */}
      <Dialog
        open={openEmail}
        onClose={() => setOpenEmail(false)}
        PaperProps={{
          sx: {
            width: 750,
            maxWidth: "90vw",
            borderRadius: 2,
          },
        }}
      >
        <EmailRecord
          onClose={() => setOpenEmail(false)}
        />
      </Dialog>

    </Box>
  );
}