import jwt from "jsonwebtoken";

// Protects the /api/admin/* routes. The admin logs in once (see routes/admin.js),
// gets a token back, and sends it as "Authorization: Bearer <token>" on every
// request that should be restricted to hospital staff.
export const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not authorized. Please log in." });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
  }
};
