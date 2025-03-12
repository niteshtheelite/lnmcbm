import React, { useState, useEffect } from "react";
import { useGetCourseQuery } from "../../redux/api/courseApiSlice";
import { useGetSemesterQuery } from "../../redux/api/semesterApiSlice";
import { useGetsSectionQuery } from "../../redux/api/sectionApiSlice";
import { useFilterAttendanceQuery } from "../../redux/api/attendanceApiSlice";

const ViewAttendance = () => {
  // State for selected filters
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [showAttendance, setShowAttendance] = useState(false);

  // Fetch data using RTK Query
  const { data: courses, isLoading: coursesLoading } = useGetCourseQuery();
  const { data: semesters, isLoading: semestersLoading } =
    useGetSemesterQuery();
  const { data: sections, isLoading: sectionsLoading } = useGetsSectionQuery();

  // Only fetch attendance data when user clicks "View Attendance" button
  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    refetch: refetchAttendance,
  } = useFilterAttendanceQuery(
    {
      courseId: selectedCourse,
      semesterId: selectedSemester,
      sectionId: selectedSection,
    },
    { skip: !showAttendance }
  );

  // Reset dependent dropdowns when parent selection changes
  useEffect(() => {
    setSelectedSection("");
  }, [selectedCourse, selectedSemester]);

  useEffect(() => {
    setShowAttendance(false);
  }, [selectedCourse, selectedSemester, selectedSection]);

  // Handle view attendance button click
  const handleViewAttendance = () => {
    if (selectedCourse && selectedSemester && selectedSection) {
      setShowAttendance(true);
      refetchAttendance();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          View Attendance
        </h1>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Filters</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Course Selection */}
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={coursesLoading}
              >
                <option value="">Select Course</option>
                {courses?.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Selection */}
            <div>
              <label
                htmlFor="semester"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Semester
              </label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={semestersLoading || !selectedCourse}
              >
                <option value="">Select Semester</option>
                {semesters?.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Selection */}
            <div>
              <label
                htmlFor="section"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Section
              </label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={sectionsLoading || !selectedSemester}
              >
                <option value="">Select Section</option>
                {sections?.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleViewAttendance}
              disabled={
                !selectedCourse || !selectedSemester || !selectedSection
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              View Attendance
            </button>
          </div>
        </div>

        {/* Attendance Data Table */}
        {showAttendance && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 md:p-6 border-b">
              <h2 className="text-lg font-semibold">Attendance Results</h2>
            </div>

            {attendanceLoading ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Loading attendance data...</p>
              </div>
            ) : attendanceData?.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No attendance records found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Roll Number
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Student Name
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">
                        Attendance %
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendanceData?.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {student.rollNumber}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800 text-right">
                          {student.attendancePercentage}%
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                student.attendancePercentage >= 75
                                  ? "bg-green-100 text-green-800"
                                  : student.attendancePercentage >= 60
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {student.attendancePercentage >= 75
                                ? "Good"
                                : student.attendancePercentage >= 60
                                ? "Warning"
                                : "Low"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
