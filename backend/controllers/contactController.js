import Contact from "../models/Contact.js";

// POST /api/contact
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required." });
    }
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: "Message sent. We will get back to you soon.", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not send message.", error: error.message });
  }
};

// GET /api/admin/contact -> admin only
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch messages.", error: error.message });
  }
};
