// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import TeacherSidebar from "../Teacher/TeacherSidebar";
// import TakeAttendance from "../Teacher/TakeAttendance";
// import ViewAttendance from "../Teacher/ViewAttendance";
// import StudentList from "../Teacher/StudentList";

// const TeacherDashboard = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* ✅ Sidebar Fixed */}
//       <TeacherSidebar />

//       {/* ✅ Main Content */}
//       <div className="flex-1 p-4">
//         <Routes>
//           <Route path="/take-attendance" element={<TakeAttendance />} />
//           <Route path="/list-student" element={<StudentList />} />

//           <Route path="/attendance-report" element={<ViewAttendance />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;

import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TeacherSidebar from "../Teacher/TeacherSidebar";
import TakeAttendance from "../Teacher/TakeAttendance";
import ViewAttendance from "../Teacher/ViewAttendance";
import StudentList from "../Teacher/StudentList";
import { useSelector } from "react-redux";

const TeacherDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("🖥️ TeacherDashboard - userInfo:", userInfo);
  }, [userInfo]);

  if (!userInfo || userInfo.role !== "teacher") {
    console.log("⛔ Redirecting to /login...");
    return <Navigate to="/login" replace />;
  }
  // Add state to track sidebar open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Pass state to sidebar component */}
      <TeacherSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content - add padding-top on mobile for hamburger clearance */}
      <div className="flex-1 p-4 pt-16 md:pt-4">
        <Routes>
          <Route path="/take-attendance" element={<TakeAttendance />} />
          <Route path="/list-student" element={<StudentList />} />
          <Route path="/attendance-report" element={<ViewAttendance />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherDashboard;
