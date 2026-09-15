
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function PhoneInputField({
  label,
  required = false,
  value,
  onChange,
  name,
  placeholder = "Enter",
}) {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  // =====================================================
  // COUNTRY CONFIGURATION
  // =====================================================

  const countryConfig = {
    "+971": {
      maxDigits: 9,
    },
    "+91": {
      maxDigits: 10,
    },
    "+1": {
      maxDigits: 10,
    },
    "+44": {
      maxDigits: 10,
    },
  };

  // =====================================================
  // DETECT COUNTRY FROM EXISTING VALUE
  // =====================================================

  useEffect(() => {
    if (!value) {
      setPhoneNumber("");
      return;
    }

    const stringValue = String(value).trim();

    const matchedCountry = Object.keys(countryConfig).find(
      (code) => stringValue.startsWith(code)
    );

    if (matchedCountry) {
      setCountryCode(matchedCountry);

      const localNumber = stringValue
        .substring(matchedCountry.length)
        .replace(/\D/g, "");

      const maxDigits =
        countryConfig[matchedCountry].maxDigits;

      setPhoneNumber(localNumber.slice(0, maxDigits));
    } else {
      // If there is no country code, keep the number as it is.
      const digitsOnly = stringValue.replace(/\D/g, "");

      const maxDigits =
        countryConfig[countryCode]?.maxDigits || 12;

      setPhoneNumber(digitsOnly.slice(0, maxDigits));
    }
  }, [value]);

  // =====================================================
  // COUNTRY CHANGE
  // =====================================================

  const handleCountryChange = (e) => {
    const newCountryCode = e.target.value;

    setCountryCode(newCountryCode);
    setPhoneNumber("");

    onChange({
      target: {
        name,
        value: "",
      },
    });
  };

  // =====================================================
  // PHONE CHANGE
  // =====================================================

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");

    const maxDigits =
      countryConfig[countryCode]?.maxDigits || 12;

    // Don't allow more digits than the selected country.
    if (digitsOnly.length > maxDigits) {
      return;
    }

    setPhoneNumber(digitsOnly);

    const fullPhoneNumber =
      digitsOnly.length > 0
        ? `${countryCode}${digitsOnly}`
        : "";

    onChange({
      target: {
        name,
        value: fullPhoneNumber,
      },
    });
  };

  const maxDigits =
    countryConfig[countryCode]?.maxDigits || 12;

  // =====================================================
  // UI
  // =====================================================

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
        placeholder={placeholder}
        name={name}
        value={phoneNumber}
        onChange={handlePhoneChange}
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            maxLength: maxDigits,
          },

          input: {
            startAdornment: (
              <InputAdornment position="start">
                <TextField
                  select
                  value={countryCode}
                  onChange={handleCountryChange}
                  variant="standard"
                  sx={{
                    width: 90,
                  }}
                >
                  <MenuItem value="+971">
                    🇦🇪 +971
                  </MenuItem>

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

