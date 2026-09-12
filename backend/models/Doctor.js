import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true }, // e.g. "MBBS, FWACS"
    department: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    photoUrl: { type: String, trim: true },
    yearsExperience: { type: Number, default: 0 },
    order: { type: Number, default: 0 }, // controls display order on the site
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
