import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Stethoscope } from "lucide-react";
import TiltCard from "./TiltCard.jsx";
import MagneticButton from "./MagneticButton.jsx";

const leadWords = "Healthcare that treats".split(" ");
const gradientWord = "Lagos";
const tailWords = "like family.".split(" ");

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.045 } } };
const word = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const quickFacts = [
  { icon: Clock, label: "Same-week appointments" },
  { icon: ShieldCheck, label: "NHIS accepted" },
  { icon: Stethoscope, label: "24/7 emergency care" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-32 md:pt-20 md:pb-40">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-teal-200/50 blur-3xl"
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-amber/20 blur-3xl"
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container-hosp grid gap-x-16 gap-y-24 lg:grid-cols-[1.05fr_0.95fr] items-center relative">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Private hospital · Est. 1976 · Allen, Ikeja
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-5 font-display text-[2.75rem] sm:text-6xl lg:text-[4.2rem] leading-[1.02] tracking-tight text-navy"
          >
            {leadWords.map((w, i) => (
              <motion.span key={`a-${i}`} variants={word} className="inline-block mr-3">
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={word}
              className="inline-block mr-3 italic bg-gradient-to-r from-teal-500 via-teal-400 to-amber bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto" }}
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              {gradientWord}
            </motion.span>
            {tailWords.map((w, i) => (
              <motion.span key={`b-${i}`} variants={word} className="inline-block mr-3">
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-7 max-w-lg text-lg text-navy/65 leading-relaxed"
          >
            From general practice to maternity, paediatrics and workplace screening through NIHSS —
            modern, unhurried care on Gbajobi Street, Allen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as={Link}
              to="/appointment"
              className="inline-block rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-teal-600"
            >
              Book an appointment
            </MagneticButton>
            <MagneticButton
              as="a"
              href="tel:+2347035099735"
              strength={10}
              className="inline-block rounded-full border border-navy/15 px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-teal-400 hover:text-teal-700"
            >
              Call 0703 509 9735
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-navy/10 pt-6"
          >
            {quickFacts.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-navy/60">
                <Icon className="h-4 w-4 text-teal-500" strokeWidth={2} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* photo collage */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <TiltCard className="blob-mask overflow-hidden shadow-card" max={5}>
              <img
                src="https://images.unsplash.com/photo-1672655412906-8e10ba6ee373?w=900&h=1000&fit=crop&auto=format&q=80"
                alt="Nigerian doctor consulting with a patient at New Ikeja Hospital"
                className="h-[420px] w-full object-cover sm:h-[480px] md:h-[520px]"
              />
            </TiltCard>

            {/* secondary collage photo, overlapping */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-8 -bottom-10 w-36 sm:w-44 blob-mask-alt overflow-hidden border-4 border-ivory shadow-card"
            >
              <img
                src="https://images.unsplash.com/photo-1521089542882-2e5f5df7cae7?w=300&h=340&fit=crop&auto=format&q=80"
                alt="Diagnostic equipment at New Ikeja Hospital"
                className="h-36 w-full object-cover sm:h-44"
              />
            </motion.div>

            {/* sticker-style stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ delay: 0.9, duration: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="absolute -right-4 top-6 sm:-right-8 sm:top-10 rounded-2xl bg-navy px-5 py-4 text-white shadow-card"
            >
              <p className="font-display text-2xl leading-none">50+</p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-wide text-white/60">years in Ikeja</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
