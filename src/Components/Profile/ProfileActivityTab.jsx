import { Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";

const tabNames = ["Activity", "Notes", "Emails", "Calls", "Tasks", "Meetings"];

const ProfileActivityTabs = ({ activities }) => {
  const [tab, setTab] = useState(0);

  const currentTab = tabNames[tab];
  const items = activities[currentTab] || [];

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        border: "1px solid #E5E7EB",
        p: 2,
      }}
    >
      {/* TABS */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{
          borderBottom: "1px solid #E5E7EB",
          mb: 2,
        }}
      >
        {tabNames.map((name) => (
          <Tab key={name} label={name} />
        ))}
      </Tabs>

      {/* UPCOMING SECTION (only for Activity tab) */}
      {currentTab === "Activity" && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              mb: 1,
            }}
          >
            Upcoming
          </Typography>

          {items.slice(0, 2).map((item, idx) => (
            <Box
              key={idx}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #E5E7EB",
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
              <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
                {item.time}
              </Typography>
              <Typography sx={{ mt: 1 }}>{item.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* MONTH SECTION */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          mb: 1,
        }}
      >
        June 2025
      </Typography>

      {/* ACTIVITY CARDS */}
      {items.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #E5E7EB",
            mb: 1.5,
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
          <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
            {item.time}
          </Typography>
          <Typography sx={{ mt: 1 }}>{item.description}</Typography>
        </Box>
      ))}

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <Typography sx={{ color: "gray", mt: 2 }}>No records found.</Typography>
      )}
    </Box>
  );
};

export default ProfileActivityTabs;

