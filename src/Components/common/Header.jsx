
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Paper,
  InputBase,
  Divider,
  Menu,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Popover } from "@mui/material";
import CommonButton from "./CommonButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Avatar Menu State
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  
  handleClose();
  navigate("/");
  };

  const open = Boolean(anchorEl);

  const iconButtonStyle = {
    width: 42,
    height: 42,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1,
    bgcolor: "background.paper",
    color: "text.secondary",
    transition: "0.3s",

    "&:hover": {
      bgcolor: "primary.main",
      color: "#fff",
      borderColor: "primary.main",
    },
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            height: 70,
            display: "flex",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            CRM
          </Typography>

          {/* Right Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Search Bar */}
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                width: 320,
                height: 46,
                px: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <SearchIcon color="action" />

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  mx: 1.5,
                  my: 1.2,
                }}
              />

              <InputBase
                placeholder="Search"
                sx={{
                  flex: 1,
                }}
              />
            </Paper>

            {/* Chat */}
            <IconButton sx={iconButtonStyle}>
              <ChatOutlinedIcon />
            </IconButton>

            {/* Notification */}
            <IconButton sx={iconButtonStyle}>
              <NotificationsNoneIcon />
            </IconButton>

            {/* Avatar */}
            <Avatar
              onClick={handleAvatarClick}
              sx={{
                width: 38,
                height: 38,
                bgcolor: "primary.main",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              A
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Popup */}
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            width: 250, // Increase width
            minHeight: 140, // Increase height
            // mt: 1.5,
            p: 2.5, // More padding
            borderRadius: 1,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Aron Paul
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              mb: 2,
            }}
          >
            aronpaul@kiebot.com
          </Typography>

          <CommonButton
            fullWidth
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              borderRadius: 1,
              py: 1,
              fontWeight: 500,
            }}
          >
            Log Out
          </CommonButton>
        </Box>
      </Popover>
    </>
  );
};

export default Header;
