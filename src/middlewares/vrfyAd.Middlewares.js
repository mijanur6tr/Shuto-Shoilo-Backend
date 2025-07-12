import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    if (decoded.role !== "admin") {
      throw new Error("Unauthorized");
    }
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
