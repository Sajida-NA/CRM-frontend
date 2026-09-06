

import { useState, useEffect } from "react";
import { Box, IconButton, TableRow, TableCell } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../../Components/common/PageHeader";
import FilterSection from "../../../Components/common/FilterSection";
import SelectField from "../../../Components/common/SelectField";
import StatusChip from "../../../Components/common/StatusChip";
import DataTable from "../../../Components/common/DataTable";
import SearchSection from "../../../Components/common/SearchSection";
import CommonCheckbox from "../../../Components/common/CommonCheckbox";
import CommonDatePicker from "../../../Components/common/CommonDatePicker";
import CommonButton from "../../../Components/common/CommonButton";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import CreateLeadsDrawer from "../components/CreateLeadsDrawer";
import MainLayout from "../../../layout/MainLayout";

import {
  getLeads,
  deleteLead,
  getLeadStatuses,
} from "../../../services/leads";

export default function Leadslist() {
  // =========================
  // STATE
  // =========================
   const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [search, setSearch] = useState("");

  const [openCreate, setOpenCreate] = useState(false);

  const [leads, setLeads] = useState([]);
  const [leadStatuses, setLeadStatuses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);
  const navigate = useNavigate();

  // =========================
  // FETCH LEADS
  // =========================

  const fetchLeads = async (selectedStatus = "") => {
    try {
      setLoading(true);

      const response = await getLeads({
        lead_status: selectedStatus,
      });

      console.log("Leads API Response:", response.data);

      setLeads(response.data);
    } catch (error) {
      console.error(
        "Error fetching leads:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH LEAD STATUSES
  // =========================

  const fetchLeadStatuses = async () => {
    try {
      const response = await getLeadStatuses();

      console.log(
        "Lead Status API Response:",
        response.data
      );

      setLeadStatuses(response.data);
    } catch (error) {
      console.error(
        "Error fetching lead statuses:",
        error.response?.data || error.message
      );
    }
  };

  // =========================
  // DELETE LEAD
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteLead(id);

      // Refresh leads
      await fetchLeads(status);

      alert("Lead deleted successfully.");
    } catch (error) {
      console.error(
        "Error deleting lead:",
        error.response?.data || error.message
      );

      alert("Failed to delete lead.");
    }
  };

  // =========================
  // LOAD STATUS OPTIONS
  // =========================

  useEffect(() => {
    fetchLeadStatuses();
  }, []);

  // =========================
  // LOAD LEADS
  // WHEN STATUS CHANGES
  // =========================

  useEffect(() => {
    fetchLeads(status);
  }, [status]);

  // =========================
  // SEARCH + DATE FILTER
  // =========================

  const filteredLeads = leads.filter((lead) => {
    const searchText = search.trim().toLowerCase();

    // Search by name
    const matchesName =
      (lead.name || "")
        .toLowerCase()
        .includes(searchText);

    // Search by email
    const matchesEmail =
      (lead.email || "")
        .toLowerCase()
        .includes(searchText);

    // Search by phone
    const matchesPhone =
      String(lead.phone_number || "")
        .includes(searchText);

    const matchesSearch =
      searchText === "" ||
      matchesName ||
      matchesEmail ||
      matchesPhone;

    // =========================
    // STATUS FILTER
    // =========================

    const matchesStatus =
      status === "" ||
      String(lead.lead_status || "").trim() ===
        String(status || "").trim();

    // =========================
    // CREATED DATE FILTER
    // =========================

    const matchesCreatedDate =
      createdDate === "" ||
      (
        lead.created_date &&
        dayjs(lead.created_date).format("YYYY-MM-DD") ===
          createdDate
      );

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCreatedDate
    );
  });

  // =========================
  // UI
  // =========================

  return (
    <MainLayout>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <Box
        sx={{
          maxWidth: "1000",
           margin: "0 auto",
           marginTop: "5px",
          padding: "5px",
           backgroundColor: "background.default",
           borderRadius: "10px",
           boxShadow: "3px",
        }}
      >

        {/* =========================================
            HEADER
        ========================================= */}

        <Box
          sx={{
            p: 2,
             height: "12vh",
             boxShadow: "4px",
             border: " 1px solid",
             borderColor: "divider",
             bgcolor: "background.paper",
             borderTopLeftRadius: "12px",
             borderTopRightRadius: "12px",
          }}
        >

          <PageHeader
            title="Leads"
            actions={
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >

                {/* IMPORT */}

                <CommonButton variant="outlined">
                  Import
                </CommonButton>

                {/* CREATE */}

                <CommonButton
                  onClick={() => {
                    setSelectedLead(null);
                    setOpenCreate(true);
                  }}
                >
                  Create
                </CommonButton>

              </Box>
            }
          />

          {/* =========================================
              CREATE / EDIT DRAWER
          ========================================= */}

          <CreateLeadsDrawer
            open={openCreate}
            selectedLead={selectedLead}
            onClose={() => {
              setOpenCreate(false);
              setSelectedLead(null);
            }}
            onSuccess={() => {
              fetchLeads(status);
            }}
          />

        </Box>

        {/* =========================================
            SEARCH SECTION
        ========================================= */}

        <Box
          sx={{
            p: 2,
            boxShadow: "4px",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            height: "12vh",
            marginTop: "4px",
            transform: "translateY(-5px)",
          }}
        >

          <SearchSection
            placeholder="Search Phone, Name, Email"
             page={page}
                      totalPages={68}
                      onPageChange={setPage}
            searchValue={search}
            onSearchChange={(e) =>
              setSearch(e.target.value)
            }
          />


          

        </Box>

        {/* =========================================
            FILTERS
        ========================================= */}

        <FilterSection>

          {/* LEAD STATUS */}

          <SelectField
            placeholder="Lead Status"
            options={leadStatuses}
            value={status}
            onChange={(e) => {
              console.log(
                "STATUS SELECTED:",
                e.target.value
              );

              setStatus(e.target.value);
            }}
          />

          {/* CREATED DATE */}

          <CommonDatePicker
            label="Created Date"
            value={
              createdDate
                ? dayjs(createdDate)
                : null
            }
            onChange={(newValue) => {
              setCreatedDate(
                newValue
                  ? newValue.format("YYYY-MM-DD")
                  : ""
              );
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

        </FilterSection>

        {/* =========================================
            TABLE
        ========================================= */}

        <DataTable
          columns={[
            <CommonCheckbox size="medium" />,
            "NAME",
            "EMAIL",
            "PHONE NUMBER",
            "CREATED DATE",
            "LEAD STATUS",
            "ACTIONS",
          ]}
        >

          {/* IMPORTANT:
              filteredLeads instead of leads
          */}

          {filteredLeads.map((lead) => (

            <TableRow key={lead.id}>

              {/* CHECKBOX */}

              <TableCell>
                <CommonCheckbox size="medium" />
              </TableCell>

              {/* NAME */}

              <TableCell>
  <Box
    component="span"
    sx={{
      color: "primary.main",
      cursor: "pointer",
      fontWeight: 500,
      "&:hover": {
        textDecoration: "underline",
      },
    }}
    onClick={() => navigate(`/leads/${lead.id}/activity`)}
  >
    {lead.name || "-"}
  </Box>
</TableCell>

              {/* EMAIL */}

              <TableCell>
                {lead.email || "-"}
              </TableCell>

              {/* PHONE */}

              <TableCell>
                {lead.phone_number || "-"}
              </TableCell>

              {/* CREATED DATE */}

              <TableCell>
                {lead.created_date
                  ? dayjs(
                      lead.created_date
                    ).format(
                      "MMM D, YYYY h:mm A"
                    )
                  : "-"}
              </TableCell>

              {/* LEAD STATUS */}

              <TableCell>
                <StatusChip
                  status={lead.lead_status}
                />
              </TableCell>

              {/* ACTIONS */}

              <TableCell>

                {/* EDIT */}

                <IconButton
                  color="primary"
                  onClick={() => {
                    setSelectedLead(lead);
                    setOpenCreate(true);
                  }}
                >
                  <EditIcon />
                </IconButton>

                {/* DELETE */}

                <IconButton
                  color="error"
                  onClick={() =>
                    handleDelete(lead.id)
                  }
                >
                  <DeleteIcon />
                </IconButton>

              </TableCell>

            </TableRow>

          ))}

        </DataTable>

      </Box>

    </MainLayout>
  );
}


