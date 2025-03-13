import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useGetFilterStudentQuery } from "../../redux/api/studentsApiSlice";
import { useGetCourseQuery } from "../../redux/api/courseApiSlice";
import { useGetSemesterQuery } from "../../redux/api/semesterApiSlice";
import { useGetsSectionQuery } from "../../redux/api/sectionApiSlice";

const ListStudent = () => {
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [filterClicked, setFilterClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const { data: courses } = useGetCourseQuery();
  const { data: semesters } = useGetSemesterQuery();
  const { data: sections } = useGetsSectionQuery(courseId);

  const { data: students, isLoading } = useGetFilterStudentQuery(
    { courseId, semesterId, sectionId },
    { skip: !filterClicked }
  );

  const handleFilter = () => {
    if (courseId && semesterId && sectionId) {
      setFilterClicked(true);
      setCurrentPage(1); // Reset to first page after filter
    }
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students?.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil((students?.length || 0) / studentsPerPage);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        List Students by Filter
      </h2>

      {/* Filter Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="p-2 border rounded w-full"
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
          className="p-2 border rounded w-full"
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
          className="p-2 border rounded w-full"
        >
          <option value="">Select Section</option>
          {sections?.map((section) => (
            <option key={section._id} value={section._id}>
              {section.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Students
        </button>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}

      {/* Student List */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Roll Number</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents?.map((student) => (
                <tr key={student._id} className="text-center">
                  <td className="border p-2">{student.rollNumber}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <Link
                      to={`/admin/edit-student/${student._id}`}
                      className="text-blue-500 underline"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/admin/delete-student/${student._id}`}
                      className="text-red-500 underline"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {students?.length > studentsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-l"
              >
                Prev
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded-r"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListStudent;
