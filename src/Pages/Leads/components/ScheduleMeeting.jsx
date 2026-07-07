import React, { useState } from "react";
import { Box, Divider } from "@mui/material";

// --- Adjust these import paths to match your project structure ---
import ModalWrapper from "../../../Components/common/ModalWrapper";
import DrawerHeader from "../../../Components/common/DrawerHeader";
import DrawerFooter from "../../../Components/common/DrawerFooter";
import CommonInput from "../../../Components/common/CommonInput";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";
import CommonSelect from "../../../Components/common/CommonSelect";
import InputField from "../../../Components/common/InputField";

/**
 * NOTE ON ASSUMPTIONS
 * I don't have the actual source for your common/ components, so this
 * assumes a fairly standard prop shape for each one:
 *   CommonInput / InputField -> { label, required, placeholder, value, onChange, type, multiline, minRows }
 *   CommonDatePicker         -> { label, required, placeholder, value, onChange }
 *   CommonSelect             -> { label, required, placeholder, value, onChange, options, multiple }
 *                                where options = [{ label, value }]
 *   ModalWrapper             -> { open, onClose, width, children }
 *   DrawerHeader             -> { title, onClose }
 *   DrawerFooter             -> { onCancel, onConfirm, cancelText, confirmText }
 *
 * If your components use different prop names (e.g. `isOpen` instead of
 * `open`, or `data` instead of `options`), share the component source and
 * I'll line these up exactly.
 */

const attendeeOptions = [
  { label: "Alex Johnson", value: "alex_johnson" },
  { label: "Priya Patel", value: "priya_patel" },
  { label: "Marcus Lee", value: "marcus_lee" },
  { label: "Sofia Garcia", value: "sofia_garcia" },
  { label: "David Kim", value: "david_kim" },
];

const locationOptions = [
  { label: "Conference Room A", value: "room_a" },
  { label: "Conference Room B", value: "room_b" },
  { label: "Zoom", value: "zoom" },
  { label: "Google Meet", value: "google_meet" },
  { label: "Client Office", value: "client_office" },
];

const reminderOptions = [
  { label: "None", value: "none" },
  { label: "5 minutes before", value: "5_min" },
  { label: "15 minutes before", value: "15_min" },
  { label: "30 minutes before", value: "30_min" },
  { label: "1 hour before", value: "1_hour" },
  { label: "1 day before", value: "1_day" },
];

export default function ScheduleMeeting({ open = true, onClose = () => {} }) {
  const [form, setForm] = useState({
    title: "",
    startDate: null,
    startTime: "",
    endTime: "",
    attendees: [],
    location: "",
    reminder: "",
    note: "",
  });

  const update = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    // Wire this up to your actual submit handler / API call
    console.log("Schedule meeting payload:", form);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} width={420}>
      <DrawerHeader title="Schedule Meeting" onClose={onClose} />

      <Divider />

      <Box sx={{ px: 3, py: 2.5, display: "flex", flexDirection: "column", gap: 2.25 }}>
        <CommonInput
          label="Title"
          required
          placeholder="Enter"
          value={form.title}
          onChange={(e) => update("title")(e.target.value)}
        />

        <CommonDatePicker
          label="Start Date"
          required
          placeholder="Choose"
          value={form.startDate}
          onChange={update("startDate")}
        />

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            <CommonInput
              label="Start Time"
              required
              type="time"
              placeholder="Choose"
              value={form.startTime}
              onChange={(e) => update("startTime")(e.target.value)}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CommonInput
              label="End Time"
              required
              type="time"
              placeholder="Choose"
              value={form.endTime}
              onChange={(e) => update("endTime")(e.target.value)}
            />
          </Box>
        </Box>

        <CommonSelect
          label="Attendees"
          required
          multiple
          placeholder="Choose"
          options={attendeeOptions}
          value={form.attendees}
          onChange={(e) => update("attendees")(e.target.value)}
        />

        <CommonSelect
          label="Location"
          placeholder="Choose"
          options={locationOptions}
          value={form.location}
          onChange={(e) => update("location")(e.target.value)}
        />

        <CommonSelect
          label="Reminder"
          placeholder="Choose"
          options={reminderOptions}
          value={form.reminder}
          onChange={(e) => update("reminder")(e.target.value)}
        />

        <InputField
          label="Note"
          required
          placeholder="Enter"
          multiline
          minRows={3}
          value={form.note}
          onChange={(e) => update("note")(e.target.value)}
        />
      </Box>

      <Divider />

      <DrawerFooter
        onCancel={onClose}
        onConfirm={handleSave}
        cancelText="Cancel"
        confirmText="Save"
      />
    </ModalWrapper>
  );
}
