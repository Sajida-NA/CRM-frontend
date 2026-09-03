import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router-dom";

import TicketLeftPanel from "../../TicketLeftPanel";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import CommonButton from "../../../../../Components/common/CommonButton";

import CallCard from "../../../../Leads/components/Tabs/Calls/CallCard";
import CreateLogCall from "../../../../Leads/components/Tabs/Calls/CreateLogCall";

import { getTicketTabs } from "../TicketTabs";
import { getCallsByModule } from "../../../../../services/activityApi";

export default function TicketCalls() {
  const { ticketId } = useParams();

  const [activeTab, setActiveTab] = useState("Calls");
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateLogCall, setOpenCreateLogCall] = useState(false);

  const tabs = getTicketTabs(ticketId);

  // ==========================================
  // FETCH TICKET CALLS
  // ==========================================

  const fetchCalls = async () => {
    if (!ticketId) return;

    try {
      setLoading(true);

      const data = await getCallsByModule(
        "ticket",
        ticketId
      );

      console.log("Ticket Calls:", data);

      setCalls(data);
    } catch (error) {
      console.error(
        "Error fetching Ticket calls:",
        error.response?.data || error
      );

      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchCalls();
  }, [ticketId]);

  // ==========================================
  // CALL CREATED
  // ==========================================

  const handleCallCreated = async () => {
    setOpenCreateLogCall(false);

    await fetchCalls();
  };

  return (
    <div>
      <TicketLeftPanel>
        <Box
          sx={{
            p: 3,
            mx: -2,
          }}
        >
          {/* ACTIVITY TABS */}

          <Box>
            <CommonActivityTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </Box>

          {/* HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              mb: 1,
            }}
          >
            <Typography variant="h6">
              Calls
            </Typography>

            <CommonButton
              variant="contained"
              onClick={() =>
                setOpenCreateLogCall(true)
              }
            >
              Make a Phone Call
            </CommonButton>
          </Box>

          {/* CREATE CALL DRAWER */}

          <CreateLogCall
            open={openCreateLogCall}
            onClose={() =>
              setOpenCreateLogCall(false)
            }
            relatedModule="ticket"
            objectId={ticketId}
            connectedName={`Ticket #${ticketId}`}
            onCallCreated={handleCallCreated}
          />

          {/* MONTH */}

          <Typography variant="h6">
            June 2025
          </Typography>

          {/* CALL LIST */}

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 4,
              }}
            >
              <CircularProgress size={28} />
            </Box>
          ) : calls.length === 0 ? (
            <Typography
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              No calls found for this ticket.
            </Typography>
          ) : (
            calls.map((call) => (
              <CallCard
                key={call.id}
                call={{
                  ...call,

                  name:
                    call.ticket?.name ||
                    call.ticket?.ticket_name ||
                    `Ticket #${ticketId}`,

                  description:
                    call.note || "",

                  date:
                    call.date || "",

                  time:
                    call.time || "",

                  call_outcome:
                    call.call_outcome ||
                    call.outcome ||
                    "",

                  duration:
                    call.duration !== null &&
                    call.duration !== undefined
                      ? Number(call.duration)
                      : null,
                }}
              />
            ))
          )}
        </Box>
      </TicketLeftPanel>
    </div>
  );
}