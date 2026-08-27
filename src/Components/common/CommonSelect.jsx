// import { Box, FormControl, MenuItem, Select, Typography , InputAdornment } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


// export default function CommonSelect({
//   label,
//   required = false,
//   placeholder = "Choose",
//   value,
//   onChange,
//   options = [],
//   name,
//   width = "100%",
//   sx = {},
//   endAdornment,
// }) {
//   return (
//     <Box sx={{ width }}>
//       {/* Label */}
//       {label && (
//         <Typography
//           sx={{
//             fontSize: "14px",
//             fontWeight: 600,
//             lineHeight: "20px",
//             color: "#344054",
//             mb: "6px",
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

//       <FormControl fullWidth>
//         <Select
//           displayEmpty
//           value={value}
//           name={name}
//           onChange={onChange}
//           IconComponent={endAdornment ? () => null : KeyboardArrowDownIcon}
//           renderValue={(selected) => {
//             if (!selected) {
//               return (
//                 <Typography
//                   sx={{
//                     color: "#98A2B3",
//                     fontSize: "16px",
//                   }}
//                 >
//                   {placeholder}
//                 </Typography>
//               );
//             }
//             return selected;
//           }}
//           endAdornment={
//             endAdornment && (
//               <InputAdornment position="end">{endAdornment}</InputAdornment>
//             )
//           }
//           sx={{
//             height: "44px",
//             borderRadius: "10px",
//             backgroundColor: "#fff",

//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#D0D5DD",
//             },

//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#D0D5DD",
//             },

//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#6941C6",
//               borderWidth: "1px",
//             },

//             "& .MuiSelect-select": {
//               padding: "10px 14px",
//               display: "flex",
//               alignItems: "center",

//               fontSize: "16px",

//               color: "#344054",
//             },

//             "& .MuiSelect-icon": {
//               color: "#667085",
//               right: 12,
//             },

//             ...sx,
//           }}
//         >
//           <MenuItem value="" disabled>
//             {placeholder}
//           </MenuItem>

//           {options.map((option) => (
//             <MenuItem
//               key={option.value || option}
//               value={option.value || option}
//             >
//               {option.label || option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }


import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  InputAdornment,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CommonSelect({
  label,
  required = false,
  placeholder = "Choose",
  value,
  onChange,
  options = [],
  name,
  width = "100%",
  sx = {},
  endAdornment,
}) {
  return (
    <Box sx={{ width }}>
      {/* LABEL */}
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
            color: "#344054",
            mb: "6px",
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

      <FormControl fullWidth>
        <Select
          displayEmpty
          value={value}
          name={name}
          onChange={onChange}
          IconComponent={
            endAdornment ? () => null : KeyboardArrowDownIcon
          }

          // =================================================
          // DISPLAY SELECTED LABEL INSTEAD OF ID
          // =================================================
          renderValue={(selected) => {
            // Show placeholder when nothing is selected
            if (!selected) {
              return (
                <Typography
                  sx={{
                    color: "#98A2B3",
                    fontSize: "16px",
                  }}
                >
                  {placeholder}
                </Typography>
              );
            }

            // Find the selected option
            const selectedOption = options.find((option) => {
              const optionValue =
                typeof option === "object"
                  ? option.value
                  : option;

              return String(optionValue) === String(selected);
            });

            // If it is an object option, display its label
            if (
              selectedOption &&
              typeof selectedOption === "object"
            ) {
              return selectedOption.label;
            }

            // For normal string options (Industry, Type)
            return selected;
          }}

          endAdornment={
            endAdornment && (
              <InputAdornment position="end">
                {endAdornment}
              </InputAdornment>
            )
          }

          sx={{
            height: "44px",
            borderRadius: "10px",
            backgroundColor: "#fff",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D5DD",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D5DD",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6941C6",
              borderWidth: "1px",
            },

            "& .MuiSelect-select": {
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "#344054",
            },

            "& .MuiSelect-icon": {
              color: "#667085",
              right: 12,
            },

            ...sx,
          }}
        >
          {/* PLACEHOLDER */}
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>

          {/* OPTIONS */}
          {options.map((option) => {
            const optionValue =
              typeof option === "object"
                ? option.value
                : option;

            const optionLabel =
              typeof option === "object"
                ? option.label
                : option;

            return (
              <MenuItem
                key={optionValue}
                value={optionValue}
              >
                {optionLabel}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
