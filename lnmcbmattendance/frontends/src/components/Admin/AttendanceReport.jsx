import React, { useState } from "react";
import { useGetCourseQuery } from "../../redux/api/courseApiSlice";
import { useGetSemesterQuery } from "../../redux/api/semesterApiSlice";
import { useGetsSectionQuery } from "../../redux/api/sectionApiSlice";
import { useFilterAttendanceQuery } from "../../redux/api/attendanceApiSlice";

const AttendanceReport = () => {
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [sectionId, setSectionId] = useState("");

  // Fetching Dropdown Data
  const { data: courses } = useGetCourseQuery();
  const { data: semesters } = useGetSemesterQuery();
  const { data: sections } = useGetsSectionQuery();

  // Fetching Attendance Data
  const { data: attendanceData, refetch } = useFilterAttendanceQuery({
    courseId,
    semesterId,
    sectionId,
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Report</h2>

      {/* Filters */}
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Course</option>
          {courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        <select
          value={semesterId}
          onChange={(e) => setSemesterId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Semester</option>
          {semesters?.map((semester) => (
            <option key={semester._id} value={semester._id}>
              {semester.name}
            </option>
          ))}
        </select>

        <select
          value={sectionId}
          onChange={(e) => setSectionId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Section</option>
          {sections?.map((section) => (
            <option key={section._id} value={section._id}>
              {section.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Fetch Attendance
        </button>
      </form>

      {/* Attendance Table */}
      <div className="mt-4">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Student ID</th>
              <th className="border p-2">Present</th>
              <th className="border p-2">Total Classes</th>
              <th className="border p-2">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData?.map((record) => (
              <tr key={record.studentId}>
                <td className="border p-2">{record.studentId}</td>
                <td className="border p-2">{record.presentClasses}</td>
                <td className="border p-2">{record.totalClasses}</td>
                <td className="border p-2">{record.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download CSV
      <div className="mt-4">
        <CSVLink
          data={attendanceData || []}
          filename={`attendance-report.csv`}
          className="bg-green-500 text-white p-2 rounded"
        >
          Download CSV
        </CSVLink>
      </div> */}
    </div>
  );
};

export default AttendanceReport;
