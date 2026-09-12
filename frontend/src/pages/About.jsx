import PageShell from "../components/PageShell.jsx";
import Reveal from "../components/Reveal.jsx";
import AppointmentCTA from "../components/AppointmentCTA.jsx";

const values = [
  { title: "Patients first", desc: "Every decision starts with what's best for the person in front of us." },
  { title: "Clear communication", desc: "No confusing jargon — you leave every consultation understanding your care." },
  { title: "Modern standards", desc: "Equipment and protocols benchmarked against international best practice." },
];

export default function About() {
  return (
    <PageShell>
      <section className="pt-16 pb-20">
        <div className="container-hosp">
          <Reveal>
            <p className="eyebrow mb-4">About us</p>
            <h1 className="font-display text-4xl sm:text-5xl text-navy max-w-2xl leading-tight">
              Built in Ikeja, for the people of Ikeja.
            </h1>
            <p className="mt-6 max-w-2xl text-navy/70 leading-relaxed text-lg">
              Founded in 1978, New Ikeja Hospital sits on Gbajobi Street in Allen, offering general
              practice, maternity, paediatric, surgical and diagnostic care under one roof. Our screening
              subsidiary, NIHSS, partners with companies across Lagos to keep their workforce healthy
              through regular, well-organised medical screening.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="rounded-2xl bg-white p-8 shadow-soft h-full">
                  <h3 className="font-display text-xl text-navy">{v.title}</h3>
                  <p className="mt-3 text-sm text-navy/65 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-16 rounded-xl2 overflow-hidden shadow-card">
            <img
              src="https://images.unsplash.com/photo-1521089542882-2e5f5df7cae7?w=1400&h=600&fit=crop&auto=format&q=80"
              alt="Stethoscope and medical equipment at New Ikeja Hospital"
              className="h-72 w-full object-cover sm:h-96"
            />
          </Reveal>
        </div>
      </section>
      <AppointmentCTA />
    </PageShell>
  );
}
