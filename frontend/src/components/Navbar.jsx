import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Doctors" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-4 px-4">
      <motion.nav
        animate={{
          boxShadow: scrolled ? "0 18px 40px -18px rgba(11,31,42,0.28)" : "0 0px 0px rgba(0,0,0,0)",
        }}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-navy/10 bg-white/85 px-4 py-2.5 backdrop-blur-xl sm:px-6"
      >
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <motion.span
            whileHover={{ rotate: 10, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-teal-100"
          >
            <img src={logo} alt="New Ikeja Hospital logo" className="h-full w-full object-cover" />
          </motion.span>
          <span className="font-display text-base leading-tight text-navy hidden sm:block">
            New Ikeja<br />Hospital
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive ? "text-teal-700" : "text-navy/70 hover:text-navy"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-teal-100"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/appointment"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-teal-500 pl-5 pr-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Book appointment
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-navy"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-navy/10 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-medium ${isActive ? "bg-teal-100 text-teal-700" : "text-navy/80"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/appointment"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-full bg-teal-500 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Book appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
