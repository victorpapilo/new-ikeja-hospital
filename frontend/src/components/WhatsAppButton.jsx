import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/2347035099735"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
        <path d="M16.03 3C9.4 3 4 8.36 4 14.95c0 2.3.65 4.44 1.78 6.27L4 29l8.02-1.75a12.9 12.9 0 0 0 4.01.63c6.63 0 12.03-5.36 12.03-11.95C28.06 8.36 22.66 3 16.03 3Zm7.03 17.03c-.3.83-1.5 1.53-2.42 1.72-.65.14-1.5.25-4.36-.93-3.66-1.5-6.02-5.2-6.2-5.44-.18-.25-1.49-1.98-1.49-3.78 0-1.8.94-2.69 1.28-3.06.3-.32.65-.4.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.56.3.72 1 2.5 1.09 2.68.09.18.15.4.03.65-.12.25-.18.4-.36.62-.18.21-.38.47-.55.63-.18.18-.37.37-.16.72.21.36.94 1.56 2.02 2.53 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.68.42.09.15.09.86-.21 1.68Z" />
      </svg>
    </motion.a>
  );
}
