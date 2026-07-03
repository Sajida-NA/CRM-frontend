import { TextField } from "@mui/material";

export default function InputField({
  width = "100%",
  size = "small",
  sx = {},
  ...props
}) {
  return (
    <TextField
      {...props}
      size={size}
      sx={{
        width,
        ...sx,
      }}
    />
  );
}