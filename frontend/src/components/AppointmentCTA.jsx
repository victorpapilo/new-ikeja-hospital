import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "./Reveal.jsx";

export default function AppointmentCTA() {
  return (
    <section className="py-24">
      <div className="container-hosp">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 bg-teal-600 px-8 py-16 text-center sm:px-16">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="font-display text-3xl sm:text-4xl text-white max-w-2xl mx-auto leading-tight">
              Ready to be seen properly? Book your appointment today.
            </h2>
            <p className="mt-4 text-teal-50/90 max-w-xl mx-auto">
              Choose your department, pick a time, and our team will call to confirm — usually within the hour.
            </p>
            <Link
              to="/appointment"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-700 shadow-card transition-transform hover:scale-[1.03]"
            >
              Book an appointment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
