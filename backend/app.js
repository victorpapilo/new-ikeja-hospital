import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import appointmentRoutes from "./routes/appointments.js";
import contactRoutes from "./routes/contact.js";
import doctorRoutes from "./routes/doctors.js";
import testimonialRoutes from "./routes/testimonials.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// --- middleware ---
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);

// Limit how many times one IP can hit the write endpoints, to stop spam/abuse
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/appointments", limiter);
app.use("/api/contact", limiter);

// --- routes ---
app.get("/", (req, res) => {
  res.json({ message: "New Ikeja Hospital API is running." });
});
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
