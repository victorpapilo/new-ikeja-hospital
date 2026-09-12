import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Years serving Ikeja" },
  { value: 40, suffix: "+", label: "Resident & visiting doctors" },
  { value: 12000, suffix: "+", label: "Patients cared for" },
  { value: 24, suffix: "/7", label: "Emergency response" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl text-white sm:text-5xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-navy py-20">
      <div className="container-hosp grid grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-sm text-ivory/60">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
