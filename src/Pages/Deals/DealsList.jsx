import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateDealModal from "./components/CreateDealModal";

export default function DealsList() {
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);

  const deals = [
    {
      id: "DL-101",
      name: "CRM Pro Subscription",
      company: "TrustSphere",
      value: "$12,000",
      stage: "Negotiation",
      owner: "Maria Johnson",
      created: "Apr 8, 2025",
    },
    {
      id: "DL-102",
      name: "CRM Basic Package",
      company: "BlueWave Technologies",
      value: "$4,500",
      stage: "Proposal Sent",
      owner: "Raj Sharma",
      created: "Apr 8, 2025",
    },
  ];

  const stageColor = {
    "Negotiation": "warning",
    "Proposal Sent": "info",
    "Closed Won": "success",
    "Closed Lost": "error",
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
          Deals
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          onClick={() => setOpenCreate(true)}
        >
          Create Deal
        </Button>
      </Box>

      {/* Table */}
      <Box
        sx={{
          background: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* Table Header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr 150px 150px 150px 150px 100px",
            p: 2,
            fontWeight: 600,
            color: "#555",
            borderBottom: "1px solid #eee",
          }}
        >
          <Box>ID</Box>
          <Box>Deal Name</Box>
          <Box>Company</Box>
          <Box>Value</Box>
          <Box>Stage</Box>
          <Box>Owner</Box>
          <Box>Actions</Box>
        </Box>

        {/* Table Rows */}
        {deals.map((d) => (
          <Box
            key={d.id}
            sx={{
              display: "grid",
              gridTemplateColumns:
                "120px 1fr 150px 150px 150px 150px 100px",
              p: 2,
              borderBottom: "1px solid #f0f0f0",
              cursor: "pointer",
              ":hover": { background: "#fafafa" },
            }}
            onClick={() => navigate(`/deals/${d.id}`)}
          >
            <Box sx={{ fontWeight: 600 }}>{d.id}</Box>
            <Box>{d.name}</Box>
            <Box>{d.company}</Box>
            <Box>{d.value}</Box>

            <Chip
              label={d.stage}
              color={stageColor[d.stage] || "default"}
              size="small"
              sx={{ fontWeight: 600 }}
            />

            <Box>{d.owner}</Box>

            <Box onClick={(e) => e.stopPropagation()}>
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Create Deal Modal */}
      <CreateDealModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </Box>
  );
}
