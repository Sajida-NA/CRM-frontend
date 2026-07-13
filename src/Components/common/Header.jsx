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
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Header = () => {
  const theme = useTheme();
 
   const iconButtonStyle = {
    width: 42,
    height: 42,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1,
    bgcolor: "background.paper",
    color: "text.secondary",
    transition: "all .3s",

    "&:hover": {
      bgcolor: "primary.main",
      color: "#fff",
      borderColor: "primary.main",
    },
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor:"background.paper",
        color:  "text.primary",
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
              boxShadow: "none",

              "&:hover": {
                borderColor: "primary.light",
              },
            }}
          >
            <SearchIcon
              sx={{
                color:  "text.secondary",
                fontSize: 20,
              }}
            />

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1.5,
                my: 1.2,
                borderColor: "divider",
              }}
            />

            <InputBase
              placeholder="Search"
              sx={{
                flex: 1,
                typography:"body1",
                color: "text.primary",

                "& input::placeholder": {
                  color: " theme.palette.text.secondary",
                  opacity: 1,
                },
              }}
            />
          </Paper>

          {/* Chat */}
          <IconButton
           sx={iconButtonStyle}
          >
            <ChatOutlinedIcon />
          </IconButton>

          {/* Notification */}
          <IconButton
           sx={iconButtonStyle}
          >
            <NotificationsNoneIcon />
          </IconButton>

           {/* Profile */}
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
