import Testimonial from "../models/Testimonial.js";

// GET /api/testimonials -> public, approved only
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch testimonials.", error: error.message });
  }
};

// POST /api/admin/testimonials -> admin only
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not create testimonial.", error: error.message });
  }
};
