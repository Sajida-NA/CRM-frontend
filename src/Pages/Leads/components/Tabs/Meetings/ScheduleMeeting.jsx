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

// export default function ScheduleMeeting({
//   open,
//   onClose,
//   relatedModule,
//   objectId,
//   module,
//   moduleId,
// }) {
//   const { leadId, dealId, ticketId } = useParams();

//   const finalModule = String(
//     module ||
//       relatedModule ||
//       (leadId
//         ? "lead"
//         : ticketId
//         ? "ticket"
//         : dealId
//         ? "deal"
//         : "company")
//   )
//     .toLowerCase()
//     .trim();

//   const finalModuleId =
//     moduleId ||
//     objectId ||
//     leadId ||
//     ticketId ||
//     dealId;

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

//   // =========================================================
//   // ROLE NORMALIZER
//   // =========================================================

//   const normalizeRole = (value) => {
//     if (!value) return "";

//     if (typeof value === "string") {
//       return value
//         .toLowerCase()
//         .replace(/[_-]/g, " ")
//         .trim();
//     }

//     if (typeof value === "object") {
//       return normalizeRole(
//         value.name ||
//           value.label ||
//           value.value ||
//           value.role ||
//           value.title
//       );
//     }

//     return "";
//   };

//   // =========================================================
//   // CHECK CONTACT OWNER
//   // =========================================================

//   const isContactOwner = (user) => {
//     const possibleRoles = [
//       user.role,
//       user.role_name,
//       user.user_role,
//       user.userRole,
//       user.roleName,
//       user.type,
//       user.user_type,
//       user.userType,
//     ];

//     for (const role of possibleRoles) {
//       if (normalizeRole(role) === "contact owner") {
//         return true;
//       }
//     }

//     if (Array.isArray(user.roles)) {
//       const hasContactOwner = user.roles.some(
//         (role) =>
//           normalizeRole(role) === "contact owner"
//       );

//       if (hasContactOwner) {
//         return true;
//       }
//     }

//     if (
//       user.role &&
//       typeof user.role === "object"
//     ) {
//       if (
//         normalizeRole(user.role) ===
//         "contact owner"
//       ) {
//         return true;
//       }
//     }

//     return false;
//   };

//   // =========================================================
//   // GET LEAD CONTACT OWNERS
//   // =========================================================

//   const getLeadContactOwners = async (
//     leadIdValue,
//     userData
//   ) => {
//     if (!leadIdValue) {
//       return [];
//     }

//     try {
//       console.log(
//         "FETCH LEAD:",
//         leadIdValue
//       );

//       const response = await api.get(
//         `/leads/leadslist/${leadIdValue}/`
//       );

//       console.log(
//         "LEAD DETAILS:",
//         response.data
//       );

//       const leadData = response.data;

//       const contactOwnerIds =
//         leadData?.contact_owner_ids || [];

//       console.log(
//         "CONTACT OWNER IDS:",
//         contactOwnerIds
//       );

//       if (!contactOwnerIds.length) {
//         return [];
//       }

//       const leadContactOwners =
//         userData.filter((user) =>
//           contactOwnerIds.some(
//             (ownerId) =>
//               Number(ownerId) ===
//               Number(user.id)
//           )
//         );

//       console.log(
//         "LEAD CONTACT OWNERS:",
//         leadContactOwners
//       );

//       return leadContactOwners;
//     } catch (error) {
//       console.error(
//         "FETCH LEAD CONTACT OWNERS ERROR:",
//         error.response?.data || error
//       );

//       return [];
//     }
//   };

//   // =========================================================
//   // FETCH ATTENDEES
//   // =========================================================

//   useEffect(() => {
//     if (!open) return;

//     const fetchAttendees = async () => {
//       try {
//         // -----------------------------------------------------
//         // GET ALL USERS
//         // -----------------------------------------------------

//         const response = await api.get(
//           "/accounts/users/"
//         );

