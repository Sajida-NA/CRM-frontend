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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#000",
        borderBottom: "1px solid #E5E7EB",
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
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              bgcolor: "#fff",
            }}
          >
            <SearchIcon
              sx={{
                color: "#9CA3AF",
                fontSize: 20,
              }}
            />

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1.5,
                my: 1.2,
                borderColor: "#E5E7EB",
              }}
            />

            <InputBase
              placeholder="Search"
              sx={{
                flex: 1,
                fontSize: 15,
                color: "#374151",

                "& input::placeholder": {
                  color: "#9CA3AF",
                  opacity: 1,
                },
              }}
            />
          </Paper>

          {/* Chat */}
          <IconButton
            sx={{
              width: 42,
              height: 42,
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              bgcolor: "#fff",
              color: "#6B7280",

              "&:hover": {
                bgcolor: "#F8F9FC",
              },
            }}
          >
            <ChatOutlinedIcon />
          </IconButton>

          {/* Notification */}
          <IconButton
            sx={{
              width: 42,
              height: 42,
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              bgcolor: "#fff",
              color: "#6B7280",

              "&:hover": {
                bgcolor: "#F8F9FC",
              },
            }}
          >
            <NotificationsNoneIcon />
          </IconButton>

          {/* Profile */}
          <Box
            sx={{
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#fff",

            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                fontSize: 14,
              }}
            >
              A
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
