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
  // FETCH NOTES
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

      const filteredNotes = allNotes.filter((note) => {
        const noteModule = String(note?.module || "")
          .toLowerCase()
          .trim();

        if (noteModule !== currentModule) {
          return false;
        }

        const relatedId =
          note?.module_id ??
          note?.object_id ??
          note?.[currentModule]?.id ??
          note?.company?.id ??
          note?.deal?.id ??
          note?.ticket?.id ??
          note?.lead?.id;

        return Number(relatedId) === currentModuleId;
      });

      console.log("FILTERED NOTES:", filteredNotes);

      setNotes(filteredNotes);

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
        error?.response?.data || error?.message
      );

      setNotes([]);
      setOpenNote(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [module, moduleId]);

  // =========================================================
  // NOTE CREATED
  // =========================================================

  const handleNoteCreated = async () => {
    setOpenCreateNote(false);
    await fetchNotes();
  };

  // =========================================================
  // DATE FORMAT
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

  Object.keys(groupedNotes).forEach((month) => {
    groupedNotes[month].sort((a, b) => {
      const dateA = new Date(
        a?.created_at || 0
      );

      const dateB = new Date(
        b?.created_at || 0
      );

      return dateB.getTime() - dateA.getTime();
    });
  });

  // =========================================================
  // TOGGLE NOTE
  // =========================================================

  const handleToggleNote = (noteId) => {
    setOpenNote((current) =>
      current === noteId ? null : noteId
    );
  };

  // =========================================================
  // RELATED OBJECT
  // =========================================================

  const getRelatedObject = (note) => {
    const currentModule = String(module || "")
      .toLowerCase()
      .trim();

    return note?.[currentModule] || null;
  };

  // =========================================================
  // RELATED OBJECT NAME
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
          GROUPED NOTES
      ===================================================== */}

      {!loading &&
        Object.entries(groupedNotes).map(
          ([month, monthNotes]) => (
            <Box key={month}>
              {/* =================================================
                  MONTH TITLE
              ================================================= */}

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
                  NOTES
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
                    {/* =================================================
                        NOTE HEADER
                    ================================================= */}

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

                      {/* =================================================
                          CONTENT + DATE
                      ================================================= */}

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
                        {/* =================================================
                            COLLAPSED CONTENT
                        ================================================= */}

                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          {!isOpen && (
                            <Box
                              sx={{
                                color:
                                  "text.primary",
                                fontSize: 14,
                                lineHeight: 1.5,
                                overflow: "hidden",
                                wordBreak:
                                  "break-word",

                                // -----------------------------
                                // PARAGRAPH
                                // -----------------------------

                                "& p": {
                                  margin: 0,
                                },

                                // -----------------------------
                                // BOLD
                                // -----------------------------

                                "& strong": {
                                  fontWeight: 700,
                                  color:
                                    "text.primary",
                                },

                                "& b": {
                                  fontWeight: 700,
                                  color:
                                    "text.primary",
                                },

                                // -----------------------------
                                // ITALIC
                                // -----------------------------

                                "& em": {
                                  fontStyle:
                                    "italic",
                                },

                                "& i": {
                                  fontStyle:
                                    "italic",
                                },

                                // -----------------------------
                                // UNDERLINE
                                // -----------------------------

                                "& u": {
                                  textDecoration:
                                    "underline",
                                },

                                // -----------------------------
                                // STRIKETHROUGH
                                // -----------------------------

                                "& s": {
                                  textDecoration:
                                    "line-through",
                                },

                                "& strike": {
                                  textDecoration:
                                    "line-through",
                                },

                                // -----------------------------
                                // BULLET LIST
                                // -----------------------------

                                "& ul": {
                                  margin: 0,
                                  paddingLeft:
                                    "20px",
                                  display:
                                    "block",
                                  listStyleType:
                                    "disc",
                                },

                                // -----------------------------
                                // ORDERED LIST
                                // -----------------------------

                                "& ol": {
                                  margin: 0,
                                  paddingLeft:
                                    "20px",
                                  display:
                                    "block",
                                  listStyleType:
                                    "decimal",
                                },

                                // -----------------------------
                                // LIST ITEM
                                // -----------------------------

                                "& li": {
                                  margin: 0,
                                  display:
                                    "list-item",
                                },

                                // -----------------------------
                                // QUILL BULLET
                                // -----------------------------

                                "& li[data-list='bullet']": {
                                  listStyleType:
                                    "none",
                                  position:
                                    "relative",
                                  paddingLeft:
                                    "20px",
                                  display:
                                    "list-item",
                                },

                                "& li[data-list='bullet']::before": {
                                  content:
                                    '"\\2022"',
                                  position:
                                    "absolute",
                                  left: 0,
                                  top: 0,
                                  color:
                                    "text.primary",
                                  fontSize:
                                    "14px",
                                  lineHeight:
                                    1.5,
                                },

                                // -----------------------------
                                // QUILL ORDERED
                                // -----------------------------

                                "& li[data-list='ordered']": {
                                  listStyleType:
                                    "decimal",
                                  display:
                                    "list-item",
                                },

                                // -----------------------------
                                // MARKER
                                // -----------------------------

                                "& li::marker": {
                                  color:
                                    "text.primary",
                                },

                                // -----------------------------
                                // HEADINGS
                                // -----------------------------

                                "& h1, & h2, & h3, & h4, & h5, & h6":
                                  {
                                    margin: 0,
                                  },

                                // -----------------------------
                                // BLOCKQUOTE
                                // -----------------------------

                                "& blockquote": {
                                  margin: 0,
                                },

                                // -----------------------------
                                // LINKS
                                // -----------------------------

                                "& a": {
                                  color:
                                    "inherit",
                                  textDecoration:
                                    "underline",
                                },

                                // -----------------------------
                                // IMAGE
                                // -----------------------------

                                "& img": {
                                  maxWidth:
                                    "100%",
                                  height: "auto",
                                },
                              }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  note?.note || "",
                              }}
                            />
                          )}
                        </Box>

                        {/* =================================================
                            DATE
                        ================================================= */}

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

                    {/* =====================================================
                        EXPANDED CONTENT
                    ===================================================== */}

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
                            color:
                              "text.primary",
                            fontSize: 14,
                            lineHeight: 1.7,
                            wordBreak:
                              "break-word",

                            // -----------------------------
                            // PARAGRAPH
                            // -----------------------------

                            "& p": {
                              marginTop: 0,
                              marginBottom: 1,
                            },

                            // -----------------------------
                            // BOLD
                            // -----------------------------

                            "& strong": {
                              fontWeight: 700,
                              color:
                                "text.primary",
                            },

                            "& b": {
                              fontWeight: 700,
                              color:
                                "text.primary",
                            },

                            // -----------------------------
                            // ITALIC
                            // -----------------------------

                            "& em": {
                              fontStyle:
                                "italic",
                            },

                            "& i": {
                              fontStyle:
                                "italic",
                            },

                            // -----------------------------
                            // UNDERLINE
                            // -----------------------------

                            "& u": {
                              textDecoration:
                                "underline",
                            },

                            // -----------------------------
                            // STRIKETHROUGH
                            // -----------------------------

                            "& s": {
                              textDecoration:
                                "line-through",
                            },

                            // -----------------------------
                            // BULLET LIST
                            // -----------------------------

                            "& ul": {
                              paddingLeft:
                                "20px",
                              marginTop: 0,
                              marginBottom: 1,
                              listStyleType:
                                "disc",
                            },

                            // -----------------------------
                            // ORDERED LIST
                            // -----------------------------

                            "& ol": {
                              paddingLeft:
                                "20px",
                              marginTop: 0,
                              marginBottom: 1,
                              listStyleType:
                                "decimal",
                            },

                            // -----------------------------
                            // LIST ITEM
                            // -----------------------------

                            "& li": {
                              marginBottom:
                                0.5,
                            },

                            // -----------------------------
                            // QUILL BULLET
                            // -----------------------------

                            "& li[data-list='bullet']": {
                              listStyleType:
                                "none",
                              position:
                                "relative",
                              paddingLeft:
                                "22px",
                            },

                            "& li[data-list='bullet']::before": {
                              content:
                                '"\\2022"',
                              position:
                                "absolute",
                              left: 0,
                              top: 0,
                              color:
                                "text.primary",
                              fontSize:
                                "14px",
                              lineHeight:
                                1.7,
                            },

                            // -----------------------------
                            // QUILL ORDERED
                            // -----------------------------

                            "& li[data-list='ordered']": {
                              listStyleType:
                                "decimal",
                            },

                            "& li::marker": {
                              color:
                                "text.primary",
                            },

                            // -----------------------------
                            // LINKS
                            // -----------------------------

                            "& a": {
                              color:
                                "primary.main",
                              textDecoration:
                                "underline",
                            },

                            // -----------------------------
                            // IMAGE
                            // -----------------------------

                            "& img": {
                              maxWidth:
                                "100%",
                              height: "auto",
                            },

                            // -----------------------------
                            // BLOCKQUOTE
                            // -----------------------------

                            "& blockquote": {
                              margin: 1,
                              paddingLeft: 2,
                              borderLeft:
                                "3px solid",
                              borderColor:
                                "divider",
                            },

                            // -----------------------------
                            // HEADINGS
                            // -----------------------------

                            "& h1": {
                              fontSize:
                                "24px",
                            },

                            "& h2": {
                              fontSize:
                                "20px",
                            },

                            "& h3": {
                              fontSize:
                                "18px",
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