//         console.log(
//           "================================="
//         );
//         console.log(
//           "USERS RESPONSE:",
//           response.data
//         );
//         console.log(
//           "================================="
//         );

//         const userData = Array.isArray(response.data)
//           ? response.data
//           : response.data?.results || [];

//         console.log(
//           "ALL USERS:",
//           userData
//         );

//         // =====================================================
//         // LEAD
//         // =====================================================

//         if (
//           finalModule === "lead" &&
//           finalModuleId
//         ) {
//           const leadContactOwners =
//             await getLeadContactOwners(
//               finalModuleId,
//               userData
//             );

//           console.log(
//             "LEAD ATTENDEES:",
//             leadContactOwners
//           );

//           setUsers(
//             leadContactOwners
//           );

//           setFormData((prev) => ({
//             ...prev,
//             attendees:
//               leadContactOwners.map(
//                 (user) =>
//                   Number(user.id)
//               ),
//           }));

//           return;
//         }

//         // =====================================================
//         // DEAL
//         // =====================================================

//         if (
//           finalModule === "deal" &&
//           finalModuleId
//         ) {
//           try {
//             console.log(
//               "FETCH DEAL:",
//               finalModuleId
//             );

//             const dealResponse =
//               await api.get(
//                 `/deals/${finalModuleId}/`
//               );

//             console.log(
//               "DEAL DETAILS:",
//               dealResponse.data
//             );

//             const dealData =
//               dealResponse.data;

//             const associatedLeadId =
//               dealData?.associated_lead;

//             console.log(
//               "DEAL ASSOCIATED LEAD:",
//               associatedLeadId
//             );

//             if (associatedLeadId) {
//               const leadContactOwners =
//                 await getLeadContactOwners(
//                   associatedLeadId,
//                   userData
//                 );

//               console.log(
//                 "DEAL ATTENDEES:",
//                 leadContactOwners
//               );

//               setUsers(
//                 leadContactOwners
//               );

//               setFormData((prev) => ({
//                 ...prev,
//                 attendees:
//                   leadContactOwners.map(
//                     (user) =>
//                       Number(user.id)
//                   ),
//               }));

//               return;
//             }

//             // Fallback
//             const contactOwners =
//               userData.filter(
//                 (user) =>
//                   isContactOwner(user)
//               );

//             setUsers(
//               contactOwners
//             );

//             setFormData((prev) => ({
//               ...prev,
//               attendees: [],
//             }));
//           } catch (error) {
//             console.error(
//               "FETCH DEAL ERROR:",
//               error.response?.data ||
//                 error
//             );

//             const contactOwners =
//               userData.filter(
//                 (user) =>
//                   isContactOwner(user)
//               );

//             setUsers(
//               contactOwners
//             );

//             setFormData((prev) => ({
//               ...prev,
//               attendees: [],
//             }));
//           }

//           return;
//         }

//         // =====================================================
//         // TICKET
//         // =====================================================

//         if (
//           finalModule === "ticket" &&
//           finalModuleId
//         ) {
//           try {
//             console.log(
//               "FETCH TICKET:",
//               finalModuleId
//             );

//             const ticketResponse =
//               await api.get(
//                 `/tickets/${finalModuleId}/`
//               );

//             console.log(
//               "TICKET DETAILS:",
//               ticketResponse.data
//             );

//             const ticketData =
//               ticketResponse.data;

//             const associatedDealId =
//               ticketData?.associated_deal ||
//               ticketData?.associated_deal_id;

//             console.log(
//               "TICKET ASSOCIATED DEAL:",
//               associatedDealId
//             );

//             if (associatedDealId) {
//               const dealResponse =
//                 await api.get(
//                   `/deals/${associatedDealId}/`
//                 );

//               console.log(
//                 "TICKET DEAL DETAILS:",
//                 dealResponse.data
//               );

//               const dealData =
//                 dealResponse.data;

//               const associatedLeadId =
//                 dealData?.associated_lead;

