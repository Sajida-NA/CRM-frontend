import { Box, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";

export default function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  const theme = useTheme();

  const getPages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Beginning
    if (page <= 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    // End
    if (page >= totalPages - 2) {
      return [
        1,
        2,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle
    return [
      1,
      "...",
      page - 1,
      page,
      page + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      {/* Previous */}

      <Box
        onClick={() => page > 1 && onPageChange(page - 1)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          cursor: page === 1 ? "default" : "pointer",
          color:
            page === 1
              ? theme.palette.text.disabled
              : theme.palette.text.secondary,
          userSelect: "none",
        }}
      >
        <KeyboardArrowLeftIcon sx={{ fontSize: 18 }} />
        <Typography fontSize={14}>Previous</Typography>
      </Box>

      {/* Page Numbers */}

      {getPages().map((item, index) =>
        item === "..." ? (
          <Typography
            key={`dots-${index}`}
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: theme.palette.text.secondary,
            }}
          >
            ...
          </Typography>
        ) : (
          <Box
            key={item}
            onClick={() => onPageChange(item)}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,

              bgcolor:
                page === item
                  ? theme.palette.primary.main
                  : "transparent",

              color:
                page === item
                  ? "#fff"
                  : theme.palette.text.primary,

              transition: ".2s",

              "&:hover": {
                bgcolor:
                  page === item
                    ? theme.palette.primary.main
                    : theme.palette.action.hover,
              },
            }}
          >
            {item}
          </Box>
        )
      )}

      {/* Next */}

      <Box
        onClick={() =>
          page < totalPages && onPageChange(page + 1)
        }
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          cursor:
            page === totalPages
              ? "default"
              : "pointer",
          color:
            page === totalPages
              ? theme.palette.text.disabled
              : theme.palette.primary.main,
          userSelect: "none",
        }}
      >
        <Typography fontSize={14}>Next</Typography>
        <KeyboardArrowRightIcon sx={{ fontSize: 18 }} />
      </Box>
    </Box>
  );
}