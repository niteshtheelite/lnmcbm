import React, { useState, useEffect } from "react";
import axios from "axios";

function AttendanceForm() {
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [durations, setDurations] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    courseId: "",
    semesterId: "",
    sectionId: "",
    durationId: "",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [coursesRes, semestersRes, durationsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/v1/course/allCourse"),
          axios.get("http://localhost:8000/api/v1/semester/allSemester"),
          axios.get("http://localhost:8000/api/v1/duration/allDuration"),
        ]);
        setCourses(coursesRes.data);
        setSemesters(semestersRes.data);
        setDurations(durationsRes.data);
      } catch (error) {
        console.error("Error fetching initial data", error);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch sections when course changes
  useEffect(() => {
    const fetchSections = async () => {
      if (formData.courseId) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/section/allsection",
            {
              params: { courseId: formData.courseId },
            }
          );
          setSections(response.data);
        } catch (error) {
          console.error("Error fetching sections", error);
        }
      }
    };
    fetchSections();
  }, [formData.courseId]);

  // Fetch students
  const handleParamSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/student//filterStudent",
        {
          params: {
            courseId: formData.courseId,
            semesterId: formData.semesterId,
            sectionId: formData.sectionId,
          },
        }
      );
      setStudents(response.data);
      const initialAttendance = {};
      response.data.forEach((student) => {
        initialAttendance[student._id] = false;
      });
      setAttendance(initialAttendance);
    } catch (error) {
      alert("Error fetching students");
    }
  };

  const handleSubmitAttendance = async () => {
    try {
      setLoading(true);

      // Convert attendance object to array format expected by backend
      const attendanceData = Object.entries(attendance).map(
        ([studentId, present]) => ({
          studentId,
          present,
        })
      );

      const submitData = {
        // teacherId: localStorage.getItem("teacherId"), // Get from auth context or localStorage
        courseId: formData.courseId,
        semesterId: formData.semesterId,
        sectionId: formData.sectionId,
        durationId: formData.durationId,
        students: attendanceData,
        // date: new Date(),
      };

      const response = await axios.post(
        "http://localhost:8000/api/v1/attendance/createAttendance",
        submitData
      );

      if (response.status === 201) {
        alert("Attendance submitted successfully!");
        // Clear form and states
        setStudents([]);
        setAttendance({});
        setFormData({
          courseId: "",
          semesterId: "",
          sectionId: "",
          durationId: "",
        });
      }
    } catch (error) {
      alert("Error submitting attendance: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleParamSubmit} className="mb-8">
        {/* Course Dropdown */}
        <select
          value={formData.courseId}
          onChange={(e) =>
            setFormData({ ...formData, courseId: e.target.value })
          }
          className="mr-4 p-2 border rounded"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        {/* Semester Dropdown */}
        <select
          value={formData.semesterId}
          onChange={(e) =>
            setFormData({ ...formData, semesterId: e.target.value })
          }
          className="mr-4 p-2 border rounded"
        >
          <option value="">Select Semester</option>
          {semesters.map((semester) => (
            <option key={semester._id} value={semester._id}>
              Semester {semester.name}
            </option>
          ))}
        </select>

        {/* Section Dropdown */}
        <select
          value={formData.sectionId}
          onChange={(e) =>
            setFormData({ ...formData, sectionId: e.target.value })
          }
          className="mr-4 p-2 border rounded"
          disabled={!formData.courseId}
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section._id} value={section._id}>
              {section.name}
            </option>
          ))}
        </select>

        {/* Duration Dropdown */}
        <select
          value={formData.durationId}
          onChange={(e) =>
            setFormData({ ...formData, durationId: e.target.value })
          }
          className="mr-4 p-2 border rounded"
        >
          <option value="">Select Duration</option>
          {durations.map((duration) => (
            <option key={duration._id} value={duration._id}>
              {duration.name} ({duration.hours} hours)
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Get Students
        </button>
      </form>

      {/* Student Attendance Table */}
      {students.length > 0 && (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Roll Number</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="border p-2">{student.rollNumber}</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={attendance[student._id]} // This should reflect true/false
                      onChange={(e) =>
                        setAttendance({
                          ...attendance,
                          [student._id]: e.target.checked, // This should update to true when checked
                        })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Submit Button */}
          <button
            onClick={handleSubmitAttendance}
            disabled={loading || !students.length}
            className={`w-full p-3 text-white rounded-lg ${
              loading || !students.length
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AttendanceForm;
