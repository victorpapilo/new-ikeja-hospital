import { motion } from "framer-motion";

const items = [
  "24/7 Emergency care",
  "NHIS accepted",
  "On-site laboratory",
  "Licensed by Lagos State Ministry of Health",
  "NIHSS workplace screening",
  "Modern maternity ward",
];

export default function TrustMarquee() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-navy/10 bg-white py-4">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-sm font-medium text-navy/60">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
            {item}
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
