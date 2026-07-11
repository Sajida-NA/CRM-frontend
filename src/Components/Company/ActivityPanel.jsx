import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ActivityCard from "./ActivityCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";

function ActivityPanel({ activities }) {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        p: 3,
        height: "100%",
        borderRight: "1px solid #E5E7EB",
        overflowY: "auto",
      }}
    >
      {/* Title */}
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Activity
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search activities..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            height: 38,
            borderRadius: 2,
            bgcolor: "#FAFAFA",
          },
        }}
      />

      {/* Tabs */}
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2,

          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: 13,
            fontWeight: 500,
            minHeight: 40,
            px: 2,
          },

          "& .Mui-selected": {
            fontWeight: 700,
          },

          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: 3,
          },
        }}
      >
        <Tab label="Activity" />
        <Tab label="Notes" />
        <Tab label="Emails" />
        <Tab label="Calls" />
        <Tab label="Tasks" />
        <Tab label="Meetings" />
      </Tabs>

      {/* Upcoming */}
      <Typography
        variant="body2"
        fontWeight={700}
        sx={{
          color: "#374151",
          mb: 1,
        }}
      >
        Upcoming
      </Typography>

      {/* Activity List */}
      <Box>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ActivityPanel;