import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    department: {
      type: String,
      required: true,
      enum: [
        "General Practice",
        "Obstetrics & Gynaecology",
        "Paediatrics",
        "Cardiology",
        "Surgery",
        "Screening Services (NIHSS)",
        "Laboratory & Diagnostics",
        "Dental",
        "Other",
      ],
    },
    preferredDoctor: { type: String, trim: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
