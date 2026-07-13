import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
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
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        minHeight: "100%",
      }}
    >
      {/* Search + Convert */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search activities"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="disabled" />
              </InputAdornment>
            ),
          }}
        />

        {entityType === "company" && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              minWidth: 140,
            }}
          >
            Convert
          </Button>
        )}
      </Box>

      {/* Activity Tabs */}
      <ActivityTabs
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Upcoming Section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            mb: 2,
          }}
        >
          Upcoming
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Task assigned to Maria Johnson
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
              fontSize: 14,
            }}
          >
            Prepare quote for Jane Cooper
          </Typography>
        </Paper>
      </Box>

      {/* Timeline */}
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: 16,
        }}
      >
        June 2025
      </Typography>

      <Box>        {activities.length > 0 ? (
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
    </Paper>
  );
}
