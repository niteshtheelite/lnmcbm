import { Attendance } from "../models/attendanceSchema.js";
import { Student } from "../models/studentSchema.js";

const createAttendance = async (req, res) => {
  try {
    // req.body.user = req.user.id;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }
    const { courseId, semesterId, sectionId, durationId, students } = req.body;

    if (!courseId || !semesterId || !sectionId || !durationId || !students) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Check if attendance already exists for the same duration and date
    const existingAttendance = await Attendance.findOne({
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      date: { $gte: new Date(today), $lt: new Date(today + "T23:59:59.999Z") },
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance for this duration has already been taken today!",
      });
    }

    // If no duplicate attendance, save the new record
    const attendance = new Attendance({
      user: req.user._id,
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      students,
      date: new Date(),
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: error.message });
  }
};

// const getAttendancePercentage = async (req, res) => {
//   try {
//     const { courseId, semesterId, sectionId } = req.query;

//     if (!courseId || !semesterId || !sectionId) {
//       return res.status(400).json({ message: "Missing required parameters" });
//     }

//     // Fetch students for the given course, semester, and section
//     const students = await Student.find({
//       course: courseId,
//       semester: semesterId,
//       section: sectionId,
//     });

//     if (!students || students.length === 0) {
//       return res.status(404).json({ message: "No students found" });
//     }

//     // Fetch attendance records for the selected course, semester, and section
//     const attendanceRecords = await Attendance.find({
//       course: courseId,
//       semester: semesterId,
//       section: sectionId,
//     });

//     if (!attendanceRecords || attendanceRecords.length === 0) {
//       return res.status(404).json({ message: "No attendance records found" });
//     }

//     console.log("Total Attendance Records:", attendanceRecords.length);

//     // Calculate attendance percentage for each student
//     const attendanceData = students.map((student) => {
//       // Count total classes for this section
//       const totalClasses = attendanceRecords.length;

//       // Count the number of classes the student attended
//       const attendedClasses = attendanceRecords.filter((record) =>
//         record.students.find(
//           (s) =>
//             s.student?.toString() === student._id.toString() &&
//             s.present === true
//         )
//       ).length;

//       console.log(`Student: ${student.name} (Roll: ${student.rollNumber})`);
//       console.log(
//         `Total Classes: ${totalClasses}, Attended: ${attendedClasses}`
//       );

//       return {
//         studentId: student._id,
//         rollNumber: student.rollNumber,
//         name: student.name,
//         percentage:
//           totalClasses > 0
//             ? ((attendedClasses / totalClasses) * 100).toFixed(2)
//             : "0",
//       };
//     });

//     res.status(200).json(attendanceData);
//   } catch (error) {
//     console.error("Error in getAttendancePercentage:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

const getAttendancePercentage = async (req, res) => {
  const { courseId, semesterId, sectionId } = req.query;

  if (!courseId || !semesterId || !sectionId) {
    return res
      .status(400)
      .json({ message: "Course, semester, and section IDs are required" });
  }

  try {
    // Find attendance records based on course, semester, and section
    const attendanceRecords = await Attendance.find({
      course: courseId,
      semester: semesterId,
      section: sectionId,
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({
        message:
          "No attendance records found for the specified course, semester, and section",
      });
    }

    // Calculate total attendance percentage
    let totalStudents = 0;
    let totalPresent = 0;

    attendanceRecords.forEach((record) => {
      totalStudents += record.students.length;
      totalPresent += record.students.filter(
        (student) => student.present
      ).length;
    });

    const attendancePercentage =
      totalStudents > 0 ? (totalPresent / totalStudents) * 100 : 0;

    // Prepare student attendance details
    const studentAttendance = attendanceRecords.flatMap((record) =>
      record.students.map((student) => ({
        id: student._id,
        present: student.present,
        attendancePercentage: student.present ? 100 : 0, // Individual attendance percentage
      }))
    );

    return res.json({
      attendancePercentage: attendancePercentage.toFixed(2),
      students: studentAttendance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const calculateAttendancePercentage = async (
  courseId,
  semesterId,
  sectionId
) => {
  const aggregationPipeline = [
    {
      $match: {
        course: mongoose.Types.ObjectId(courseId),
        semester: mongoose.Types.ObjectId(semesterId),
        section: mongoose.Types.ObjectId(sectionId),
      },
    },
    {
      $facet: {
        totalDays: [{ $count: "totalDays" }],
        students: [
          { $unwind: "$students" },
          {
            $group: {
              _id: "$students.student",
              presentDays: {
                $sum: { $cond: ["$students.present", 1, 0] },
              },
            },
          },
        ],
      },
    },
    { $unwind: { path: "$totalDays", preserveNullAndEmptyArrays: true } },
    { $unwind: "$students" },
    {
      $addFields: {
        computedTotalDays: { $ifNull: ["$totalDays.totalDays", 0] },
      },
    },
    {
      $addFields: {
        "students.percentage": {
          $cond: [
            { $eq: ["$computedTotalDays", 0] },
            0,
            {
              $multiply: [
                { $divide: ["$students.presentDays", "$computedTotalDays"] },
                100,
              ],
            },
          ],
        },
        "students.totalDays": "$computedTotalDays",
      },
    },
    {
      $project: {
        studentId: "$students._id",
        presentDays: "$students.presentDays",
        totalDays: "$students.totalDays",
        percentage: "$students.percentage",
      },
    },
  ];

  const result = await Attendance.aggregate(aggregationPipeline);
  return result;
};

export { createAttendance, getAttendancePercentage };
