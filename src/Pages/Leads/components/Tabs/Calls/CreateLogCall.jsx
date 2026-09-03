
// import React, { useEffect, useState } from "react";

// import {
//   Drawer,
//   Box,
//   Grid,
// } from "@mui/material";

// import CommonButton from "../../../../../Components/common/CommonButton";
// import DrawerHeader from "../../../../../Components/common/DrawerHeader";
// import CommonInput from "../../../../../Components/common/CommonInput";
// import CommonSelect from "../../../../../Components/common/CommonSelect";
// import CommonEditor from "../../../../../Components/common/CommonEditor";
// import CommonTimePicker from "../../../../../Components/common/CommonTimePicker";
// import FormDatePicker from "../../../../../Components/common/FormDatePicker";

// import api from "../../../../../services/api";

// export default function CreateLogCall({
//   open,
//   onClose,
//   relatedModule = "deal",
//   objectId,
//   connectedName = "",
//   onCallCreated,
// }) {
//   const [formData, setFormData] = useState({
//     connected: "",
//     callOutcome: "",
//     duration: "",
//     date: null,
//     time: null,
//     note: "",
//   });

//   const [saving, setSaving] = useState(false);

//   // ============================================
//   // SET CONNECTED LEAD / PERSON NAME
//   // ============================================

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       connected: connectedName || "",
//     }));
//   }, [connectedName]);

//   // ============================================
//   // INPUT CHANGE
//   // ============================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ============================================
//   // GET LOGGED-IN USER ID
//   // ============================================

//   const getSenderId = () => {
//     try {
//       const accessToken = localStorage.getItem("access");

//       if (!accessToken) {
//         return null;
//       }

//       const payload = JSON.parse(
//         atob(
//           accessToken
//             .split(".")[1]
//             .replace(/-/g, "+")
//             .replace(/_/g, "/")
//         )
//       );

//       return payload.user_id || payload.id || null;
//     } catch (error) {
//       console.error(
//         "Unable to decode access token:",
//         error
//       );

//       return null;
//     }
//   };

//   // ============================================
//   // SUBMIT
//   // ============================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!objectId) {
//       console.error("Deal ID is missing.");
//       return;
//     }

//     if (!formData.callOutcome) {
//       console.error("Call outcome is required.");
//       return;
//     }

//     if (!formData.duration) {
//       console.error("Duration is required.");
//       return;
//     }

//     if (!formData.date) {
//       console.error("Date is required.");
//       return;
//     }

//     if (!formData.time) {
//       console.error("Time is required.");
//       return;
//     }

//     const senderId = getSenderId();

//     if (!senderId) {
//       console.error(
//         "Logged-in user ID could not be found."
//       );
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         // Related CRM module
//         module: relatedModule.toLowerCase(),

//         // Deal ID
//         module_id: Number(objectId),

//         // Logged-in user
//         sender_id: Number(senderId),

//         // Call outcome
//         call_outcome: formData.callOutcome,

//         // Duration in minutes
//         duration: Number(formData.duration),

//         // Date
//         date: formData.date?.format
//           ? formData.date.format("YYYY-MM-DD")
//           : formData.date,

//         // Time
//         time: formData.time?.format
//           ? formData.time.format("HH:mm:ss")
//           : formData.time,

//         // Note
//         note: formData.note || "",
//       };

//       console.log("Creating call:", payload);

//       const response = await api.post(
//         "/activities/call/",
//         payload
//       );

//       console.log(
//         "Call created successfully:",
//         response.data
//       );

//       // ==========================================
//       // RESET FORM
//       // ==========================================

//       setFormData({
//         connected: connectedName || "",
//         callOutcome: "",
//         duration: "",
//         date: null,
//         time: null,
//         note: "",
//       });

//       // ==========================================
//       // RETURN CREATED CALL
//       // ==========================================

//       if (onCallCreated) {
//         onCallCreated(response.data);
//       } else {
//         onClose();
//       }
//     } catch (error) {
//       console.error(
//         "Error creating call:",
//         error.response?.data || error
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
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
//         {/* ======================================
//             HEADER
//         ====================================== */}

//         <DrawerHeader
//           title="Log Call"
//           onClose={onClose}
//         />

//         {/* ======================================
//             FORM
//         ====================================== */}

//         <Box
//           sx={{
//             flex: 1,
//             p: 3,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             overflowY: "auto",
//           }}
//         >
//           {/* CONNECTED */}

//           <CommonInput
//             label="Connected"
//             name="connected"
//             value={formData.connected}
//             onChange={handleChange}
//             placeholder="Lead name"
//             fullWidth
//             required
//             disabled
//           />

//           {/* CALL OUTCOME */}

