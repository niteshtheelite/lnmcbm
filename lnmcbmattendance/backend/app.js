import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDb from "./db/db.js";

//route import
import studentDetails from "./routes/studentRoute.js";
import courseDetails from "./routes/courseRoute.js";

dotenv.config();
const app = express();
connectToDb();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/student", studentDetails);
app.use("/api/v1/student", courseDetails);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
