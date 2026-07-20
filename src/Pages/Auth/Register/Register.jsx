import { Typography, Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../../../Components/common/AuthLayout";
import InputField from "../../../Components/common/InputField";
import SelectField from "../../../Components/common/SelectField";
import CommonButton from "../../../Components/common/CommonButton";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industry: "",
    country: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const industries = [
    { label: "IT", value: "it" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Education", value: "education" },
  ];

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "Employee", value: "employee" },
  ];

  return (
    <AuthLayout
      title="Register"
      maxWidth={900}
      footer={
        <>
          Already have an account?{" "}
          <Link component={RouterLink} to="/" underline="none" fontWeight={600}>
            Login
          </Link>
        </>
      }
    >
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            First Name
          </Typography>
          <InputField
            name="firstName"
            placeholder="Enter your first name"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Last Name
          </Typography>
          <InputField
            name="lastName"
            placeholder="Enter your last name"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Email
          </Typography>
          <InputField
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Phone Number
          </Typography>
          <InputField
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Password
          </Typography>
          <InputField
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Confirm Password
          </Typography>
          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Company Name
          </Typography>
          <InputField
            name="companyName"
            placeholder="Enter company name"
            value={form.companyName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Industry Type
          </Typography>
          <SelectField
            name="industry"
            value={form.industry}
            onChange={handleChange}
            options={["IT", "HealthCare", "Education"]}
            placeholder="Choose "
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Country / Region
          </Typography>
          <InputField
            name="country"
            placeholder="Enter your country"
            value={form.country}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
            Role
          </Typography>
          <SelectField
            name="role"
            value={form.role}
            onChange={handleChange}
            options={["Admin", "Manager", "Employee"]}
            placeholder="Choose"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CommonButton
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              height: 42,
            }}
          >
            Register
          </CommonButton>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
