import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

export default function FormDatePicker({
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

      <DatePicker
        value={value}
        onChange={onChange}
        slots={{
          openPickerIcon: CalendarTodayOutlinedIcon,
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