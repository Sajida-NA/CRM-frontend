import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import PageHeader from "../../../Components/common/PageHeader";

import {
  Box,
  IconButton,
  TableRow,
  TableCell,
  Checkbox,
  TextField,
  InputAdornment,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CommonButton from "../../../Components/common/CommonButton";
import SelectField from "../../../Components/common/SelectField";
import FilterSection from "../../../Components/common/FilterSection";
import DataTable from "../../../Components/common/DataTable";
import SearchSection from "../../../Components/common/SearchSection";
import CreateTicketDrawer from "../components/CreateTicketDrawer";
import EditTicketDrawer from "../components/EditTicketDrawer";

import api from "../../../services/api";

export default function TicketsList() {
  // =====================================================
  // DRAWERS
  // =====================================================

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] = useState(1);

  // =====================================================
  // FILTERS
  // =====================================================

  const [ticketOwner, setTicketOwner] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [search, setSearch] = useState("");

  // =====================================================
  // TICKETS
  // =====================================================

  const [ticketsData, setTicketsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // SELECTED TICKETS
  // =====================================================

  const [selectedTickets, setSelectedTickets] = useState([]);

  // =====================================================
  // GET TICKETS
  // =====================================================

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tickets/");

      setTicketsData(response.data);

      // Remove deleted/non-existing tickets from selection
      setSelectedTickets((prev) =>
        prev.filter((id) =>
          response.data.some((ticket) => ticket.id === id)
        )
      );
    } catch (error) {
      console.error("Error fetching tickets:", error);

      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH TICKETS WHEN PAGE LOADS
  // =====================================================

  useEffect(() => {
    fetchTickets();
  }, []);

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredTickets = ticketsData.filter((ticket) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      ticket.ticket_name
        ?.toLowerCase()
        .includes(searchValue) ||
      ticket.deal_name
        ?.toLowerCase()
        .includes(searchValue) ||
      ticket.ticket_owner
        ?.toLowerCase()
        .includes(searchValue);

    const matchesOwner =
      !ticketOwner ||
      ticket.ticket_owner
        ?.toLowerCase()
        .includes(ticketOwner.toLowerCase());

    const matchesStatus =
      !status ||
      ticket.ticket_status?.toLowerCase() ===
        status.toLowerCase().replaceAll(" ", "_");

    const matchesSource =
      !source ||
      ticket.source?.toLowerCase() ===
        source.toLowerCase();

    const matchesPriority =
      !priority ||
      ticket.priority?.toLowerCase() ===
        priority.toLowerCase();

    const matchesCreatedDate =
      !createdDate ||
      ticket.created_date?.startsWith(createdDate);

    return (
      matchesSearch &&
      matchesOwner &&
      matchesStatus &&
      matchesSource &&
      matchesPriority &&
      matchesCreatedDate
    );
  });

  // =====================================================
  // CHECKBOX SELECTION
  // =====================================================

  const handleSelectTicket = (ticketId) => {
    setSelectedTickets((prev) => {
      if (prev.includes(ticketId)) {
        return prev.filter((id) => id !== ticketId);
      }

      return [...prev, ticketId];
    });
  };

  // =====================================================
  // SELECT / UNSELECT ALL
  // =====================================================

  const handleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(
        filteredTickets.map((ticket) => ticket.id)
      );
    }
  };

  // =====================================================
  // CHECKBOX STATES
  // =====================================================

  const allSelected =
    filteredTickets.length > 0 &&
    filteredTickets.every((ticket) =>
      selectedTickets.includes(ticket.id)
    );

  const someSelected =
    selectedTickets.length > 0 && !allSelected;

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setTicketOwner("");
    setStatus("");
    setSource("");
    setPriority("");
    setCreatedDate("");
    setSearch("");
    setPage(1);
  };

  // =====================================================
  // OPEN EDIT DRAWER
  // =====================================================

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setOpenEditDrawer(true);
  };

  // =====================================================
  // CLOSE EDIT DRAWER
  // =====================================================

  const handleCloseEdit = () => {
    setOpenEditDrawer(false);
    setSelectedTicket(null);
  };

  // =====================================================
  // DELETE TICKET
  // =====================================================

  const handleDelete = async (ticket) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${ticket.ticket_name}"?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/tickets/${ticket.id}/`);

      setSelectedTickets((prev) =>
        prev.filter((id) => id !== ticket.id)
      );

      await fetchTickets();
    } catch (error) {
      console.error(
        "Error deleting ticket:",
        error.response?.data || error
      );

      alert("Failed to delete ticket.");
    }
  };

  return (
    <div>
      <MainLayout>
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
          {/* =====================================================
              TICKET HEADER
          ===================================================== */}

          <Box
            sx={{
              p: 2,
              height: "12vh",
              boxShadow: "4px",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <PageHeader
              title="Tickets"
              actions={
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <CommonButton variant="outlined">
                    Import
                  </CommonButton>

                  <CommonButton
                    onClick={() => setOpenDrawer(true)}
                  >
                    Create
                  </CommonButton>
                </Box>
              }
            />

            {/* =====================================================
                CREATE TICKET DRAWER
            ===================================================== */}

            <CreateTicketDrawer
              open={openDrawer}
              onClose={() => {
                setOpenDrawer(false);
                fetchTickets();
              }}
            />

            {/* =====================================================
                EDIT TICKET DRAWER
            ===================================================== */}

            <EditTicketDrawer
              open={openEditDrawer}
              ticketId={selectedTicket?.id}
              onClose={handleCloseEdit}
              onUpdated={fetchTickets}
            />
          </Box>

          {/* =====================================================
              SEARCH + PAGINATION
          ===================================================== */}

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
              totalPages={Math.max(
                1,
                Math.ceil(filteredTickets.length / 10)
              )}
              onPageChange={setPage}
              searchValue={search}
              onSearchChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Box>

          {/* =====================================================
              FILTERS
          ===================================================== */}

          <FilterSection>
            {/* TICKET OWNER */}

            <SelectField
              placeholder="Ticket Owner"
              options={[
                "Jane Cooper",
                "Brooklyn Simmons",
                "Jenny Wilson",
                "Robert Fox",
                "Guy Hawkins",
              ]}
              value={ticketOwner}
              onChange={(e) => {
                setTicketOwner(e.target.value);
                setPage(1);
              }}
            />

            {/* TICKET STATUS */}

            <SelectField
              placeholder="Ticket Status"
              options={[
                "Waiting on contact",
                "New",
                "Closed",
                "Waiting on us",
              ]}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            />

            {/* SOURCE */}

            <SelectField
              placeholder="Source"
              options={[
                "Chat",
                "Email",
                "Phone",
                "Web",
              ]}
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setPage(1);
              }}
            />

            {/* PRIORITY */}

            <SelectField
              placeholder="Priority"
              options={[
                "High",
                "Medium",
                "Low",
                "Critical",
              ]}
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
            />

            {/* CREATED DATE */}

            <TextField
              type="date"
              value={createdDate}
              onChange={(e) => {
                setCreatedDate(e.target.value);
                setPage(1);
              }}
              size="small"
              sx={{
                width: 180,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                },

                "& input": {
                  color: createdDate
                    ? "#344054"
                    : "#667085",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon
                      sx={{
                        color: "#98A2B3",
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ flexGrow: 1 }} />

            {/* CLEAR FILTERS */}

            {(ticketOwner ||
              status ||
              source ||
              priority ||
              createdDate ||
              search) && (
              <CommonButton
                variant="outlined"
                onClick={clearFilters}
              >
                Clear
              </CommonButton>
            )}
          </FilterSection>

          {/* =====================================================
              TICKET TABLE
          ===================================================== */}

          <DataTable
            columns={[
              <Checkbox
                size="small"
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
              />,
              "TICKET NAME",
              "DEAL NAME",
              "TICKET STATUS",
              "PRIORITY",
              "SOURCE",
              "TICKET OWNER",
              "CREATED DATE",
              "ACTIONS",
            ]}
          >
            {/* =====================================================
                LOADING
            ===================================================== */}

            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  align="center"
                >
                  Loading tickets...
                </TableCell>
              </TableRow>
            ) : error ? (
              /* =====================================================
                  ERROR
              ===================================================== */

              <TableRow>
                <TableCell
                  colSpan={9}
                  align="center"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredTickets.length === 0 ? (
              /* =====================================================
                  EMPTY
              ===================================================== */

              <TableRow>
                <TableCell
                  colSpan={9}
                  align="center"
                >
                  No tickets found.
                </TableCell>
              </TableRow>
            ) : (
              /* =====================================================
                  TICKETS
              ===================================================== */

              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  {/* CHECKBOX */}

                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={selectedTickets.includes(
                        ticket.id
                      )}
                      onChange={() =>
                        handleSelectTicket(ticket.id)
                      }
                    />
                  </TableCell>

                  {/* TICKET NAME */}

                  <TableCell>
                    {ticket.ticket_name}
                  </TableCell>

                  {/* DEAL NAME */}

                  <TableCell>
                    {ticket.deal_name || "-"}
                  </TableCell>

                  {/* STATUS */}

                  <TableCell>
                    {ticket.ticket_status}
                  </TableCell>

                  {/* PRIORITY */}

                  <TableCell>
                    {ticket.priority}
                  </TableCell>

                  {/* SOURCE */}

                  <TableCell>
                    {ticket.source}
                  </TableCell>

                  {/* OWNER */}

                  <TableCell>
                    {ticket.ticket_owner || "-"}
                  </TableCell>

                  {/* CREATED DATE */}

                  <TableCell>
                    {ticket.created_date
                      ? new Date(
                          ticket.created_date
                        ).toLocaleString()
                      : "-"}
                  </TableCell>

                  {/* ACTIONS */}

                  <TableCell>
                    {/* EDIT */}

                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(ticket)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    {/* DELETE */}

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(ticket)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </DataTable>
        </Box>
      </MainLayout>
    </div>
  );
}