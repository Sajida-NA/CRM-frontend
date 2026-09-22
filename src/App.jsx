import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastProvider } from "./Components/common/Toast";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      </ToastProvider>
    </LocalizationProvider>
  );
}

export default App;
