
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

import {
  getAllNotes,
} from "../../../../../services/activityApi";

export default function NoteDetails({
  tabs,
  module,
  moduleId,
}) {
  const [activeTab, setActiveTab] = useState("Notes");

  const [openCreateNote, setOpenCreateNote] =
    useState(false);

  const [openNote, setOpenNote] = useState(null);

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  // =================================================
  // FETCH NOTES
  // =================================================

  const fetchNotes = async () => {
    if (!module || !moduleId) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // GET /api/activities/note/
      const data = await getAllNotes();

      const allNotes = Array.isArray(data)
        ? data
        : data?.results || [];

      // =================================================
      // FILTER CURRENT MODULE + MODULE ID
      // =================================================

      const filteredNotes = allNotes.filter(
        (note) => {
          if (
            note?.module?.toLowerCase() !==
            module?.toLowerCase()
          ) {
            return false;
          }

          const relatedObject =
            note?.[module?.toLowerCase()];

          if (!relatedObject) {
            return false;
          }

          return (
            Number(relatedObject.id) ===
            Number(moduleId)
          );
        }
      );

      setNotes(filteredNotes);

    } catch (error) {
      console.error(
        "Failed to fetch notes:",
        error
      );

      setNotes([]);

    } finally {
      setLoading(false);
    }
  };

  // =================================================
  // LOAD NOTES
  // =================================================

  useEffect(() => {
    fetchNotes();
  }, [module, moduleId]);

  // =================================================
  // NOTE CREATED
  // =================================================

  const handleNoteCreated = () => {
    setOpenCreateNote(false);
    fetchNotes();
  };

  // =================================================
  // FORMAT DATE + TIME
  // =================================================

  const formatDateTime = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const formattedDate =
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

    const formattedTime =
      date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

    return `${formattedDate} at ${formattedTime}`;
  };

  // =================================================
  // GROUP NOTES BY MONTH
  // =================================================

  const groupedNotes = notes.reduce(
    (groups, note) => {
      const date = note?.created_at
        ? new Date(note.created_at)
        : null;

      const groupName =
        date &&
        !Number.isNaN(date.getTime())
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

  // =================================================
  // TOGGLE NOTE
  // =================================================

  const handleToggleNote = (noteId) => {
    setOpenNote((current) =>
      current === noteId ? null : noteId
    );
  };

  // =================================================
  // UI
  // =================================================

  return (
    <Box
      sx={{
        p: 3,
        mx: -2,
      }}
    >
      {/* ============================================
          ACTIVITY TABS
      ============================================ */}

      <Box>
        <CommonActivityTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Box>

      {/* ============================================
          HEADER
      ============================================ */}

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

      {/* ============================================
          CREATE NOTE DRAWER
      ============================================ */}

      <Createnote
        open={openCreateNote}
        onClose={() =>
          setOpenCreateNote(false)
        }
        module={module}
        moduleId={moduleId}
        onSuccess={handleNoteCreated}
      />

      {/* ============================================
          LOADING
      ============================================ */}

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

      {/* ============================================
          EMPTY
      ============================================ */}

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

      {/* ============================================
          NOTES
      ============================================ */}

      {!loading &&
        Object.entries(groupedNotes).map(
          ([month, monthNotes]) => (
            <Box key={month}>

              {/* ====================================
                  MONTH
              ==================================== */}

              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  mb: 1,
                }}
              >
                {month}
              </Typography>

              {/* ====================================
                  NOTE CARDS
              ==================================== */}

              {monthNotes.map((note) => {
                const isOpen =
                  openNote === note.id;

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

                    {/* =================================
                        NOTE HEADER
                    ================================= */}

                    <Box
                      onClick={() =>
                        handleToggleNote(note.id)
                      }
                      sx={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "flex-start",
                        px: 1,
                        py: 2,
                        cursor: "pointer",
                      }}
                    >

                      {/* LEFT SIDE */}

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                      >

                        {/* ARROW */}

                        <IconButton
                          size="small"
                          sx={{
                            p: 0,
                            mt: 0.2,
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

                        {/* NOTE CONTENT */}

                        <Box>

                          {/* TITLE */}

                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: 14,
                            }}
                          >
                            Note

                            <Typography
                              component="span"
                              sx={{
                                ml: 0.5,
                                color:
                                  "text.secondary",
                                fontWeight: 400,
                              }}
                            >
                              by{" "}
                              {note?.created_by
                                ?.name ||
                                "Unknown user"}
                            </Typography>
                          </Typography>

                          {/* =================================
                              PREVIEW
                          ================================= */}

                          <Box
                            sx={{
                              mt: 0.5,
                              color:
                                "text.secondary",

                              display:
                                "-webkit-box",

                              WebkitLineClamp: 1,

                              WebkitBoxOrient:
                                "vertical",

                              overflow:
                                "hidden",

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
                            }}
                            dangerouslySetInnerHTML={{
                              __html:
                                note?.note || "",
                            }}
                          />

                        </Box>
                      </Stack>

                      {/* RIGHT SIDE */}

                      <Typography
                        sx={{
                          color:
                            "text.secondary",
                          whiteSpace:
                            "nowrap",
                          fontSize: 14,
                        }}
                      >
                        {formatDateTime(
                          note?.created_at
                        )}
                      </Typography>

                    </Box>

                    {/* =================================
                        OPEN NOTE CONTENT
                    ================================= */}

                    {isOpen && (
                      <Box
                        sx={{
                          px: 3,
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

                            "& a": {
                              color:
                                "primary.main",
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