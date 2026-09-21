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
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [page, setPage] = useState(1);

  const [ticketOwner, setTicketOwner] = useState([]);
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [priority, setPriority] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [search, setSearch] = useState("");

  const [ticketsData, setTicketsData] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedTickets, setSelectedTickets] = useState([]);

  // =========================================================
  // FETCH TICKETS + USERS
  // =========================================================

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      // -----------------------------------------------------
      // FETCH TICKETS
      // -----------------------------------------------------

      const ticketsResponse = await api.get("/tickets/");

      const tickets = Array.isArray(ticketsResponse.data)
        ? ticketsResponse.data
        : ticketsResponse.data?.results || [];

      console.log("TICKETS API RESPONSE:", tickets);

      // IMPORTANT:
      // Set tickets immediately.
      // Users API failure should NOT prevent tickets from showing.
      setTicketsData(tickets);

      setSelectedTickets((prev) =>
        prev.filter((id) =>
          tickets.some((ticket) => ticket.id === id)
        )
      );

      // -----------------------------------------------------
      // FETCH USERS
      // -----------------------------------------------------

      try {
        const usersResponse = await api.get("/accounts/users/");

        const usersData = Array.isArray(usersResponse.data)
          ? usersResponse.data
          : usersResponse.data?.results || [];

        console.log("USERS API RESPONSE:", usersData);

        setUsers(usersData);
      } catch (userError) {
        console.error(
          "Error fetching users:",
          userError.response?.data ||
            userError.message ||
            userError
        );

        // Users are only required for owner names/filter.
        // Tickets should still be displayed.
        setUsers([]);
      }
    } catch (error) {
      console.error(
        "Error fetching tickets:",
        error.response?.data ||
          error.message ||
          error
      );

      setTicketsData([]);
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // =========================================================
  // OWNER OPTIONS
  // =========================================================

  const ownerOptions = [
    ...new Set(
      users
        .map((user) => {
          const fullName = `${user.first_name || ""} ${
            user.last_name || ""
          }`.trim();

          return fullName || user.email || "";
        })
        .filter(Boolean)
    ),
  ];

  // =========================================================
  // GET TICKET OWNER NAMES
  // =========================================================

  const getTicketOwnerNames = (ticket) => {
    // Backend returns:
    // ticket_owner_ids: [17, 18]

    if (Array.isArray(ticket.ticket_owner_ids)) {
      return ticket.ticket_owner_ids
        .map((ownerId) => {
          const user = users.find(
            (user) =>
              String(user.id) === String(ownerId)
          );

          if (!user) return "";

          const fullName = `${user.first_name || ""} ${
            user.last_name || ""
          }`.trim();

          return fullName || user.email || "";
        })
        .filter(Boolean);
    }

    // Fallback if backend returns ticket_owners
    if (Array.isArray(ticket.ticket_owners)) {
      return ticket.ticket_owners
        .map((owner) => {
          if (typeof owner === "string") {
            return owner;
          }

          if (
            typeof owner === "object" &&
            owner !== null
          ) {
            const fullName = `${owner.first_name || ""} ${
              owner.last_name || ""
            }`.trim();

            return fullName || owner.email || "";
          }

          return "";
        })
        .filter(Boolean);
    }

    // Fallback for single owner
    if (ticket.ticket_owner) {
      return [ticket.ticket_owner];
    }

    return [];
  };

  // =========================================================
  // FILTER TICKETS
  // =========================================================

  const filteredTickets = ticketsData.filter((ticket) => {
    const searchValue = search.trim().toLowerCase();

    const ticketName =
      ticket.ticket_name?.toLowerCase() || "";

    const dealName =
      ticket.deal_name?.toLowerCase() || "";

    const ticketOwnerValues =
      getTicketOwnerNames(ticket);

    const ticketOwnerSearchText =
      ticketOwnerValues.join(" ").toLowerCase();

    // SEARCH
    const matchesSearch =
      !searchValue ||
      ticketName.includes(searchValue) ||
      dealName.includes(searchValue) ||
      ticketOwnerSearchText.includes(searchValue);

    // OWNER
    const matchesOwner =
      ticketOwner.length === 0 ||
      ticketOwner.some((selectedOwner) =>
        ticketOwnerValues.some(
          (owner) =>
            owner?.toLowerCase() ===
            selectedOwner?.toLowerCase()
        )
      );

    // STATUS
    const normalizedTicketStatus =
      ticket.ticket_status
        ?.toLowerCase()
        .replaceAll("_", " ")
        .trim();

    const normalizedSelectedStatus =
      status
        ?.toLowerCase()
        .replaceAll("_", " ")
        .trim();

    const matchesStatus =
      !status ||
      normalizedTicketStatus ===
        normalizedSelectedStatus;

    // SOURCE
    const matchesSource =
      !source ||
      ticket.source?.toLowerCase() ===
        source.toLowerCase();

    // PRIORITY
    const matchesPriority =
      !priority ||
      ticket.priority?.toLowerCase() ===
        priority.toLowerCase();

    // CREATED DATE
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

  // =========================================================
  // PAGINATION
  // =========================================================

  const rowsPerPage = 10;

  const totalPages = Math.ceil(
    filteredTickets.length / rowsPerPage
  );

  const paginatedTickets = filteredTickets.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // =========================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =========================================================

  useEffect(() => {
    setPage(1);
  }, [
    search,
    ticketOwner,
    status,
    source,
    priority,
    createdDate,
  ]);

  // =========================================================
  // SELECT ALL
  // =========================================================

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedTickets(
        paginatedTickets.map((ticket) => ticket.id)
      );
    } else {
      setSelectedTickets([]);
    }
  };

  // =========================================================
  // SELECT SINGLE TICKET
  // =========================================================

  const handleSelectTicket = (ticketId) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketId)
        ? prev.filter((id) => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  // =========================================================
  // DELETE TICKET
  // =========================================================

  const handleDeleteTicket = async (ticketId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tickets/${ticketId}/`);

      setTicketsData((prev) =>
        prev.filter(
          (ticket) => ticket.id !== ticketId
        )
      );

      setSelectedTickets((prev) =>
        prev.filter((id) => id !== ticketId)
      );
    } catch (error) {
      console.error(
        "Error deleting ticket:",
        error.response?.data ||
          error.message ||
          error
      );

      setError("Failed to delete ticket.");
    }
  };

  // =========================================================
  // EDIT TICKET
  // =========================================================

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setOpenEditDrawer(true);
  };

  // =========================================================
  // AFTER CREATE / UPDATE
  // =========================================================

  const handleTicketSaved = () => {
    setOpenDrawer(false);
    setOpenEditDrawer(false);
    setSelectedTicket(null);
    fetchTickets();
  };

  // =========================================================
  // STATUS OPTIONS
  // =========================================================

  const statusOptions = [
    { label: "New", value: "NEW" },
    { label: "Open", value: "OPEN" },
    {
      label: "Waiting on Contact",
      value: "WAITING_ON_CONTACT",
    },
    {
      label: "Waiting on Internal",
      value: "WAITING_ON_INTERNAL",
    },
    { label: "Closed", value: "CLOSED" },
  ];

  // =========================================================
  // SOURCE OPTIONS
  // =========================================================

  const sourceOptions = [
    { label: "Email", value: "EMAIL" },
    { label: "Phone", value: "PHONE" },
    { label: "Web", value: "WEB" },
    { label: "Chat", value: "CHAT" },
  ];

  // =========================================================
  // PRIORITY OPTIONS
  // =========================================================

  const priorityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Urgent", value: "URGENT" },
  ];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <Box>
      <PageHeader
        title="Tickets"
        subtitle="Manage customer support tickets"
      />

      {/* =====================================================
          SEARCH + CREATE
      ===================================================== */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <SearchSection
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tickets..."
        />

        <CommonButton
          onClick={() => setOpenDrawer(true)}
        >
          Create Ticket
        </CommonButton>
      </Box>

      {/* =====================================================
          FILTER SECTION
      ===================================================== */}

      <FilterSection>
        <SelectField
          label="Ticket Owner"
          value={ticketOwner}
          onChange={(e) =>
            setTicketOwner(e.target.value)
          }
          options={ownerOptions.map((owner) => ({
            label: owner,
            value: owner,
          }))}
          multiple
        />

        <SelectField
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          options={statusOptions}
        />

        <SelectField
          label="Source"
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
          options={sourceOptions}
        />

        <SelectField
          label="Priority"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          options={priorityOptions}
        />

        <TextField
          type="date"
          label="Created Date"
          value={createdDate}
          onChange={(e) =>
            setCreatedDate(e.target.value)
          }
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
        />
      </FilterSection>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <DataTable
        columns={[
          {
            label: (
              <Checkbox
                checked={
                  paginatedTickets.length > 0 &&
                  paginatedTickets.every((ticket) =>
                    selectedTickets.includes(ticket.id)
                  )
                }
                indeterminate={
                  selectedTickets.length > 0 &&
                  !paginatedTickets.every((ticket) =>
                    selectedTickets.includes(ticket.id)
                  )
                }
                onChange={handleSelectAll}
              />
            ),
          },
          { label: "TICKET NAME" },
          { label: "DEAL NAME" },
          { label: "TICKET STATUS" },
          { label: "PRIORITY" },
          { label: "SOURCE" },
          { label: "TICKET OWNER" },
          { label: "CREATED DATE" },
          { label: "ACTIONS" },
        ]}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      >
        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <TableRow>
            <TableCell
              colSpan={9}
              align="center"
            >
              Loading tickets...
            </TableCell>
          </TableRow>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}

        {!loading && error && (
          <TableRow>
            <TableCell
              colSpan={9}
              align="center"
            >
              {error}
            </TableCell>
          </TableRow>
        )}

        {/* ===================================================
            EMPTY
        =================================================== */}

        {!loading &&
          !error &&
          paginatedTickets.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={9}
                align="center"
              >
                No tickets found
              </TableCell>
            </TableRow>
          )}

        {/* ===================================================
            TICKET ROWS
        =================================================== */}

        {!loading &&
          !error &&
          paginatedTickets.map((ticket) => {
            const ticketOwners =
              getTicketOwnerNames(ticket);

            return (
              <TableRow key={ticket.id}>
                {/* CHECKBOX */}
                <TableCell>
                  <Checkbox
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
                  <Box
                    component="span"
                    sx={{
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                    onClick={() =>
                      navigate(
                        `/tickets/${ticket.id}/activities`
                      )
                    }
                  >
                    {ticket.ticket_name || "-"}
                  </Box>
                </TableCell>

                {/* DEAL NAME */}
                <TableCell>
                  {ticket.deal_name || "-"}
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  {ticket.ticket_status
                    ?.replaceAll("_", " ")
                    ?.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    ) || "-"}
                </TableCell>

                {/* PRIORITY */}
                <TableCell>
                  {ticket.priority
                    ? ticket.priority
                        .replaceAll("_", " ")
                        .replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )
                    : "-"}
                </TableCell>

                {/* SOURCE */}
                <TableCell>
                  {ticket.source
                    ? ticket.source
                        .replaceAll("_", " ")
                        .replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )
                    : "-"}
                </TableCell>

                {/* OWNER */}
                <TableCell>
                  {ticketOwners.length > 0
                    ? ticketOwners.join(", ")
                    : "-"}
                </TableCell>

                {/* CREATED DATE */}
                <TableCell>
                  {ticket.created_date
                    ? new Date(
                        ticket.created_date
                      ).toLocaleDateString()
                    : "-"}
                </TableCell>

                {/* ACTIONS */}
                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleEditTicket(ticket)
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() =>
                        handleDeleteTicket(ticket.id)
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
      </DataTable>

      {/* =====================================================
          CREATE TICKET DRAWER
      ===================================================== */}

      <CreateTicketDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onSuccess={handleTicketSaved}
      />

      {/* =====================================================
          EDIT TICKET DRAWER
      ===================================================== */}

      <EditTicketDrawer
        open={openEditDrawer}
        onClose={() => {
          setOpenEditDrawer(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
        onSuccess={handleTicketSaved}
      />
    </Box>
  );
}