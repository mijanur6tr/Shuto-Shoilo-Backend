import jwt from 'jsonwebtoken';

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
};
