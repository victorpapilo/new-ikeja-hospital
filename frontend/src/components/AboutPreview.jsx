import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";

export default function AboutPreview() {
  return (
    <section className="py-24">
      <div className="container-hosp grid gap-14 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?w=800&h=900&fit=crop&auto=format&q=80"
              alt="New Ikeja Hospital clinical team"
              className="rounded-xl2 shadow-card object-cover h-[420px] w-full"
            />
            <div className="absolute -bottom-8 -right-6 hidden sm:block rounded-2xl bg-teal-600 p-6 text-white shadow-card max-w-[220px]">
              <p className="font-display text-xl">"Care that remembers your name."</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow mb-4">About New Ikeja Hospital</p>
          <h2 className="font-display text-3xl sm:text-4xl text-navy leading-tight">
            A neighbourhood hospital, built to a world-class standard.
          </h2>
          <p className="mt-5 text-navy/70 leading-relaxed max-w-xl">
            Since 1976, New Ikeja Hospital has combined attentive, unhurried consultations with modern
            diagnostic equipment on Gbajobi Street in Allen, Ikeja. Our subsidiary, NIHSS, runs
            comprehensive workplace health screening for companies across Lagos — because a healthy team
            starts with regular checks.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Resident consultants across major specialties",
              "On-site laboratory and diagnostic imaging",
              "24-hour emergency and ambulance response",
              "Dedicated maternity and newborn care",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-navy/80">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
          >
            Learn more about us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
