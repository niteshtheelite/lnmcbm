import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttendanceForm from "./allcomponents/AttendanceFrom";
// import AdminDashboard from "./allcomponents/AdminDashboard";
// import AdminDashboards from "./allcomponents/AdminDashboards";
import StudentFrom from "./pages/StudentForm";
import AttendancePercentage from "./pages/AttendancePercentage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<AttendanceForm />} />
          {/* <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admins" element={<AdminDashboards />} /> */}
          <Route path="/add" element={<StudentFrom />} />
          <Route path="/per" element={<AttendancePercentage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
