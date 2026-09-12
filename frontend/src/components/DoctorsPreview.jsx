import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchDoctors } from "../api.js";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";

export default function DoctorsPreview() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors()
      .then((res) => setDoctors(res.data.data.slice(0, 4)))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24">
      <div className="container-hosp">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Meet the team</p>
            <h2 className="font-display text-3xl sm:text-4xl text-navy max-w-lg leading-tight">
              Consultants who take the time to explain things properly.
            </h2>
          </div>
          <Link to="/doctors" className="text-sm font-semibold text-teal-700 hover:text-teal-900">
            See all doctors
          </Link>
        </Reveal>

        {loading && (
          <p className="mt-12 text-sm text-navy/50">Loading our doctors…</p>
        )}

        {!loading && doctors.length === 0 && (
          <p className="mt-12 text-sm text-navy/50">
            Doctor profiles will appear here once the backend is connected and seeded — see the README.
          </p>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc, i) => (
            <Reveal key={doc._id} delay={i * 0.08}>
              <TiltCard max={8} className="rounded-2xl bg-white shadow-soft hover:shadow-card transition-shadow overflow-hidden">
                <motion.div whileHover={{ y: -4 }}>
                  <img
                    src={doc.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(doc.name)}&backgroundColor=0C6E64,17A896&backgroundType=solid`}
                    alt={doc.name}
                    className="h-56 w-full object-cover bg-teal-50"
                  />
                  <div className="p-5">
                    <h3 className="font-display text-lg text-navy">{doc.name}</h3>
                    <p className="text-xs text-teal-700 mt-1">{doc.department}</p>
                    <p className="text-xs text-navy/50 mt-2">{doc.yearsExperience}+ years experience</p>
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
