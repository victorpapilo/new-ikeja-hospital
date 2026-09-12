import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-ivory/80">
      <div className="container-hosp py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
              <img src={logo} alt="New Ikeja Hospital logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-white text-lg">New Ikeja Hospital</span>
          </div>
          <p className="text-sm leading-relaxed">
            Private hospital in the heart of Ikeja, Lagos — general practice, maternity, paediatrics,
            surgery and workplace screening through NIHSS.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">Quick links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-teal-400 transition-colors">About us</Link></li>
            <li><Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link></li>
            <li><Link to="/doctors" className="hover:text-teal-400 transition-colors">Our doctors</Link></li>
            <li><Link to="/appointment" className="hover:text-teal-400 transition-colors">Book an appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">Visit us</h4>
          <ul className="space-y-2 text-sm">
            <li>13 Gbajobi Street, Allen, Ikeja, Lagos</li>
            <li>
              <a href="tel:+2347035099735" className="hover:text-teal-400 transition-colors">0703 509 9735</a>
            </li>
            <li>
              <a href="tel:+2347080000817" className="hover:text-teal-400 transition-colors">0708 000 0817</a>
            </li>
            <li>
              <a href="mailto:info@newikejahospital.com" className="hover:text-teal-400 transition-colors">
                info@newikejahospital.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">Opening hours</h4>
          <ul className="space-y-2 text-sm">
            <li>Emergency care: 24/7</li>
            <li>Outpatient clinics: Mon–Sat, 8am–6pm</li>
            <li>NIHSS screening: Mon–Fri, 9am–4pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-hosp py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/60">
          <p>&copy; {year} New Ikeja Hospital. All rights reserved.</p>
          <p className="flex items-center gap-4">
            Built for patients in Ikeja, Lagos, Nigeria.
            <Link to="/admin" className="text-ivory/40 hover:text-teal-400">Staff login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
