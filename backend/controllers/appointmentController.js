import Appointment from "../models/Appointment.js";

// POST /api/appointments  -> patient books an appointment
export const createAppointment = async (req, res) => {
  try {
    const { fullName, phone, department, preferredDate, preferredTime } = req.body;

    if (!fullName || !phone || !department || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone, department, date and time are required.",
      });
    }

    const appointment = await Appointment.create(req.body);
    res.status(201).json({
      success: true,
      message: "Appointment request received. Our team will call to confirm shortly.",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not create appointment.", error: error.message });
  }
};

// GET /api/admin/appointments -> admin only, list all
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch appointments.", error: error.message });
  }
};

// PATCH /api/admin/appointments/:id -> admin only, update status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }
    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update appointment.", error: error.message });
  }
};