//           <CommonSelect
//             label="Call Outcome"
//             name="callOutcome"
//             value={formData.callOutcome}
//             onChange={handleChange}
//             required
//             placeholder="Choose"
//             fullWidth
//             options={[
//               {
//                 label: "Connected",
//                 value: "connected",
//               },
//               {
//                 label: "No Answer",
//                 value: "no_answer",
//               },
//               {
//                 label: "Busy",
//                 value: "busy",
//               },
//               {
//                 label: "Left Voicemail",
//                 value: "left_voicemail",
//               },
//               {
//                 label: "Wrong Number",
//                 value: "wrong_number",
//               },
//               {
//                 label: "Callback Requested",
//                 value: "callback_requested",
//               },
//               {
//                 label: "Not Interested",
//                 value: "not_interested",
//               },
//               {
//                 label: "Other",
//                 value: "other",
//               },
//             ]}
//           />

//           {/* DURATION */}

//           <CommonSelect
//             label="Duration"
//             name="duration"
//             value={formData.duration}
//             onChange={handleChange}
//             required
//             placeholder="Choose"
//             fullWidth
//             options={[
//               {
//                 label: "5 mins",
//                 value: "5",
//               },
//               {
//                 label: "10 mins",
//                 value: "10",
//               },
//               {
//                 label: "15 mins",
//                 value: "15",
//               },
//               {
//                 label: "30 mins",
//                 value: "30",
//               },
//               {
//                 label: "45 mins",
//                 value: "45",
//               },
//               {
//                 label: "60 mins",
//                 value: "60",
//               },
//             ]}
//           />

//           {/* DATE + TIME */}

//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <FormDatePicker
//                 label="Date"
//                 required
//                 value={formData.date}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     date: newValue,
//                   }))
//                 }
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <CommonTimePicker
//                 label="Time"
//                 required
//                 value={formData.time}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     time: newValue,
//                   }))
//                 }
//               />
//             </Grid>
//           </Grid>

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

//         {/* ======================================
//             FOOTER
//         ====================================== */}

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
} from "@mui/material";

import CommonButton from "../../../../../Components/common/CommonButton";
import DrawerHeader from "../../../../../Components/common/DrawerHeader";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonSelect from "../../../../../Components/common/CommonSelect";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import CommonTimePicker from "../../../../../Components/common/CommonTimePicker";
import FormDatePicker from "../../../../../Components/common/FormDatePicker";

import api from "../../../../../services/api";


