import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    next();
  });
};

export const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: "Access denied" });
  next();
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Admins only" });
    }

    req.user = user; // Store user info in request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyTeacher = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role === "teacher" || req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized: Teachers only" });
    }
  });
};

// Restrict access to Students only
export const verifyStudent = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role === "student" || req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized: Students only" });
    }
  });
};
