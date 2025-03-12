import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar";
import AddStudent from "./AddStudent";
import AddCourse from "./AddCourse";
import ListCourse from "./ListCourse";
import Register from "./Register";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("🖥️ AdminDashboard - userInfo:", userInfo);
  }, [userInfo]);

  if (!userInfo || userInfo.role !== "admin") {
    console.log("⛔ Redirecting to /login...");
    return <Navigate to="/login" replace />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* Main Content */}
      <div className="flex-1 p-4 pt-16 md:pt-4">
        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/list-course" element={<ListCourse />} />
          {/* <Route
            path="/admin/dashboard/attendance-report"
            element={<ListCourse />}
          /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
