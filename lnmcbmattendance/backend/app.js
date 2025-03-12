import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDb from "./db/db.js";

//route import
import studentDetails from "./routes/studentRoute.js";
import courseDetails from "./routes/courseRoute.js";
import sectionDetails from "./routes/sectionRoute.js";
import attendanceDetails from "./routes/attendanceRoute.js";
import semesterDetails from "./routes/semesterRoute.js";
import durationDetails from "./routes/durationRoutes.js";
import authDetails from "./routes/authRoutes.js";

dotenv.config();
const app = express();
connectToDb();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authDetails);
app.use("/api/v1/student", studentDetails);
app.use("/api/v1/course", courseDetails);
app.use("/api/v1/semester", semesterDetails);
app.use("/api/v1/section", sectionDetails);
app.use("/api/v1/duration", durationDetails);
app.use("/api/v1/attendance", attendanceDetails);

export default app;
