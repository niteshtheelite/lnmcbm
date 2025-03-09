import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
        Admin Panel
      </h2>

      <nav className="mt-4 space-y-2">
        <Link
          to="/admin/dashboard/add-student"
          className="block p-2 hover:bg-gray-700"
        >
          ✅ Add Student
        </Link>
        <Link
          to="/admin/dashboard/list-student"
          className="block p-2 hover:bg-gray-700"
        >
          📋 List Student
        </Link>
        <Link
          to="/admin/dashboard/add-course"
          className="block p-2 hover:bg-gray-700"
        >
          ✅ Add Course
        </Link>
        <Link
          to="/admin/dashboard/list-course"
          className="block p-2 hover:bg-gray-700"
        >
          📋 List Course
        </Link>
        <Link
          to="/admin/dashboard/attendance-report"
          className="block p-2 hover:bg-gray-700"
        >
          📊 Attendance Report
        </Link>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded w-full"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
