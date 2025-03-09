import React from "react";
import { Route, Routes } from "react-router-dom";
import TeacherSidebar from "../Teacher/TeacherSidebar";
import TakeAttendance from "../Teacher/TakeAttendance";
import ViewAttendance from "../Teacher/ViewAttendance";
import StudentList from "../Teacher/StudentList";

const TeacherDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar Fixed */}
      <TeacherSidebar />

      {/* ✅ Main Content */}
      <div className="flex-1 p-4">
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
