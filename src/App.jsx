import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
// import LeadsPage from "./Pages/Leads/LeadsPage";
import Dashboard from "./Pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/leads" element={<LeadsPage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;