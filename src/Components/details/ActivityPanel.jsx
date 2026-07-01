import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ActivityCard from "./ActivityCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";

function ActivityPanel({ activities }) {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        minHeight: 600,
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
      >
        Activity
      </Typography>

      {/* Search Box */}
      <TextField
  fullWidth
  size="small"
  placeholder="Search activities..."
  variant="outlined"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchOutlinedIcon color="action" />
      </InputAdornment>
    ),
  }}
  sx={{
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
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
  mb: 3,
  minHeight: 45,

  "& .MuiTab-root": {
    textTransform: "none",
    fontWeight: 500,
    minHeight: 45,
    borderRadius: "8px 8px 0 0",
    px: 2,
  },

  "& .Mui-selected": {
    color: "#1976d2",
    fontWeight: 700,
  },

  "& .MuiTabs-indicator": {
    height: 3,
    borderRadius: 3,
    backgroundColor: "#1976d2",
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

      {/* Activities */}
      <Box mt={3}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            mt: 2,
            mb: 2,
            color: "#374151",
          }}
        >
          Upcoming
        </Typography>

       {activities.map((activity) => (
  <ActivityCard
    key={activity.id}
    activity={activity}
  />
))}
      </Box>
    </Paper>
  );
}

export default ActivityPanel;