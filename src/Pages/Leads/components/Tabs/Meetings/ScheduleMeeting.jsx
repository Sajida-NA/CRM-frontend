// import React, { useState } from "react";
// import { Drawer, Box, Grid } from "@mui/material";
// import DrawerHeader from "../../../../../Components/common/DrawerHeader";
// import CommonInput from "../../../../../Components/common/CommonInput";
// import CommonButton from "../../../../../Components/common/CommonButton";
// import CommonSelect from "../../../../../Components/common/CommonSelect";
// import CommonDatePicker from "../../../../../Components/common/CommonDatePicker";
// import CommonEditor from "../../../../../Components/common/CommonEditor";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import dayjs from "dayjs";

// export default function ScheduleMeeting({ open, onClose }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     startDate: null,
//     startTime: null,
//     endTime: null,
//     attendees: "",
//     location: "",
//     reminder: "",
//     note: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       startTime: formData.startTime
//         ? dayjs(formData.startTime).format("hh:mm A")
//         : "",
//       endTime: formData.endTime
//         ? dayjs(formData.endTime).format("hh:mm A")
//         : "",
//     };

//     console.log(payload);

//     // API call here

//     onClose();
//   };

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: 500,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#fff",
//         }}
//       >
//         {/* Header */}
//         <DrawerHeader title="Schedule Meeting" onClose={onClose} />

//         {/* Form Body */}
//         <Box
//           sx={{
//             flex: 1,
//             p: 3,
//             display: "flex",
//             flexDirection: "column",
//             gap: 3,
//             overflowY: "auto",
//           }}
//         >
//           {/* Title */}
//           <CommonInput
//             label="Title"
//             required
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//           />

//           {/* Start Date */}
//           <CommonDatePicker
//             label="Start Date"
//             required
//             placeholder="Select start date"
//             value={formData.startDate}
//             onChange={(newValue) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 startDate: newValue,
//               }))
//             }
//           />

//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <TimePicker
//                 label="Start Time"
//                 value={formData.startTime}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     startTime: newValue,
//                   }))
//                 }
//                 slotProps={{
//                   textField: {
//                     required: true,
//                     fullWidth: true,
//                     size: "small",
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TimePicker
//                 label="End Time"
//                 value={formData.endTime}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     endTime: newValue,
//                   }))
//                 }
//                 slotProps={{
//                   textField: {
//                     required: true,
//                     fullWidth: true,
//                     size: "small",
//                   },
//                 }}
//               />
//             </Grid>
//           </Grid>
//           {/* Attendees */}
//           <CommonSelect
//             label="Attendees"
//             required
//             name="attendees"
//             value={formData.attendees}
//             onChange={handleChange}
//             placeholder="Choose"
//             options={["Jane Cooper", "Maria Johnson", "Robert Fox"]}
//           />

//           {/* Location */}
//           <CommonSelect
//             label="Location"
//             required
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Choose"
//             options={[
//               "Meeting Room 1",
//               "Meeting Room 2",
//               "Online",
//               "Client Office",
//               "Head Office",
//             ]}
//           />

//           {/* Reminder */}
//           <CommonSelect
//             label="Reminder"
//             name="reminder"
//             value={formData.reminder}
//             onChange={handleChange}
//             placeholder="Choose"
//             options={[
//               "None",
//               "5 minutes before",
//               "10 minutes before",
//               "30 minutes before",
//               "1 hour before",
//             ]}
//           />

//           {/* Note */}
//           <CommonEditor
//             label="Note"
//             required
//             value={formData.note}
//             onChange={(value) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 note: value,
//               }))
//             }
//           />
//         </Box>

//         {/* Footer */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 3,
//             borderTop: "1px solid #E5E7EB",
//           }}
//         >
//           <CommonButton variant="outlined" fullWidth onClick={onClose}>
//             Cancel
//           </CommonButton>

//           <CommonButton type="submit" fullWidth>
//             Save
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }



// import React, { useEffect, useState } from "react";
// import {
//   Drawer,
//   Box,
//   Grid,
//   FormControl,
//   Select,
//   MenuItem,
//   Typography,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";

// import { useParams } from "react-router-dom";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import dayjs from "dayjs";

