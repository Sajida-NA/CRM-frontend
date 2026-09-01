// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ResetPassword = () => {
//   const { uid, token } = useParams();
//   const navigate = useNavigate();

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Frontend validation
//     if (newPassword.length < 8) {
//       alert("Password must be at least 8 characters long.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     console.log({
//       uid,
//       token,
//       new_password: newPassword,
//       confirm_password: confirmPassword,
//     });

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/accounts/reset-password/",
//         {
//           uid,
//           token,
//           new_password: newPassword,
//           confirm_password: confirmPassword,
//         }
//       );

//       alert(response.data.message);
//       navigate("/");
//     } catch (error) {
//       console.log(error.response?.data);
//       alert(JSON.stringify(error.response?.data));
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />

//         <br />
//         <br />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <br />
//         <br />

//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;



import {
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../../Components/common/AuthLayout";
import InputField from "../../../Components/common/InputField";
import CommonButton from "../../../Components/common/CommonButton";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (form.newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Confirm password validation
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/reset-password/",
        {
          uid: uid,
          token: token,
          new_password: form.newPassword,
          confirm_password: form.confirmPassword,
        }
      );

      alert(response.data.message || "Password reset successful!");

      // Navigate to login
      navigate("/");
    } catch (error) {
      console.error(error.response?.data);

      const errorData = error.response?.data;

      alert(
        errorData?.detail ||
          errorData?.message ||
          errorData?.non_field_errors?.[0] ||
          "Password reset failed."
      );
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      footer={
        <>
          Remember your password?{" "}
          <Link href="/" underline="hover">
            Log in
          </Link>
        </>
      }
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%" }}
      >
        {/* New Password */}
        <Typography variant="body2" fontWeight={500} mb={1}>
          New Password
        </Typography>

        <InputField
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          placeholder="Enter your new password"
          value={form.newPassword}  sx={{ mb: 2 }}
          onChange={handleChange}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      setShowNewPassword((prev) => !prev)
                    }
                  >
                    {showNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Confirm Password */}
        <Typography
          variant="body2"
          fontWeight={500}
          mb={1}
          mt={3}
        >
          Confirm Password
        </Typography>

        <InputField
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your new password"
          value={form.confirmPassword}
          onChange={handleChange}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Reset Password Button */}
        <CommonButton
          type="submit"
          fullWidth
          sx={{ mt: 4 }}
        >
          Reset Password
        </CommonButton>
      </Box>
    </AuthLayout>
  );
}
