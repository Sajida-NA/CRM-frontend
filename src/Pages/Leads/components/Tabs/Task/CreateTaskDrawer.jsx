import React, { useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";
import CommonButton from "../../../../../Components/common/CommonButton";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import CommonTimePicker from "../../../../../Components/common/CommonTimePicker";
import FormDatePicker from "../../../../../Components/common/FormDatePicker";

export default function CreateTaskDrawer({ open, onClose }) {
  const [formData, setFormData] = useState({
    taskname: "",
    duedate: null,
    time: null,
    tasktype: "",
    priority: "",
    assignedto: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Call Here

    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
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
        {/* Drawer Header */}
        <DrawerHeader title="Create Task" onClose={onClose} />

        {/* Form */}
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
          <CommonInput
            label="Task Name"
            name="taskname"
            value={formData.taskname}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormDatePicker
                label="Due Date"
                required
                value={formData.duedate}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    duedate: newValue,
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
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CommonSelect
                label="Task Type"
                required
                placeholder="Choose"
                options={[
                  { label: "Call", value: "call" },
                  { label: "Email", value: "email" },
                  { label: "Meeting", value: "meeting" },
                  { label: "Follow Up", value: "follow_up" },
                  { label: "Reminder", value: "reminder" },
                ]}
                name="tasktype"
                value={formData.tasktype}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CommonSelect
                label="Priority"
                required
                placeholder="Choose"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                  { label: "Urgent", value: "urgent" },
                ]}
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <CommonSelect
            label="Assigned to"
            required
            placeholder="Choose"
            options={[
              { label: "Maria Johnson", value: "maria" },
              { label: "John Smith", value: "john" },
            ]}
            name="assignedto"
            value={formData.assignedto}
            onChange={handleChange}
          />

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

        {/* Drawer Footer */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <CommonButton variant="outlined" fullWidth onClick={onClose}>
            Cancel
          </CommonButton>

          <CommonButton type="submit" fullWidth>
            Save
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}
