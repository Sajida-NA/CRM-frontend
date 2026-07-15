import { Checkbox } from "@mui/material";

export default function CommonCheckbox({
  size = "medium",
  sx = {},
  ...props
}) {
  return (
    <Checkbox
      size={size}
      sx={{
        color: "divider",

        "&.Mui-checked": {
          color: "primary.main",
        },

        "& .MuiSvgIcon-root": {
          fontSize: size === "medium" ? 22 : 20,
        },

        ...sx,
      }}
      {...props}
    />
  );
}