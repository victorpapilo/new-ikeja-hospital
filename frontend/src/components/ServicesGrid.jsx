import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Stethoscope, HeartPulse, Baby, Scissors, ClipboardCheck, FlaskConical } from "lucide-react";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";

const services = [
  {
    icon: Stethoscope,
    title: "General practice",
    desc: "Same-week consultations for everyday illness, checkups and referrals.",
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: HeartPulse,
    title: "Obstetrics & gynaecology",
    desc: "Antenatal care, delivery and postnatal support from a dedicated maternity team.",
    photo: "https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Baby,
    title: "Paediatrics",
    desc: "Newborn screening through to teenage care, in a calm, child-friendly ward.",
    photo: "https://images.unsplash.com/photo-1517120026326-d87759a7b63b?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Scissors,
    title: "Surgery",
    desc: "Elective and emergency surgical care with modern theatre facilities.",
    photo: "https://images.unsplash.com/photo-1549560826-4b7bfe23f37b?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: ClipboardCheck,
    title: "NIHSS staff screening",
    desc: "Pre-employment and periodic health screening for companies across Lagos.",
    photo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: FlaskConical,
    title: "Laboratory & imaging",
    desc: "On-site diagnostics with same-day results for most routine tests.",
    photo: "https://images.unsplash.com/photo-1521089542882-2e5f5df7cae7?w=700&h=520&fit=crop&auto=format&q=80",
  },
];

export default function ServicesGrid() {
  return (
    <section className="stripes-bg-light py-24 bg-sand/40">
      <div className="container-hosp">
        <Reveal>
          <p className="eyebrow mb-4">What we treat</p>
          <h2 className="font-display text-3xl sm:text-4xl text-navy max-w-xl leading-tight">
            Care across the specialties your family actually needs.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <TiltCard max={6} className="h-full overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-card transition-shadow">
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                  <div className="relative h-40 overflow-hidden">
                    <img src={s.photo} alt={s.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                    <div className="absolute -bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-card">
                      <s.icon className="h-6 w-6 text-teal-600" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="p-6 pt-8">
                    <h3 className="font-display text-xl text-navy">{s.title}</h3>
                    <p className="mt-2 text-sm text-navy/65 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-7 py-3 text-sm font-semibold text-navy hover:border-teal-500 hover:text-teal-700 transition-colors"
          >
            View all services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
