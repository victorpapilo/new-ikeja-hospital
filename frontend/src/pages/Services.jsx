import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope, HeartPulse, Baby, Scissors, Activity, ClipboardCheck,
  FlaskConical, Smile, Siren, Bone, Eye, Ear, PersonStanding, Users,
} from "lucide-react";
import PageShell from "../components/PageShell.jsx";
import Reveal from "../components/Reveal.jsx";
import TiltCard from "../components/TiltCard.jsx";

const services = [
  {
    icon: Stethoscope, title: "General practice",
    desc: "Consultations, checkups, vaccinations and referrals for the whole family.",
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: HeartPulse, title: "Obstetrics & gynaecology",
    desc: "Antenatal care, delivery, postnatal support and women's health checks.",
    photo: "https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Baby, title: "Paediatrics",
    desc: "Newborn screening, growth monitoring and care through the teenage years.",
    photo: "https://images.unsplash.com/photo-1517120026326-d87759a7b63b?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Scissors, title: "General & specialist surgery",
    desc: "Elective and emergency procedures with modern theatre facilities.",
    photo: "https://images.unsplash.com/photo-1549560826-4b7bfe23f37b?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Activity, title: "Cardiology",
    desc: "Heart health checks, ECG and ongoing management of cardiac conditions.",
    photo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: ClipboardCheck, title: "NIHSS staff screening",
    desc: "Pre-employment and periodic screening packages for Lagos businesses.",
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: FlaskConical, title: "Laboratory & diagnostics",
    desc: "On-site testing with same-day results for most routine panels.",
    photo: "https://images.unsplash.com/photo-1521089542882-2e5f5df7cae7?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Smile, title: "Dental care",
    desc: "Routine checkups, cleaning and restorative dental treatment.",
    photo: "https://images.unsplash.com/photo-1684607633251-8a4a8d94ddd2?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Siren, title: "Emergency care",
    desc: "24-hour emergency room with ambulance response across Ikeja.",
    photo: "https://images.unsplash.com/photo-1521089542882-2e5f5df7cae7?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Bone, title: "Orthopedics",
    desc: "Diagnosis and treatment of bone, joint and muscle injuries.",
    photo: "https://images.unsplash.com/photo-1549560826-4b7bfe23f37b?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Eye, title: "Ophthalmology (eye care)",
    desc: "Eye tests, glaucoma screening and treatment for vision problems.",
    photo: "https://images.unsplash.com/photo-1576210117723-cd06449a467d?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Ear, title: "ENT (ear, nose & throat)",
    desc: "Diagnosis and treatment for ear, nose, throat and sinus conditions.",
    photo: "https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: PersonStanding, title: "Physiotherapy",
    desc: "Rehabilitation and pain management for injury and mobility issues.",
    photo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    icon: Users, title: "Family planning & counselling",
    desc: "Confidential reproductive health advice and family planning services.",
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=520&fit=crop&auto=format&q=80",
  },
];

export default function Services() {
  return (
    <PageShell>
      <section className="stripes-bg-light pt-16 pb-24">
        <div className="container-hosp">
          <Reveal>
            <p className="eyebrow mb-4">Our services</p>
            <h1 className="font-display text-4xl sm:text-5xl text-navy max-w-2xl leading-tight tracking-tight">
              Everything your family needs, in one hospital.
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
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
                      <Link
                        to="/appointment"
                        className="mt-4 inline-block text-sm font-semibold text-teal-700 hover:text-teal-900"
                      >
                        Book this service
                      </Link>
                    </div>
                  </motion.div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
