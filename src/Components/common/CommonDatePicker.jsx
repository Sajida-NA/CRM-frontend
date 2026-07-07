import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CommonDatePicker({
  label,
  required = false,
  value,
  onChange,
  width = "100%",
  sx = {},
}) {
  return (
    <Box sx={{ width }}>
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#344054",
            mb: "6px",
            lineHeight: "20px",
          }}
        >
          {label}
          {required && (
            <Box
              component="span"
              sx={{
                color: "#F04438",
                ml: "2px",
              }}
            >
              *
            </Box>
          )}
        </Typography>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          onChange={onChange}
           enableAccessibleFieldDOMStructure={false}
          slotProps={{
            textField: {
              fullWidth: true,
              placeholder: "Choose",
              size: "small",
              sx: {
                "& .MuiOutlinedInput-root": {
                  height: "44px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",

                  "& fieldset": {
                    borderColor: "#D0D5DD",
                  },

                  "&:hover fieldset": {
                    borderColor: "#D0D5DD",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#6941C6",
                  },
                },

                "& .MuiOutlinedInput-input": {
                  padding: "8px 10px",
                  fontSize: "16px",

                  "&::placeholder": {
                    color: "#98A2B3",
                    opacity: 1,
                  },
                },

                "& .MuiSvgIcon-root": {
                  color: "#667085",
                },

                ...sx,
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}