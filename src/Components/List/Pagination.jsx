import { Box, Pagination } from "@mui/material";

export default function CustomPagination({ page, onPageChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // ⭐ RIGHT ALIGN
        mt: 3,
      }}
    >
      <Pagination
        count={68}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            padding: "6px 10px",
            minWidth: "36px",
            border: "1px solid #6b4eb1",
          },
          "& .Mui-selected": {
            backgroundColor: "#6C63FF",
            color: "#fff",
            borderColor: "#6C63FF",
          },
          "& .MuiPaginationItem-previousNext": {
            borderRadius: "8px",
            border: "1px solid #E0E0E0",
          },
        }}
      />
    </Box>
  );
}
