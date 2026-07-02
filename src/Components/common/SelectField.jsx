import { TextField, MenuItem } from "@mui/material";
export default function SelectField({
  label,
  options = [],
  width = 200,
  valueKey,
  labelKey,
  sx,
  ...props
}) {
  return (
    <TextField
      select
      label={label}
      size="small"
      sx={{
        width,
        ...sx,
      }}
      {...props}
    >
      <MenuItem value="">All</MenuItem>

      {options.map((opt, i) => {
        const value = valueKey ? opt[valueKey] : opt;
        const text = labelKey ? opt[labelKey] : opt;

        return (
          <MenuItem key={i} value={value}>
            {text}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
