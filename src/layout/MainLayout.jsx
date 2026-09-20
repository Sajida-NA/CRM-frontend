import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "../Components/common/Header";
import Sidebar from "../Components/common/Sidebar";

function MainLayout() {
  return (
    <>
      <Header />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: "#f5f7fb",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
