import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/login";
import Dashboard from "./Pages/dashboard";
import CompanyDetails from "./Pages/CompanyDetails";
// import LeadsPage from "./Pages/Leads/LeadsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
        {/* <Route path="/leads" element={<LeadsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;