import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    semesterId: "",
    sectionId: "",
    name: "",
    rollNumber: "",
  });
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/course/allCourse"),
      axios.get("http://localhost:8000/api/v1/semester/allSemester"),
      axios.get("http://localhost:8000/api/v1/duration/allDuration"),
      axios
        .get("http://localhost:8000/api/v1/student/createStudent")
        .then((res) => setStudents(res.data));
  }, []);

  const handleSubmit = async () => {
    await axios.post("/api/students", formData);
    setFormData({
      courseId: "",
      semesterId: "",
      sectionId: "",
      name: "",
      rollNumber: "",
    });
    alert("Student added successfully");
  };

  const handleAttendanceSubmit = async () => {
    await axios.post("/api/attendance", {
      students: Object.entries(attendance).map(([id, present]) => ({
        studentId: id,
        present,
      })),
    });
    alert("Attendance submitted!");
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Add Student</h2>
          <div className="flex gap-4 mb-4">
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, courseId: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, semesterId: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, sectionId: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Student Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={(e) =>
              setFormData({ ...formData, rollNumber: e.target.value })
            }
          />
          <Button onClick={handleSubmit} className="mt-4">
            Add Student
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold my-4">Student List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Roll Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.rollNumber}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>
                <input
                  type="checkbox"
                  checked={attendance[student._id]}
                  onChange={(e) =>
                    setAttendance({
                      ...attendance,
                      [student._id]: e.target.checked,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Input
                      defaultValue={student.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <Button
                      onClick={() =>
                        axios
                          .put(`/api/students/${student._id}`, {
                            name: formData.name,
                          })
                          .then(() => alert("Updated!"))
                      }
                    >
                      Save
                    </Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() =>
                    axios
                      .delete(`/api/students/${student._id}`)
                      .then(() => alert("Deleted!"))
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={handleAttendanceSubmit}>
        Submit Attendance
      </Button>
    </div>
  );
}