// import DrawerHeader from "../../../../../Components/common/DrawerHeader";
// import CommonInput from "../../../../../Components/common/CommonInput";
// import CommonButton from "../../../../../Components/common/CommonButton";
// import CommonSelect from "../../../../../Components/common/CommonSelect";
// import CommonDatePicker from "../../../../../Components/common/CommonDatePicker";
// import CommonEditor from "../../../../../Components/common/CommonEditor";

// import api from "../../../../../services/api";

// export default function ScheduleMeeting({ open, onClose }) {
//   const { dealId } = useParams();

//   const [users, setUsers] = useState([]);
//   const [saving, setSaving] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     startDate: null,
//     startTime: null,
//     endTime: null,
//     attendees: [],
//     location: "",
//     reminder: "",
//     note: "",
//   });

//   // ============================================================
//   // FETCH USERS
//   // ============================================================

//   useEffect(() => {
//     if (!open) return;

//     const fetchUsers = async () => {
//       try {
//         const response = await api.get("/accounts/users/");

//         console.log("USERS:", response.data);

//         const userData = Array.isArray(response.data)
//           ? response.data
//           : response.data?.results || [];

//         setUsers(userData);
//       } catch (error) {
//         console.error(
//           "Fetch Users Error:",
//           error.response?.data || error
//         );
//       }
//     };

//     fetchUsers();
//   }, [open]);

//   // ============================================================
//   // NORMAL INPUT CHANGE
//   // ============================================================

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ============================================================
//   // MULTIPLE ATTENDEE CHANGE
//   // ============================================================

//   const handleAttendeeChange = (event) => {
//     const value = event.target.value;

//     setFormData((prev) => ({
//       ...prev,
//       attendees:
//         typeof value === "string"
//           ? value.split(",")
//           : value,
//     }));
//   };

