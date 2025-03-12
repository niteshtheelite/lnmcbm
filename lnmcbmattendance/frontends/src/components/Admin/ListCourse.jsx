import React, { useState } from "react";
import { useGetCourseQuery } from "../../redux/api/courseApiSlice";

const ListCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: courses, isLoading, isError, error } = useGetCourseQuery();

  // Filter courses based on search term
  const filteredCourses =
    courses?.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Course List
          </h1>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading courses:{" "}
                  {error?.message || "Something went wrong"}
                </p>
              </div>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            {searchTerm ? (
              <p className="text-gray-500">
                No courses found matching "{searchTerm}"
              </p>
            ) : (
              <p className="text-gray-500">No courses available</p>
            )}
          </div>
        ) : (
          <>
            {/* Course count */}
            <p className="text-sm text-gray-500 mb-4">
              Showing {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
              {searchTerm && ` for "${searchTerm}"`}
            </p>

            {/* Grid view for larger screens, list view for mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {course.name}
                    </h3>

                    {course.code && (
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Code:</span> {course.code}
                      </p>
                    )}

                    {course.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {course.description}
                      </p>
                    )}

                    <div className="flex justify-end">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListCourse;
