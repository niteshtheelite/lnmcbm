import React, { useState } from "react";
import { Users, UserPlus, Calendar, Menu, X, Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboards = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      rollNumber: "CSE001",
      course: "Computer Science",
      section: "A",
      semester: "3rd",
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    course: "",
    section: "",
    semester: "",
  });

  const courses = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ];
  const sections = ["A", "B", "C", "D"];
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleAddStudent = () => {
    if (
      !newStudent.name ||
      !newStudent.rollNumber ||
      !newStudent.course ||
      !newStudent.section ||
      !newStudent.semester
    ) {
      alert("Please fill all fields");
      return;
    }

    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    setNewStudent({
      name: "",
      rollNumber: "",
      course: "",
      section: "",
      semester: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <h1 className="text-xl font-bold ml-2">
              Student Attendance System
            </h1>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed lg:static lg:translate-x-0
          z-20 bg-white shadow-lg
          w-64 min-h-[calc(100vh-64px)]
          transition-transform duration-300
        `}
        >
          <nav className="p-4 space-y-2">
            {[
              { name: "Students List", icon: <Users className="h-4 w-4" /> },
              { name: "Add Student", icon: <UserPlus className="h-4 w-4" /> },
              { name: "Attendance", icon: <Calendar className="h-4 w-4" /> },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="students">Students List</TabsTrigger>
              <TabsTrigger value="add-student">Add Student</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            {/* Students List Tab */}
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Students List</CardTitle>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search students..."
                        className="w-64"
                        icon={<Search className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Roll Number</th>
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Course</th>
                          <th className="text-left py-3 px-4">Section</th>
                          <th className="text-left py-3 px-4">Semester</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-b">
                            <td className="py-3 px-4">{student.rollNumber}</td>
                            <td className="py-3 px-4">{student.name}</td>
                            <td className="py-3 px-4">{student.course}</td>
                            <td className="py-3 px-4">{student.section}</td>
                            <td className="py-3 px-4">{student.semester}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Student Tab */}
            <TabsContent value="add-student">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Full Name</Label>
                      <Input
                        value={newStudent.name}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        placeholder="Enter student name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Roll Number</Label>
                      <Input
                        value={newStudent.rollNumber}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            rollNumber: e.target.value,
                          })
                        }
                        placeholder="Enter roll number"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Course</Label>
                      <Select
                        value={newStudent.course}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, course: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Section</Label>
                      <Select
                        value={newStudent.section}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, section: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          {sections.map((section) => (
                            <SelectItem key={section} value={section}>
                              Section {section}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Semester</Label>
                      <Select
                        value={newStudent.semester}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, semester: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((semester) => (
                            <SelectItem key={semester} value={semester}>
                              {semester} Semester
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddStudent} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboards;
