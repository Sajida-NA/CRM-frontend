import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leadslist from "./Pages/Leads/Leadslist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/leads" element={<Leadslist />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;