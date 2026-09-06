

import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";

import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import Createnote from "../../../../Leads/components/Tabs/Note/Createnote";
import CommonButton from "../../../../../Components/common/CommonButton";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { getAllNotes } from "../../../../../services/activityApi";

export default function NoteDetails({
  tabs,
  module,
  moduleId,
}) {
  const [activeTab, setActiveTab] = useState("Notes");
  const [openCreateNote, setOpenCreateNote] = useState(false);
  const [openNote, setOpenNote] = useState(null);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // GET NOTES
  // =========================================================

  const fetchNotes = async () => {
    if (!module || !moduleId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getAllNotes();

      console.log("ALL NOTES RESPONSE:", data);

      const allNotes = Array.isArray(data)
        ? data
        : data?.results || [];

      const currentModule = String(module)
        .toLowerCase()
        .trim();

      const currentModuleId = Number(moduleId);

      console.log("CURRENT MODULE:", currentModule);
      console.log("CURRENT MODULE ID:", currentModuleId);

      // =====================================================
      // FILTER NOTES FOR CURRENT MODULE + ID
      // =====================================================

      const filteredNotes = allNotes.filter((note) => {
        const noteModule = String(note?.module || "")
          .toLowerCase()
          .trim();

        if (noteModule !== currentModule) {
          return false;
        }

        /*
         * Support different possible backend response formats:
         *
         * 1. module_id
         * 2. object_id
         * 3. note.company.id
         * 4. note.deal.id
         * 5. note.ticket.id
         * 6. note.lead.id
         */

        const relatedId =
          note?.module_id ??
          note?.object_id ??
          note?.[currentModule]?.id ??
          note?.company?.id ??
          note?.deal?.id ??
          note?.ticket?.id ??
          note?.lead?.id;

        console.log("Checking note:", {
          noteId: note?.id,
          noteModule,
          relatedId,
          currentModule,
          currentModuleId,
        });

        return Number(relatedId) === currentModuleId;
      });

      console.log("FILTERED NOTES:", filteredNotes);

      setNotes(filteredNotes);

      // Keep opened note only if it still exists
      setOpenNote((currentOpenNote) => {
        if (
          currentOpenNote &&
          !filteredNotes.some(
            (note) => note.id === currentOpenNote
          )
        ) {
          return null;
        }

        return currentOpenNote;
      });
    } catch (error) {
      console.error(
        "Failed to fetch notes:",
        error.response?.data || error.message
      );

      setNotes([]);
      setOpenNote(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH WHEN MODULE / MODULE ID CHANGES
  // =========================================================

  useEffect(() => {
    fetchNotes();
  }, [module, moduleId]);

  // =========================================================
  // AFTER CREATE NOTE
  // =========================================================

  const handleNoteCreated = async () => {
    setOpenCreateNote(false);
    await fetchNotes();
  };

  // =========================================================
  // FORMAT DATE + TIME
  // =========================================================

  const formatDateTime = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const formattedDate = date.toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    const formattedTime = date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );

    return `${formattedDate} at ${formattedTime}`;
  };

  // =========================================================
  // GROUP NOTES BY MONTH
  // =========================================================

  const groupedNotes = notes.reduce(
    (groups, note) => {
      const date = note?.created_at
        ? new Date(note.created_at)
        : null;

      const groupName =
        date && !Number.isNaN(date.getTime())
          ? date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })
          : "Unknown Date";

      if (!groups[groupName]) {
        groups[groupName] = [];
      }

      groups[groupName].push(note);

      return groups;
    },
    {}
  );

  // =========================================================
  // SORT NOTES - NEWEST FIRST
  // =========================================================

  Object.keys(groupedNotes).forEach((month) => {
    groupedNotes[month].sort((a, b) => {
      const dateA = new Date(
        a?.created_at || 0
      );

      const dateB = new Date(
        b?.created_at || 0
      );

      return (
        dateB.getTime() -
        dateA.getTime()
      );
    });
  });

  // =========================================================
  // OPEN / CLOSE NOTE
  // =========================================================

  const handleToggleNote = (noteId) => {
    setOpenNote((current) =>
      current === noteId ? null : noteId
    );
  };

  // =========================================================
  // GET RELATED OBJECT
  // =========================================================

  const getRelatedObject = (note) => {
    const currentModule = String(module || "")
      .toLowerCase()
      .trim();

    return (
      note?.[currentModule] ||
      null
    );
  };

  // =========================================================
  // GET RELATED OBJECT NAME
  // =========================================================

  const getRelatedObjectName = (note) => {
    const relatedObject =
      getRelatedObject(note);

    return (
      relatedObject?.name ||
      relatedObject?.company_name ||
      relatedObject?.deal_name ||
      relatedObject?.ticket_name ||
      relatedObject?.lead_name ||
      "Unknown"
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <Box sx={{ p: 3, mx: -2 }}>

      {/* =====================================================
          ACTIVITY TABS
      ===================================================== */}

      <Box>
        <CommonActivityTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Box>

      {/* =====================================================
          NOTES HEADER
      ===================================================== */}

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
          Notes
        </Typography>

        <CommonButton
          variant="contained"
          onClick={() =>
            setOpenCreateNote(true)
          }
        >
          Create Note
        </CommonButton>
      </Box>

      {/* =====================================================
          CREATE NOTE
      ===================================================== */}

      <Createnote
        open={openCreateNote}
        onClose={() =>
          setOpenCreateNote(false)
        }
        module={module}
        moduleId={moduleId}
        onSuccess={handleNoteCreated}
      />

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 5,
          }}
        >
          <CircularProgress size={28} />
        </Box>
      )}

      {/* =====================================================
          NO NOTES
      ===================================================== */}

      {!loading && notes.length === 0 && (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography color="text.secondary">
            No notes found.
          </Typography>
        </Box>
      )}

      {/* =====================================================
          NOTES BY MONTH
      ===================================================== */}

      {!loading &&
        Object.entries(groupedNotes).map(
          ([month, monthNotes]) => (
            <Box key={month}>

              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  mb: 1,
                }}
              >
                {month}
              </Typography>

              {/* =================================================
                  NOTE CARDS
              ================================================= */}

              {monthNotes.map((note) => {
                const isOpen =
                  openNote === note.id;

                const relatedObjectName =
                  getRelatedObjectName(note);

                return (
                  <Box
                    key={note.id}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      mt: 1,
                      overflow: "hidden",
                    }}
                  >

                    {/* =========================================
                        NOTE HEADER
                    ========================================= */}

                    <Box
                      sx={{
                        px: 1,
                        py: 1.5,
                      }}
                    >

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleToggleNote(
                              note.id
                            )
                          }
                          sx={{
                            p: 0,
                            flexShrink: 0,
                          }}
                        >
                          {isOpen ? (
                            <KeyboardArrowDownIcon
                              color="primary"
                              fontSize="small"
                            />
                          ) : (
                            <KeyboardArrowRightIcon
                              color="primary"
                              fontSize="small"
                            />
                          )}
                        </IconButton>

                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          Note by{" "}

                          <Box
                            component="span"
                            sx={{
                              fontWeight: 400,
                              color:
                                "text.secondary",
                            }}
                          >
                            {relatedObjectName}
                          </Box>
                        </Typography>

                      </Stack>

                      {/* =======================================
                          NOTE CONTENT + DATE
                      ======================================= */}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "flex-start",
                          gap: 2,
                          pl: 4,
                          mt: 0.5,
                        }}
                      >

                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                            color:
                              "text.secondary",
                            display:
                              "-webkit-box",
                            WebkitLineClamp:
                              isOpen
                                ? "unset"
                                : 1,
                            WebkitBoxOrient:
                              "vertical",
                            overflow:
                              isOpen
                                ? "visible"
                                : "hidden",
                            wordBreak:
                              "break-word",

                            "& p": {
                              margin: 0,
                            },

                            "& ul": {
                              margin: 0,
                              paddingLeft: 2,
                            },

                            "& ol": {
                              margin: 0,
                              paddingLeft: 2,
                            },

                            "& li": {
                              margin: 0,
                            },
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              note?.note || "",
                          }}
                        />

                        <Typography
                          sx={{
                            color:
                              "text.secondary",
                            whiteSpace:
                              "nowrap",
                            fontSize: 14,
                            flexShrink: 0,
                          }}
                        >
                          {formatDateTime(
                            note?.created_at
                          )}
                        </Typography>

                      </Box>
                    </Box>

                    {/* =========================================
                        EXPANDED NOTE
                    ========================================= */}

                    {isOpen && (
                      <Box
                        sx={{
                          px: 4,
                          pb: 2,
                          pt: 1,
                          borderTop:
                            "1px solid",
                          borderColor:
                            "divider",
                        }}
                      >

                        <Box
                          sx={{
                            fontSize: 14,
                            lineHeight: 1.7,
                            wordBreak:
                              "break-word",

                            "& p": {
                              marginTop: 0,
                              marginBottom: 1,
                            },

                            "& ul": {
                              paddingLeft: 3,
                            },

                            "& ol": {
                              paddingLeft: 3,
                            },

                            "& li": {
                              marginBottom: 0.5,
                            },

                            "& a": {
                              color:
                                "primary.main",
                            },

                            "& img": {
                              maxWidth:
                                "100%",
                            },
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              note?.note || "",
                          }}
                        />

                      </Box>
                    )}

                  </Box>
                );
              })}
            </Box>
          )
        )}
    </Box>
  );
}

