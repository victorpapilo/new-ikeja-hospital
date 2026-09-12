import Doctor from "../models/Doctor.js";

// GET /api/doctors -> public, list active doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ active: true }).sort({ order: 1 });
    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch doctors.", error: error.message });
  }
};

// POST /api/admin/doctors -> admin only
export const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not create doctor.", error: error.message });
  }
};
