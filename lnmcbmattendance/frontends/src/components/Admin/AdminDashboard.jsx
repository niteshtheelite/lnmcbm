import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AddStudent from "../Admin/AddStudent";
import ListStudent from "../Admin/ListStudent";
import AddCourse from "../Admin/AddCourse";
import ListCourse from "../Admin/ListCourse";
import AttendanceReport from "../Admin/AttendanceReport";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar Fixed */}
      <AdminSidebar />

      {/* ✅ Main Content */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/list-student" element={<ListStudent />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/list-course" element={<ListCourse />} />
          <Route path="/attendance-report" element={<AttendanceReport />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
