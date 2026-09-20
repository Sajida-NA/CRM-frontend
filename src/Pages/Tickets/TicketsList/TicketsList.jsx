
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  // NAVIGATION
  // =====================================================

  const navigate = useNavigate();

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

  // Ticket Owner is MULTI-SELECT
  const [ticketOwner, setTicketOwner] = useState([]);

  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [search, setSearch] = useState("");

  // =====================================================
  // TICKETS
  // =====================================================

  const [ticketsData, setTicketsData] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // SELECTED TICKETS
  // =====================================================

  const [selectedTickets, setSelectedTickets] = useState([]);

  // =====================================================
  // GET TICKETS + USERS
  // =====================================================

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const [ticketsResponse, usersResponse] = await Promise.all([
        api.get("/tickets/"),
        api.get("/accounts/users/"),
      ]);

      const tickets = Array.isArray(ticketsResponse.data)
        ? ticketsResponse.data
        : ticketsResponse.data.results || [];

      const usersData = Array.isArray(usersResponse.data)
        ? usersResponse.data
        : usersResponse.data.results || [];

      setTicketsData(tickets);
      setUsers(usersData);

      // Remove deleted/non-existing tickets from selection
      setSelectedTickets((prev) =>
        prev.filter((id) => tickets.some((ticket) => ticket.id === id)),
      );
    } catch (error) {
      console.error(
        "Error fetching tickets/users:",
        error.response?.data || error,
      );

      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH DATA WHEN PAGE LOADS
  // =====================================================

  useEffect(() => {
    fetchTickets();
  }, []);

  // =====================================================
  // OWNER OPTIONS
  // =====================================================

  const ownerOptions = [
    ...new Set(
      users
        .map((user) => {
          const fullName = `${user.first_name || ""} ${
            user.last_name || ""
          }`.trim();

          return fullName || user.email || "";
        })
        .filter(Boolean),
    ),
  ];

  // =====================================================
  // GET TICKET OWNER NAMES
  // =====================================================

  const getTicketOwnerNames = (ticket) => {
    // ---------------------------------------------------
    // CASE 1:
    // Backend returns:
    // ticket_owner_ids: [16, 17]
    // ---------------------------------------------------

    if (Array.isArray(ticket.ticket_owner_ids)) {
      return ticket.ticket_owner_ids
        .map((ownerId) => {
          const user = users.find(
            (user) => String(user.id) === String(ownerId),
          );

          if (!user) return "";

          const fullName = `${user.first_name || ""} ${
            user.last_name || ""
          }`.trim();

          return fullName || user.email || "";
        })
        .filter(Boolean);
    }

    // ---------------------------------------------------
    // CASE 2:
    // Backend returns:
    // ticket_owners: ["Sajid Jubi", "Riya Mehwish"]
    // ---------------------------------------------------

    if (Array.isArray(ticket.ticket_owners)) {
      return ticket.ticket_owners
        .map((owner) => {
          // Owner is already a string
          if (typeof owner === "string") {
            return owner;
          }

          // Owner is an object
          if (typeof owner === "object" && owner !== null) {
            const fullName = `${owner.first_name || ""} ${
              owner.last_name || ""
            }`.trim();

            return fullName || owner.email || "";
          }

          return "";
        })
        .filter(Boolean);
    }

    // ---------------------------------------------------
    // CASE 3:
    // Backward compatibility with old single owner
    // ---------------------------------------------------

    if (ticket.ticket_owner) {
      return [ticket.ticket_owner];
    }

    return [];
  };

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredTickets = ticketsData.filter((ticket) => {
    const searchValue = search.trim().toLowerCase();

    const ticketName = ticket.ticket_name?.toLowerCase() || "";

    const dealName = ticket.deal_name?.toLowerCase() || "";

    // =================================================
    // TICKET OWNERS
    // =================================================

    const ticketOwnerValues = getTicketOwnerNames(ticket);

    const ticketOwnerSearchText = ticketOwnerValues.join(" ").toLowerCase();

    // =================================================
    // SEARCH
    // =================================================

    const matchesSearch =
      !searchValue ||
      ticketName.includes(searchValue) ||
      dealName.includes(searchValue) ||
      ticketOwnerSearchText.includes(searchValue);

    // =================================================
    // OWNER FILTER
    // =================================================

    const matchesOwner =
      ticketOwner.length === 0 ||
      ticketOwner.some((selectedOwner) =>
        ticketOwnerValues.some(
          (owner) => owner?.toLowerCase() === selectedOwner?.toLowerCase(),
        ),
      );

    // =================================================
    // STATUS
    // =================================================

    const normalizedTicketStatus = ticket.ticket_status
      ?.toLowerCase()
      .replaceAll("_", " ")
      .trim();

    const normalizedSelectedStatus = status
      ?.toLowerCase()
      .replaceAll("_", " ")
      .trim();

    const matchesStatus =
      !status || normalizedTicketStatus === normalizedSelectedStatus;

    // =================================================
    // SOURCE
    // =================================================

    const matchesSource =
      !source || ticket.source?.toLowerCase() === source.toLowerCase();

    // =================================================
    // PRIORITY
    // =================================================

    const matchesPriority =
      !priority || ticket.priority?.toLowerCase() === priority.toLowerCase();

    // =================================================
    // CREATED DATE
    // =================================================

    const matchesCreatedDate =
      !createdDate || ticket.created_date?.startsWith(createdDate);

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
      setSelectedTickets(filteredTickets.map((ticket) => ticket.id));
    }
  };

  // =====================================================
  // CHECKBOX STATES
  // =====================================================

  const allSelected =
    filteredTickets.length > 0 &&
    filteredTickets.every((ticket) => selectedTickets.includes(ticket.id));

  const someSelected = selectedTickets.length > 0 && !allSelected;

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setTicketOwner([]);
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
      `Are you sure you want to delete "${ticket.ticket_name}"?`,
    );

    if (!confirmed) return;

    try {
      await api.delete(`/tickets/${ticket.id}/`);

      setSelectedTickets((prev) => prev.filter((id) => id !== ticket.id));

      await fetchTickets();
    } catch (error) {
      console.error("Error deleting ticket:", error.response?.data || error);

      alert("Failed to delete ticket.");
    }
  };

  return (
    <div>
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
                <CommonButton variant="outlined">Import</CommonButton>

                <CommonButton onClick={() => setOpenDrawer(true)}>
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
            totalPages={Math.max(1, Math.ceil(filteredTickets.length / 10))}
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
            options={ownerOptions}
            value={ticketOwner}
            multiple
            onChange={(e) => {
              const value = e.target.value;

              setTicketOwner(
                Array.isArray(value) ? value : value ? [value] : [],
              );

              setPage(1);
            }}
          />

          {/* TICKET STATUS */}

          <SelectField
            placeholder="Ticket Status"
            options={[
              "New",
              "Open",
              "In Progress",
              "Waiting on Contact",
              "Waiting on Us",
              "Closed",
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
            options={["Chat", "Email", "Phone", "Web"]}
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setPage(1);
            }}
          />

          {/* PRIORITY */}

          <SelectField
            placeholder="Priority"
            options={["High", "Medium", "Low", "Critical"]}
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
                color: createdDate ? "#344054" : "#667085",
              },
            }}
            slotProps={{
              input: {
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
              },
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
            }}
          />

          {/* CLEAR FILTERS */}

          {(ticketOwner.length > 0 ||
            status ||
            source ||
            priority ||
            createdDate ||
            search) && (
            <CommonButton variant="outlined" onClick={clearFilters}>
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
              <TableCell colSpan={9} align="center">
                Loading tickets...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                {error}
              </TableCell>
            </TableRow>
          ) : filteredTickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No tickets found.
              </TableCell>
            </TableRow>
          ) : (
            filteredTickets.map((ticket) => {
              // =================================================
              // TICKET OWNER NAMES
              // =================================================

              const ticketOwners = getTicketOwnerNames(ticket);

              return (
                <TableRow key={ticket.id}>
                  {/* CHECKBOX */}

                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={() => handleSelectTicket(ticket.id)}
                    />
                  </TableCell>

                  {/* TICKET NAME */}

                  <TableCell>
                    <Box
                      component="span"
                      onClick={() =>
                        navigate(`/tickets/${ticket.id}/activities`)
                      }
                      sx={{
                        color: "#5948DB",
                        cursor: "pointer",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {ticket.ticket_name}
                    </Box>
                  </TableCell>

                  {/* DEAL NAME */}

                  <TableCell>{ticket.deal_name || "-"}</TableCell>

                  {/* STATUS */}

                  <TableCell>{ticket.ticket_status}</TableCell>

                  {/* PRIORITY */}

                  <TableCell>{ticket.priority}</TableCell>

                  {/* SOURCE */}

                  <TableCell>{ticket.source}</TableCell>

                  {/* OWNER */}

                  <TableCell>
                    {ticketOwners.length > 0 ? ticketOwners.join(", ") : "-"}
                  </TableCell>

                  {/* CREATED DATE */}

                  <TableCell>
                    {ticket.created_date
                      ? new Date(ticket.created_date).toLocaleString()
                      : "-"}
                  </TableCell>

                  {/* ACTIONS */}

                  <TableCell>
                    {/* EDIT */}

                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(ticket)}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* DELETE */}

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(ticket)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </DataTable>
      </Box>
    </div>
  );
}