//               console.log(
//                 "TICKET DEAL ASSOCIATED LEAD:",
//                 associatedLeadId
//               );

//               if (associatedLeadId) {
//                 const leadContactOwners =
//                   await getLeadContactOwners(
//                     associatedLeadId,
//                     userData
//                   );

//                 console.log(
//                   "TICKET ATTENDEES:",
//                   leadContactOwners
//                 );

//                 setUsers(
//                   leadContactOwners
//                 );

//                 setFormData((prev) => ({
//                   ...prev,
//                   attendees:
//                     leadContactOwners.map(
//                       (user) =>
//                         Number(user.id)
//                     ),
//                 }));

//                 return;
//               }
//             }

//             // Fallback
//             const contactOwners =
//               userData.filter(
//                 (user) =>
//                   isContactOwner(user)
//               );

//             setUsers(
//               contactOwners
//             );

//             setFormData((prev) => ({
//               ...prev,
//               attendees: [],
//             }));
//           } catch (error) {
//             console.error(
//               "FETCH TICKET / DEAL / LEAD ERROR:",
//               error.response?.data ||
//                 error
//             );

//             const contactOwners =
//               userData.filter(
//                 (user) =>
//                   isContactOwner(user)
//               );

//             setUsers(
//               contactOwners
//             );

//             setFormData((prev) => ({
//               ...prev,
//               attendees: [],
//             }));
//           }

//           return;
//         }

//         // =====================================================
//         // COMPANY
//         // =====================================================

//         if (
//           finalModule === "company" &&
//           finalModuleId
//         ) {
//           try {
//             console.log(
//               "FETCH COMPANY:",
//               finalModuleId
//             );

//             const companyResponse =
//               await api.get(
//                 `/companies/${finalModuleId}/`
//               );

//             console.log(
//               "COMPANY DETAILS:",
//               companyResponse.data
//             );

//             const companyData =
//               companyResponse.data;

//             const companyOwnerId =
//               companyData?.company_owner;

//             console.log(
//               "COMPANY OWNER ID:",
//               companyOwnerId
//             );

//             if (companyOwnerId) {
//               const companyOwner =
//                 userData.filter(
//                   (user) =>
//                     Number(user.id) ===
//                     Number(companyOwnerId)
//                 );

//               console.log(
//                 "COMPANY OWNER:",
//                 companyOwner
//               );

//               setUsers(
//                 companyOwner
//               );

//               setFormData((prev) => ({
//                 ...prev,
//                 attendees:
//                   companyOwner.map(
//                     (user) =>
//                       Number(user.id)
//                   ),
//               }));

//               return;
//             }

//             setUsers([]);

//             setFormData((prev) => ({
//               ...prev,
//               attendees: [],
//             }));
//           } catch (error) {
//             console.error(
//               "FETCH COMPANY ERROR:",
//               error.response?.data ||
//                 error
//             );

//             setUsers([]);

//             setFormData((prev) => ({
//               ...prev,
//               attendees: [],
//             }));
//           }

//           return;
//         }

//         // =====================================================
//         // DEFAULT
//         // =====================================================

//         const contactOwners =
//           userData.filter(
//             (user) =>
//               isContactOwner(user)
//           );

//         console.log(
//           "CONTACT OWNERS:",
//           contactOwners
//         );

//         console.log(
//           "CONTACT OWNER COUNT:",
//           contactOwners.length
//         );

//         setUsers(
//           contactOwners
//         );

//         setFormData((prev) => ({
//           ...prev,
//           attendees: [],
//         }));
//       } catch (error) {
//         console.error(
//           "FETCH CONTACT OWNERS ERROR:",
//           error.response?.data ||
//             error
//         );

//         setUsers([]);
//       }
//     };

//     fetchAttendees();
//   }, [
//     open,
//     finalModule,
//     finalModuleId,
//   ]);

