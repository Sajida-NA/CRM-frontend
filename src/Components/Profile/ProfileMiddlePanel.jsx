import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import ActivityTabs from "./ActivityTabs";
import ActivityCard from "./ActivityCard";

export default function ProfileMiddlePanel({
  activities = [],
  entityType,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "transparent",
      }}
    >
      {/* Search */}

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search activities"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#98A2B3" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 44,
              borderRadius: "10px",
              bgcolor: "#fff",
            },
          }}
        />
      </Box>

      {/* Tabs */}

      <ActivityTabs
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Upcoming */}

      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 14,
            color: "#101828",
            mb: 1.5,
          }}
        >
          Upcoming
        </Typography>

        <Box
          sx={{
            border: "1px solid #EAECF0",
            borderRadius: 2,
            bgcolor: "#fff",
            p: 1.5,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
              color: "#101828",
            }}
          >
            Task assigned to Maria Johnson
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 13,
              color: "#667085",
            }}
          >
            Prepare quote for Jane Cooper
          </Typography>
        </Box>
      </Box>

      {/* Timeline */}

      <Typography
        sx={{
          mt: 2,
          mb: 1.5,
          fontWeight: 700,
          fontSize: 14,
          color: "#101828",
        }}
      >
        June 2025
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityCard
              key={activity.id || index}
              type={activity.type}
              title={activity.title}
              date={activity.date}
              description={activity.description}
              createdBy={activity.createdBy}
            />
          ))
        ) : (
          <>
            <ActivityCard
              type="Call"
              title="Call from Maria Johnson"
              date="June 24, 2025 at 5:30 PM"
              description="Brought Maria through our latest product line. She’s interested and is going to get back to me."
            />

            <ActivityCard
              type="Meeting"
              title="Meeting with Maria Johnson and Jane Cooper"
              date="June 24, 2025 at 5:30 PM"
              description="Let's discuss our new product line."
            />

            <ActivityCard
              type="Email"
              title="Email Tracking"
              date="June 24, 2025 at 5:30 PM"
              description="Jane Cooper opened 'Hello There'."
            />

            <ActivityCard
              type="Note"
              title="Note by Maria Johnson"
              date="June 24, 2025 at 5:30 PM"
              description="Sample Note"
            />

            {entityType === "company" && (
              <ActivityCard
                type="Ticket"
                title="Ticket Activity"
                date="June 24, 2025 at 5:30 PM"
                description="Maria Johnson created Ticket #1."
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}