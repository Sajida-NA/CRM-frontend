import React, { useEffect, useState } from "react";

import {
  Drawer,
  Box,
  Grid,
} from "@mui/material";

import CommonButton from "../../../../../Components/common/CommonButton";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import CommonTimePicker from "../../../../../Components/common/CommonTimePicker";
import FormDatePicker from "../../../../../Components/common/FormDatePicker";

import api from "../../../../../services/api";

export default function CreateLogCall({
  open,
  onClose,
  relatedModule = "deal",
  objectId,
  connectedName = "",
  onCallCreated,
}) {
  const [formData, setFormData] = useState({
    connected: "",
    callOutcome: "",
    duration: "",
    date: null,
    time: null,
    note: "",
  });

  const [saving, setSaving] = useState(false);

  // ============================================
  // SET CONNECTED RECORD NAME
  // ============================================

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      connected: connectedName || "",
    }));
  }, [connectedName]);

  // ============================================
  // INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================
  // GET LOGGED-IN USER ID
  // ============================================

  const getSenderId = () => {
    try {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        return null;
      }

      const payload = JSON.parse(
        atob(
          accessToken
            .split(".")[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      return payload.user_id || payload.id || null;
    } catch (error) {
      console.error(
        "Unable to decode access token:",
        error
      );

      return null;
    }
  };

  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!objectId) {
      console.error("Related record ID is missing.");
      return;
    }

    if (!formData.callOutcome) {
      console.error("Call outcome is required.");
      return;
    }

    if (!formData.duration) {
      console.error("Duration is required.");
      return;
    }

    if (!formData.date) {
      console.error("Date is required.");
      return;
    }

    if (!formData.time) {
      console.error("Time is required.");
      return;
    }

    const senderId = getSenderId();

    if (!senderId) {
      console.error(
        "Logged-in user ID could not be found."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        module: String(relatedModule)
          .toLowerCase()
          .trim(),

        module_id: Number(objectId),

        sender_id: Number(senderId),

        call_outcome: formData.callOutcome,

        duration: Number(formData.duration),

        date: formData.date?.format
          ? formData.date.format("YYYY-MM-DD")
          : formData.date,

        time: formData.time?.format
          ? formData.time.format("HH:mm:ss")
          : formData.time,

        note: formData.note || "",
      };

      console.log("Creating call:", payload);

      const response = await api.post(
        "/activities/call/",
        payload
      );

      console.log(
        "Call created successfully:",
        response.data
      );

      setFormData({
        connected: connectedName || "",
        callOutcome: "",
        duration: "",
        date: null,
        time: null,
        note: "",
      });

      if (onCallCreated) {
        onCallCreated(response.data);
      } else {
        onClose();
      }
    } catch (error) {
      console.error(
        "Error creating call:",
        error.response?.data || error
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
        <DrawerHeader
          title="Log Call"
          onClose={onClose}
        />

        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
          }}
        >
          {/* CONNECTED */}

          <CommonInput
            label="Connected"
            name="connected"
            value={formData.connected}
            onChange={handleChange}
            placeholder="Connected record"
            fullWidth
            required
            disabled
          />

          {/* CALL OUTCOME */}

          <CommonSelect
            label="Call Outcome"
            name="callOutcome"
            value={formData.callOutcome}
            onChange={handleChange}
            required
            placeholder="Choose"
            fullWidth
            options={[
              {
                label: "Connected",
                value: "connected",
              },
              {
                label: "No Answer",
                value: "no_answer",
              },
              {
                label: "Busy",
                value: "busy",
              },
              {
                label: "Left Voicemail",
                value: "left_voicemail",
              },
              {
                label: "Wrong Number",
                value: "wrong_number",
              },
              {
                label: "Callback Requested",
                value: "callback_requested",
              },
              {
                label: "Not Interested",
                value: "not_interested",
              },
              {
                label: "Other",
                value: "other",
              },
            ]}
          />

          {/* DURATION */}

          <CommonSelect
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="Choose"
            fullWidth
            options={[
              {
                label: "5 mins",
                value: "5",
              },
              {
                label: "10 mins",
                value: "10",
              },
              {
                label: "15 mins",
                value: "15",
              },
              {
                label: "30 mins",
                value: "30",
              },
              {
                label: "45 mins",
                value: "45",
              },
              {
                label: "60 mins",
                value: "60",
              },
            ]}
          />

          {/* DATE + TIME */}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormDatePicker
                label="Date"
                required
                value={formData.date}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    date: newValue,
                  }))
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonTimePicker
                label="Time"
                required
                value={formData.time}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    time: newValue,
                  }))
                }
              />
            </Grid>
          </Grid>

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