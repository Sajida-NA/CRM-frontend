import React from "react";
import { Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputField from "./InputField";
import Pagination from "./Pagination";
import { useState } from "react";

export default function SearchSection({
  placeholder = "Search...",
  page,
  totalPages,
  onPageChange,
  searchValue,
  onSearchChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
      }}
    >
      <InputField
        placeholder={placeholder}
        value={searchValue}
        onChange={onSearchChange}
        width={380}
        sx={{
          width: 380,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.default",
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "divider",
            },

            "&:hover fieldset": {
              borderColor: "primary.main",
            },

            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#94A3B8", fontSize: "30px" }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
