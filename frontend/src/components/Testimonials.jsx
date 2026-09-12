import { useEffect, useState } from "react";
import { fetchTestimonials } from "../api.js";
import Reveal from "./Reveal.jsx";

const fallback = [
  {
    _id: "1",
    patientName: "Bimpe A.",
    quote:
      "The staff at New Ikeja Hospital treated my mother with so much care. Booking the appointment online was quick and the doctors actually listened.",
    rating: 5,
  },
  {
    _id: "2",
    patientName: "Chidi O.",
    quote:
      "I used the NIHSS screening service for my company staff and the whole process was fast, professional and well organised.",
    rating: 5,
  },
  {
    _id: "3",
    patientName: "Fatima Y.",
    quote:
      "From the front desk to the consultant, everyone was warm and efficient. This is what healthcare in Lagos should feel like.",
    rating: 5,
  },
  {
    _id: "4",
    patientName: "Segun O.",
    quote:
      "My daughter was scared of hospitals until we came here. The paediatric team was patient with her and explained everything kindly.",
    rating: 5,
  },
  {
    _id: "5",
    patientName: "Ngozi E.",
    quote:
      "Emergency care at 2am and they still treated us like we mattered. Wait time was short and the doctor on call was excellent.",
    rating: 5,
  },
  {
    _id: "6",
    patientName: "Kunle A.",
    quote:
      "50 years in Ikeja and it shows — this place runs like they've done it a million times, in the best way possible.",
    rating: 5,
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl bg-white/5 border border-white/10 p-7 sm:w-[380px]">
      <div className="flex gap-1 text-amber mb-4">
        {Array.from({ length: t.rating || 5 }).map((_, idx) => (
          <span key={idx}>★</span>
        ))}
      </div>
      <p className="text-ivory/80 leading-relaxed">"{t.quote}"</p>
      <p className="mt-5 text-sm font-semibold text-white">{t.patientName}</p>
    </div>
  );
}

export default function Testimonials() {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    fetchTestimonials()
      .then((res) => {
        if (res.data.data?.length) setItems(res.data.data);
      })
      .catch(() => {});
  }, []);

  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden py-24 bg-navy">
      <div className="container-hosp">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 !text-teal-300">Patients, in their words</p>
            <h2 className="font-display text-3xl sm:text-4xl text-white max-w-xl leading-tight">
              What it feels like to be a patient here.
            </h2>
          </div>
          <p className="hidden text-xs text-ivory/40 sm:block">Hover to pause</p>
        </Reveal>
      </div>

      <div className="marquee-group mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-6 animate-marquee">
          {loop.map((t, i) => (
            <TestimonialCard key={`${t._id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