export default function CreateLogCall({
  open,
  onClose,
  relatedModule,
  objectId,
  connectedName = "",
  onCallCreated,
}) {

  const [formData, setFormData] = useState({
    connected: "",
    callOutcome: "",
    duration: "",
    date: null,
    time: null,
    note: "",
  });

  const [saving, setSaving] = useState(false);


  // ============================================================
  // DEBUG - CHECK WHICH MODULE AND ID ARE RECEIVED
  // ============================================================

  useEffect(() => {

    console.log("CreateLogCall props:", {
      relatedModule,
      objectId,
      connectedName,
    });

  }, [relatedModule, objectId, connectedName]);


  // ============================================================
  // SET CONNECTED NAME
  // ============================================================

  useEffect(() => {

    setFormData((prev) => ({
      ...prev,
      connected: connectedName || "",
    }));

  }, [connectedName]);


  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ============================================================
  // GET LOGGED-IN USER ID
  // ============================================================

  const getSenderId = () => {

    try {

      const accessToken =
        localStorage.getItem("access");

      if (!accessToken) {
        return null;
      }

      const tokenParts =
        accessToken.split(".");

      if (tokenParts.length !== 3) {
        return null;
      }

      const payload = JSON.parse(
        atob(
          tokenParts[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      return (
        payload.user_id ||
        payload.id ||
        null
      );

    } catch (error) {

      console.error(
        "Unable to decode access token:",
        error
      );

      return null;
    }
  };


  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ==========================================================
    // NORMALIZE MODULE
    // ==========================================================

    const moduleName =
      String(relatedModule || "")
        .trim()
        .toLowerCase();


    // ==========================================================
    // NORMALIZE OBJECT ID
    // ==========================================================

    const numericObjectId =
      Number(objectId);


    console.log("Preparing Call Save:", {
      moduleName,
      originalObjectId: objectId,
      numericObjectId,
      connectedName,
    });


    // ==========================================================
    // VALIDATE MODULE
    // ==========================================================

    if (!moduleName) {

      console.error(
        "Related module is missing."
      );

      return;
    }


    // ==========================================================
    // VALIDATE OBJECT ID
    // ==========================================================

    if (
      objectId === undefined ||
      objectId === null ||
      objectId === "" ||
      Number.isNaN(numericObjectId) ||
      numericObjectId <= 0
    ) {

      console.error(
        `${moduleName} ID is missing or invalid.`,
        {
          objectId,
          moduleName,
        }
      );

      return;
    }


    // ==========================================================
    // VALIDATE CALL OUTCOME
    // ==========================================================

    if (!formData.callOutcome) {

      console.error(
        "Call outcome is required."
      );

      return;
    }


    // ==========================================================
    // VALIDATE DURATION
    // ==========================================================

    if (!formData.duration) {

      console.error(
        "Duration is required."
      );

      return;
    }


    // ==========================================================
    // VALIDATE DATE
    // ==========================================================

    if (!formData.date) {

      console.error(
        "Date is required."
      );

      return;
    }


    // ==========================================================
    // VALIDATE TIME
    // ==========================================================

    if (!formData.time) {

      console.error(
        "Time is required."
      );

      return;
    }


    // ==========================================================
    // GET CURRENT USER
    // ==========================================================

    const senderId =
      getSenderId();


    if (!senderId) {

      console.error(
        "Logged-in user ID could not be found."
      );

      return;
    }


    // ==========================================================
    // FORMAT DATE
    // ==========================================================

    const formattedDate =
      formData.date?.format
        ? formData.date.format("YYYY-MM-DD")
        : formData.date;


    // ==========================================================
    // FORMAT TIME
    // ==========================================================

    const formattedTime =
      formData.time?.format
        ? formData.time.format("HH:mm:ss")
        : formData.time;


    // ==========================================================
    // CREATE PAYLOAD
    // ==========================================================

    const payload = {

      // company / deal / lead / ticket
      module: moduleName,

      // ID of the related record
      module_id: numericObjectId,

      // logged-in user
      sender_id: Number(senderId),

      // call information
      call_outcome:
        formData.callOutcome,

      duration:
        Number(formData.duration),

      date:
        formattedDate,

      time:
        formattedTime,

      note:
        formData.note || "",
    };


    console.log(
      "FINAL CALL PAYLOAD:",
      payload
    );


    // ==========================================================
    // SAVE
    // ==========================================================

    try {

      setSaving(true);


      const response =
        await api.post(
          "/activities/call/",
          payload
        );


      console.log(
        "CALL CREATED SUCCESSFULLY:",
        response.data
      );


      // ========================================================
      // RESET FORM
      // ========================================================

      setFormData({
        connected:
          connectedName || "",

        callOutcome: "",

        duration: "",

        date: null,

        time: null,

        note: "",
      });


      // ========================================================
      // REFRESH CALL LIST
      // ========================================================

      if (onCallCreated) {

        await onCallCreated(
          response.data
        );

      } else {

        onClose();

      }

    } catch (error) {

      console.error(
        "ERROR CREATING CALL:",
        error.response?.data ||
        error.message ||
        error
      );

    } finally {

      setSaving(false);

    }

  };


  // ============================================================
  // UI
  // ============================================================

  return (

    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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

        {/* ====================================================
            HEADER
        ==================================================== */}

        <DrawerHeader
          title="Log Call"
          onClose={onClose}
        />


        {/* ====================================================
            FORM
        ==================================================== */}

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

          {/* CONNECTED */}

          <CommonInput
            label="Connected"
            name="connected"
            value={formData.connected}
            onChange={handleChange}
            placeholder="Lead name"
            fullWidth
            required
            disabled
          />


          {/* CALL OUTCOME */}

          <CommonSelect
            label="Call Outcome"
            name="callOutcome"
            value={formData.callOutcome}
            onChange={handleChange}
            required
            placeholder="Choose"
            fullWidth
            options={[
              {
                label: "Connected",
                value: "connected",
              },
              {
                label: "No Answer",
                value: "no_answer",
              },
              {
                label: "Busy",
                value: "busy",
              },
              {
                label: "Left Voicemail",
                value: "left_voicemail",
              },
              {
                label: "Wrong Number",
                value: "wrong_number",
              },
              {
                label: "Callback Requested",
                value: "callback_requested",
              },
              {
                label: "Not Interested",
                value: "not_interested",
              },
              {
                label: "Other",
                value: "other",
              },
            ]}
          />


          {/* DURATION */}

          <CommonSelect
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="Choose"
            fullWidth
            options={[
              {
                label: "5 mins",
                value: "5",
              },
              {
                label: "10 mins",
                value: "10",
              },
              {
                label: "15 mins",
                value: "15",
              },
              {
                label: "30 mins",
                value: "30",
              },
              {
                label: "45 mins",
                value: "45",
              },
              {
                label: "60 mins",
                value: "60",
              },
            ]}
          />


          {/* DATE + TIME */}

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


          {/* NOTE */}

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


        {/* ====================================================
            FOOTER
        ==================================================== */}

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

