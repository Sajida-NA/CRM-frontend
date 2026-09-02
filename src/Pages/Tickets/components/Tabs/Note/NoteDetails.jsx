// import React, { useState } from "react";
// import { Box, Typography, Stack, IconButton, Collapse } from "@mui/material";
// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import Createnote from "../../../../Leads/components/Tabs/Note/Createnote";
// import CommonButton from "../../../../../Components/common/CommonButton";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// export default function NoteDetails({tabs}) {
//   const [activeTab, setActiveTab] = useState("Notes");
//   const [openCreateNote, setOpenCreateNote] = useState(false);
//   const [open, setOpen] = useState(false);

//   return (
//     <div>
//       <Box
//         sx={{
//           p: 3,
//           mx: -2,
//         }}
//       >
//         {/* ACTIVITY TABS */}
//         <Box>
//           {/* <CommonActivityTabs activeTab={activeTab} onTabChange={() => {}} /> */}

//           <CommonActivityTabs
//         tabs={tabs}
//         activeTab={activeTab}
//         onTabChange={setActiveTab}
//       />
//         </Box>

//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 3,
//             mb: 1,
//           }}
//         >
//           <Typography variant="h6">Notes</Typography>

//           <CommonButton
//             variant="contained"
//             onClick={() => setOpenCreateNote(true)}
//           >
//             Create Note
//           </CommonButton>
//         </Box>

//         {/* Drawer */}
//         <Createnote
//           open={openCreateNote}
//           onClose={() => setOpenCreateNote(false)}
//         />

//         <Typography variant="h6">June 2025</Typography>

//         <Box
//           sx={{
//             border: "1px solid",
//             borderColor: "divider",
//             borderRadius: 1,
//             mt: 1,
//           }}
//         >
//           <Box
//             onClick={() => setOpen(!open)}
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-start",
//               px: 1,
//               py: 2,
//               cursor: "pointer",
//             }}
//           >
//             {/* Left Side */}
//             <Stack direction="row" spacing={1} alignItems="flex-start">
//               <IconButton size="small" sx={{ p: 0 }}>
//                 {open ? (
//                   <KeyboardArrowRightIcon color="primary" fontSize="small"/>
//                 ) : (
//                   <KeyboardArrowDownIcon color="primary" fontSize="small"/>
//                 )}
//               </IconButton>

//               <Box>
//                 <Typography
//                   sx={{
//                     fontWeight: 600,
//                     fontSize: 14,
//                   }}
//                 >
//                   Note
//                   <Typography
//                     component="span"
//                     sx={{
//                       ml: 0.5,
//                       color:"text.secondary",
//                       fontWeight: 400,
//                     }}
//                   >
//                     by Maria Johnson
//                   </Typography>
//                 </Typography>

//                 <Typography
//                   sx={{
//                     mt: 0.5,
//                     color: "text.secondary",
//                   }}
//                 >
//                   Sample Note
//                 </Typography>
//               </Box>
//             </Stack>

//             {/* Right Side */}
//             <Typography
//               sx={{
//                 color: "text.secondary",
//                 whiteSpace: "nowrap",
//                 fontSize: 14,
//               }}
//             >
//               June 24, 2025 at 5:30PM
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Stack,
//   IconButton,
// } from "@mui/material";

// import { useParams } from "react-router-dom";

// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
// import Createnote from "../../../../Leads/components/Tabs/Note/Createnote";
// import CommonButton from "../../../../../Components/common/CommonButton";

// import api from "../../../../../services/api";

// export default function NoteDetails({ tabs }) {

//   const { id } = useParams();

//   const [activeTab, setActiveTab] = useState("Notes");

//   const [openCreateNote, setOpenCreateNote] =
//     useState(false);

//   const [notes, setNotes] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [openNotes, setOpenNotes] = useState({});


//   // =====================================================
//   // GET COMPANY NOTES
//   // =====================================================

//   const fetchNotes = async () => {

//     if (!id) return;

//     try {

//       setLoading(true);

//       const response = await api.get(
//         "/activities/note/",
//         {
//           params: {
//             module: "company",
//             module_id: id,
//           },
//         }
//       );

//       console.log(
//         "Company Notes:",
//         response.data
//       );

//       setNotes(response.data);

//     } catch (error) {

//       console.error(
//         "Failed to fetch company notes:",
//         error.response?.data || error
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   // =====================================================
//   // LOAD NOTES WHEN COMPANY ID CHANGES
//   // =====================================================

//   useEffect(() => {

//     fetchNotes();

//   }, [id]);


