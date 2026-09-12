import PageShell from "../components/PageShell.jsx";
import Hero from "../components/Hero.jsx";
import TrustMarquee from "../components/TrustMarquee.jsx";
import Stats from "../components/Stats.jsx";
import AboutPreview from "../components/AboutPreview.jsx";
import ServicesGrid from "../components/ServicesGrid.jsx";
import DoctorsPreview from "../components/DoctorsPreview.jsx";
import Testimonials from "../components/Testimonials.jsx";
import AppointmentCTA from "../components/AppointmentCTA.jsx";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <TrustMarquee />
      <Stats />
      <AboutPreview />
      <ServicesGrid />
      <DoctorsPreview />
      <Testimonials />
      <AppointmentCTA />
    </PageShell>
  );
}
