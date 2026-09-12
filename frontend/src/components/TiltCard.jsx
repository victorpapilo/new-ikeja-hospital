import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Wraps any content in a card that tilts in 3D toward the cursor and adds a
 * soft moving highlight — a classic "premium product" hover interaction.
 * Use sparingly (hero image, feature cards) rather than on every element.
 */
export default function TiltCard({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [max, -max]);
  const rotateY = useTransform(springX, [0, 1], [-max, max]);
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 55%)`
          ),
        }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
      />
    </motion.div>
  );
}
