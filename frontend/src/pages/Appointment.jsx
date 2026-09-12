import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import Reveal from "../components/Reveal.jsx";
import { bookAppointment } from "../api.js";

const departments = [
  "General Practice",
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Cardiology",
  "Surgery",
  "Screening Services (NIHSS)",
  "Laboratory & Diagnostics",
  "Dental",
  "Other",
];

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  department: "",
  preferredDoctor: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export default function Appointment() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await bookAppointment(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.response?.data?.message || "Something went wrong. Please call us instead.");
    }
  };

  return (
    <PageShell>
      <section className="pt-16 pb-24">
        <div className="container-hosp grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="eyebrow mb-4">Book an appointment</p>
            <h1 className="font-display text-4xl text-navy leading-tight">
              Tell us what you need — we'll call to confirm.
            </h1>
            <p className="mt-5 text-navy/70 leading-relaxed max-w-md">
              Fill in the form and our front desk will call you within business hours to confirm your
              slot. For emergencies, please call{" "}
              <a href="tel:+2347080000817" className="font-semibold text-teal-700">
                0708 000 0817
              </a>{" "}
              directly instead of booking online.
            </p>

            <div className="mt-10 space-y-4 text-sm text-navy/70">
              <p><span className="font-semibold text-navy">Address:</span> 13 Gbajobi Street, Allen, Ikeja, Lagos</p>
              <p><span className="font-semibold text-navy">Phone:</span> 0703 509 9735 / 0708 000 0817</p>
              <p><span className="font-semibold text-navy">Hours:</span> Outpatient Mon–Sat, 8am–6pm · Emergency 24/7</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-white p-6 shadow-card sm:p-9">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 text-3xl">
                      ✓
                    </div>
                    <h2 className="mt-5 font-display text-2xl text-navy">Request received</h2>
                    <p className="mt-2 text-navy/65">
                      Thank you. Our team will call you shortly to confirm your appointment time.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-semibold text-teal-700 hover:text-teal-900"
                    >
                      Book another appointment
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <Field label="Full name" required className="sm:col-span-2">
                      <input
                        required
                        value={form.fullName}
                        onChange={update("fullName")}
                        className="input"
                        placeholder="e.g. Chidinma Okeke"
                      />
                    </Field>

                    <Field label="Phone number" required>
                      <input
                        required
                        value={form.phone}
                        onChange={update("phone")}
                        className="input"
                        placeholder="080..."
                        type="tel"
                      />
                    </Field>

                    <Field label="Email (optional)">
                      <input
                        value={form.email}
                        onChange={update("email")}
                        className="input"
                        placeholder="you@email.com"
                        type="email"
                      />
                    </Field>

                    <Field label="Department" required className="sm:col-span-2">
                      <select required value={form.department} onChange={update("department")} className="input">
                        <option value="" disabled>
                          Choose a department
                        </option>
                        {departments.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Preferred date" required>
                      <input
                        required
                        type="date"
                        value={form.preferredDate}
                        onChange={update("preferredDate")}
                        className="input"
                      />
                    </Field>

                    <Field label="Preferred time" required>
                      <input
                        required
                        type="time"
                        value={form.preferredTime}
                        onChange={update("preferredTime")}
                        className="input"
                      />
                    </Field>

                    <Field label="Anything we should know? (optional)" className="sm:col-span-2">
                      <textarea
                        value={form.message}
                        onChange={update("message")}
                        rows={3}
                        className="input resize-none"
                        placeholder="Briefly describe your symptoms or reason for visit"
                      />
                    </Field>

                    {status === "error" && (
                      <p className="sm:col-span-2 text-sm text-red-600">{errorMsg}</p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={status === "submitting"}
                      className="sm:col-span-2 mt-2 rounded-full bg-teal-600 py-3.5 text-sm font-semibold text-white shadow-soft disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending…" : "Request appointment"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(11,31,42,0.12);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          background: #fff;
        }
        .input:focus {
          border-color: #17A896;
          outline: none;
        }
      `}</style>
    </PageShell>
  );
}

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-navy/80">
        {label} {required && <span className="text-amber">*</span>}
      </span>
      {children}
    </label>
  );
}
