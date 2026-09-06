


import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import api from "../../../../../services/api";


export default function NewEmailDialog({
  open,
  onClose,
  relatedModule = "lead",
  objectId,
  onEmailCreated,
}) {

  const theme = useTheme();


  // =====================================================
  // STATES
  // =====================================================

  const [email, setEmail] = useState("");

  const [recipientLoading, setRecipientLoading] =
    useState(false);

  const [subject, setSubject] = useState("");

  const [body, setBody] = useState("");

  const [sending, setSending] = useState(false);


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });


  // =====================================================
  // GET SENDER ID FROM JWT
  // =====================================================

  const getSenderId = () => {

    const accessToken =
      localStorage.getItem("access");

    if (!accessToken) {
      return null;
    }

    try {

      const tokenParts =
        accessToken.split(".");

      if (tokenParts.length !== 3) {
        return null;
      }

      const base64Url =
        tokenParts[1];

      const base64 =
        base64Url
          .replace(/-/g, "+")
          .replace(/_/g, "/");

      const payload =
        JSON.parse(atob(base64));

      console.log(
        "JWT payload:",
        payload
      );

      return (
        payload.user_id ||
        payload.id ||
        null
      );

    } catch (error) {

      console.error(
        "Unable to read user ID from token:",
        error
      );

      return null;
    }
  };


  // =====================================================
  // LOAD AUTOMATIC RECIPIENT EMAIL
  // =====================================================

  useEffect(() => {

    const fetchRecipient = async () => {

      // -----------------------------------------------
      // Dialog must be open
      // -----------------------------------------------

      if (!open) {
        return;
      }


      // -----------------------------------------------
      // Module and object ID required
      // -----------------------------------------------

      if (!relatedModule || !objectId) {

        setEmail("");

        return;
      }


      try {

        setRecipientLoading(true);

        // ---------------------------------------------
        // GET RECIPIENT
        // ---------------------------------------------

        const response = await api.get(
          `/activities/email/recipient/${relatedModule
            .toLowerCase()
            .trim()}/${objectId}/`
        );


        console.log(
          "RECIPIENT RESPONSE:",
          response.data
        );


        // ---------------------------------------------
        // SET EMAIL
        // ---------------------------------------------

        setEmail(
          response.data?.email || ""
        );


      } catch (error) {

        console.error(
          "Failed to load recipient:",
          error.response?.data || error
        );


        setEmail("");


        setSnackbar({
          open: true,

          message:
            error.response?.data?.error ||
            "Could not load recipient email.",

          severity: "error",
        });


      } finally {

        setRecipientLoading(false);

      }
    };


    fetchRecipient();


  }, [
    open,
    relatedModule,
    objectId,
  ]);


  // =====================================================
  // SEND EMAIL
  // =====================================================

  const handleSend = async () => {


    // -----------------------------------------------
    // Prevent sending while recipient is loading
    // -----------------------------------------------

    if (recipientLoading) {

      setSnackbar({
        open: true,
        message: "Recipient information is loading.",
        severity: "error",
      });

      return;
    }


    // -----------------------------------------------
    // Validate recipient email
    // -----------------------------------------------

    if (!email) {

      setSnackbar({
        open: true,
        message: "Recipient email could not be found.",
        severity: "error",
      });

      return;
    }


    // -----------------------------------------------
    // Validate subject
    // -----------------------------------------------

    if (!subject.trim()) {

      setSnackbar({
        open: true,
        message: "Please enter a subject.",
        severity: "error",
      });

      return;
    }


    // -----------------------------------------------
    // Validate body
    // -----------------------------------------------

    if (!body.trim()) {

      setSnackbar({
        open: true,
        message: "Please enter email body.",
        severity: "error",
      });

      return;
    }


    // -----------------------------------------------
    // Validate module
    // -----------------------------------------------

    if (!relatedModule) {

      setSnackbar({
        open: true,
        message: "Related module is missing.",
        severity: "error",
      });

      return;
    }


    // -----------------------------------------------
    // Validate object ID
    // -----------------------------------------------

    if (!objectId) {

      console.error(
        "objectId is missing"
      );

      setSnackbar({
        open: true,
        message: "Recipient record is missing.",
        severity: "error",
      });

      return;
    }


    // -----------------------------------------------
    // GET SENDER ID
    // -----------------------------------------------

    const senderId =
      getSenderId();


    if (!senderId) {

      setSnackbar({
        open: true,
        message:
          "Logged-in user information not found.",
        severity: "error",
      });

      return;
    }


    // -----------------------------------------------
    // PREPARE DATA
    // -----------------------------------------------

    const data = {

      sender_id: senderId,

      module: relatedModule
        .toLowerCase()
        .trim(),

      recipient_id: objectId,

      subject: subject.trim(),

      body: body.trim(),

      cc: [],

      bcc: [],
    };


    console.log(
      "EMAIL POST DATA:",
      data
    );


    try {

      setSending(true);


      // ---------------------------------------------
      // SEND EMAIL
      // ---------------------------------------------

      const response =
        await api.post(
          "/activities/email/",
          data
        );


      console.log(
        "EMAIL CREATED:",
        response.data
      );


      // ---------------------------------------------
      // SUCCESS MESSAGE
      // ---------------------------------------------

      setSnackbar({
        open: true,
        message: "Email sent successfully.",
        severity: "success",
      });


      // ---------------------------------------------
      // CLEAR FORM
      // ---------------------------------------------

      setSubject("");

      setBody("");


      // ---------------------------------------------
      // REFRESH EMAIL LIST
      // ---------------------------------------------

      if (onEmailCreated) {

        await onEmailCreated(
          response.data
        );

      }


      // ---------------------------------------------
      // CLOSE DIALOG
      // ---------------------------------------------

      onClose();


    } catch (error) {

      console.error(
        "Error sending email:",
        error
      );


      console.error(
        "Backend response:",
        error?.response?.data
      );


      const message =

        error?.response?.data?.error ||

        error?.response?.data?.detail ||

        "Failed to send email.";


      setSnackbar({
        open: true,
        message,
        severity: "error",
      });


    } finally {

      setSending(false);

    }
  };


  // =====================================================
  // CLEAR EMAIL FORM
  // =====================================================

  const handleDelete = () => {

    // Recipient should NOT be cleared because
    // it belongs to the current CRM record

    setSubject("");

    setBody("");

  };


  // =====================================================
  // CLOSE SNACKBAR
  // =====================================================

  const handleSnackbarClose = () => {

    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <>

      <Dialog
        open={open}
        onClose={
          sending
            ? undefined
            : onClose
        }
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            bgcolor:
              theme.palette.background.paper,
          },
        }}
      >


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <Box
          sx={{
            height: 48,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor:
              theme.palette.primary.main,
            color: "#fff",
          }}
        >

          <Typography
            fontWeight={500}
            fontSize={15}
          >
            New Email
          </Typography>


          <IconButton
            size="small"
            onClick={onClose}
            disabled={sending}
            sx={{
              color: "#fff",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

        </Box>


        <DialogContent sx={{ p: 0 }}>


          {/* ================================================= */}
          {/* RECIPIENT */}
          {/* ================================================= */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              height: 48,
            }}
          >

            <TextField
              variant="standard"
              fullWidth
              value={email}

              placeholder={
                recipientLoading
                  ? "Loading recipient..."
                  : "Recipients"
              }

              slotProps={{
                input: {
                  disableUnderline: true,
                  readOnly: true,
                },
              }}

              sx={{
                "& input": {
                  fontSize: 14,
                },
              }}
            />


            <Typography
              sx={{
                ml: 2,
                color:
                  theme.palette.text.secondary,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Cc&nbsp;&nbsp;Bcc
            </Typography>

          </Box>


          {/* ================================================= */}
          {/* SUBJECT */}
          {/* ================================================= */}

          <Box
            sx={{
              px: 2,
              height: 48,
              display: "flex",
              alignItems: "center",
            }}
          >

            <TextField
              variant="standard"
              fullWidth

              value={subject}

              onChange={(e) =>
                setSubject(e.target.value)
              }

              placeholder="Subject"

              slotProps={{
                input: {
                  disableUnderline: true,
                },
              }}
            />

          </Box>


          {/* ================================================= */}
          {/* BODY */}
          {/* ================================================= */}

          <TextField
            multiline
            minRows={16}
            variant="standard"
            fullWidth

            value={body}

            onChange={(e) =>
              setBody(e.target.value)
            }

            placeholder="Body Text"

            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}

            sx={{
              px: 2,
              pt: 2,

              "& textarea": {
                fontSize: 14,
                color:
                  theme.palette.text.primary,
              },
            }}
          />


          {/* ================================================= */}
          {/* BOTTOM TOOLBAR */}
          {/* ================================================= */}

          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
            }}
          >


            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >


              {/* SEND */}

              <Button
                variant="contained"

                disabled={
                  sending ||
                  recipientLoading
                }

                onClick={handleSend}

                sx={{
                  minWidth: 90,
                  borderRadius:
                    "6px 0 0 6px",
                  textTransform: "none",
                  boxShadow: "none",
                  bgcolor:
                    theme.palette.primary.main,

                  "&:hover": {
                    bgcolor:
                      theme.palette.primary.dark,
                    boxShadow: "none",
                  },
                }}
              >
                {sending
                  ? "Sending..."
                  : recipientLoading
                  ? "Loading..."
                  : "Send"}
              </Button>


              {/* SEND DROPDOWN */}

              <Button
                variant="contained"
                disabled={
                  sending ||
                  recipientLoading
                }

                sx={{
                  minWidth: 40,
                  borderRadius:
                    "0 6px 6px 0",
                  ml: 0,
                  bgcolor:
                    theme.palette.primary.main,
                  boxShadow: "none",

                  "&:hover": {
                    bgcolor:
                      theme.palette.primary.dark,
                    boxShadow: "none",
                  },
                }}
              >
                <KeyboardArrowDownIcon
                  fontSize="small"
                />
              </Button>


              {/* FORMAT */}

              <IconButton>
                <FormatColorTextOutlinedIcon />
              </IconButton>


              {/* ATTACHMENT */}

              <IconButton>
                <AttachFileOutlinedIcon />
              </IconButton>


              {/* LINK */}

              <IconButton>
                <LinkOutlinedIcon />
              </IconButton>


              {/* EMOJI */}

              <IconButton>
                <InsertEmoticonOutlinedIcon />
              </IconButton>


              {/* IMAGE */}

              <IconButton>
                <ImageOutlinedIcon />
              </IconButton>

            </Box>


            {/* DELETE */}

            <IconButton
              onClick={handleDelete}
              disabled={sending}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>

          </Box>

        </DialogContent>

      </Dialog>


      {/* ================================================= */}
      {/* SNACKBAR */}
      {/* ================================================= */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}

        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >

        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"

          sx={{
            width: "100%",
          }}
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </>
  );
}