//   // ============================================================
//   // SUBMIT
//   // ============================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     console.log("=================================");
//     console.log("SAVE BUTTON CLICKED");
//     console.log("=================================");

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (!formData.title.trim()) {
//       alert("Please enter meeting title.");
//       return;
//     }

//     if (!formData.startDate) {
//       alert("Please select start date.");
//       return;
//     }

//     if (!formData.startTime) {
//       alert("Please select start time.");
//       return;
//     }

//     if (!formData.endTime) {
//       alert("Please select end time.");
//       return;
//     }

//     if (
//       dayjs(formData.endTime).isBefore(
//         dayjs(formData.startTime)
//       )
//     ) {
//       alert("End time must be after start time.");
//       return;
//     }

//     if (formData.attendees.length === 0) {
//       alert("Please select at least one attendee.");
//       return;
//     }

//     if (!formData.location) {
//       alert("Please select location.");
//       return;
//     }

//     if (!formData.note.trim()) {
//       alert("Please enter a note.");
//       return;
//     }

//     if (!dealId) {
//       alert("Deal ID not found.");
//       return;
//     }

//     // ----------------------------------------------------------
//     // GET LOGGED-IN USER
//     // ----------------------------------------------------------

//     let senderId = null;

//     try {
//       const storedUser = localStorage.getItem("user");

//       if (storedUser) {
//         const user = JSON.parse(storedUser);

//         senderId =
//           user?.id ||
//           user?.user_id ||
//           user?.pk ||
//           null;

//         console.log("STORED USER:", user);
//         console.log("SENDER ID:", senderId);
//       }
//     } catch (error) {
//       console.error(
//         "Error reading logged-in user:",
//         error
//       );
//     }

//     // ----------------------------------------------------------
//     // IMPORTANT
//     // ----------------------------------------------------------

//     if (!senderId) {
//       alert(
//         "Logged-in user ID not found. Please login again."
//       );
//       return;
//     }

//     // ----------------------------------------------------------
//     // PAYLOAD
//     // ----------------------------------------------------------

//     const payload = {
//       sender_id: Number(senderId),

//       module: "deal",

//       module_id: Number(dealId),

//       title: formData.title.trim(),

//       start_date: dayjs(formData.startDate).format(
//         "YYYY-MM-DD"
//       ),

//       start_time: dayjs(formData.startTime).format(
//         "HH:mm:ss"
//       ),

//       end_time: dayjs(formData.endTime).format(
//         "HH:mm:ss"
//       ),

//       // Multiple attendee IDs
//       attendees: formData.attendees.map((id) =>
//         Number(id)
//       ),

//       location: formData.location,

//       reminder: formData.reminder || "",

//       note: formData.note.trim(),
//     };

//     console.log(
//       "================================="
//     );
//     console.log(
//       "CREATE MEETING PAYLOAD:",
//       payload
//     );
//     console.log(
//       "================================="
//     );

//     // ----------------------------------------------------------
//     // API CALL
//     // ----------------------------------------------------------

//     try {
//       setSaving(true);

//       const response = await api.post(
//         "/activities/meeting/",
//         payload
//       );

//       console.log(
//         "MEETING CREATED SUCCESSFULLY:",
//         response.data
//       );

//       alert("Meeting created successfully.");

//       // --------------------------------------------------------
//       // RESET FORM
//       // --------------------------------------------------------

//       setFormData({
//         title: "",
//         startDate: null,
//         startTime: null,
//         endTime: null,
//         attendees: [],
//         location: "",
//         reminder: "",
//         note: "",
//       });

//       onClose();

//     } catch (error) {
//       console.error(
//         "CREATE MEETING ERROR:",
//         error.response?.data || error
//       );

//       console.error(
//         "STATUS:",
//         error.response?.status
//       );

//       console.error(
//         "REQUEST:",
//         error.config
//       );

//       if (error.response?.data) {
//         alert(
//           `Failed to create meeting:\n${JSON.stringify(
//             error.response.data
//           )}`
//         );
//       } else {
//         alert(
//           "Failed to create meeting. Check that the Django server is running."
//         );
//       }

//     } finally {
//       setSaving(false);
//     }
//   };

//   // ============================================================
//   // ATTENDEE OPTIONS
//   // ============================================================

//   const attendeeOptions = users.map((user) => ({
//     label:
//       user.name ||
//       user.full_name ||
//       `${user.first_name || ""} ${
//         user.last_name || ""
//       }`.trim() ||
//       user.email ||
//       `User ${user.id}`,

//     value: user.id,
//   }));

//   // ============================================================
//   // SELECTED ATTENDEE NAMES
//   // ============================================================

//   const selectedAttendeeNames = attendeeOptions
//     .filter((option) =>
//       formData.attendees.some(
//         (id) =>
//           String(id) === String(option.value)
//       )
//     )
//     .map((option) => option.label);

//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={saving ? undefined : onClose}
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           width: 500,
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#fff",
//         }}
//       >
//         {/* ==================================================
//             HEADER
//             ================================================== */}

//         <DrawerHeader
//           title="Schedule Meeting"
//           onClose={onClose}
//         />

//         {/* ==================================================
//             BODY
//             ================================================== */}

//         <Box
//           sx={{
//             flex: 1,
//             p: 3,
//             display: "flex",
//             flexDirection: "column",
//             gap: 3,
//             overflowY: "auto",
//           }}
//         >
//           {/* TITLE */}

//           <CommonInput
//             label="Title"
//             required
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter"
//             fullWidth
//           />

//           {/* START DATE */}

//           <CommonDatePicker
//             label="Start Date"
//             required
//             placeholder="Select start date"
//             value={formData.startDate}
//             onChange={(newValue) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 startDate: newValue,
//               }))
//             }
//           />

//           {/* START / END TIME */}

//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <TimePicker
//                 label="Start Time"
//                 value={formData.startTime}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     startTime: newValue,
//                   }))
//                 }
//                 slotProps={{
//                   textField: {
//                     required: true,
//                     fullWidth: true,
//                     size: "small",
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TimePicker
//                 label="End Time"
//                 value={formData.endTime}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     endTime: newValue,
//                   }))
//                 }
//                 slotProps={{
//                   textField: {
//                     required: true,
//                     fullWidth: true,
//                     size: "small",
//                   },
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* ==================================================
//               MULTIPLE ATTENDEES
//               ================================================== */}

//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 lineHeight: "20px",
//                 color: "#344054",
//                 mb: "6px",
//               }}
//             >
//               Attendees

//               <Box
//                 component="span"
//                 sx={{
//                   color: "#F04438",
//                   ml: "2px",
//                 }}
//               >
//                 *
//               </Box>
//             </Typography>

//             <FormControl fullWidth>
//               <Select
//                 multiple
//                 displayEmpty
//                 value={formData.attendees}
//                 onChange={handleAttendeeChange}
//                 renderValue={(selected) => {
//                   if (!selected.length) {
//                     return (
//                       <Typography
//                         sx={{
//                           color: "#98A2B3",
//                           fontSize: "16px",
//                         }}
//                       >
//                         Choose
//                       </Typography>
//                     );
//                   }

//                   return selectedAttendeeNames.join(
//                     ", "
//                   );
//                 }}
//                 sx={{
//                   minHeight: "44px",
//                   borderRadius: "10px",
//                   backgroundColor: "#fff",

//                   "& .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor: "#D0D5DD",
//                     },

//                   "&:hover .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor: "#D0D5DD",
//                     },

//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor: "#6941C6",
//                       borderWidth: "1px",
//                     },

//                   "& .MuiSelect-select": {
//                     padding: "10px 14px",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "16px",
//                     color: "#344054",
//                   },

//                   "& .MuiSelect-icon": {
//                     color: "#667085",
//                     right: 12,
//                   },
//                 }}
//               >
//                 {attendeeOptions.map((option) => (
//                   <MenuItem
//                     key={option.value}
//                     value={option.value}
//                   >
//                     <Checkbox
//                       checked={formData.attendees.some(
//                         (id) =>
//                           String(id) ===
//                           String(option.value)
//                       )}
//                     />

//                     <ListItemText
//                       primary={option.label}
//                     />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* LOCATION */}

//           <CommonSelect
//             label="Location"
//             required
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Choose"
//             options={[
//               "Meeting Room 1",
//               "Meeting Room 2",
//               "Online",
//               "Client Office",
//               "Head Office",
//             ]}
//           />

//           {/* REMINDER */}

//           <CommonSelect
//             label="Reminder"
//             name="reminder"
//             value={formData.reminder}
//             onChange={handleChange}
//             placeholder="Choose"
//             options={[
//               {
//                 label: "5 minutes before",
//                 value: "5_MIN",
//               },
//               {
//                 label: "15 minutes before",
//                 value: "15_MIN",
//               },
//               {
//                 label: "30 minutes before",
//                 value: "30_MIN",
//               },
//               {
//                 label: "1 hour before",
//                 value: "1_HOUR",
//               },
//               {
//                 label: "1 day before",
//                 value: "1_DAY",
//               },
//             ]}
//           />

//           {/* NOTE */}

//           <CommonEditor
//             label="Note"
//             required
//             value={formData.note}
//             onChange={(value) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 note: value,
//               }))
//             }
//           />
//         </Box>

//         {/* ==================================================
//             FOOTER
//             ================================================== */}

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 3,
//             borderTop: "1px solid #E5E7EB",
//           }}
//         >
//           <CommonButton
//             variant="outlined"
//             fullWidth
//             onClick={onClose}
//             disabled={saving}
//           >
//             Cancel
//           </CommonButton>

//           <CommonButton
//             type="submit"
//             fullWidth
//             disabled={saving}
//           >
//             {saving ? "Saving..." : "Save"}
//           </CommonButton>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// }


import React, { useEffect, useState } from "react";

import {
  Drawer,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { useParams } from "react-router-dom";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";

import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonDatePicker from "../../../../../Components/common/CommonDatePicker";
import CommonEditor from "../../../../../Components/common/CommonEditor";

import api from "../../../../../services/api";

export default function ScheduleMeeting({
  open,
  onClose,
}) {
  const { dealId } = useParams();

  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    startTime: null,
    endTime: null,
    attendees: [],
    location: "",
    reminder: "",
    note: "",
  });

  // =========================================================
  // FETCH USERS
  // =========================================================

  useEffect(() => {
    if (!open) return;

    const fetchUsers = async () => {
      try {
        const response = await api.get(
          "/accounts/users/"
        );

        console.log(
          "USERS RESPONSE:",
          response.data
        );

        const userData = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        setUsers(userData);

      } catch (error) {
        console.error(
          "FETCH USERS ERROR:",
          error.response?.data || error
        );
      }
    };

    fetchUsers();
  }, [open]);

  // =========================================================
  // NORMAL INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // ATTENDEE CHANGE
  // =========================================================

  const handleAttendeeChange = (event) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,

      attendees:
        typeof value === "string"
          ? value.split(",")
          : value,
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(
      "================================="
    );

    console.log(
      "SAVE MEETING CLICKED"
    );

    console.log(
      "================================="
    );

    // =======================================================
    // VALIDATION
    // =======================================================

    if (!formData.title.trim()) {
      alert(
        "Please enter meeting title."
      );
      return;
    }

    if (!formData.startDate) {
      alert(
        "Please select start date."
      );
      return;
    }

    if (!formData.startTime) {
      alert(
        "Please select start time."
      );
      return;
    }

    if (!formData.endTime) {
      alert(
        "Please select end time."
      );
      return;
    }

    if (
      dayjs(formData.endTime).isBefore(
        dayjs(formData.startTime)
      )
    ) {
      alert(
        "End time must be after start time."
      );
      return;
    }

    if (
      formData.attendees.length === 0
    ) {
      alert(
        "Please select at least one attendee."
      );
      return;
    }

    if (!formData.location) {
      alert(
        "Please select location."
      );
      return;
    }

    if (!formData.note.trim()) {
      alert(
        "Please enter a note."
      );
      return;
    }

    if (!dealId) {
      alert(
        "Deal ID not found."
      );
      return;
    }

    // =======================================================
    // GET LOGGED-IN USER
    // =======================================================

    let senderId = null;

    try {
      const storedUser =
        localStorage.getItem("user");

      console.log(
        "STORED USER:",
        storedUser
      );

      if (!storedUser) {
        alert(
          "Logged-in user information not found. Please login again."
        );
        return;
      }

      const loggedInUser =
        JSON.parse(storedUser);

      console.log(
        "LOGGED-IN USER:",
        loggedInUser
      );

      senderId =
        loggedInUser?.id ||
        loggedInUser?.user_id ||
        loggedInUser?.pk ||
        null;

      console.log(
        "SENDER ID:",
        senderId
      );

    } catch (error) {
      console.error(
        "USER PARSE ERROR:",
        error
      );

      alert(
        "Invalid logged-in user information. Please login again."
      );

      return;
    }

    // =======================================================
    // USER ID VALIDATION
    // =======================================================

    if (!senderId) {
      alert(
        "Logged-in user ID not found. Please login again."
      );
      return;
    }

    // =======================================================
    // PAYLOAD
    // =======================================================

    const payload = {
      sender_id: Number(senderId),

      module: "deal",

      module_id: Number(dealId),

      title:
        formData.title.trim(),

      start_date:
        dayjs(
          formData.startDate
        ).format("YYYY-MM-DD"),

      start_time:
        dayjs(
          formData.startTime
        ).format("HH:mm:ss"),

      end_time:
        dayjs(
          formData.endTime
        ).format("HH:mm:ss"),

      attendees:
        formData.attendees.map(
          (id) => Number(id)
        ),

      location:
        formData.location,

      reminder:
        formData.reminder || "",

      note:
        formData.note.trim(),
    };

    // =======================================================
    // LOG PAYLOAD
    // =======================================================

    console.log(
      "================================="
    );

    console.log(
      "CREATE MEETING PAYLOAD:",
      payload
    );

    console.log(
      "================================="
    );

    // =======================================================
    // API CALL
    // =======================================================

    try {
      setSaving(true);

      const response =
        await api.post(
          "/activities/meeting/",
          payload
        );

      console.log(
        "MEETING CREATED:",
        response.data
      );

      alert(
        "Meeting created successfully."
      );

      // =====================================================
      // RESET FORM
      // =====================================================

      setFormData({
        title: "",
        startDate: null,
        startTime: null,
        endTime: null,
        attendees: [],
        location: "",
        reminder: "",
        note: "",
      });

      onClose();

    } catch (error) {
      console.error(
        "CREATE MEETING ERROR:",
        error.response?.data || error
      );

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "REQUEST DATA:",
        error.config?.data
      );

      const errorData =
        error.response?.data;

      if (errorData) {
        alert(
          `Failed to create meeting:\n${JSON.stringify(
            errorData,
            null,
            2
          )}`
        );
      } else {
        alert(
          "Failed to create meeting. Check that the Django server is running."
        );
      }

    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // ATTENDEE OPTIONS
  // =========================================================

  const attendeeOptions =
    users.map((user) => ({
      label:
        user.name ||
        user.full_name ||
        `${user.first_name || ""} ${
          user.last_name || ""
        }`.trim() ||
        user.email ||
        `User ${user.id}`,

      value: user.id,
    }));

  // =========================================================
  // SELECTED ATTENDEE NAMES
  // =========================================================

  const selectedAttendeeNames =
    attendeeOptions
      .filter((option) =>
        formData.attendees.some(
          (id) =>
            String(id) ===
            String(option.value)
        )
      )
      .map(
        (option) => option.label
      );

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={
        saving
          ? undefined
          : onClose
      }
    >
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
        {/* HEADER */}

        <DrawerHeader
          title="Schedule Meeting"
          onClose={onClose}
        />

        {/* BODY */}

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
          {/* TITLE */}

          <CommonInput
            label="Title"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter"
            fullWidth
          />

          {/* START DATE */}

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

          {/* TIME */}

          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TimePicker
                label="Start Time"
                value={
                  formData.startTime
                }
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

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TimePicker
                label="End Time"
                value={
                  formData.endTime
                }
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

          {/* ATTENDEES */}

          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
                color: "#344054",
                mb: "6px",
              }}
            >
              Attendees

              <Box
                component="span"
                sx={{
                  color: "#F04438",
                  ml: "2px",
                }}
              >
                *
              </Box>
            </Typography>

            <FormControl
              fullWidth
            >
              <Select
                multiple
                displayEmpty
                value={
                  formData.attendees
                }
                onChange={
                  handleAttendeeChange
                }
                renderValue={(
                  selected
                ) => {
                  if (
                    !selected.length
                  ) {
                    return (
                      <Typography
                        sx={{
                          color:
                            "#98A2B3",
                          fontSize:
                            "16px",
                        }}
                      >
                        Choose
                      </Typography>
                    );
                  }

                  return selectedAttendeeNames.join(
                    ", "
                  );
                }}
                sx={{
                  minHeight:
                    "44px",
                  borderRadius:
                    "10px",
                  backgroundColor:
                    "#fff",

                  "& .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor:
                        "#D0D5DD",
                    },

                  "&:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor:
                        "#D0D5DD",
                    },

                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor:
                        "#6941C6",
                      borderWidth:
                        "1px",
                    },

                  "& .MuiSelect-select":
                    {
                      padding:
                        "10px 14px",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      fontSize:
                        "16px",
                      color:
                        "#344054",
                    },

                  "& .MuiSelect-icon":
                    {
                      color:
                        "#667085",
                      right: 12,
                    },
                }}
              >
                {attendeeOptions.map(
                  (option) => (
                    <MenuItem
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      <Checkbox
                        checked={formData.attendees.some(
                          (id) =>
                            String(
                              id
                            ) ===
                            String(
                              option.value
                            )
                        )}
                      />

                      <ListItemText
                        primary={
                          option.label
                        }
                      />
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>

          {/* LOCATION */}

          <CommonSelect
            label="Location"
            required
            name="location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            placeholder="Choose"
            options={[
              "Meeting Room 1",
              "Meeting Room 2",
              "Online",
              "Client Office",
              "Head Office",
            ]}
          />

          {/* REMINDER */}

          <CommonSelect
            label="Reminder"
            name="reminder"
            value={
              formData.reminder
            }
            onChange={
              handleChange
            }
            placeholder="Choose"
            options={[
              {
                label:
                  "5 minutes before",
                value:
                  "5_MIN",
              },
              {
                label:
                  "15 minutes before",
                value:
                  "15_MIN",
              },
              {
                label:
                  "30 minutes before",
                value:
                  "30_MIN",
              },
              {
                label:
                  "1 hour before",
                value:
                  "1_HOUR",
              },
              {
                label:
                  "1 day before",
                value:
                  "1_DAY",
              },
            ]}
          />

          {/* NOTE */}

          <CommonEditor
            label="Note"
            required
            value={
              formData.note
            }
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                note: value,
              }))
            }
          />
        </Box>

        {/* FOOTER */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop:
              "1px solid #E5E7EB",
          }}
        >
          <CommonButton
            variant="outlined"
            fullWidth
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </CommonButton>

          <CommonButton
            type="submit"
            fullWidth
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save"}
          </CommonButton>
        </Box>
      </Box>
    </Drawer>
  );
}