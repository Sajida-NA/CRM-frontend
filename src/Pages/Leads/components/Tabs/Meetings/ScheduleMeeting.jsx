import React, { useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonDatePicker from "../../../../../Components/common/CommonDatePicker";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


export default function ScheduleMeeting({ open, onClose }) {

  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    startTime: null,
    endTime: null,
    attendees: "",
    location: "",
    reminder: "",
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

    const payload = {
      ...formData,
      startTime: formData.startTime
        ? dayjs(formData.startTime).format("hh:mm A")
        : "",
      endTime: formData.endTime
        ? dayjs(formData.endTime).format("hh:mm A")
        : "",
    };

    console.log(payload);

    // API call here

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

     


        {/* Header */}
        <DrawerHeader
          title="Schedule Meeting"
          onClose={onClose}
        />


        {/* Form Body */}
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


          {/* Title */}
          <CommonInput
            label="Title"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
          />



          {/* Start Date */}
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



          <Grid container spacing={2}>

  <Grid size={{ xs: 12, md: 6 }}>
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


  <Grid size={{ xs: 12, md: 6 }}>
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
          {/* Attendees */}
          <CommonSelect
            label="Attendees"
            required
            name="attendees"
            value={formData.attendees}
            onChange={handleChange}
            placeholder="Choose"
            options={[
              "Jane Cooper",
              "Maria Johnson",
              "Robert Fox",
            ]}
          />



          {/* Location */}
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



          {/* Reminder */}
          <CommonSelect
            label="Reminder"
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            placeholder="Choose"
            options={[
              "None",
              "5 minutes before",
              "10 minutes before",
              "30 minutes before",
              "1 hour before",
            ]}
          />



          {/* Note */}
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




        {/* Footer */}
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
          >
            Cancel
          </CommonButton>


          <CommonButton
            type="submit"
            fullWidth
          >
            Save
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}