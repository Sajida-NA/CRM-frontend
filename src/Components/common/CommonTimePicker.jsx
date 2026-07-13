import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function CommonTimePicker({
  label,
  required = false,
  value,
  onChange,
  placeholder = "Choose",
  width = "100%",
  sx = {},
  ...props
}) {
  const theme = useTheme();

  return (
    <Box sx={{ width }}>
      {/* Label */}
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "26px",
            color: theme.palette.text.primary,
            mb: "6px",
          }}
        >
          {label}
          {required && (
            <Box
              component="span"
              sx={{
                color: theme.palette.error.main,
                ml: "2px",
              }}
            >
              *
            </Box>
          )}
        </Typography>
      )}

      <TimePicker
        value={value}
        onChange={onChange}
        slots={{
          openPickerIcon: AccessTimeIcon,
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small",
            placeholder,
            sx: {
              "& .MuiOutlinedInput-root": {
                height: "44px",
                borderRadius: "10px",
                backgroundColor: theme.palette.background.paper,

                "& fieldset": {
                  borderColor: theme.palette.divider,
                },

                "&:hover fieldset": {
                  borderColor: theme.palette.divider,
                },

                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                  borderWidth: "1px",
                },
              },

              "& .MuiInputBase-input": {
                padding: "10px 14px",
                fontSize: "16px",
                color: theme.palette.text.primary,
              },

              "& .MuiSvgIcon-root": {
                color: theme.palette.text.secondary,
              },

              ...sx,
            },
          },
        }}
        {...props}
      />
    </Box>
  );
}