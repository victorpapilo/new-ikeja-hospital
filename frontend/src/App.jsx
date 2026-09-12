import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Doctors from "./pages/Doctors.jsx";
import Appointment from "./pages/Appointment.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grain-overlay" />
      <TopBar />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
