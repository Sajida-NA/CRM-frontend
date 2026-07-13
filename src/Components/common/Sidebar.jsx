import { Box, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    path: "/dashboard",
  },
  {
    title: "Leads",
    icon: <PersonOutlineOutlinedIcon />,
    path: "/leadslist",
  },
  {
    title: "Companies",
    icon: <BusinessIcon />,
    path: "/companieslist",
  },
  {
    title: "Deals",
    icon: <HandshakeOutlinedIcon />,
    path: "/dealslist",
  },
  {
    title: "Tickets",
    icon: <ConfirmationNumberOutlinedIcon />,
    path: "/ticketslist",
  },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 100,
        minHeight: "calc(100vh - 70px)",
        bgcolor: "#fff",
        borderRight: "1px solid #ECECEC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 3,
      }}
    >
      {menuItems.map((item) => (
        <Box
          key={item.title}
          component={NavLink}
          to={item.path}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            cursor: "pointer",
            textDecoration: "none",

            "&.active .menu-icon": {
              bgcolor: "primary.main",
              color: "#fff",
              border: "none",
            },

            "&.active .menu-text": {
              color: "primary.main",
              fontWeight: 700,
            },
          }}
        >
          <Box
            className="menu-icon"
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#fff",
              color: "#7B7B7B",
              border: "2px solid #E4E4E4",
              transition: ".3s",

              "&:hover": {
                bgcolor: "primary.main",
                color: "#fff",
                border: "none",
              },
            }}
          >
            {item.icon}
          </Box>

          <Typography
            className="menu-text"
            sx={{
              mt: 1,
              fontSize: 12,
              fontWeight: 600,
              color: "#1F2937",
            }}
          >
            {item.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
