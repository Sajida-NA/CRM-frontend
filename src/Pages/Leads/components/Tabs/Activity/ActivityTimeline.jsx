import React from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ActivityTimeline({
    title,
    highlightedText,
    normalText = "",
    description,
    date,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                p: 1,
                mb: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "background.paper",
            }}
        >
            {/* Left */}
            <Box sx={{ flex: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                    }}
                >
                    <KeyboardArrowDownIcon
                        sx={{
                            fontSize: 18,
                            color: "primary.main",
                        }}
                    />

                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            color: "text.primary",
                        }}
                    >
                        {highlightedText}
                    </Typography>

                    {normalText && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            {normalText}
                        </Typography>
                    )}
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        ml: 3,
                        color: "text.secondary",
                    }}
                >
                    {description}
                </Typography>
            </Box>

            {/* Right */}
            <Typography
                variant="body2"
                sx={{
                    ml: 3,
                    whiteSpace: "nowrap",
                    color: "text.secondary",
                }}
            >
                {date}
            </Typography>
        </Box>
    );
}