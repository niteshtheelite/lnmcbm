import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
        toast({
          title: "Error",
          description: "Failed to fetch options. Please try again.",
          variant: "destructive",
        });
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

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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

      toast({
        title: "Success",
        description: "Student added successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        rollNumber: "",
        course: "",
        semester: "",
        section: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add student",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Student
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter student name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Roll Number</label>
              <Input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                placeholder="Enter roll number"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select
                value={formData.course}
                onValueChange={(value) => handleSelectChange(value, "course")}
                required
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent className="z-50 w-full text-center">
                  {options.courses.map((course) => (
                    <SelectItem
                      key={course._id}
                      value={course._id}
                      className="text-center"
                    >
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Semester</label>
              <Select
                value={formData.semester}
                onValueChange={(value) => handleSelectChange(value, "semester")}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {options.semesters.map((semester) => (
                    <SelectItem key={semester._id} value={semester._id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Section</label>
              <Select
                value={formData.section}
                onValueChange={(value) => handleSelectChange(value, "section")}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {options.sections.map((section) => (
                    <SelectItem key={section._id} value={section._id}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding Student..." : "Add Student"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