//   // =========================================================
//   // FORM CHANGE
//   // =========================================================

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================================================
//   // ATTENDEE CHANGE
//   // =========================================================

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

//   // =========================================================
//   // SUBMIT
//   // =========================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     console.log(
//       "================================="
//     );

//     console.log(
//       "SAVE MEETING CLICKED"
//     );

//     console.log(
//       "MODULE:",
//       finalModule
//     );

//     console.log(
//       "MODULE ID:",
//       finalModuleId
//     );

//     console.log(
//       "================================="
//     );

//     if (!formData.title.trim()) {
//       alert(
//         "Please enter meeting title."
//       );
//       return;
//     }

//     if (!formData.startDate) {
//       alert(
//         "Please select start date."
//       );
//       return;
//     }

//     if (!formData.startTime) {
//       alert(
//         "Please select start time."
//       );
//       return;
//     }

//     if (!formData.endTime) {
//       alert(
//         "Please select end time."
//       );
//       return;
//     }

//     if (
//       dayjs(formData.endTime).isBefore(
//         dayjs(formData.startTime)
//       )
//     ) {
//       alert(
//         "End time must be after start time."
//       );
//       return;
//     }

//     if (
//       formData.attendees.length === 0
//     ) {
//       alert(
//         "Please select at least one attendee."
//       );
//       return;
//     }

//     if (!formData.location) {
//       alert(
//         "Please select location."
//       );
//       return;
//     }

//     if (!formData.note.trim()) {
//       alert(
//         "Please enter a note."
//       );
//       return;
//     }

//     if (!finalModuleId) {
//       const moduleName =
//         finalModule.charAt(0).toUpperCase() +
//         finalModule.slice(1);

//       alert(
//         `${moduleName} ID not found.`
//       );

//       return;
//     }

//     const payload = {
//       module: finalModule,

//       module_id:
//         Number(finalModuleId),

//       title:
//         formData.title.trim(),

//       start_date:
//         dayjs(
//           formData.startDate
//         ).format("YYYY-MM-DD"),

//       start_time:
//         dayjs(
//           formData.startTime
//         ).format("HH:mm:ss"),

//       end_time:
//         dayjs(
//           formData.endTime
//         ).format("HH:mm:ss"),

//       attendees:
//         formData.attendees.map(
//           (id) => Number(id)
//         ),

//       location:
//         formData.location,

//       reminder:
//         formData.reminder || "",

//       note:
//         formData.note.trim(),
//     };

//     console.log(
//       "================================="
//     );

//     console.log(
//       "CREATE MEETING PAYLOAD:"
//     );

//     console.log(
//       JSON.stringify(
//         payload,
//         null,
//         2
//       )
//     );

//     console.log(
//       "================================="
//     );

//     try {
//       setSaving(true);

//       const response =
//         await api.post(
//           "/activities/meeting/",
//           payload
//         );

//       console.log(
//         "MEETING CREATED:",
//         response.data
//       );

//       alert(
//         "Meeting created successfully."
//       );

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
//         error.response?.data ||
//           error
//       );

//       console.error(
//         "STATUS:",
//         error.response?.status
//       );

//       console.error(
//         "REQUEST DATA:",
//         error.config?.data
//       );

//       const errorData =
//         error.response?.data;

//       if (errorData) {
//         alert(
//           `Failed to create meeting:\n${JSON.stringify(
//             errorData,
//             null,
//             2
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

//   // =========================================================
//   // ATTENDEE OPTIONS
//   // =========================================================

//   const attendeeOptions =
//     users.map((user) => ({
//       label:
//         user.name ||
//         user.full_name ||
//         `${user.first_name || ""} ${
//           user.last_name || ""
//         }`.trim() ||
//         user.email ||
//         `User ${user.id}`,

//       value: user.id,
//     }));

