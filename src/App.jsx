import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Notetab from "./Pages/Leads/components/Tabs/Notetab";
import CommonEntityHeader from "./Components/common/CommonEntityHeader";

import AppRoutes from "./routes/AppRoutes";

// import theme from "./theme";
// import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/emailrecord" element={<EmailRecord />} />
          <Route path="/create-ticket" element={<CreateTicketDrawer />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/ticket-profile" element={<TicketProfile />} />
          <Route path="/ticketslist" element={<TicketsList />} />
          <Route path="/leadslist" element={<Leadslist />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/companieslist" element={<CompaniesList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dealslist" element={<DealsList />} />
          <Route path="/notetab" element={<Notetab/>}/>

          <Route path="/entity" element={<CommonEntityHeader/>}/>
        </Routes>
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </LocalizationProvider>
  );
}

export default App;




