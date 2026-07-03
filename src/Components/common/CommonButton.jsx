import React from "react";
import { Button } from "@mui/material";

const CommonButton = ({
  children,
  variant = "contained",
  backgroundColor = "#6C63FF",
  color = "primary",
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 600,
        borderRadius: "8px",
        height: "48px",
        boxShadow: "none",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CommonButton;