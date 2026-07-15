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

  // Filter activities based on search
  const filteredActivities = activities.filter((activity) => {
    const searchText = search.toLowerCase();

    return (
      activity.title?.toLowerCase().includes(searchText) ||
      activity.description?.toLowerCase().includes(searchText)
    );
  });

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
                <SearchIcon
                  sx={{
                    color: "#98A2B3",
                  }}
                />
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

      {/* Activity Tabs */}

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

        {/* =========================
            TICKET PROFILE
        ========================== */}

        {entityType === "ticket" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
            }}
          >
            {filteredActivities.map((activity, index) => (
              <ActivityCard
                key={activity.id || index}
                type={activity.type}
                title={activity.title}
                date={activity.date}
                description={activity.description}
                createdBy={activity.createdBy}
                entityType={entityType}
              />
            ))}
          </Box>
        )}

        {/* =========================
            COMPANY PROFILE
        ========================== */}

        {entityType === "company" && (
          <>
            {/* First Activity as Upcoming */}

            {filteredActivities.length > 0 && (
              <ActivityCard
                type={filteredActivities[0].type}
                title={filteredActivities[0].title}
                date={filteredActivities[0].date}
                description={filteredActivities[0].description}
                createdBy={filteredActivities[0].createdBy}
              />
            )}

            {/* Company Timeline */}

            {filteredActivities.length > 1 && (
              <>
                <Typography
                  sx={{
                    mt: 3,
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
                  {filteredActivities
                    .slice(1)
                    .map((activity, index) => (
                      <ActivityCard
                        key={activity.id || index}
                        type={activity.type}
                        title={activity.title}
                        date={activity.date}
                        description={activity.description}
                        createdBy={activity.createdBy}
                      />
                    ))}
                </Box>
              </>
            )}
          </>
        )}

        {/* No Activities */}

        {filteredActivities.length === 0 && (
          <Typography
            sx={{
              fontSize: 13,
              color: "#667085",
              mt: 2,
            }}
          >
            No activities found
          </Typography>
        )}
      </Box>
    </Box>
  );
}