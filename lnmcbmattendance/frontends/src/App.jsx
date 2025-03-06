import { BrowserRouter, Routes, Route } from "react-router";
import StudentList from "./pages/students/StudentList.jsx";
import UpdateStudent from "./pages/students/UpdateStudent.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/list" element={<StudentList />} />
          <Route path="/update" element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
