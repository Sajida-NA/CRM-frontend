import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CommonEntityHeader from "./Components/common/CommonEntityHeader";

import AppRoutes from "./routes/AppRoutes";

// import theme from "./theme";
// import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </LocalizationProvider>
  );
}

export default App;




