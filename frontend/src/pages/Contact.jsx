import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import Reveal from "../components/Reveal.jsx";
import LocationMap from "../components/LocationMap.jsx";
import { sendContactMessage } from "../api.js";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      await sendContactMessage(form);
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
        <div className="container-hosp">
          <Reveal>
            <p className="eyebrow mb-4">Get in touch</p>
            <h1 className="font-display text-4xl sm:text-5xl text-navy max-w-2xl leading-tight">
              We're here whenever you need us.
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-2">
            <Reveal>
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
                      <h2 className="mt-5 font-display text-2xl text-navy">Message sent</h2>
                      <p className="mt-2 text-navy/65">Thanks for reaching out — we'll reply as soon as we can.</p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-sm font-semibold text-teal-700 hover:text-teal-900"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="grid gap-5"
                    >
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-navy/80">Full name *</span>
                        <input required value={form.name} onChange={update("name")} className="input" />
                      </label>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-navy/80">Email *</span>
                          <input required type="email" value={form.email} onChange={update("email")} className="input" />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-navy/80">Phone (optional)</span>
                          <input value={form.phone} onChange={update("phone")} className="input" type="tel" />
                        </label>
                      </div>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-navy/80">Subject</span>
                        <input value={form.subject} onChange={update("subject")} className="input" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-navy/80">Message *</span>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={update("message")}
                          className="input resize-none"
                        />
                      </label>

                      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === "submitting"}
                        className="mt-1 rounded-full bg-teal-600 py-3.5 text-sm font-semibold text-white shadow-soft disabled:opacity-60"
                      >
                        {status === "submitting" ? "Sending…" : "Send message"}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="space-y-8">
              <LocationMap />
              <div className="grid gap-6 sm:grid-cols-2 text-sm text-navy/70">
                <div>
                  <p className="font-semibold text-navy mb-1">Address</p>
                  <p>13 Gbajobi Street, Allen, Ikeja, Lagos</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Phone</p>
                  <p>0703 509 9735</p>
                  <p>0708 000 0817</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Email</p>
                  <p>info@newikejahospital.com</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Hours</p>
                  <p>Outpatient: Mon–Sat, 8am–6pm</p>
                  <p>Emergency: 24/7</p>
                </div>
              </div>
            </Reveal>
          </div>
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
        .input:focus { border-color: #17A896; outline: none; }
      `}</style>
    </PageShell>
  );
}
