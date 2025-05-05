import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../pages/AdminDashboard";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { MapView } from "../pages/MapView";
import { MyReport } from "../pages/MyReports";
import { Register } from "../pages/Register";
import { ReportForm } from "../pages/ReportForm";

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/my-report" element={<MyReport />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ReportForm />} />
      </Routes>
    </div>
  );
}
 