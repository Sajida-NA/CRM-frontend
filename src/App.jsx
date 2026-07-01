import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Pages/login";

import CreateTicket from "./Pages/CreateTicket";





function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
      
        <Route path="/CreateTicket" element={<CreateTicket/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );

}
export default App;
