import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import ActivityTabs from "./ActivityTabs";
import ActivityCard from "./ActivityCard";

export default function ProfileMiddlePanel({
  activities = [],
  upcoming = [],
  entityType,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  // Store open/closed state of each upcoming task
  const [openTasks, setOpenTasks] = useState({});

  // Toggle individual upcoming task
  const toggleTask = (id) => {
    setOpenTasks((prev) => ({
      ...prev,
      [id]: prev[id] === false ? true : false,
    }));
  };

  const searchText = search.toLowerCase();

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    return (
      activity.title?.toLowerCase().includes(searchText) ||
      activity.description?.toLowerCase().includes(searchText)
    );
  });

  // Filter upcoming tasks
  const filteredUpcoming = upcoming.filter((task) => {
    return (
      task.title?.toLowerCase().includes(searchText) ||
      task.description?.toLowerCase().includes(searchText)
    );
  });

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "transparent",
      }}
    >
      {/* 
          SEARCH + CONVERT
       */}

      <Box
        sx={{
          mb: 2,
          display: "flex",
          gap: 1.5,
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
                <SearchIcon
                  sx={{
                    color: "#98A2B3",
                    fontSize: 20,
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 44,
              borderRadius: "6px",
              bgcolor: "#fff",
            },
          }}
        />

        {/* Convert Button Only for Lead */}

        {entityType === "lead" && (
          <Button
            variant="contained"
            sx={{
              minWidth: 120,
              height: 44,
              bgcolor: "#5A45E5",
              textTransform: "none",
              borderRadius: "6px",
              boxShadow: "none",
              fontSize: 13,

              "&:hover": {
                bgcolor: "#4C39D2",
                boxShadow: "none",
              },
            }}
          >
            Convert
          </Button>
        )}
      </Box>

      {/* 
          ACTIVITY TABS
       */}

      <ActivityTabs value={activeTab} onChange={setActiveTab} />

      {/* 
          LEAD PROFILE
       */}

      {entityType === "lead" && (
        <Box sx={{ mt: 3 }}>
          {/* Upcoming Title */}

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

          {/* Upcoming Tasks */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {filteredUpcoming.map((task, index) => {
              const isOpen = openTasks[task.id] !== false;

              return (
                <Box
                  key={task.id || index}
                  sx={{
                    border: "1px solid #EAECF0",
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    px: 2,
                    py: 1.5,
                  }}
                >
                  {/* Task Top Row */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {/* Arrow + Title */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        minWidth: 0,
                      }}
                    >
                      <KeyboardArrowDownIcon
                        onClick={() => toggleTask(task.id)}
                        sx={{
                          fontSize: 17,
                          color: "#5A45E5",
                          cursor: "pointer",
                          flexShrink: 0,
                          transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#344054",
                        }}
                      >
                        {task.title}
                      </Typography>
                    </Box>

                    {/* Overdue + Date */}

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        flexShrink: 0,
                      }}
                    >
                      <CalendarTodayOutlinedIcon
                        sx={{
                          fontSize: 13,
                          color: "#F04438",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "#F04438",
                        }}
                      >
                        {task.status}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "#667085",
                          whiteSpace: "nowrap",
                        }}
                      >
                        : {task.date}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Expandable Task Description */}

                  {isOpen && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                        ml: 2.5,
                      }}
                    >
                      <RadioButtonUncheckedIcon
                        sx={{
                          fontSize: 17,
                          color: "#667085",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#516F90",
                        }}
                      >
                        {task.description}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* June 2025 */}

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

          {/* All Lead Activities */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
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
                entityType="lead"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* 
          TICKET PROFILE
       */}

      {entityType === "ticket" && (
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
                entityType="ticket"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* 
          COMPANY PROFILE
       */}

      {entityType === "company" && (
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

          {/* First Activity */}

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
                {filteredActivities.slice(1).map((activity, index) => (
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
        </Box>
      )}

      {/* 
          NO RESULTS
      */}

      {filteredActivities.length === 0 && filteredUpcoming.length === 0 && (
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
  );
}
