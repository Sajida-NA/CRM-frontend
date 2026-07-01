import { Box, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    active: false,
  },
  {
    title: "Leads",
    icon: <PersonOutlineOutlinedIcon />,
    active: false,
  },
  {
    title: "Companies",
    icon: <BusinessIcon />,
    active: false,
  },
  {
    title: "Deals",
    icon: <HandshakeOutlinedIcon />,
    active: false,
  },
  {
    title: "Tickets",
    icon: <ConfirmationNumberOutlinedIcon />,
    active: false,
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              bgcolor: item.active ? "#6C63FF" : "#fff",

              color: item.active ? "#fff" : "#7B7B7B",

              border: item.active ? "none" : "2px solid #E4E4E4",

              transition: ".3s",

              "&:hover": {
                bgcolor: "#6C63FF",
                color: "#fff",
                border: "none",
              },
            }}
          >
            {item.icon}
          </Box>

          <Typography
            sx={{
              mt: 1,
              fontSize: 12,
              fontWeight: 600,
              textAlign: "center",
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