//   // =====================================================
//   // OPEN / CLOSE NOTE
//   // =====================================================

//   const toggleNote = (noteId) => {

//     setOpenNotes((prev) => ({
//       ...prev,
//       [noteId]: !prev[noteId],
//     }));

//   };


//   return (
//     <Box
//       sx={{
//         p: 3,
//         mx: -2,
//       }}
//     >

//       {/* =================================================
//           ACTIVITY TABS
//       ================================================= */}

//       <CommonActivityTabs
//         tabs={tabs}
//         activeTab={activeTab}
//         onTabChange={setActiveTab}
//       />


//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mt: 3,
//           mb: 2,
//         }}
//       >

//         <Typography variant="h6">
//           Notes
//         </Typography>

//         <CommonButton
//           variant="contained"
//           onClick={() =>
//             setOpenCreateNote(true)
//           }
//         >
//           Create Note
//         </CommonButton>

//       </Box>


//       {/* =================================================
//           CREATE NOTE DRAWER
//       ================================================= */}

//       <Createnote
//         open={openCreateNote}

//         onClose={() =>
//           setOpenCreateNote(false)
//         }

//         module="company"

//         moduleId={id}

//         onCreated={fetchNotes}
//       />


//       {/* =================================================
//           LOADING
//       ================================================= */}

//       {loading && (
//         <Typography color="text.secondary">
//           Loading notes...
//         </Typography>
//       )}


//       {/* =================================================
//           NO NOTES
//       ================================================= */}

//       {!loading && notes.length === 0 && (
//         <Typography color="text.secondary">
//           No notes found for this company.
//         </Typography>
//       )}


//       {/* =================================================
//           NOTES
//       ================================================= */}

//       {!loading &&
//         notes.map((item) => {

//           const isOpen =
//             openNotes[item.id];

//           return (

//             <Box
//               key={item.id}
//               sx={{
//                 border: "1px solid",
//                 borderColor: "divider",
//                 borderRadius: 1,
//                 mt: 1,
//               }}
//             >

//               {/* =========================================
//                   NOTE HEADER
//               ========================================= */}

//               <Box
//                 onClick={() =>
//                   toggleNote(item.id)
//                 }
//                 sx={{
//                   display: "flex",
//                   justifyContent:
//                     "space-between",
//                   alignItems:
//                     "flex-start",
//                   px: 1,
//                   py: 2,
//                   cursor: "pointer",
//                 }}
//               >

//                 {/* LEFT */}

//                 <Stack
//                   direction="row"
//                   spacing={1}
//                   alignItems="flex-start"
//                 >

//                   <IconButton
//                     size="small"
//                     sx={{
//                       p: 0,
//                     }}
//                   >

//                     {isOpen ? (
//                       <KeyboardArrowDownIcon
//                         color="primary"
//                         fontSize="small"
//                       />
//                     ) : (
//                       <KeyboardArrowRightIcon
//                         color="primary"
//                         fontSize="small"
//                       />
//                     )}

//                   </IconButton>


//                   <Box>

//                     <Typography
//                       sx={{
//                         fontWeight: 600,
//                         fontSize: 14,
//                       }}
//                     >

//                       Note

//                       <Typography
//                         component="span"
//                         sx={{
//                           ml: 0.5,
//                           color:
//                             "text.secondary",
//                           fontWeight: 400,
//                         }}
//                       >
//                         by{" "}
//                         {item.created_by?.name ||
//                           "Unknown"}
//                       </Typography>

//                     </Typography>


//                     {!isOpen && (
//                       <Typography
//                         sx={{
//                           mt: 0.5,
//                           color:
//                             "text.secondary",
//                         }}
//                       >

//                         {item.note}

//                       </Typography>
//                     )}

//                   </Box>

//                 </Stack>


//                 {/* RIGHT */}

//                 <Typography
//                   sx={{
//                     color:
//                       "text.secondary",
//                     whiteSpace:
//                       "nowrap",
//                     fontSize: 14,
//                   }}
//                 >

//                   {item.created_at
//                     ? new Date(
//                         item.created_at
//                       ).toLocaleString()
//                     : ""}

//                 </Typography>

//               </Box>


//               {/* =========================================
//                   NOTE CONTENT
//               ========================================= */}

//               {isOpen && (

//                 <Box
//                   sx={{
//                     px: 6,
//                     pb: 2,
//                   }}
//                 >

//                   <Typography
//                     sx={{
//                       whiteSpace:
//                         "pre-wrap",
//                     }}
//                   >
//                     {item.note}
//                   </Typography>

