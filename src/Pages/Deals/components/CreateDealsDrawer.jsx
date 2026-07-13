import React, { useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";
import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import CommonSelect from "../../../Components/common/CommonSelect";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";
import FormDatePicker from "../../../Components/common/FormDatePicker";

export default function CreateDealsDrawer({ open, onClose }) {
  const [formData, setFormData] = useState({
    dealName: "",
    dealStage: "",
    associatedLead: "",
    amount: "",
    dealOwner: "",
    closeDate: null,
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 520,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >
        <DrawerHeader title="Create Deal" onClose={onClose} />

        {/* FORM */}
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
          {/* Deal Name*/}
          <CommonInput
            label="Deal Name"
            required
            name="dealName"
            value={formData.dealName}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* Deal Stage*/}
          <CommonSelect
            label="Deal Stage"
            required
            placeholder="Choose"
            options={[
              "Appointment Scheduled",
              "Contract Sent",
              "Closed Won",
              "Closed Lost",
              "Decision Maker Bought In",
              "Presentation Scheduled",
              "Qualified to Buy",
            ]}
            name="dealStage"
            value={formData.dealStage}
            onChange={handleChange}
          />

          {/* Associated Lead */}
          <CommonSelect
            label="Associated Lead"
            required
            placeholder="Choose"
            options={[
              "Appointment Scheduled",
              "Contract Sent",
              "Closed Won",
              "Closed Lost",
              "Decision Maker Bought In",
              "Presentation Scheduled",
              "Qualified to Buy",
            ]}
            name="associatedLead"
            value={formData.associatedLead}
            onChange={handleChange}
          />

          {/* Amount */}
          <CommonInput
            label="Amount"
            required
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            placeholder="Enter"
          />

          {/* Deal Owner */}
          <CommonSelect
            label="Deal Owner"
            required
            placeholder="Choose"
            options={[
              "Jane Cooper",
              "Wade Warren",
              "Brooklyn Simmons",
              "Leslie Alexander",
              "Jenny Wilson",
              "Guy Hawkins",
              "Robert Fox",
              "Cameron Williamson",
            ]}
             name="dealOwner"
            value={formData.dealOwner}
            onChange={handleChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormDatePicker
                label="Close Date"
                required
                value={formData.closeDate}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    closeDate: newValue,
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CommonSelect
                label="Priority"
                required
                placeholder="Choose"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                options={["High", "Medium", "Low"]}
              />
            </Grid>
          </Grid>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{ display: "flex", gap: 3, p: 3, borderTop: "1px solid #E5E7EB" }}
        >
          <CommonButton variant="outlined" fullWidth onClick={onClose}>
            Cancel
          </CommonButton>

          <CommonButton type="submit" fullWidth>
            Save Deal
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}
