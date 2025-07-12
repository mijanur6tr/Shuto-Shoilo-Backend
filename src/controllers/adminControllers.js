import jwt from 'jsonwebtoken';

export const loginAdmin = (req, res) => {
  console.log("Login Attempt:", req.body);

  const { email, password } = req.body;

  console.log("Received:", email, password);
  console.log("Expected:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    console.log("Unauthorized access");
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });

  return res.status(200).json({ success: true, token });
};