//                 </Box>

//               )}

//             </Box>

//           );

//         })}

//     </Box>
//   );
// }



import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";

import { useParams } from "react-router-dom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import Createnote from "../../../../Leads/components/Tabs/Note/Createnote";
import CommonButton from "../../../../../Components/common/CommonButton";

import api from "../../../../../services/api";

export default function NoteDetails({ tabs }) {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Notes");
  const [openCreateNote, setOpenCreateNote] = useState(false);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openNotes, setOpenNotes] = useState({});

  // =====================================================
  // REMOVE HTML FROM NOTE
  // =====================================================

  const getPlainText = (html) => {
    if (!html) return "";

    const temp = document.createElement("div");

    temp.innerHTML = html;

    return temp.textContent || temp.innerText || "";
  };

  // =====================================================
  // GET COMPANY NOTES
  // =====================================================

  const fetchNotes = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const response = await api.get(
        "/activities/note/",
        {
          params: {
            module: "company",
            module_id: id,
          },
        }
      );

      console.log("Company Notes:", response.data);

      setNotes(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch company notes:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD NOTES WHEN COMPANY ID CHANGES
  // =====================================================

  useEffect(() => {
    fetchNotes();
  }, [id]);

  // =====================================================
  // OPEN / CLOSE NOTE
  // =====================================================

  const toggleNote = (noteId) => {
    setOpenNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  return (
    <Box
      sx={{
        p: 3,
        mx: -2,
      }}
    >

      {/* =================================================
          ACTIVITY TABS
      ================================================= */}

      <CommonActivityTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
          mb: 2,
        }}
      >
        <Typography variant="h6">
          Notes
        </Typography>

        <CommonButton
          variant="contained"
          onClick={() => setOpenCreateNote(true)}
        >
          Create Note
        </CommonButton>
      </Box>

      {/* =================================================
          CREATE NOTE DRAWER
      ================================================= */}

      <Createnote
        open={openCreateNote}
        onClose={() => setOpenCreateNote(false)}
        module="company"
        moduleId={id}
        onCreated={fetchNotes}
      />

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <Typography color="text.secondary">
          Loading notes...
        </Typography>
      )}

      {/* =================================================
          NO NOTES
      ================================================= */}

      {!loading && notes.length === 0 && (
        <Typography color="text.secondary">
          No notes found for this company.
        </Typography>
      )}

      {/* =================================================
          NOTES LIST
      ================================================= */}

      {!loading &&
        notes.map((item) => {
          const isOpen = openNotes[item.id];

          const plainNote = getPlainText(item.note);

          return (
            <Box
              key={item.id}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                mt: 1,
              }}
            >

              {/* =========================================
                  NOTE HEADER
              ========================================= */}

              <Box
                onClick={() => toggleNote(item.id)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  px: 1,
                  py: 2,
                  cursor: "pointer",
                }}
              >

                {/* =====================================
                    LEFT SIDE
                ===================================== */}

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="flex-start"
                >

                  <IconButton
                    size="small"
                    sx={{
                      p: 0,
                    }}
                  >
                    {isOpen ? (
                      <KeyboardArrowDownIcon
                        color="primary"
                        fontSize="small"
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        color="primary"
                        fontSize="small"
                      />
                    )}
                  </IconButton>

                  <Box>

                    {/* NOTE + CREATED BY */}

                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Note

                      <Typography
                        component="span"
                        sx={{
                          ml: 0.5,
                          color: "text.secondary",
                          fontWeight: 400,
                        }}
                      >
                        by{" "}
                        {item.created_by?.name ||
                          "Unknown"}
                      </Typography>
                    </Typography>

                    {/* =================================
                        COLLAPSED NOTE
                    ================================= */}

                    {!isOpen && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          color: "text.secondary",
                        }}
                      >
                        {plainNote}
                      </Typography>
                    )}

                  </Box>

                </Stack>

                {/* =====================================
                    DATE
                ===================================== */}

                <Typography
                  sx={{
                    color: "text.secondary",
                    whiteSpace: "nowrap",
                    fontSize: 14,
                  }}
                >
                  {item.created_at
                    ? new Date(
                        item.created_at
                      ).toLocaleString()
                    : ""}
                </Typography>

              </Box>

              {/* =========================================
                  EXPANDED NOTE
              ========================================= */}

              {isOpen && (
                <Box
                  sx={{
                    px: 6,
                    pb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {plainNote}
                  </Typography>
                </Box>
              )}

            </Box>
          );
        })}

    </Box>
  );
}

