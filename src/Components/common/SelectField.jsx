
import { FormControl, Select, MenuItem } from "@mui/material";

export default function SelectField({
  width = "100%",
  size = "small",
  sx = {},
  placeholder,
  value,
  onChange,
  options = [],
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
        renderValue={(selected) =>
          selected || <span style={{ color: "#727680" }}>{placeholder}</span>
        }
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
