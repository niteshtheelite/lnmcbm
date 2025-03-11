// import React, { useState } from "react";
// import {
//   useGetCourseQuery,
//   useGetSemesterQuery,
//   useGetDurationQuery,
//   useGetSectionQuery,
//   useGetFilterStudentQuery,
//   useAddAttendanceMutation,
// } from "../../redux/apiSlice";

// export default function Attendance() {
//   const [course, setCourse] = useState("");
//   const [semester, setSemester] = useState("");
//   const [duration, setDuration] = useState("");
//   const [section, setSection] = useState("");
//   const [attendance, setAttendance] = useState({});
//   const [error, setError] = useState("");

//   const { data: courses } = useGetCourseQuery();
//   const { data: semesters } = useGetSemesterQuery();
//   const { data: durations } = useGetDurationQuery();
//   const { data: sections } = useGetSectionQuery();

//   const { data: students } = useGetFilterStudentQuery(
//     {
//       course,
//       semester,
//       duration,
//       section,
//     },
//     { skip: !course || !semester || !duration || !section }
//   );

//   const [addAttendance] = useAddAttendanceMutation();

//   const handleAttendanceChange = (rollNo, status) => {
//     setAttendance({ ...attendance, [rollNo]: status });
//   };

//   const handleSubmit = async () => {
//     const attendanceData = students.map((student) => ({
//       rollNo: student.rollNumber,
//       name: student.name,
//       present: attendance[student.rollNumber] ?? false,
//     }));

//     // ✅ Check if the same duration has already been used
//     const response = await addAttendance({
//       course,
//       semester,
//       duration,
//       section,
//       attendance: attendanceData,
//     });

//     if (
//       response.error &&
//       response.error.data.message.includes("already exists")
//     ) {
//       setError("Attendance for this duration already submitted today!");
//     } else {
//       alert("Attendance submitted successfully!");
//       setError("");
//     }
//   };

//   return (
//     <div className="p-8 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">Take Attendance</h1>

//       {error && <div className="text-red-500 text-center mb-4">{error}</div>}

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <select
//           value={course}
//           onChange={(e) => setCourse(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Course</option>
//           {courses?.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={semester}
//           onChange={(e) => setSemester(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Semester</option>
//           {semesters?.map((s) => (
//             <option key={s._id} value={s._id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Duration</option>
//           {durations?.map((d) => (
//             <option key={d._id} value={d._id}>
//               {d.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={section}
//           onChange={(e) => setSection(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Select Section</option>
//           {sections?.map((sec) => (
//             <option key={sec._id} value={sec._id}>
//               {sec.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         className="bg-blue-500 text-white p-2 rounded w-full mb-4"
//         disabled={!students}
//       >
//         Get Students
//       </button>

//       {students && (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 border">Roll No.</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Present</th>
//               <th className="p-2 border">Absent</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student._id} className="border">
//                 <td className="p-2 border">{student.rollNumber}</td>
//                 <td className="p-2 border">{student.name}</td>
//                 <td className="p-2 border">
//                   <input
//                     type="radio"
//                     name={`attendance-${student.rollNumber}`}
//                     checked={attendance[student.rollNumber] === true}
//                     onChange={() =>
//                       handleAttendanceChange(student.rollNumber, true)
//                     }
//                   />
//                 </td>
//                 <td className="p-2 border">
//                   <input
//                     type="radio"
//                     name={`attendance-${student.rollNumber}`}
//                     checked={attendance[student.rollNumber] === false}
//                     onChange={() =>
//                       handleAttendanceChange(student.rollNumber, false)
//                     }
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <button
//         onClick={handleSubmit}
//         className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
//       >
//         Submit Attendance
//       </button>
//     </div>
//   );
// }

import React from "react";

const TakeAttendance = () => {
  return <div>TakeAttendance</div>;
};

export default TakeAttendance;
