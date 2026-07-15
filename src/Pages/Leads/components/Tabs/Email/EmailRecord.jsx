import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import MainLayout from "../../../../../layout/MainLayout";
import CommonInput from "../../../../../Components/common/CommonInput";
import CommonEditor from "../../../../../Components/common/CommonEditor";
import CommonButton from "../../../../../Components/common/CommonButton";

export default function EmailRecord() {
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      recipients,
      subject,
      body,
    });

    navigate(-1);
  };

  return (
    <MainLayout>
      <Box
        sx={{
          bgcolor: "#F5F7FB",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 860,
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            p: 4,
            mx: "auto",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Create Email
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <CommonInput
              label="Recipients"
              required
              placeholder="Enter recipients"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
            />

            <CommonInput
              label="Subject"
              required
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <CommonEditor
              label="Body"
              required
              value={body}
              onChange={(value) => setBody(value)}
            />

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <CommonButton
                variant="outlined"
                fullWidth
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </CommonButton>

              <CommonButton type="submit" fullWidth>
                Send
              </CommonButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}