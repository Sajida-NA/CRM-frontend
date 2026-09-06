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
  CircularProgress,
  ClickAwayListener,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Badge,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CommonButton from "./CommonButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import api from "../../services/api";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    leads: [],
    companies: [],
    deals: [],
    products: [],
  });
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Avatar Menu State
  const [anchorEl, setAnchorEl] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

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

  useEffect(() => {
    const searchGlobal = async () => {
      if (!searchQuery.trim()) {
        setSearchResults({
          leads: [],
          companies: [],
          deals: [],
          products: [],
        });
        setSearchOpen(false);
        return;
      }

      try {
        setSearchLoading(true);
        setSearchOpen(true);

        const response = await api.get(
          `/search/?q=${encodeURIComponent(searchQuery)}`,
        );

        setSearchResults(response.data);
      } catch (error) {
        console.error("Global search failed:", error);

        setSearchResults({
          leads: [],
          companies: [],
          deals: [],
          products: [],
        });
      } finally {
        setSearchLoading(false);
      }
    };

    const timer = setTimeout(searchGlobal, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchResultClick = (type, id) => {
    setSearchQuery("");
    setSearchOpen(false);

    if (type === "lead") {
      navigate("/leadslist");
    }

    if (type === "company") {
      navigate("/companieslist");
    }

    if (type === "deal") {
      navigate("/dealslist");
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications/");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const notificationOpen = Boolean(notificationAnchor);

  const handleNotificationRead = async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read/`);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
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
            {/* Search Bar
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
            </Paper> */}

            {/* Global Search */}
            <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
              <Box
                sx={{
                  position: "relative",
                  width: 320,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchQuery.trim()) {
                        setSearchOpen(true);
                      }
                    }}
                    sx={{
                      flex: 1,
                    }}
                  />

                  {searchLoading && <CircularProgress size={18} />}
                </Paper>

                {/* Search Results */}
                {searchOpen && searchQuery.trim() && (
                  <Paper
                    elevation={4}
                    sx={{
                      position: "absolute",
                      top: 52,
                      left: 0,
                      width: "100%",
                      maxHeight: 420,
                      overflowY: "auto",
                      zIndex: 1300,
                    }}
                  >
                    {/* Leads */}
                    {searchResults.leads.length > 0 && (
                      <>
                        <Typography
                          sx={{
                            px: 2,
                            pt: 1.5,
                            pb: 0.5,
                            fontSize: 12,
                            fontWeight: 700,
                            color: "text.secondary",
                            textTransform: "uppercase",
                          }}
                        >
                          Leads
                        </Typography>

                        <List disablePadding>
                          {searchResults.leads.map((lead) => (
                            <ListItem key={`lead-${lead.id}`} disablePadding>
                              <ListItemButton
                                onClick={() =>
                                  handleSearchResultClick("lead", lead.id)
                                }
                              >
                                <ListItemText
                                  primary={lead.name}
                                  secondary={lead.email}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {/* Companies */}
                    {searchResults.companies.length > 0 && (
                      <>
                        <Typography
                          sx={{
                            px: 2,
                            pt: 1.5,
                            pb: 0.5,
                            fontSize: 12,
                            fontWeight: 700,
                            color: "text.secondary",
                            textTransform: "uppercase",
                          }}
                        >
                          Companies
                        </Typography>

                        <List disablePadding>
                          {searchResults.companies.map((company) => (
                            <ListItem
                              key={`company-${company.id}`}
                              disablePadding
                            >
                              <ListItemButton
                                onClick={() =>
                                  handleSearchResultClick("company", company.id)
                                }
                              >
                                <ListItemText
                                  primary={company.name}
                                  secondary={company.email}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {/* Deals */}
                    {searchResults.deals.length > 0 && (
                      <>
                        <Typography
                          sx={{
                            px: 2,
                            pt: 1.5,
                            pb: 0.5,
                            fontSize: 12,
                            fontWeight: 700,
                            color: "text.secondary",
                            textTransform: "uppercase",
                          }}
                        >
                          Deals
                        </Typography>

                        <List disablePadding>
                          {searchResults.deals.map((deal) => (
                            <ListItem key={`deal-${deal.id}`} disablePadding>
                              <ListItemButton
                                onClick={() =>
                                  handleSearchResultClick("deal", deal.id)
                                }
                              >
                                <ListItemText
                                  primary={deal.name}
                                  secondary={deal.stage}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {/* Products */}
                    {searchResults.products.length > 0 && (
                      <>
                        <Typography
                          sx={{
                            px: 2,
                            pt: 1.5,
                            pb: 0.5,
                            fontSize: 12,
                            fontWeight: 700,
                            color: "text.secondary",
                            textTransform: "uppercase",
                          }}
                        >
                          Products
                        </Typography>

                        <List disablePadding>
                          {searchResults.products.map((product) => (
                            <ListItem
                              key={`product-${product.id}`}
                              disablePadding
                            >
                              <ListItemText
                                primary={product.name}
                                secondary={product.description}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}

                    {/* No results */}
                    {!searchLoading &&
                      searchResults.leads.length === 0 &&
                      searchResults.companies.length === 0 &&
                      searchResults.deals.length === 0 &&
                      searchResults.products.length === 0 && (
                        <Box
                          sx={{
                            p: 3,
                            textAlign: "center",
                          }}
                        >
                          <Typography color="text.secondary">
                            No results found
                          </Typography>
                        </Box>
                      )}
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>

            {/* Chat */}
            <IconButton sx={iconButtonStyle}>
              <ChatOutlinedIcon />
            </IconButton>

            {/* Notification */}
            <IconButton sx={iconButtonStyle} onClick={handleNotificationClick}>
              <Badge
                badgeContent={
                  notifications.filter((notification) => !notification.is_read)
                    .length
                }
                color="error"
              >
                <NotificationsNoneIcon />
              </Badge>
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
              {user?.email?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/*   Notification popup*/}
      <Popover
        anchorEl={notificationAnchor}
        open={notificationOpen}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            width: 360,
            maxHeight: 420,
            overflowY: "auto",
          }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Notifications
            </Typography>
          </Box>

          {notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">No notifications</Typography>
            </Box>
          ) : (
            <List disablePadding>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  onClick={() => handleNotificationRead(notification.id)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: notification.is_read
                      ? "transparent"
                      : "#f5f3ff",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: notification.is_read ? 500 : 700,
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.created_at).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Popover>

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
            {user?.email?.split("@")[0]}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              mb: 2,
            }}
          >
            {user?.email}
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
