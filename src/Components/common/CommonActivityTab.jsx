// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function CommonActivityTabs({ tabs = [] }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const activeTab = tabs.find(
//     (tab) => tab.path === location.pathname
//   )?.label;

//   const handleClick = (tab) => {
//     navigate(tab.path);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: 3,
//         borderBottom: "1px solid #ddd",
//         mb: 2,
//       }}
//     >
//       {tabs.map((tab) => (
//         <Box
//           key={tab.label}
//           onClick={() => handleClick(tab)}
//           sx={{
//             cursor: "pointer",
//             pb: 1,
//             borderBottom:
//               activeTab === tab.label
//                 ? "2px solid #5948DB"
//                 : "2px solid transparent",
//           }}
//         >
//           <Typography
//             sx={{
//               color:
//                 activeTab === tab.label
//                   ? "#5948DB"
//                   : "#666",
//               fontWeight:
//                 activeTab === tab.label ? 600 : 400,
//             }}
//           >
//             {tab.label}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// }


import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function CommonActivityTabs({ tabs = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs.find(
    (tab) => tab.path === location.pathname
  )?.label;

  const handleClick = (tab) => {
    navigate(tab.path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,

        /*
         * Prevent the tabs from making
         * the middle panel wider.
         */
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,

        borderBottom: "1px solid #ddd",
        mb: 2,

        boxSizing: "border-box",

        overflowX: "auto",
        overflowY: "hidden",

        /*
         * Hide scrollbar visually while still
         * allowing tabs to fit on smaller screens.
         */
        scrollbarWidth: "none",

        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {tabs.map((tab) => (
        <Box
          key={tab.label}
          onClick={() => handleClick(tab)}
          sx={{
            cursor: "pointer",

            pb: 1,

            /*
             * Keep each tab from shrinking.
             */
            flexShrink: 0,

            /*
             * Prevent unusual long labels from
             * expanding the entire page.
             */
            minWidth: 0,
            maxWidth: "100%",

            borderBottom:
              activeTab === tab.label
                ? "2px solid #5948DB"
                : "2px solid transparent",

            boxSizing: "border-box",
          }}
        >
          <Typography
            sx={{
              color:
                activeTab === tab.label
                  ? "#5948DB"
                  : "#666",

              fontWeight:
                activeTab === tab.label
                  ? 600
                  : 400,

              whiteSpace: "nowrap",

              overflow: "hidden",
              textOverflow: "ellipsis",

              maxWidth: "100%",
            }}
          >
            {tab.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}