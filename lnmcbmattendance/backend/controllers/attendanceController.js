import { Attendance } from "../models/attendanceSchema.js";
import { Student } from "../models/studentSchema.js";
import { Course } from "../models/courseSchema.js";
import { Semester } from "../models/semesterSchema.js";
import { Subject } from "../models/subjectSchema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const createAttendance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const { courseId, semesterId, sectionId, subjectId, durationId, students } =
      req.body;

    if (
      !courseId ||
      !semesterId ||
      !subjectId ||
      !sectionId ||
      !durationId ||
      !students
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Get today's date
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    // ✅ Define the start and end of the day
    const startOfDay = new Date(today); // Midnight (00:00:00)
    const endOfDay = new Date(today + "T23:59:59.999Z"); // End of day (23:59:59.999)

    // ✅ Prevent Duplicate Attendance (same day)
    const existingAttendance = await Attendance.findOne({
      course: courseId,
      semester: semesterId,
      subject: subjectId,
      section: sectionId,
      duration: durationId,
      date: { $gte: startOfDay, $lt: endOfDay }, // Date range filter
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance for this duration has already been taken today!",
      });
    }

    // ✅ Format Students Array
    const formattedStudents = students.map((item) => ({
      student: item.studentId,
      present: item.present,
    }));

    // ✅ Save Attendance
    const attendance = new Attendance({
      user: req.user._id,
      course: courseId,
      semester: semesterId,
      subject: subjectId,
      section: sectionId,
      duration: durationId,
      students: formattedStudents,
      date: new Date(),
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ATTENDANCE PERCENTAGE OF STUDENT
const getAttendancePercentage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // ✅ Find All Attendance Records For This Student
    const attendanceRecords = await Attendance.find({
      "students.student": id,
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance record found" });
    }

    // ✅ Calculate Present & Total Days
    let totalClasses = 0;
    let presentClasses = 0;

    attendanceRecords.forEach((attendance) => {
      attendance.students.forEach((studentRecord) => {
        if (String(studentRecord.student) === String(id)) {
          totalClasses++;
          if (studentRecord.present) {
            presentClasses++;
          }
        }
      });
    });

    // ✅ Calculate Percentage
    const percentage = (presentClasses / totalClasses) * 100;

    res.status(200).json({
      totalClasses,
      presentClasses,
      percentage: `${percentage.toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFilteredAttendanceByName = async (req, res) => {
  try {
    const { courseName, semesterName } = req.query;

    if (!courseName || !semesterName) {
      return res
        .status(400)
        .json({ message: "Course Name and Semester Name are required" });
    }

    // ✅ Find Course ID Based on Course Name
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Find Semester ID Based on Semester Name
    const semester = await Semester.findOne({ name: semesterName });
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    // ✅ Fetch Attendance Based On Filters
    const attendanceRecords = await Attendance.find({
      course: course._id,
      semester: semester._id,
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance record found" });
    }

    // ✅ Calculate Total Classes, Present Classes
    let totalClasses = 0;
    let presentClasses = 0;

    attendanceRecords.forEach((attendance) => {
      attendance.students.forEach((studentRecord) => {
        totalClasses++;
        if (studentRecord.present) {
          presentClasses++;
        }
      });
    });

    // ✅ Calculate Attendance Percentage
    const percentage = ((presentClasses / totalClasses) * 100).toFixed(2);

    res.status(200).json({
      courseName,
      semesterName,
      totalClasses,
      presentClasses,
      percentage,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getFilteredAttendance = async (req, res) => {
//   try {
//     console.log("🚀 Received Query Params:", req.query); // Debugging input

//     const { courseId, semesterId, sectionId, studentId } = req.query;
//     const query = {};

//     // Ensure we are working with valid ObjectIds
//     if (courseId) {
//       if (mongoose.isValidObjectId(courseId)) {
//         query.course = new mongoose.Types.ObjectId(courseId);
//       } else {
//         console.error("❌ Invalid courseId:", courseId);
//         return res
//           .status(400)
//           .json({ message: `Invalid courseId: ${courseId}` });
//       }
//     }

//     if (semesterId) {
//       if (mongoose.isValidObjectId(semesterId)) {
//         query.semester = new mongoose.Types.ObjectId(semesterId);
//       } else {
//         console.error("❌ Invalid semesterId:", semesterId);
//         return res
//           .status(400)
//           .json({ message: `Invalid semesterId: ${semesterId}` });
//       }
//     }

//     if (sectionId) {
//       if (mongoose.isValidObjectId(sectionId)) {
//         query.section = new mongoose.Types.ObjectId(sectionId);
//       } else {
//         console.error("❌ Invalid sectionId:", sectionId);
//         return res
//           .status(400)
//           .json({ message: `Invalid sectionId: ${sectionId}` });
//       }
//     }

//     if (studentId) {
//       if (mongoose.isValidObjectId(studentId)) {
//         query.students = {
//           $elemMatch: { student: new mongoose.Types.ObjectId(studentId) },
//         };
//       } else {
//         console.error("❌ Invalid studentId:", studentId);
//         return res
//           .status(400)
//           .json({ message: `Invalid studentId: ${studentId}` });
//       }
//     }

//     console.log("✅ MongoDB Query:", query); // Debugging output

//     const attendanceRecords = await Attendance.find(query)
//       .populate("course")
//       .populate("semester")
//       .populate("section")
//       .populate("students.student") // Populate student details
//       .sort({ date: -1 });

//     res.json(attendanceRecords);
//   } catch (error) {
//     console.error("🔥 Error fetching attendance:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching attendance", error: error.message });
//   }
// };
export const getAttendanceReport = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId } = req.body;

    if (!courseId || !semesterId || !sectionId) {
      return res
        .status(400)
        .json({ message: "Course, Semester, and Section are required!" });
    }

    const students = await Student.find({
      course: courseId,
      semester: semesterId,
      section: sectionId,
    });
    const attendanceRecords = await Attendance.find({
      course: courseId,
      semester: semesterId,
      section: sectionId,
    });

    const totalClasses = attendanceRecords.length;
    const attendanceReport = students.map((student) => {
      const presentCount = attendanceRecords.filter((record) =>
        record.students.some(
          (s) => s.student.toString() === student._id.toString() && s.present
        )
      ).length;

      return {
        rollNumber: student.rollNumber,
        name: student.name,
        totalClasses,
        presentClasses: presentCount,
      };
    });

    res.status(200).json({ totalClasses, students: attendanceReport });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getFilteredAttendance = async (req, res) => {
  try {
    console.log("🚀 Received Query Params:", req.query);

    const { courseId, semesterId, sectionId } = req.query;
    const query = {};

    if (courseId) query.course = courseId;
    if (semesterId) query.semester = semesterId;
    if (sectionId) query.section = sectionId;
    if (!courseId || !semesterId || !sectionId) {
      return res.status(400).json({
        message: "Missing required fields: courseId, semesterId, or sectionId.",
      });
    }

    console.log("✅ MongoDB Query Params:", {
      courseId,
      semesterId,
      sectionId,
    });

    // Fetch attendance records
    const attendanceRecords = await Attendance.find(query)
      .populate("course")
      .populate("semester")
      .populate("section")
      .populate("students.student") // Populate student details
      .sort({ date: -1 });

    if (attendanceRecords.length === 0) {
      return res.json({ message: "No attendance records found." });
    }

    // Calculate attendance percentage for each student
    const studentAttendance = {};

    attendanceRecords.forEach((record) => {
      record.students.forEach(({ student, present }) => {
        if (!student || !student._id) return;

        const studentId = student._id.toString();

        if (!studentAttendance[studentId]) {
          studentAttendance[studentId] = {
            studentId,
            studentName: student.name || "Unknown",
            rollNumber: student.rollNumber || "N/A", // Include roll number
            totalClasses: 0,
            presentCount: 0,
          };
        }

        studentAttendance[studentId].totalClasses += 1;
        if (present) {
          studentAttendance[studentId].presentCount += 1;
        }
      });
    });

    // Convert to array and calculate percentages
    const studentPercentages = Object.values(studentAttendance).map(
      (student) => ({
        studentId: student.studentId,
        studentName: student.studentName,
        rollNumber: student.rollNumber, // Include roll number
        totalClasses: student.totalClasses,
        presentCount: student.presentCount,
        percentage:
          student.totalClasses > 0
            ? ((student.presentCount / student.totalClasses) * 100).toFixed(2) +
              "%"
            : "0%",
      })
    );

    res.json(studentPercentages);
  } catch (error) {
    console.error("🔥 Error fetching attendance:", error);
    res
      .status(500)
      .json({ message: "Error fetching attendance", error: error.message });
  }
};
export const getStudentAttendance = async (req, res) => {
  try {
    const { course, semester, section } = req.query;

    if (!course || !semester || !section) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // 🟢 Fetch all attendance records for the given course, semester, section
    const attendanceRecords = await Attendance.find({
      course,
      semester,
      section,
    });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    // 🟢 Count how many times attendance was recorded (Total Sessions)
    const totalSessions = attendanceRecords.length;

    // 🟢 Create a map to store student attendance counts
    let studentAttendanceMap = new Map();

    attendanceRecords.forEach((attendance) => {
      attendance.students.forEach(({ student, present }) => {
        // ✅ Ensure the student field exists before processing
        if (!student) return;

        const studentId = student.toString(); // Convert ObjectId to String safely

        if (!studentAttendanceMap.has(studentId)) {
          studentAttendanceMap.set(studentId, { presentCount: 0 });
        }

        if (present) {
          studentAttendanceMap.get(studentId).presentCount += 1;
        }
      });
    });

    // 🟢 Fetch student details
    const studentIds = Array.from(studentAttendanceMap.keys());

    if (studentIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for this attendance data" });
    }

    const students = await Student.find({ _id: { $in: studentIds } });

    // 🟢 Prepare response
    const response = students.map((student) => {
      const attendanceInfo = studentAttendanceMap.get(student._id.toString());
      const presentCount = attendanceInfo ? attendanceInfo.presentCount : 0;

      return {
        rollNumber: student.rollNumber,
        name: student.name,
        percentage:
          totalSessions > 0
            ? ((presentCount / totalSessions) * 100).toFixed(2)
            : "0.00",
      };
    });

    res.json(response);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getStudentAttendanceSubjectWise = async (req, res) => {
//   try {
//     const { courseId, semesterId, sectionId } = req.query;

//     if (!courseId || !semesterId || !sectionId) {
//       return res.status(400).json({ message: "Missing parameters" });
//     }

//     const courseObjId = new mongoose.Types.ObjectId(courseId);
//     const semesterObjId = new mongoose.Types.ObjectId(semesterId);
//     const sectionObjId = new mongoose.Types.ObjectId(sectionId);

//     const attendanceRecords = await Attendance.find({
//       course: courseObjId,
//       semester: semesterObjId,
//       section: sectionObjId,
//     }).lean();

//     if (!attendanceRecords.length) {
//       return res.status(404).json({ message: "No attendance records found." });
//     }

//     const attendanceMap = {};

//     attendanceRecords.forEach((record) => {
//       const subjectId = record.subject.toString();

//       record.students.forEach((studentData) => {
//         const studentId = studentData.student.toString();

//         if (!attendanceMap[studentId]) {
//           attendanceMap[studentId] = {};
//         }

//         if (!attendanceMap[studentId][subjectId]) {
//           attendanceMap[studentId][subjectId] = { total: 0, attended: 0 };
//         }

//         attendanceMap[studentId][subjectId].total += 1;
//         if (studentData.present) {
//           attendanceMap[studentId][subjectId].attended += 1;
//         }
//       });
//     });

//     // Get student IDs
//     const studentIds = Object.keys(attendanceMap);
//     console.log("Fetched Student IDs:", studentIds);

//     // Fetch student details
//     const students = await Student.find({
//       _id: { $in: studentIds.map((id) => new mongoose.Types.ObjectId(id)) },
//     }).lean();
//     console.log("Fetched Students:", students);

//     // Fetch subject details
//     const subjects = await Subject.find().lean();

//     const attendanceData = [];

//     for (const studentId of studentIds) {
//       const student = students.find((stu) => stu._id.toString() === studentId);
//       console.log(`Processing student ID: ${studentId}, Found:`, student);

//       for (const subjectId of Object.keys(attendanceMap[studentId])) {
//         const { total, attended } = attendanceMap[studentId][subjectId];
//         const subject = subjects.find(
//           (sub) => sub._id.toString() === subjectId
//         );

//         attendanceData.push({
//           studentId,
//           studentName: student ? student.name : "**Not Found**", // Changed to debug issue
//           rollNumber: student ? student.rollNumber : "**Not Found**",
//           subjectId,
//           subjectName: subject ? subject.name : "Unknown",

//           totalClasses: total,
//           attendedClasses: attended,
//           attendancePercentage:
//             total === 0 ? 0 : Math.round((attended / total) * 100),
//         });
//       }
//     }

//     console.log("Final Attendance Data:", attendanceData);
//     res.json(attendanceData);
//   } catch (error) {
//     console.error("Error fetching attendance data:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

export const getStudentAttendanceSubjectWise = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId, minPercentage } = req.query;

    if (!courseId || !semesterId || !sectionId) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const courseObjId = new mongoose.Types.ObjectId(courseId);
    const semesterObjId = new mongoose.Types.ObjectId(semesterId);
    const sectionObjId = new mongoose.Types.ObjectId(sectionId);
    const minPercentValue = parseFloat(minPercentage) || 0;

    const attendanceRecords = await Attendance.find({
      course: courseObjId,
      semester: semesterObjId,
      section: sectionObjId,
    }).lean();

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: "No attendance records found." });
    }

    const attendanceMap = {};

    attendanceRecords.forEach((record) => {
      const subjectId = record.subject.toString();

      record.students.forEach((studentData) => {
        const studentId = studentData.student.toString();

        if (!attendanceMap[studentId]) {
          attendanceMap[studentId] = {};
        }

        if (!attendanceMap[studentId][subjectId]) {
          attendanceMap[studentId][subjectId] = { total: 0, attended: 0 };
        }

        attendanceMap[studentId][subjectId].total += 1;
        if (studentData.present) {
          attendanceMap[studentId][subjectId].attended += 1;
        }
      });
    });

    const studentIds = Object.keys(attendanceMap);

    const students = await Student.find({
      _id: { $in: studentIds.map((id) => new mongoose.Types.ObjectId(id)) },
    }).lean();

    const subjects = await Subject.find().lean();

    const attendanceData = [];

    for (const studentId of studentIds) {
      const student = students.find((stu) => stu._id.toString() === studentId);

      let totalClasses = 0;
      let attendedClasses = 0;
      const subjectEntries = [];

      for (const subjectId of Object.keys(attendanceMap[studentId])) {
        const { total, attended } = attendanceMap[studentId][subjectId];
        const subject = subjects.find(
          (sub) => sub._id.toString() === subjectId
        );

        subjectEntries.push({
          subjectId,
          subjectName: subject ? subject.name : "Unknown",
          totalClasses: total,
          attendedClasses: attended,
          attendancePercentage:
            total === 0 ? 0 : Math.round((attended / total) * 100),
        });

        totalClasses += total;
        attendedClasses += attended;
      }

      const averagePercentage =
        totalClasses === 0
          ? 0
          : Math.round((attendedClasses / totalClasses) * 100);

      if (averagePercentage >= minPercentValue) {
        attendanceData.push({
          studentId,
          studentName: student ? student.name : "**Not Found**",
          rollNumber: student ? student.rollNumber : "**Not Found**",
          averagePercentage,
          subjects: subjectEntries,
        });
      }
    }

    res.json(attendanceData);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  createAttendance,
  getAttendancePercentage,
  getFilteredAttendanceByName,
  getFilteredAttendance,
};
