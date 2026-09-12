import express from "express";
import jwt from "jsonwebtoken";
import { requireAdmin } from "../middleware/auth.js";
import { getAppointments, updateAppointmentStatus } from "../controllers/appointmentController.js";
import { getContactMessages } from "../controllers/contactController.js";
import { createDoctor } from "../controllers/doctorController.js";
import { createTestimonial } from "../controllers/testimonialController.js";

const router = express.Router();

// POST /api/admin/login -> staff login, returns a token to use on the routes below
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "12h" });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: "Invalid email or password." });
});

// Everything below this line requires a valid admin token
router.use(requireAdmin);

router.get("/appointments", getAppointments);
router.patch("/appointments/:id", updateAppointmentStatus);
router.get("/contact", getContactMessages);
router.post("/doctors", createDoctor);
router.post("/testimonials", createTestimonial);

export default router;
