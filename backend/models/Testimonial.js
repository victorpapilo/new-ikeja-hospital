import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
