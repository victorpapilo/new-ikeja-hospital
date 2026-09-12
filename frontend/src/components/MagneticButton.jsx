import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ as: Component = "button", className = "", children, strength = 14, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