//   const selectedAttendeeNames =
//     attendeeOptions
//       .filter((option) =>
//         formData.attendees.some(
//           (id) =>
//             String(id) ===
//             String(option.value)
//         )
//       )
//       .map(
//         (option) =>
//           option.label
//       );

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={
//         saving ? undefined : onClose
//       }
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
//         {/* HEADER */}

//         <DrawerHeader
//           title="Schedule Meeting"
//           onClose={onClose}
//         />

//         {/* BODY */}

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
//             <Grid
//               size={{
//                 xs: 12,
//                 md: 6,
//               }}
//             >
//               <TimePicker
//                 label="Start Time"
//                 value={
//                   formData.startTime
//                 }
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

//             <Grid
//               size={{
//                 xs: 12,
//                 md: 6,
//               }}
//             >
//               <TimePicker
//                 label="End Time"
//                 value={
//                   formData.endTime
//                 }
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

//           {/* ATTENDEES */}

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
//                 value={
//                   formData.attendees
//                 }
//                 onChange={
//                   handleAttendeeChange
//                 }
//                 renderValue={(
//                   selected
//                 ) => {
//                   if (
//                     !selected.length
//                   ) {
//                     return (
//                       <Typography
//                         sx={{
//                           color:
//                             "#98A2B3",
//                           fontSize:
//                             "16px",
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
//                   backgroundColor:
//                     "#fff",

//                   "& .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor:
//                         "#D0D5DD",
//                     },

//                   "&:hover .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor:
//                         "#D0D5DD",
//                     },

//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor:
//                         "#6941C6",
//                       borderWidth:
//                         "1px",
//                     },

//                   "& .MuiSelect-select":
//                     {
//                       padding:
//                         "10px 14px",
//                       display:
//                         "flex",
//                       alignItems:
//                         "center",
//                       fontSize:
//                         "16px",
//                       color:
//                         "#344054",
//                     },

//                   "& .MuiSelect-icon":
//                     {
//                       color:
//                         "#667085",
//                       right: 12,
//                     },
//                 }}
//               >
//                 {attendeeOptions.length >
//                 0 ? (
//                   attendeeOptions.map(
//                     (option) => (
//                       <MenuItem
//                         key={
//                           option.value
//                         }
//                         value={
//                           option.value
//                         }
//                       >
//                         <Checkbox
//                           checked={formData.attendees.some(
//                             (id) =>
//                               String(
//                                 id
//                               ) ===
//                               String(
//                                 option.value
//                               )
//                           )}
//                         />

//                         <ListItemText
//                           primary={
//                             option.label
//                           }
//                         />
//                       </MenuItem>
//                     )
//                   )
//                 ) : (
//                   <MenuItem disabled>
//                     <ListItemText
//                       primary="No Contact Owners found"
//                     />
//                   </MenuItem>
//                 )}
//               </Select>
//             </FormControl>
//           </Box>

//           {/* LOCATION */}

//           <CommonSelect
//             label="Location"
//             required
//             name="location"
//             value={
//               formData.location
//             }
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
//             value={
//               formData.reminder
//             }
//             onChange={handleChange}
//             placeholder="Choose"
//             options={[
//               {
//                 label:
//                   "5 minutes before",
//                 value: "5_MIN",
//               },
//               {
//                 label:
//                   "15 minutes before",
//                 value: "15_MIN",
//               },
//               {
//                 label:
//                   "30 minutes before",
//                 value: "30_MIN",
//               },
//               {
//                 label:
//                   "1 hour before",
//                 value: "1_HOUR",
//               },
//               {
//                 label:
//                   "1 day before",
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

//         {/* FOOTER */}

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 3,
//             borderTop:
//               "1px solid #E5E7EB",
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
//             {saving
//               ? "Saving..."
//               : "Save"}
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
  relatedModule,
  objectId,
  module,
  moduleId,
}) {
  const { leadId, dealId, ticketId } = useParams();

  const finalModule = String(
    module ||
      relatedModule ||
      (leadId
        ? "lead"
        : ticketId
        ? "ticket"
        : dealId
        ? "deal"
        : "company")
  )
    .toLowerCase()
    .trim();

  const finalModuleId =
    moduleId ||
    objectId ||
    leadId ||
    ticketId ||
    dealId;

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
  // ROLE NORMALIZER
  // =========================================================

  const normalizeRole = (value) => {
    if (!value) return "";

    if (typeof value === "string") {
      return value
        .toLowerCase()
        .replace(/[_-]/g, " ")
        .trim();
    }

    if (typeof value === "object") {
      return normalizeRole(
        value.name ||
          value.label ||
          value.value ||
          value.role ||
          value.title
      );
    }

    return "";
  };

  // =========================================================
  // CHECK CONTACT OWNER
  // =========================================================

  const isContactOwner = (user) => {
    const possibleRoles = [
      user.role,
      user.role_name,
      user.user_role,
      user.userRole,
      user.roleName,
      user.type,
      user.user_type,
      user.userType,
    ];

    for (const role of possibleRoles) {
      if (normalizeRole(role) === "contact owner") {
        return true;
      }
    }

    if (Array.isArray(user.roles)) {
      const hasContactOwner = user.roles.some(
        (role) =>
          normalizeRole(role) === "contact owner"
      );

      if (hasContactOwner) {
        return true;
      }
    }

    if (
      user.role &&
      typeof user.role === "object"
    ) {
      if (
        normalizeRole(user.role) ===
        "contact owner"
      ) {
        return true;
      }
    }

    return false;
  };

  // =========================================================
  // GET LEAD CONTACT OWNERS
  // =========================================================

  const getLeadContactOwners = async (
    leadIdValue,
    userData
  ) => {
    if (!leadIdValue) {
      return [];
    }

    try {
      console.log(
        "FETCH LEAD:",
        leadIdValue
      );

      const response = await api.get(
        `/leads/leadslist/${leadIdValue}/`
      );

      console.log(
        "LEAD DETAILS:",
        response.data
      );

      const leadData = response.data;

      const contactOwnerIds =
        leadData?.contact_owner_ids || [];

      console.log(
        "CONTACT OWNER IDS:",
        contactOwnerIds
      );

      if (!contactOwnerIds.length) {
        return [];
      }

      const leadContactOwners =
        userData.filter((user) =>
          contactOwnerIds.some(
            (ownerId) =>
              Number(ownerId) ===
              Number(user.id)
          )
        );

      console.log(
        "LEAD CONTACT OWNERS:",
        leadContactOwners
      );

      return leadContactOwners;
    } catch (error) {
      console.error(
        "FETCH LEAD CONTACT OWNERS ERROR:",
        error.response?.data || error
      );

      return [];
    }
  };

  // =========================================================
  // FETCH ATTENDEES
  // =========================================================

  useEffect(() => {
    if (!open) return;

    const fetchAttendees = async () => {
      try {
        const response = await api.get(
          "/accounts/users/"
        );

        console.log(
          "================================="
        );
        console.log(
          "USERS RESPONSE:",
          response.data
        );
        console.log(
          "================================="
        );

        const userData = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        console.log(
          "ALL USERS:",
          userData
        );

        // =====================================================
        // LEAD
        // =====================================================

        if (
          finalModule === "lead" &&
          finalModuleId
        ) {
          const leadContactOwners =
            await getLeadContactOwners(
              finalModuleId,
              userData
            );

          console.log(
            "LEAD ATTENDEES:",
            leadContactOwners
          );

          setUsers(
            leadContactOwners
          );

          setFormData((prev) => ({
            ...prev,
            attendees:
              leadContactOwners.map(
                (user) =>
                  Number(user.id)
              ),
          }));

          return;
        }

        // =====================================================
        // DEAL
        // =====================================================

        if (
          finalModule === "deal" &&
          finalModuleId
        ) {
          try {
            console.log(
              "FETCH DEAL:",
              finalModuleId
            );

            const dealResponse =
              await api.get(
                `/deals/${finalModuleId}/`
              );

            console.log(
              "DEAL DETAILS:",
              dealResponse.data
            );

            const dealData =
              dealResponse.data;

            const associatedLeadId =
              dealData?.associated_lead;

            console.log(
              "DEAL ASSOCIATED LEAD:",
              associatedLeadId
            );

            if (associatedLeadId) {
              const leadContactOwners =
                await getLeadContactOwners(
                  associatedLeadId,
                  userData
                );

              console.log(
                "DEAL ATTENDEES:",
                leadContactOwners
              );

              setUsers(
                leadContactOwners
              );

              setFormData((prev) => ({
                ...prev,
                attendees:
                  leadContactOwners.map(
                    (user) =>
                      Number(user.id)
                  ),
              }));

              return;
            }

            const contactOwners =
              userData.filter(
                (user) =>
                  isContactOwner(user)
              );

            setUsers(
              contactOwners
            );

            setFormData((prev) => ({
              ...prev,
              attendees: [],
            }));
          } catch (error) {
            console.error(
              "FETCH DEAL ERROR:",
              error.response?.data ||
                error
            );

            const contactOwners =
              userData.filter(
                (user) =>
                  isContactOwner(user)
              );

            setUsers(
              contactOwners
            );

            setFormData((prev) => ({
              ...prev,
              attendees: [],
            }));
          }

          return;
        }

        // =====================================================
        // TICKET
        // =====================================================

        if (
          finalModule === "ticket" &&
          finalModuleId
        ) {
          try {
            console.log(
              "FETCH TICKET:",
              finalModuleId
            );

            const ticketResponse =
              await api.get(
                `/tickets/${finalModuleId}/`
              );

            console.log(
              "TICKET DETAILS:",
              ticketResponse.data
            );

            const ticketData =
              ticketResponse.data;

            const associatedDealId =
              ticketData?.associated_deal ||
              ticketData?.associated_deal_id;

            console.log(
              "TICKET ASSOCIATED DEAL:",
              associatedDealId
            );

            if (associatedDealId) {
              const dealResponse =
                await api.get(
                  `/deals/${associatedDealId}/`
                );

              console.log(
                "TICKET DEAL DETAILS:",
                dealResponse.data
              );

              const dealData =
                dealResponse.data;

              const associatedLeadId =
                dealData?.associated_lead;

              console.log(
                "TICKET DEAL ASSOCIATED LEAD:",
                associatedLeadId
              );

              if (associatedLeadId) {
                const leadContactOwners =
                  await getLeadContactOwners(
                    associatedLeadId,
                    userData
                  );

                console.log(
                  "TICKET ATTENDEES:",
                  leadContactOwners
                );

                setUsers(
                  leadContactOwners
                );

                setFormData((prev) => ({
                  ...prev,
                  attendees:
                    leadContactOwners.map(
                      (user) =>
                        Number(user.id)
                    ),
                }));

                return;
              }
            }

            const contactOwners =
              userData.filter(
                (user) =>
                  isContactOwner(user)
              );

            setUsers(
              contactOwners
            );

            setFormData((prev) => ({
              ...prev,
              attendees: [],
            }));
          } catch (error) {
            console.error(
              "FETCH TICKET / DEAL / LEAD ERROR:",
              error.response?.data ||
                error
            );

            const contactOwners =
              userData.filter(
                (user) =>
                  isContactOwner(user)
              );

            setUsers(
              contactOwners
            );

            setFormData((prev) => ({
              ...prev,
              attendees: [],
            }));
          }

          return;
        }

        // =====================================================
        // COMPANY
        // =====================================================

        if (
          finalModule === "company" &&
          finalModuleId
        ) {
          try {
            console.log(
              "FETCH COMPANY:",
              finalModuleId
            );

            const companyResponse =
              await api.get(
                `/companies/${finalModuleId}/`
              );

            console.log(
              "COMPANY DETAILS:",
              companyResponse.data
            );

            const companyData =
              companyResponse.data;

            const companyOwnerId =
              companyData?.company_owner;

            console.log(
              "COMPANY OWNER ID:",
              companyOwnerId
            );

            if (companyOwnerId) {
              const companyOwner =
                userData.filter(
                  (user) =>
                    Number(user.id) ===
                    Number(companyOwnerId)
                );

              console.log(
                "COMPANY OWNER:",
                companyOwner
              );

              setUsers(
                companyOwner
              );

              setFormData((prev) => ({
                ...prev,
                attendees:
                  companyOwner.map(
                    (user) =>
                      Number(user.id)
                  ),
              }));

              return;
            }

            setUsers([]);

            setFormData((prev) => ({
              ...prev,
              attendees: [],
            }));
          } catch (error) {
            console.error(
              "FETCH COMPANY ERROR:",
              error.response?.data ||
                error
            );

            setUsers([]);

            setFormData((prev) => ({
              ...prev,
              attendees: [],
            }));
          }

          return;
        }

        // =====================================================
        // DEFAULT
        // =====================================================

        const contactOwners =
          userData.filter(
            (user) =>
              isContactOwner(user)
          );

        console.log(
          "CONTACT OWNERS:",
          contactOwners
        );

        console.log(
          "CONTACT OWNER COUNT:",
          contactOwners.length
        );

        setUsers(
          contactOwners
        );

        setFormData((prev) => ({
          ...prev,
          attendees: [],
        }));
      } catch (error) {
        console.error(
          "FETCH CONTACT OWNERS ERROR:",
          error.response?.data ||
            error
        );

        setUsers([]);
      }
    };

    fetchAttendees();
  }, [
    open,
    finalModule,
    finalModuleId,
  ]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

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
      "MODULE:",
      finalModule
    );

    console.log(
      "MODULE ID:",
      finalModuleId
    );

    console.log(
      "================================="
    );

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

    if (!finalModuleId) {
      const moduleName =
        finalModule.charAt(0).toUpperCase() +
        finalModule.slice(1);

      alert(
        `${moduleName} ID not found.`
      );

      return;
    }

    const payload = {
      module: finalModule,

      module_id:
        Number(finalModuleId),

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

    console.log(
      "================================="
    );

    console.log(
      "CREATE MEETING PAYLOAD:"
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    console.log(
      "================================="
    );

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
        error.response?.data ||
          error
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
        (option) =>
          option.label
      );

  // =========================================================
  // UI
  // =========================================================

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={
        saving ? undefined : onClose
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

          {/* START / END TIME */}

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

            <FormControl fullWidth>
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
                  minHeight: "44px",
                  borderRadius: "10px",
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
                {attendeeOptions.length >
                0 ? (
                  attendeeOptions.map(
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
                  )
                ) : (
                  <MenuItem disabled>
                    <ListItemText
                      primary="No Contact Owners found"
                    />
                  </MenuItem>
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

          {/* REMINDER */}

          <CommonSelect
            label="Reminder"
            name="reminder"
            value={
              formData.reminder
            }
            onChange={handleChange}
            placeholder="Choose"
            options={[
              {
                label:
                  "5 minutes before",
                value: "5_MIN",
              },
              {
                label:
                  "15 minutes before",
                value: "15_MIN",
              },
              {
                label:
                  "30 minutes before",
                value: "30_MIN",
              },
              {
                label:
                  "1 hour before",
                value: "1_HOUR",
              },
              {
                label:
                  "1 day before",
                value: "1_DAY",
              },
            ]}
          />

          {/* NOTE */}

          <Box
            className="lead-meeting-note-editor"
            sx={{
              "& .ql-editor": {
                color: "#344054 !important",
              },

              "& .ql-editor p": {
                color: "#344054 !important",
              },

              "& .ql-editor.ql-blank::before": {
                color: "#98A2B3 !important",
                fontStyle: "normal",
              },
            }}
          >
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
