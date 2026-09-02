// import {
//   Typography,
//   Box,
//   Link,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";

// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useState } from "react";
// import AuthLayout from "../../../Components/common/AuthLayout";
// import InputField from "../../../Components/common/InputField";
// import CommonButton from "../../../Components/common/CommonButton";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) =>
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(form);
//   };

//   return (
//     <AuthLayout
//       title="Log in"
//       footer={
//         <>
//           Don't have an account?{" "}
//           <Link href="/register" underline="none">
//             Sign up
//           </Link>
//         </>
//       }
//     >
//       <Box component="form" onSubmit={handleSubmit}>
//         <Typography fontWeight={500} mb={1}>
//           Email
//         </Typography>

//         <InputField
//           name="email"
//           placeholder="Enter your email"
//           value={form.email}
//           onChange={handleChange}
//           fullWidth
//           sx={{ mb: 3 }}
//         />

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             mb: 1,
//           }}
//         >
//           <Typography variant="body2" fontWeight={500}>
//             Password
//           </Typography>

//           <Link
//             href="/forgot-password"
//             underline="none"
//             color="primary"
//             variant="body1"
//           >
//             Forgot password?
//           </Link>
//         </Box>

//         <InputField
//           name="password"
//           placeholder="Enter your password"
//           type={showPassword ? "text" : "password"}
//           value={form.password}
//           onChange={handleChange}
//           fullWidth
//           slotProps={{
//             input: {
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     edge="end"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />

//         <CommonButton
//           type="submit"
//           fullWidth
//           sx={{
//             mt: 4,
//           }}
//         >
//           Log in
//         </CommonButton>
//       </Box>
//     </AuthLayout>
//   );
// }


// import {
//   Typography,
//   Box,
//   Link,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import AuthLayout from "../../../Components/common/AuthLayout";
// import InputField from "../../../Components/common/InputField";
// import CommonButton from "../../../Components/common/CommonButton";

// import api from "../../../services/api";

// export default function Login() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/accounts/login/",
//         {
//           email: form.email,
//           password: form.password,
//         }
//       );

//       // Save JWT tokens
//       localStorage.setItem("access", response.data.access);
//       localStorage.setItem("refresh", response.data.refresh);

//       alert("Login Successful!");

//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error.response?.data);

//       alert(
//         error.response?.data?.detail ||
//         error.response?.data?.non_field_errors?.[0] ||
//         "Invalid email or password."
//       );
//     }
//   };

//   return (
//     <AuthLayout
//       title="Log in"
//       footer={
//         <>
//           Don't have an account?{" "}
//           <Link href="/register" underline="hover">
//             Sign up
//           </Link>
//         </>
//       }
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ width: "100%" }}
//       >
//         <Typography variant="body2" fontWeight={500} mb={1}>
//           Email
//         </Typography>

//         <InputField
//           name="email"
//           type="email"
//           placeholder="Enter your email"
//           value={form.email}
//           onChange={handleChange}
//           fullWidth
//           sx={{ mb: 3 }}
//         />

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 1,
//           }}
//         >
//           <Typography variant="body2" fontWeight={500}>
//             Password
//           </Typography>

//           <Link
//             href="/forgot-password"
//             underline="none"
//             color="primary"
//           >
//             Forgot password?
//           </Link>
//         </Box>

//         <InputField
//           name="password"
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter your password"
//           value={form.password}
//           onChange={handleChange}
//           fullWidth
//           slotProps={{
//             input: {
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     edge="end"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                   >
//                     {showPassword ? (
//                       <VisibilityOff />
//                     ) : (
//                       <Visibility />
//                     )}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />

//         <CommonButton
//           type="submit"
//           fullWidth
//           sx={{ mt: 4 }}
//         >
//           Log in
//         </CommonButton>
//       </Box>
//     </AuthLayout>
//   );
// }


import {
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../../Components/common/AuthLayout";
import InputField from "../../../Components/common/InputField";
import CommonButton from "../../../Components/common/CommonButton";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          email: form.email.trim(),
          password: form.password,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      // =====================================================
      // SAVE ACCESS TOKEN
      // =====================================================

      localStorage.setItem(
        "access",
        response.data.access
      );

      // =====================================================
      // SAVE REFRESH TOKEN
      // =====================================================

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      // =====================================================
      // SAVE LOGGED-IN USER
      // =====================================================

      const loggedInUser = response.data.user;

      console.log(
        "LOGGED-IN USER:",
        loggedInUser
      );

      if (!loggedInUser?.id) {
        alert(
          "Login successful, but user ID was not returned."
        );
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      console.log(
        "USER SAVED:",
        loggedInUser
      );

      // =====================================================
      // SUCCESS
      // =====================================================

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        "Invalid email or password."
      );
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <AuthLayout
      title="Log in"
      footer={
        <>
          Don't have an account?{" "}

          <Link
            href="/register"
            underline="hover"
          >
            Sign up
          </Link>
        </>
      }
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
        }}
      >
        {/* EMAIL */}

        <Typography
          variant="body2"
          fontWeight={500}
          mb={1}
        >
          Email
        </Typography>

        <InputField
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          sx={{
            mb: 3,
          }}
        />

        {/* PASSWORD */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
          >
            Password
          </Typography>

          <Link
            href="/forgot-password"
            underline="none"
            color="primary"
          >
            Forgot password?
          </Link>
        </Box>

        <InputField
          name="password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                  >
                    {showPassword ? (
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

        {/* LOGIN BUTTON */}

        <CommonButton
          type="submit"
          fullWidth
          sx={{
            mt: 4,
          }}
        >
          Log in
        </CommonButton>
      </Box>
    </AuthLayout>
  );
}