import { FormControl, Select, MenuItem } from "@mui/material";

export default function SelectField({
  width = "100%",
  size = "small",
  sx = {},
  placeholder,
  value,
  onChange,
  options = [],
  multiple = false,
  ...props
}) {
  return (
    <FormControl
      fullWidth
      size={size}
      sx={{
        width,
        minWidth: 180,
        flex: 0.25,
        ...sx,
      }}
    >
      <Select
        displayEmpty
        value={value}
        onChange={onChange}
        multiple={multiple}
        renderValue={(selected) => {
          /*
           * Multiple Select
           * When nothing is selected, MUI returns []
           * and [] is truthy in JavaScript.
           * So we need to explicitly check selected.length.
           */
          if (multiple) {
            if (!selected || selected.length === 0) {
              return (
                <span style={{ color: "#727680" }}>
                  {placeholder}
                </span>
              );
            }

            return selected.join(", ");
          }

          /*
           * Single Select
           */
          if (!selected) {
            return (
              <span style={{ color: "#727680" }}>
                {placeholder}
              </span>
            );
          }

          return selected;
        }}
        {...props}
      >
        {options.map((option) => {
          // Backend format:
          // { value: "New", label: "New" }

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
  );
}

// import { FormControl, Select, MenuItem } from "@mui/material";

// export default function SelectField({
//   width = "100%",
//   size = "small",
//   sx = {},
//   placeholder,
//   value,
//   onChange,
//   options = [],
//   ...props
// }) {
//   return (
//     <FormControl
//       fullWidth
//       size={size}
//       sx={{
//         width,
//         minWidth: 180,
//         flex: 0.25,
//         ...sx,
//       }}
//     >
//       <Select
//         displayEmpty
//         value={value}
//         onChange={onChange}
//         renderValue={(selected) =>
//           selected || (
//             <span style={{ color: "#727680" }}>
//               {placeholder}
//             </span>
//           )
//         }
//         {...props}
//       >
//         {options.map((option) => {
//           // Backend format:
//           // { value: "New", label: "New" }

//           const optionValue =
//             typeof option === "object"
//               ? option.value
//               : option;

//           const optionLabel =
//             typeof option === "object"
//               ? option.label
//               : option;

//           return (
//             <MenuItem
//               key={optionValue}
//               value={optionValue}
//             >
//               {optionLabel}
//             </MenuItem>
//           );
//         })}
//       </Select>
//     </FormControl>
//   );
// }



