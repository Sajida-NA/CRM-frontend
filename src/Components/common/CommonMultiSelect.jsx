
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CommonMultiSelect({
  label,
  required = false,
  placeholder = "Choose",
  value = [],
  onChange,
  options = [],
  name,
  width = "100%",
  sx = {},
}) {
  const selectedValues = Array.isArray(value) ? value : [];

  return (
    <Box sx={{ width }}>
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
            color: "#344054",
            mb: "6px",
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

      <FormControl fullWidth>
        <Select
          multiple
          displayEmpty
          value={selectedValues}
          name={name}
          onChange={onChange}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(selected) => {
            if (!selected || selected.length === 0) {
              return (
                <Typography
                  sx={{
                    color: "#98A2B3",
                    fontSize: "16px",
                  }}
                >
                  {placeholder}
                </Typography>
              );
            }

            const selectedLabels = options
              .filter((option) => {
                const optionValue =
                  typeof option === "object"
                    ? option.value
                    : option;

                return selected.some(
                  (selectedValue) =>
                    String(selectedValue) ===
                    String(optionValue)
                );
              })
              .map((option) =>
                typeof option === "object"
                  ? option.label
                  : option
              );

            return selectedLabels.join(", ");
          }}
          sx={{
            minHeight: "44px",
            borderRadius: "10px",
            backgroundColor: "#fff",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D5DD",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D0D5DD",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6941C6",
              borderWidth: "1px",
            },

            "& .MuiSelect-select": {
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "#344054",
            },

            "& .MuiSelect-icon": {
              color: "#667085",
              right: 12,
            },

            ...sx,
          }}
        >
          {options.map((option) => {
            const optionValue =
              typeof option === "object"
                ? option.value
                : option;

            const optionLabel =
              typeof option === "object"
                ? option.label
                : option;

            const isSelected = selectedValues.some(
              (selectedValue) =>
                String(selectedValue) ===
                String(optionValue)
            );

            return (
              <MenuItem
                key={optionValue}
                value={optionValue}
              >
                <Checkbox checked={isSelected} />

                <ListItemText
                  primary={optionLabel}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

