
// import React from "react";
// import {
//   Box,
//   Typography,
//   Checkbox,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import Radio from "@mui/material/Radio";
// import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// export default function ActivityCard({
//   title,
//   description,
//   date,
//   overdue = false,
//   showCheckbox = false,
// }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         py: 2,
//         border: "1px solid",
//         borderRadius: 1,
//         mb:2,
//         px:1,
//         borderColor: "divider",
//       }}
//     >
      
//       {/* Left Section */}
//       <Box sx={{ flex: 1 }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 0.5,
//           }}
//         >
          
//           <KeyboardArrowDownIcon
//             sx={{
//               fontSize: 18,
//               color: "primary.main",
//             }}
//           />

//           <Typography
//             variant="body1"
//             sx={{
//               fontWeight: 600,
//               color: "text.primary",
//             }}
//           >
//             {title}
//           </Typography>
//         </Box>

//         {showCheckbox ? (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               mt: 1.5,
//               ml: 3,
//             }}
//           >
//             <Checkbox
//               icon={<RadioButtonUncheckedIcon />}
//               checkedIcon={<RadioButtonCheckedIcon />}
//               sx={{
//                 p: 0,
//                 color: "grey.500",
//                 "&.Mui-checked": {
//                   color: "primary.main",
//                 },
//               }}
//             />


//             <Typography
//               variant="body2"
//               sx={{
//                 color: "text.secondary",
//               }}
//             >
//               {description}
//             </Typography>
//           </Box>
//         ) : (
//           <Typography
//             variant="body2"
//             sx={{
//               mt: 1,
//               ml: 3,
//               color: "text.secondary",
//             }}
//           >
//             {description}
//           </Typography>
//         )}
//       </Box>

//       {/* Right Section */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 0.5,
//           ml: 3,
//           whiteSpace: "nowrap",
//         }}
//       >
//         <CalendarTodayOutlinedIcon
//           sx={{
//             fontSize: 16,
//             color: overdue ? "error.main" : "text.secondary",
//           }}
//         />

//         {overdue && (
//           <Typography
//             variant="body2"
//             sx={{
//               color: "error.main",
//               fontWeight: 500,
//             }}
//           >
//             Overdue :
//           </Typography>
//         )}

//         <Typography
//           variant="body2"
//           color="text.secondary"
//         >
//           {date}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }



import React from "react";
import {
  Box,
  Typography,
  Checkbox,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export default function ActivityCard({
  title,
  description,
  date,
  overdue = false,
  showCheckbox = false,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",

        py: 2,
        px: 1,
        mb: 2,

        border: "1px solid",
        borderRadius: 1,
        borderColor: "divider",

        // ================================
        // WIDTH FIX
        // ================================
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",

        overflow: "hidden",
      }}
    >
      {/* =================================
          LEFT SECTION
      ================================= */}
      <Box
        sx={{
          flex: "1 1 auto",
          minWidth: 0,
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,

            minWidth: 0,
            maxWidth: "100%",
          }}
        >
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 18,
              color: "primary.main",
              flexShrink: 0,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "text.primary",

              minWidth: 0,
              maxWidth: "100%",

              overflowWrap: "anywhere",
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* =================================
            DESCRIPTION WITH CHECKBOX
        ================================= */}
        {showCheckbox ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,

              mt: 1.5,
              ml: 3,

              minWidth: 0,
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              sx={{
                p: 0,
                color: "grey.500",

                flexShrink: 0,

                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",

                minWidth: 0,
                maxWidth: "100%",

                overflowWrap: "anywhere",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {description}
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              ml: 3,
              color: "text.secondary",

              minWidth: 0,
              maxWidth: "100%",

              overflowWrap: "anywhere",
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* =================================
          RIGHT SECTION
      ================================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,

          ml: 3,

          // IMPORTANT:
          // Do not allow this section to force
          // the entire card wider.
          flex: "0 1 auto",
          minWidth: 0,
          maxWidth: "45%",

          boxSizing: "border-box",

          // Changed from nowrap
          // so it can shrink when required.
          whiteSpace: "normal",

          overflowWrap: "anywhere",
          wordBreak: "break-word",
        }}
      >
        <CalendarTodayOutlinedIcon
          sx={{
            fontSize: 16,
            color: overdue
              ? "error.main"
              : "text.secondary",

            flexShrink: 0,
          }}
        />

        {overdue && (
          <Typography
            variant="body2"
            sx={{
              color: "error.main",
              fontWeight: 500,

              minWidth: 0,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            Overdue :
          </Typography>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minWidth: 0,

            overflowWrap: "anywhere",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {date}
        </Typography>
      </Box>
    </Box>
  );
}