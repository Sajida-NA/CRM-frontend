

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import EmailCard from "./EmailCard";
import CommonButton from "../../../../../Components/common/CommonButton";
import CommonActivityTabs from "../../../../../Components/common/CommonActivityTab";
import NewEmailDialog from "./NewEmailDialog";

import api from "../../../../../services/api";

export default function EmailDetails({
  tabs,
  relatedModule = "deal",
  objectId,
  companyId,
}) {
  const {
    dealId,
    ticketId,
    companyId: routeCompanyId,
  } = useParams();

  const [activeTab, setActiveTab] = useState("Emails");
  const [openCreateEmail, setOpenCreateEmail] = useState(false);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // GET CURRENT RECORD ID
  // ==========================================

  const finalObjectId =
    objectId ||
    companyId ||
    routeCompanyId ||
    ticketId ||
    dealId;

  const currentModule = String(relatedModule)
    .toLowerCase()
    .trim();

  console.log("RELATED MODULE:", currentModule);
  console.log("OBJECT ID:", finalObjectId);

  // ==========================================
  // GET EMAILS
  // ==========================================

  const fetchEmails = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/activities/email/"
      );

      console.log(
        "ALL EMAILS FROM API:",
        response.data
      );

      const allEmails = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      // ========================================
      // FILTER EMAILS FOR CURRENT RECORD
      // ========================================

      const filteredEmails = allEmails.filter(
        (email) => {
          const emailModule = String(
            email?.module || ""
          )
            .toLowerCase()
            .trim();

          const relatedId =
            email?.module_id ??
            email?.object_id ??
            email?.deal?.id ??
            email?.ticket?.id ??
            email?.lead?.id ??
            email?.company?.id;

          console.log("Checking email:", {
            emailId: email?.id,
            emailModule,
            relatedId,
            currentModule,
            finalObjectId,
          });

          return (
            emailModule === currentModule &&
            Number(relatedId) === Number(finalObjectId)
          );
        }
      );

      console.log(
        "Filtered Emails:",
        filteredEmails
      );

      setEmails(filteredEmails);

    } catch (error) {
      console.error(
        "Get Emails Error:",
        error.response?.data || error
      );

      setEmails([]);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD EMAILS
  // ==========================================

  useEffect(() => {
    if (!finalObjectId) {
      setEmails([]);
      return;
    }

    fetchEmails();
  }, [currentModule, finalObjectId]);

  // ==========================================
  // EMAIL CREATED
  // ==========================================

  const handleEmailCreated = async () => {
    setOpenCreateEmail(false);

    await fetchEmails();
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <Box
      sx={{
        p: 3,
        fontFamily: "Roboto, sans-serif",
        mx: -2,
      }}
    >
      {/* ================================= */}
      {/* ACTIVITY TABS */}
      {/* ================================= */}

      <Box>
        <CommonActivityTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Box>

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

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
          Emails
        </Typography>

        <CommonButton
          variant="contained"
          onClick={() =>
            setOpenCreateEmail(true)
          }
        >
          Create Email
        </CommonButton>
      </Box>

      {/* ================================= */}
      {/* NEW EMAIL */}
      {/* ================================= */}

      <NewEmailDialog
        open={openCreateEmail}
        onClose={() =>
          setOpenCreateEmail(false)
        }
        relatedModule={currentModule}
        objectId={finalObjectId}
        onEmailCreated={handleEmailCreated}
      />

      {/* ================================= */}
      {/* EMAIL LIST */}
      {/* ================================= */}

      {loading ? (
        <Typography sx={{ mt: 3 }}>
          Loading emails...
        </Typography>
      ) : emails.length === 0 ? (
        <Typography
          sx={{
            mt: 3,
            color: "text.secondary",
          }}
        >
          No emails found.
        </Typography>
      ) : (
        emails.map((email) => (
          <EmailCard
            key={email.id}
            email={email}
          />
        ))
      )}
    </Box>
  );
}