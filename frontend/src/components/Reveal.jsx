import { motion } from "framer-motion";

/**
 * Wraps any content and fades/slides it in once when it scrolls into view.
 * delay: stagger children by passing increasing values (0, 0.1, 0.2...)
 */
export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
