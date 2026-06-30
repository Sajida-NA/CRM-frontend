import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
  const colorMap = {
    Open: "success",
    New: "primary",
    "In Progress": "warning",
    Contacted: "info",
    Qualified: "secondary",
  };

  return (
    <Chip label={status} size="small" color={colorMap[status] || "default"} />
  );
}
