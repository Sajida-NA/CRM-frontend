import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import LeadsPage from "./Pages/Leads/LeadsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<LeadsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;