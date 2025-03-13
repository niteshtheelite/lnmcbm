// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const TeacherSidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };
//   return (
//     <div className="w-64 min-h-screen bg-gray-800 text-white">
//       <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
//         Teacher Panel
//       </h2>

//       <nav className="mt-4 space-y-2">
//         <Link
//           to="/teacher/dashboard/take-attendance"
//           className="block p-2 hover:bg-gray-700"
//         >
//           ✅ Take Attendance
//         </Link>
//         <Link
//           to="/teacher/dashboard/list-student"
//           className="block p-2 hover:bg-gray-700"
//         >
//           📋 List Student
//         </Link>

//         <Link
//           to="/teacher/dashboard/attendance-report"
//           className="block p-2 hover:bg-gray-700"
//         >
//           📊 Attendance Report
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="mt-6 bg-red-500 text-white py-2 px-4 rounded w-full"
//         >
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default TeacherSidebar;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const TeacherSidebar = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* Mobile hamburger menu */}
//       <button
//         onClick={toggleSidebar}
//         className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded"
//         aria-label="Toggle menu"
//       >
//         {isOpen ? "✕" : "☰"}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 fixed md:static z-10 w-64 min-h-screen bg-gray-800 text-white transition-transform duration-300 ease-in-out`}
//       >
//         <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
//           Teacher Panel
//         </h2>

//         <nav className="mt-4 space-y-2">
//           <Link
//             to="/teacher/dashboard/take-attendance"
//             className="block p-2 hover:bg-gray-700"
//             onClick={() => setIsOpen(false)}
//           >
//             ✅ Take Attendance
//           </Link>
//           <Link
//             to="/teacher/dashboard/list-student"
//             className="block p-2 hover:bg-gray-700"
//             onClick={() => setIsOpen(false)}
//           >
//             📋 List Student
//           </Link>

//           <Link
//             to="/teacher/dashboard/attendance-report"
//             className="block p-2 hover:bg-gray-700"
//             onClick={() => setIsOpen(false)}
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

//       {/* Overlay to close the sidebar when clicked outside */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default TeacherSidebar;

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";

// Add props to accept state from parent
const TeacherSidebar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch(); // ✅ Move useDispatch here
  const navigate = useNavigate(); // ✅ Move useNavigate here

  const handleLogout = () => {
    // ✅ Clear User Data from Redux & LocalStorage
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    // ✅ Redirect to Login Page
    navigate("/login", { replace: true });
  };
  // Use the passed setter function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile hamburger menu */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-800 text-white p-2 rounded"
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar - use props to control visibility */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static z-20 w-64 min-h-screen bg-gray-800 text-white transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
          Teacher Panel
        </h2>

        <nav className="mt-4 space-y-2">
          <Link
            to="/teacher/dashboard/take-attendance"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✅ Take Attendance
          </Link>
          {/* <Link
            to="/teacher/dashboard/list-student"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            📋 List Student
          </Link> */}

          <Link
            to="/teacher/dashboard/attendance-report"
            className="block p-2 hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
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

      {/* Overlay - improve z-index ordering */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default TeacherSidebar;
