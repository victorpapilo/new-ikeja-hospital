import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import Reveal from "../components/Reveal.jsx";
import { fetchDoctors } from "../api.js";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors()
      .then((res) => setDoctors(res.data.data))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <section className="pt-16 pb-24">
        <div className="container-hosp">
          <Reveal>
            <p className="eyebrow mb-4">Our doctors</p>
            <h1 className="font-display text-4xl sm:text-5xl text-navy max-w-2xl leading-tight">
              Consultants who take their time with you.
            </h1>
          </Reveal>

          {loading && <p className="mt-14 text-sm text-navy/50">Loading doctor profiles…</p>}

          {!loading && doctors.length === 0 && (
            <p className="mt-14 text-sm text-navy/50 max-w-md">
              No doctor profiles yet. Run <code className="bg-sand/60 px-1.5 py-0.5 rounded">npm run seed</code> in
              the backend folder to add starter profiles, then edit them from your database.
            </p>
          )}

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doc, i) => (
              <Reveal key={doc._id} delay={(i % 3) * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="rounded-2xl bg-white shadow-soft overflow-hidden h-full">
                  <img
                    src={doc.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(doc.name)}&backgroundColor=0C6E64,17A896&backgroundType=solid`}
                    alt={doc.name}
                    className="h-64 w-full object-cover bg-teal-50"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-lg text-navy">{doc.name}</h3>
                    <p className="text-xs text-teal-700 mt-1">{doc.title}</p>
                    <p className="mt-3 text-sm text-navy/65 leading-relaxed">{doc.bio}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
