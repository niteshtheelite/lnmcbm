import { Student } from "../models/studentSchema.js";

const createStudent = async (req, res) => {
  try {
    // Extract student data from the request body
    const { rollNumber, name, course, section, semester } = req.body;

    const rollNumberExist = await Student.findOne({ name });
    if (rollNumberExist) {
      return res.status(409).json({
        message: "Student  already exists",
      });
    }

    // Create a new student instance
    const newStudent = new Student({
      rollNumber,
      name: name.toUpperCase(),
      course,
      section,
      semester,
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Respond with the created student
    res.status(201).json({
      message: "Student created successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};
const getStudents = async (req, res) => {
  try {
    const Students = await Student.find().sort({ name: 1 });

    res.status(200).json(Students);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error geting student", error: err });
  }
};
const getFilterStudent = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId } = req.query;
    const query = {};
    if (courseId) query.course = courseId;
    if (semesterId) query.semester = semesterId;
    if (sectionId) query.section = sectionId;

    const students = await Student.find(query)
      .populate("course")
      .populate("semester")
      .populate("section")
      .sort({ rollNumber: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { rollNumber, name, course, section, semester } = req.body;

    // Check if the roll number is already in use by another student
    const existingStudent = await Student.findOne({
      rollNumber,
      course,
      _id: { $ne: req.params.id },
    });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Roll number already exists for this course" });
    }

    // Update the student
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { rollNumber, name, course, section, semester },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not founds" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    // Find student first
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete the student
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};

const getStudentOnSelection = async (req, res) => {
  try {
    const { course, semester, section } = req.query;

    const students = await Student.find({ course, semester, section });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const promoteAllStudents = async (req, res) => {
  try {
    const { currentSemesterId } = req.body;

    // Step 1: Find all students in the given semester
    const students = await Student.find({ semester: currentSemesterId });

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found in this semester." });
    }

    // Step 2: Get the next semester for the same course
    const currentSemester = await Semester.findById(currentSemesterId);
    const nextSemester = await Semester.findOne({
      course: currentSemester.course,
      semesterNumber: currentSemester.semesterNumber + 1,
    });

    if (!nextSemester) {
      return res.status(400).json({
        message:
          "No next semester found. Students may have completed the course.",
      });
    }

    // Step 3: Filter students who are not yet promoted
    const studentsToPromote = [];
    for (let student of students) {
      const existingStudent = await Student.findOne({
        rollNumber: student.rollNumber,
        course: student.course,
        semester: nextSemester._id,
      });

      if (!existingStudent) {
        studentsToPromote.push(student);
      }
    }

    if (studentsToPromote.length === 0) {
      return res.status(400).json({
        message: "All students are already promoted to the next semester.",
      });
    }

    // Step 4: Create new records for promoted students
    const promotedStudents = studentsToPromote.map((student) => ({
      rollNumber: student.rollNumber,
      name: student.name,
      course: student.course,
      semester: nextSemester._id,
    }));

    await Student.insertMany(promotedStudents);

    res.status(201).json({
      message: "All students promoted successfully",
      promotedCount: promotedStudents.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  createStudent,
  getStudents,
  getFilterStudent,
  updateStudent,
  deleteStudent,
  getStudentOnSelection,
  promoteAllStudents,
};
