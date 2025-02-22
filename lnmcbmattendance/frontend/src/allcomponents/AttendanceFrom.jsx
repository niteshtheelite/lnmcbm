import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ATTENDANCE_URL,
  BASE_URl,
  COURSE_URL,
  DURATION_URL,
  SECTION_URL,
  SEMESTER_URL,
  STUDENT_URL,
} from "@/constant";
import Toast from "./Toast";

function AttendanceForm() {
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [durations, setDurations] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

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
          axios.get(`${BASE_URl}${COURSE_URL}/allCourse`),
          axios.get(`${BASE_URl}${SEMESTER_URL}/allSemester`),
          axios.get(`${BASE_URl}${DURATION_URL}/allDuration`),
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
            `${BASE_URl}${SECTION_URL}/allsection`,
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
        `${BASE_URl}${STUDENT_URL}/filterStudent`,
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
      displayToast("Error fetching students");
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
        courseId: formData.courseId,
        semesterId: formData.semesterId,
        sectionId: formData.sectionId,
        durationId: formData.durationId,
        students: attendanceData,
      };

      const response = await axios.post(
        `${BASE_URl}${ATTENDANCE_URL}/createAttendance`,
        submitData
      );

      if (response.status === 201) {
        displayToast("Attendance submitted successfully!");
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
      displayToast("Error submitting attendance: " + error.message);
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
    <div className="flex justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Attendance Form</h2>
        <form onSubmit={handleParamSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Course Dropdown */}
            <select
              value={formData.courseId}
              onChange={(e) =>
                setFormData({ ...formData, courseId: e.target.value })
              }
              className="p-2 border rounded"
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
              className="p-2 border rounded"
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
              className="p-2 border rounded"
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
              className="p-2 border rounded"
            >
              <option value="">Select Duration</option>
              {durations.map((duration) => (
                <option key={duration._id} value={duration._id}>
                  {duration.name} ({duration.hours} hours)
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex justify-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Get Students
            </button>
          </div>
        </form>

        {/* Student Attendance Table */}
        {students.length > 0 && (
          <div>
            <table className="w-full border-collapse mb-4">
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
                        checked={attendance[student._id] || false}
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            [student._id]: e.target.checked,
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

        {/* Toast Notification */}
        {showToast && (
          <Toast message={toastMessage} onClose={() => setShowToast(false)} />
        )}
      </div>
    </div>
  );
}

export default AttendanceForm;
