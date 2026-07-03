import React, { useState } from "react";
import { Drawer, Box, Grid } from "@mui/material";
import DrawerHeader from "../../../Components/common/DrawerHeader";
import CommonInput from "../../../Components/common/CommonInput";
import CommonButton from "../../../Components/common/CommonButton";
import PhoneInputField from "../../../Components/common/PhoneInputField";
import CommonSelect from "../../../Components/common/CommonSelect";

export default function CreateCompanyDrawer({ open, onClose }) {
  const [formData, setFormData] = useState({
    domainName: "",
    companyName: "",
    companyOwner: "",
    industry: "",
    type: "",
    city: "",
    country: "",
    noOfEmployees: "",
    annualRevenue: "",
    phoneNumber: "",
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
        <DrawerHeader title="Create Company" onClose={onClose} />

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
            label="Domain Name"
            name="domainName"
            value={formData.domainName}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          <CommonInput
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          <CommonInput
            label="Company Owner"
            name="companyOwner"
            value={formData.companyOwner}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
            required
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CommonSelect
                label="Industry"
                required
                placeholder="Choose"
                options={[
                  "Legal Services",
                  "Healthcare",
                  "Real Estate",
                  "Marketing",
                ]}
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CommonSelect
                label="Type"
                required
                placeholder="Choose"
                options={["Private", "Public", "Startup", "Enterprise"]}
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <CommonInput
              label="City"
              placeholder="Enter"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <CommonInput
              label="Country/Region"
              placeholder="Enter"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <CommonInput
              label="No of Employees"
              placeholder="Enter"
              name="noOfEmployees"
              value={formData.noOfEmployees}
              onChange={handleChange}
            />

            <CommonInput
              label="Annual Revenue"
              placeholder="Enter"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleChange}
            />
          </Box>

          <Grid item xs={12}>
            <PhoneInputField
              label="Phone Number"
              required
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CommonInput
              label="Email"
              required
              placeholder="Enter"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
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
