import { useState, useEffect } from "react";
import axios from "axios";

const AttendancePercentage = () => {
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [durations, setDurations] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    courseId: "",
    semesterId: "",
    sectionId: "",
    durationId: "",
  });

  // Fetch initial data (Courses, Semesters, Durations)
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

  // Fetch sections when a course is selected
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

  // Fetch attendance percentage
  const handleGetPercentage = async () => {
    if (!formData.courseId || !formData.semesterId || !formData.sectionId) {
      alert("Please select course, semester, and section!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/attendance/getAttendancePercentage",
        {
          params: {
            courseId: formData.courseId,
            semesterId: formData.semesterId,
            sectionId: formData.sectionId,
          },
        }
      );

      console.log("API Response:", response.data); // Debugging log

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance percentage:", error);
      alert(
        "Error fetching attendance percentage: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance Percentage</h2>

      {/* Course Dropdown */}
      <select
        value={formData.courseId}
        onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
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

      {/* Get Percentage Button */}
      <button
        onClick={handleGetPercentage}
        className="bg-blue-500 text-white p-2 rounded ml-4"
      >
        {loading ? "Loading..." : "Get Percentage"}
      </button>

      {/* Display Attendance Data */}
      {attendanceData.length > 0 && (
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border p-2">Roll Number</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student) => (
              <tr key={student.studentId || student._id}>
                <td className="border p-2">{student.rollNumber || "N/A"}</td>
                <td className="border p-2">{student.name || "N/A"}</td>
                <td className="border p-2">
                  {student.percentage !== undefined
                    ? `${student.percentage}%`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendancePercentage;
