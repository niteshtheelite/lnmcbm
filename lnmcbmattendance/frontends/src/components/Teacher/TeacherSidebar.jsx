import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TeacherSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
        Teacher Panel
      </h2>

      <nav className="mt-4 space-y-2">
        <Link
          to="/teacher/dashboard/take-attendance"
          className="block p-2 hover:bg-gray-700"
        >
          ✅ Take Attendance
        </Link>
        <Link
          to="/teacher/dashboard/list-student"
          className="block p-2 hover:bg-gray-700"
        >
          📋 List Student
        </Link>

        <Link
          to="/teacher/dashboard/attendance-report"
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

export default TeacherSidebar;

// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const TeacherSidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const isActive = (path) => {
//     return location.pathname === path ? "bg-blue-500" : "";
//   };

//   const handleLinkClick = () => {
//     if (window.innerWidth < 768) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`w-64 min-h-screen bg-gray-800 text-white fixed transition-transform duration-300 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-64"
//         } md:translate-x-0`}
//       >
//         <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
//           Teacher Panel
//         </h2>

//         <nav className="mt-4 space-y-2">
//           <Link
//             to="/teacher/dashboard/take-attendance"
//             className={`block p-2 hover:bg-gray-700 ${isActive(
//               "/teacher/dashboard/take-attendance"
//             )}`}
//             onClick={handleLinkClick}
//           >
//             ✅ Take Attendance
//           </Link>
//           <Link
//             to="/teacher/dashboard/list-student"
//             className={`block p-2 hover:bg-gray-700 ${isActive(
//               "/teacher/dashboard/list-student"
//             )}`}
//             onClick={handleLinkClick}
//           >
//             📋 List Student
//           </Link>

//           <Link
//             to="/teacher/dashboard/attendance-report"
//             className={`block p-2 hover:bg-gray-700 ${isActive(
//               "/teacher/dashboard/attendance-report"
//             )}`}
//             onClick={handleLinkClick}
//           >
//             📊 Attendance Report
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="mt-6 bg-red-500 text-white py-2 px-4 rounded w-full"
//           >
//             Logout
//           </button>
//         </nav>
//       </div>

//       {/* Toggle Button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={toggleSidebar}
//           className="text-white text-2xl bg-gray-800 p-2 rounded-full"
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Overlay for Mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default TeacherSidebar;
