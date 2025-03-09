import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./components/Admin/AdminDashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Login from "./auth/Login";

const App = () => {
  const { user } = useSelector((state) => state.user) || { user: null };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {/* ✅ Public Route */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Admin Routes */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Teacher Routes */}
        <Route
          path="/teacher/dashboard/*"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
