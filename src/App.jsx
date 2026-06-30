// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// // import Sidebar from "./Components/Layout/Sidebar";
// // import Topbar from "./Components/Layout/Topbar";
// import LeadsPage from "./Pages/LeadsPage";
// import Login from "./Pages/login";

// function AppContent() {
//   const location = useLocation();

//   // const hideSidebar = location.pathname === "/";

//   return (
//     // <div style={{ display: "flex" }}>
//     //   {!hideSidebar && <Sidebar />}

//     //   <div style={{ flex: 1, background: "#F8F8F8", minHeight: "100vh" }}>
//     //     {!hideSidebar && <Topbar />}

//         <div style={{ padding: "24px" }}>
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/leads" element={<LeadsPage />} />
//           </Routes>
//         </div>
//       // </div>
//     // </div>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }



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
