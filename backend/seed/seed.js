// Run with: npm run seed
// Populates the database with starter doctors + testimonials so the site
// isn't empty the first time you load it. Edit the arrays below with your
// real staff, then re-run any time to refresh.

import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Doctor from "../models/Doctor.js";
import Testimonial from "../models/Testimonial.js";

dotenv.config();

const doctors = [
  {
    name: "Dr. Adaeze Okafor",
    title: "MBBS, FWACS - Obstetrics & Gynaecology",
    department: "Obstetrics & Gynaecology",
    bio: "Over 12 years caring for mothers across Lagos, from antenatal care through delivery.",
    photoUrl: "https://images.unsplash.com/photo-1678695972687-033fa0bdbac9?w=500&h=500&fit=crop&auto=format&q=80",
    yearsExperience: 12,
    order: 1,
  },
  {
    name: "Dr. Tunde Bakare",
    title: "MBBS, FMCP - Internal Medicine",
    department: "General Practice",
    bio: "Focused on preventive care and chronic disease management for adults.",
    photoUrl: "https://images.unsplash.com/photo-1672655412906-8e10ba6ee373?w=500&h=500&fit=crop&auto=format&q=80",
    yearsExperience: 9,
    order: 2,
  },
  {
    name: "Dr. Ifeoma Chukwu",
    title: "MBBS, FWACP - Paediatrics",
    department: "Paediatrics",
    bio: "Gentle, thorough child healthcare from newborn checks to teenage years.",
    photoUrl: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=500&h=500&fit=crop&auto=format&q=80",
    yearsExperience: 8,
    order: 3,
  },
  {
    name: "Dr. Emeka Nwosu",
    title: "MBBS, FMCS - General Surgery",
    department: "Surgery",
    bio: "Experienced in minimally invasive and emergency surgical care.",
    photoUrl: "https://images.unsplash.com/photo-1666887359800-60e37f543dbd?w=500&h=500&fit=crop&auto=format&q=80",
    yearsExperience: 15,
    order: 4,
  },
];

const testimonials = [
  {
    patientName: "Bimpe A.",
    quote:
      "The staff at New Ikeja Hospital treated my mother with so much care. Booking the appointment online was quick and the doctors actually listened.",
    rating: 5,
  },
  {
    patientName: "Chidi O.",
    quote:
      "I used the NIHSS screening service for my company staff and the whole process was fast, professional and well organised.",
    rating: 5,
  },
  {
    patientName: "Fatima Y.",
    quote:
      "From the front desk to the consultant, everyone was warm and efficient. This is what healthcare in Lagos should feel like.",
    rating: 5,
  },
];

const run = async () => {
  await connectDB();
  await Doctor.deleteMany();
  await Testimonial.deleteMany();
  await Doctor.insertMany(doctors);
  await Testimonial.insertMany(testimonials);
  console.log("Seed data inserted successfully.");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
