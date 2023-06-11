import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Client from "./pages/Client";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Admin from "./pages/admin";
import { ToastContainer } from "react-toastify";
import { ClientProvider } from "./contexts/client";
import { AdminProvider } from "./contexts/admin";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <ClientProvider>
      <AdminProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Error />} />
              <Route path="client" element={<Client />} />
              <Route path="admin" element={<Admin />} />
              {/* <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route> */}
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </LocalizationProvider>
      </AdminProvider>
    </ClientProvider>
  );
}

export default App;
