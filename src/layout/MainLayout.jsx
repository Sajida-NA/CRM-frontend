import { Box } from "@mui/material";
import Header from "../Components/common/Header";
import Sidebar from "../Components/common/Sidebar";

function MainLayout({ children, title }) {
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
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
