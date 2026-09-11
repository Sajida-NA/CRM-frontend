

import React, { useEffect, useState } from "react";

import {
  Drawer,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";

import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonDatePicker from "../../../../../Components/common/CommonDatePicker";
import CommonEditor from "../../../../../Components/common/CommonEditor";

import api from "../../../../../services/api";

export default function ScheduleMeeting({
  open,
  onClose,
  relatedModule,
  objectId,
  module,
  moduleId,
}) {
  const { dealId, ticketId } = useParams();

  // Support both the existing API and the newer reusable API.
  const finalModule = String(
    module ||
      relatedModule ||
      (ticketId ? "ticket" : "deal")
  )
    .toLowerCase()
    .trim();

  const finalModuleId =
    moduleId ||
    objectId ||
    ticketId ||
    dealId;

  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    startTime: null,
    endTime: null,
    attendees: [],
    location: "",
    reminder: "",
    note: "",
  });

  // =========================================================
  // FETCH USERS
  // =========================================================

  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      try {
        const response = await api.get("/accounts/users/");

        console.log("USERS RESPONSE:", response.data);

        const userData = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        setUsers(userData);
      } catch (error) {
        console.error(
          "FETCH USERS ERROR:",
          error.response?.data || error
        );
      }
    };

    fetchUsers();
  }, [open]);

  // =========================================================
  // NORMAL INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // ATTENDEE CHANGE
  // =========================================================

  const handleAttendeeChange = (event) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      attendees:
        typeof value === "string"
          ? value.split(",")
          : value,
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("=================================");
    console.log("SAVE MEETING CLICKED");
    console.log("MODULE:", finalModule);
    console.log("MODULE ID:", finalModuleId);
    console.log("=================================");

    // =======================================================
    // VALIDATION
    // =======================================================

    if (!formData.title.trim()) {
      alert("Please enter meeting title.");
      return;
    }

    if (!formData.startDate) {
      alert("Please select start date.");
      return;
    }

    if (!formData.startTime) {
      alert("Please select start time.");
      return;
    }

    if (!formData.endTime) {
      alert("Please select end time.");
      return;
    }

    if (
      dayjs(formData.endTime).isBefore(
        dayjs(formData.startTime)
      )
    ) {
      alert("End time must be after start time.");
      return;
    }

    if (formData.attendees.length === 0) {
      alert("Please select at least one attendee.");
      return;
    }

    if (!formData.location) {
      alert("Please select location.");
      return;
    }

    if (!formData.note.trim()) {
      alert("Please enter a note.");
      return;
    }

    if (!finalModuleId) {
      const moduleName =
        finalModule.charAt(0).toUpperCase() +
        finalModule.slice(1);

      alert(`${moduleName} ID not found.`);
      return;
    }

    // =======================================================
    // BACKEND PAYLOAD
    // =======================================================

    const payload = {
      module: finalModule,
      module_id: Number(finalModuleId),

      title: formData.title.trim(),

      start_date: dayjs(formData.startDate).format(
        "YYYY-MM-DD"
      ),

      start_time: dayjs(formData.startTime).format(
        "HH:mm:ss"
      ),

      end_time: dayjs(formData.endTime).format(
        "HH:mm:ss"
      ),

      attendees: formData.attendees.map(
        (id) => Number(id)
      ),

      location: formData.location,

      reminder: formData.reminder || "",

      note: formData.note.trim(),
    };

    console.log("=================================");
    console.log("CREATE MEETING PAYLOAD:");
    console.log(JSON.stringify(payload, null, 2));
    console.log("=================================");

    // =======================================================
    // API CALL
    // =======================================================

    try {
      setSaving(true);

      const response = await api.post(
        "/activities/meeting/",
        payload
      );

      console.log(
        "MEETING CREATED:",
        response.data
      );

      alert("Meeting created successfully.");

      // =====================================================
      // RESET FORM
      // =====================================================

      setFormData({
        title: "",
        startDate: null,
        startTime: null,
        endTime: null,
        attendees: [],
        location: "",
        reminder: "",
        note: "",
      });

      onClose();
    } catch (error) {
      console.error(
        "CREATE MEETING ERROR:",
        error.response?.data || error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "REQUEST DATA:",
        error.config?.data
      );

      const errorData = error.response?.data;

      if (errorData) {
        alert(
          `Failed to create meeting:\n${JSON.stringify(
            errorData,
            null,
            2
          )}`
        );
      } else {
        alert(
          "Failed to create meeting. Check that the Django server is running."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // ATTENDEE OPTIONS
  // =========================================================

  const attendeeOptions = users.map((user) => ({
    label:
      user.name ||
      user.full_name ||
      `${user.first_name || ""} ${
        user.last_name || ""
      }`.trim() ||
      user.email ||
      `User ${user.id}`,

    value: user.id,
  }));

  // =========================================================
  // SELECTED ATTENDEE NAMES
  // =========================================================

  const selectedAttendeeNames = attendeeOptions
    .filter((option) =>
      formData.attendees.some(
        (id) =>
          String(id) === String(option.value)
      )
    )
    .map((option) => option.label);

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={saving ? undefined : onClose}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 500,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >
        {/* HEADER */}

        <DrawerHeader
          title="Schedule Meeting"
          onClose={onClose}
        />

        {/* BODY */}

        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            overflowY: "auto",
          }}
        >
          {/* TITLE */}

          <CommonInput
            label="Title"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
          />

          {/* START DATE */}

          <CommonDatePicker
            label="Start Date"
            required
            placeholder="Select start date"
            value={formData.startDate}
            onChange={(newValue) =>
              setFormData((prev) => ({
                ...prev,
                startDate: newValue,
              }))
            }
          />

          {/* START / END TIME */}

          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    startTime: newValue,
                  }))
                }
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TimePicker
                label="End Time"
                value={formData.endTime}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    endTime: newValue,
                  }))
                }
                slotProps={{
                  textField: {
                    required: true,
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* ATTENDEES */}

          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
                color: "#344054",
                mb: "6px",
              }}
            >
              Attendees

              <Box
                component="span"
                sx={{
                  color: "#F04438",
                  ml: "2px",
                }}
              >
                *
              </Box>
            </Typography>

            <FormControl fullWidth>
              <Select
                multiple
                displayEmpty
                value={formData.attendees}
                onChange={handleAttendeeChange}
                renderValue={(selected) => {
                  if (!selected.length) {
                    return (
                      <Typography
                        sx={{
                          color: "#98A2B3",
                          fontSize: "16px",
                        }}
                      >
                        Choose
                      </Typography>
                    );
                  }

                  return selectedAttendeeNames.join(
                    ", "
                  );
                }}
                sx={{
                  minHeight: "44px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",

                  "& .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#D0D5DD",
                    },

                  "&:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#D0D5DD",
                    },

                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#6941C6",
                      borderWidth: "1px",
                    },

                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    color: "#344054",
                  },

                  "& .MuiSelect-icon": {
                    color: "#667085",
                    right: 12,
                  },
                }}
              >
                {attendeeOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    <Checkbox
                      checked={formData.attendees.some(
                        (id) =>
                          String(id) ===
                          String(option.value)
                      )}
                    />

                    <ListItemText
                      primary={option.label}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* LOCATION */}

          <CommonSelect
            label="Location"
            required
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Choose"
            options={[
              "Meeting Room 1",
              "Meeting Room 2",
              "Online",
              "Client Office",
              "Head Office",
            ]}
          />

          {/* REMINDER */}

          <CommonSelect
            label="Reminder"
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            placeholder="Choose"
            options={[
              {
                label: "5 minutes before",
                value: "5_MIN",
              },
              {
                label: "15 minutes before",
                value: "15_MIN",
              },
              {
                label: "30 minutes before",
                value: "30_MIN",
              },
              {
                label: "1 hour before",
                value: "1_HOUR",
              },
              {
                label: "1 day before",
                value: "1_DAY",
              },
            ]}
          />

          {/* NOTE */}

          <CommonEditor
            label="Note"
            required
            value={formData.note}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                note: value,
              }))
            }
          />
        </Box>

        {/* FOOTER */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <CommonButton
            variant="outlined"
            fullWidth
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </CommonButton>

          <CommonButton
            type="submit"
            fullWidth
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}