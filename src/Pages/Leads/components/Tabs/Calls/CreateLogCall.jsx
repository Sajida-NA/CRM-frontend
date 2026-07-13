import React, { useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";
import CommonButton from "../../../../../Components/common/CommonButton";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import CommonTimePicker from "../../../../../Components/common/CommonTimePicker";
import FormDatePicker from "../../../../../Components/common/FormDatePicker";

export default function CreateLogCall({ open, onClose }) {
  const [formData, setFormData] = useState({
    connected: "",
    callOutcome: "",
    date: null,
    time: null,
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
        <DrawerHeader title="Log Call" onClose={onClose} />

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
            label="Connected"
            name="connected"
            value={formData.connected}
            onChange={handleChange}
            placeholder="Jane Cooper"
            fullWidth
            required
          />

          <CommonSelect
            label="Call Outcome"
            required
            placeholder="Choose"
            fullWidth
            options={[
              { label: "Interested", value: "interested" },
              { label: "Not Interested", value: "not_interested" },
              { label: "Follow Up", value: "follow_up" },
            ]}
          />

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
