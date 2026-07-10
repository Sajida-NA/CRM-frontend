import { Button } from "@mui/material";

export default function CommonButton({
  children,
  variant = "contained",
  color = "primary",
  sx = {},
  ...props
}) {
  return (
    <Button
      variant={variant}
      color={color}
      disableElevation
      sx={{

        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}