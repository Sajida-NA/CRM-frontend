// import React from "react";
// import { Box, Typography } from "@mui/material";

// export default function CommonActivityTabs({ activeTab, onTabChange }) {
//   // List of tabs shown in the activity section

//   const tabs = ["Activity", "Notes", "Emails", "Calls", "Tasks", "Meetings"];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         display: "flex",
//         gap: 4,
//         borderBottom: "1px solid #E0E3EB",
//         px: 2,
//         py: 1,
//       }}
//     >
//       {tabs.map((tab) => (
//         <Box
//           key={tab}
        
//           // Parent updates activeTab state

//           onClick={() => onTabChange(tab)}
//           sx={{
//             cursor: "pointer",
//             pb: 1,

//             // Highlight the active tab with a purple underline

//             borderBottom:
//               activeTab === tab ? "3px solid #5A45E5" : "3px solid transparent",
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: "14px",

//               // Active tab gets bold text + purple color

//               fontWeight: activeTab === tab ? 600 : 500,
//               color: activeTab === tab ? "#5A45E5" : "#516F90",
//             }}
//           >
//             {tab}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// }




import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CommonActivityTabs({
  tabs = [],
  activeTab,
  onTabChange,
}) {
  const navigate = useNavigate();

  const handleClick = (tab) => {
    if (onTabChange) {
      onTabChange(tab.label);
    }

    navigate(tab.path);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 4,
        borderBottom: "1px solid #E0E3EB",
        px: 2,
        py: 1,
      }}
    >
      {tabs.map((tab) => (
        <Box
          key={tab.label}
          onClick={() => handleClick(tab)}
          sx={{
            cursor: "pointer",
            pb: 1,
            borderBottom:
              activeTab === tab.label
                ? "3px solid #5A45E5"
                : "3px solid transparent",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: activeTab === tab.label ? 600 : 500,
              color: activeTab === tab.label ? "#5A45E5" : "#516F90",
            }}
          >
            {tab.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}



