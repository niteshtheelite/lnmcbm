import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("🔍 ProtectedRoute - userInfo:", userInfo);
  }, [userInfo]);

  // ✅ Check if user is authenticated
  if (!userInfo) {
    console.log("⛔ User not authenticated, redirecting to /login");
    return <Navigate to="/login" />;
  }

  // ✅ Check if user role matches allowedRole
  if (userInfo.role !== allowedRole) {
    console.log(
      `⛔ User role (${userInfo.role}) not allowed, redirecting to /`
    );
    return <Navigate to="/" />;
  }

  console.log("✅ Access Granted to:", allowedRole);
  return children;
};

export default ProtectedRoute;
