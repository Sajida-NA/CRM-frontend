import { TextField } from "@mui/material";

export default function InputField({ width = 200, sx, ...props }) {
  return (
    <TextField
      {...props}
      size="small"
      sx={{
        width,
        ...sx,
      }}
    />
  );
}
