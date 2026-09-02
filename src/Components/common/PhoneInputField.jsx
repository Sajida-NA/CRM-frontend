import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function PhoneInputField({
  label,
  required = false,
  value,
  onChange,
  name,
}) {
  const [countryCode, setCountryCode] = useState("+91");

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numbers
    const digitsOnly = inputValue.replace(/\D/g, "");

    // Stop user from entering more than 12 digits
    if (digitsOnly.length > 12) {
      return;
    }

    // Send the value back to parent
    onChange({
      target: {
        name: name,
        value: digitsOnly,
      },
    });
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          mb: 1,
          color: "#344054",
        }}
      >
        {label}

        {required && (
          <Box
            component="span"
            sx={{
              color: "#F04438",
              ml: 0.5,
            }}
          >
            *
          </Box>
        )}
      </Typography>

      <TextField
        fullWidth
        placeholder="Enter"
        name={name}
        value={value}
        onChange={handlePhoneChange}
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            maxLength: 12,
          },

          input: {
            startAdornment: (
              <InputAdornment position="start">
                <TextField
                  select
                  value={countryCode}
                  onChange={(e) =>
                    setCountryCode(e.target.value)
                  }
                  variant="standard"
                  sx={{
                    width: 90,
                  }}
                >
                  <MenuItem value="+91">
                    🇮🇳 +91
                  </MenuItem>

                  <MenuItem value="+1">
                    🇺🇸 +1
                  </MenuItem>

                  <MenuItem value="+44">
                    🇬🇧 +44
                  </MenuItem>
                </TextField>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            height: 44,
          },
        }}
      />
    </Box>
  );
}

