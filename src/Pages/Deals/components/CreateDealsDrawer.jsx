import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import CommonSelect from "../../../Components/common/CommonSelect";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        {/* Header */}
        <DrawerHeader title="Create Deal" onClose={onClose} />

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
          {/* Deal Name */}
          <CommonInput
            label="Deal Name *"
            required
            name="dealName"
            value={formData.dealName}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
          />

          {/* Deal Stage */}
          <CommonSelect
            label="Deal Stage *"
            required
            name="dealStage"
            value={formData.dealStage}
            onChange={handleChange}
            options={[
              "Prospecting",
              "Qualified",
              "Proposal",
              "Contract Sent",
              "Closed Won",
              "Closed Lost",
            ]}
          />

          {/* Associated Lead */}
          <CommonSelect
            label="Associated Lead *"
            required
            name="associatedLead"
            value={formData.associatedLead}
            onChange={handleChange}
            options={[
              "Jane Cooper",
              "Wade Warren",
              "Jenny Wilson",
              "Brooklyn Simmons",
              "Leslie Alexander",
            ]}
          />

          {/* Amount */}
          <CommonInput
            label="Amount *"
            required
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
          />

          {/* Deal Owner */}
          <CommonSelect
            label="Deal Owner *"
            required
            name="dealOwner"
            value={formData.dealOwner}
            onChange={handleChange}
            options={[
              "Admin",
              "Sales Manager",
              "John Doe",
              "Jenny Wilson",
            ]}
          />

          {/* Close Date + Priority */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Close Date */}
            <Box sx={{ flex: 1 }}>
              <DatePicker
                value={formData.closeDate}
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    closeDate: newValue,
                  }))
                }
                slotProps={{
                  textField: {
                    label: "Close Date *",
                    required: true,
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Box>

            {/* Priority */}
            <Box sx={{ flex: 1 }}>
              <CommonSelect
                label="Priority *"
                required
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                options={["High", "Medium", "Low"]}
              />
            </Box>
          </Box>
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
