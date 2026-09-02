// import { Box, TextField, Typography } from "@mui/material";

// export default function CommonInput({
//   label,
//   required = false,
//   width = "100%",
//   size = "small",
//   sx = {},
//   ...props
// }) {
//   return (
//     <Box sx={{ width }}>
//       {label && (
//         <Typography
//           sx={{
//             fontSize: "14px",
//             fontWeight: 600,
//             color: "#344054",
//             mb: "6px",
//             lineHeight: "20px",
//           }}
//         >
//           {label}
//           {required && (
//             <Box
//               component="span"
//               sx={{
//                 color: "#F04438",
//                 ml: "2px",
//               }}
//             >
//               *
//             </Box>
//           )}
//         </Typography>
//       )}

//       <TextField
//         {...props}
//         size={size}
//         fullWidth
//         placeholder={props.placeholder}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             height: "44px",
//             borderRadius: "10px",
//             backgroundColor: "#FFFFFF",

//             "& fieldset": {
//               borderColor: "#D0D5DD",
//             },

//             "&:hover fieldset": {
//               borderColor: "#D0D5DD",
//             },

//             "&.Mui-focused fieldset": {
//               borderColor: "#6941C6",
//             },
//           },

//           "& .MuiOutlinedInput-input": {
//             padding: "8px 10px",
//             fontSize: "16px",

//             "&::placeholder": {
//               color: "#667085",
//               opacity: 1,
//             },
//           },

//           ...sx,
//         }}
//       />
//     </Box>
//   );
// }


import { Box, TextField, Typography } from "@mui/material";

export default function CommonInput({
  label,
  required = false,
  width = "100%",
  size = "small",
  sx = {},
  InputProps,
  ...props
}) {
  return (
    <Box sx={{ width }}>
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#344054",
            mb: "6px",
            lineHeight: "20px",
          }}
        >
          {label}

          {required && (
            <Box
              component="span"
              sx={{
                color: "#F04438",
                ml: "2px",
              }}
            >
              *
            </Box>
          )}
        </Typography>
      )}

      <TextField
        {...props}
        size={size}
        fullWidth
        placeholder={props.placeholder}
        slotProps={{
        input: InputProps,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "44px",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",

            "& fieldset": {
              borderColor: "#D0D5DD",
            },

            "&:hover fieldset": {
              borderColor: "#D0D5DD",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#6941C6",
            },
          },

          "& .MuiOutlinedInput-input": {
            padding: "8px 10px",
            fontSize: "16px",

            "&::placeholder": {
              color: "#667085",
              opacity: 1,
            },
          },

          ...sx,
        }}
      />
    </Box>
  );
}