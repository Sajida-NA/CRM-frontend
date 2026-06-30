import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leadslist from "./Pages/List/Leadslist";
import Login from "./Pages/login";
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