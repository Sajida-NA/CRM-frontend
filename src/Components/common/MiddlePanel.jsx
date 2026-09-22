// import React from "react";
// import { Box, TextField, InputAdornment } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// // import CommonActivityTabs from "./CommonActivityTab";

// export default function MiddlePanel({
//   searchValue = "",
//   onSearchChange = () => {},
//   onConvert = () => {},
//   activeTab = "Activity",
//   setActiveTab = () => {},
//   children,
//   action,
// }) {
//   return (
//     <Box
//       sx={{
//         flex: 1,
//         overflow: "auto",
//         backgroundColor: "#fff",
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//         }}
//       >
//         <TextField
//           fullWidth
//           placeholder="Search activities"
//           variant="outlined"
//           slotProps={{
//             input: {
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon
//                     sx={{
//                       color: "#bdb7b7",
//                     }}
//                   />
//                 </InputAdornment>
//               ),
//             },
//           }}
//           sx={{
//             flex: 1,
//             "& .MuiOutlinedInput-root": {
//               height: "50px",
//               backgroundColor: "#F9F9FB",
//             },
//             "& fieldset": {
//               border: "1px solid #DDDFE9",
//               borderRadius: "8px",
//             },
//           }}
//         />

//         {/* <Button
//           onClick={onConvert}
//           sx={{
//             width: "150px",
//             bgcolor: "#5A45E5",
//             color: "#fff",
//             borderRadius: 1,
//             textTransform: "none",
//             fontWeight: 600,
//             "&:hover": {
//               bgcolor: "#4C39D2",
//             },
//           }}
//         >
//           Convert
//         </Button> */}

//         {action}

//         {/* {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>} */}

//         {/* <Box sx={{ width: 160, flexShrink: 0 }}>{action}</Box> */}
//       </Box>

//       <Box>{children}</Box>
//     </Box>
//   );
// }




import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// import CommonActivityTabs from "./CommonActivityTab";

export default function MiddlePanel({
  searchValue = "",
  onSearchChange = () => {},
  onConvert = () => {},
  activeTab = "Activity",
  setActiveTab = () => {},
  children,
  action,
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        backgroundColor: "#fff",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search activities"
          variant="outlined"
          value={searchValue}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "#bdb7b7",
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            flex: 1,
            minWidth: 0,

            "& .MuiOutlinedInput-root": {
              height: "50px",
              backgroundColor: "#F9F9FB",
            },

            "& fieldset": {
              border: "1px solid #DDDFE9",
              borderRadius: "8px",
            },
          }}
        />

        {action && (
          <Box
            sx={{
              flexShrink: 0,
            }}
          >
            {action}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}