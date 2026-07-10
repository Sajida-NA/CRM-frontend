import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
  const colorMap = {
    Open: "success",
    New: "info",
    "In Progress": "warning",
    Contacted: "primary",
    Qualified: "secondary",
  };

  return (
    <Chip label={status} size="medium" color={colorMap[status] || "default"} />
  );
}
