import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../allcomponents/Toast"; // Adjust the path as necessary

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    course: "",
    semester: "",
    section: "",
  });

  const [options, setOptions] = useState({
    courses: [],
    semesters: [],
    sections: [],
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [coursesRes, semestersRes, sectionsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/v1/course/allCourse"),
          axios.get("http://localhost:8000/api/v1/semester/allSemester"),
          axios.get("http://localhost:8000/api/v1/section/allsection"),
        ]);

        setOptions({
          courses: coursesRes.data,
          semesters: semestersRes.data,
          sections: sectionsRes.data,
        });
      } catch (error) {
        displayToast("Failed to fetch options. Please try again.");
      }
    };

    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8000/api/v1/student/createStudent",
        formData
      );

      displayToast("Student added successfully!");

      // Reset form
      setFormData({
        name: "",
        rollNumber: "",
        course: "",
        semester: "",
        section: "",
      });
    } catch (error) {
      displayToast(error.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Toast will disappear after 3 seconds
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter student name"
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              placeholder="Enter roll number"
              required
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleSelectChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                Select course
              </option>
              {options.courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleSelectChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                Select semester
              </option>
              {options.semesters.map((semester) => (
                <option key={semester._id} value={semester._id}>
                  {semester.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleSelectChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>
                Select section
              </option>
              {options.sections.map((section) => (
                <option key={section._id} value={section._id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white rounded-md p-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding Student..." : "Add Student"}
          </button>
        </form>
      </div>

      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default StudentForm;
