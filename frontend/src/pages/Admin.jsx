import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, RefreshCw, CalendarCheck, MessageSquare, Lock } from "lucide-react";
import {
  adminLogin,
  adminGetAppointments,
  adminUpdateAppointmentStatus,
  adminGetContacts,
} from "../api.js";

const STATUS_STYLES = {
  pending: "bg-amber/20 text-amber-900",
  confirmed: "bg-teal-100 text-teal-700",
  completed: "bg-navy/10 text-navy/70",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("nih_admin_token") || "");
  const [checkingSession, setCheckingSession] = useState(!!token);

  const [tab, setTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const loadData = useCallback(
    async (activeToken) => {
      setLoading(true);
      setError("");
      try {
        const [apptRes, contactRes] = await Promise.all([
          adminGetAppointments(activeToken),
          adminGetContacts(activeToken),
        ]);
        setAppointments(apptRes.data.data);
        setContacts(contactRes.data.data);
        setCheckingSession(false);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("nih_admin_token");
          setToken("");
        } else {
          setError("Could not load data. Check that the backend server is running.");
        }
        setCheckingSession(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (token) loadData(token);
  }, [token, loadData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await adminLogin({ email, password });
      localStorage.setItem("nih_admin_token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nih_admin_token");
    setToken("");
    setAppointments([]);
    setContacts([]);
  };

  const handleStatusChange = async (id, status) => {
    setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
    try {
      await adminUpdateAppointmentStatus(token, id, status);
    } catch {
      loadData(token); // revert to server truth if the update failed
    }
  };

  // --- Not logged in: show login screen ---
  if (!token) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
            <Lock className="h-5 w-5 text-teal-600" />
          </div>
          <h1 className="mt-5 text-center font-display text-2xl text-navy">Staff sign in</h1>
          <p className="mt-1 text-center text-sm text-navy/55">
            For hospital staff only — view appointments and messages.
          </p>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-navy/80">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@newikejahospital.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-navy/80">Password</span>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
              />
            </label>

            {loginError && <p className="text-sm text-red-600">{loginError}</p>}

            <button
              disabled={loggingIn}
              className="w-full rounded-full bg-teal-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600 disabled:opacity-60"
            >
              {loggingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-navy/40">
            Credentials are set in the backend's <code>.env</code> file (ADMIN_EMAIL / ADMIN_PASSWORD).
          </p>
        </motion.div>

        <style>{`
          .admin-input {
            width: 100%;
            border-radius: 0.9rem;
            border: 1px solid rgba(11,31,42,0.15);
            padding: 0.7rem 1rem;
            font-size: 0.9rem;
          }
          .admin-input:focus { outline: none; border-color: #1DB2B9; }
        `}</style>
      </div>
    );
  }

  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  return (
    <div className="container-hosp py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Staff area</p>
          <h1 className="font-display text-3xl text-navy">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadData(token)}
            className="flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2 text-sm font-medium text-navy hover:border-teal-400"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy/90"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* quick stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total appointments" value={appointments.length} />
        <StatCard label="Pending" value={pendingCount} highlight />
        <StatCard label="Messages" value={contacts.length} />
        <StatCard
          label="This week"
          value={
            appointments.filter(
              (a) => Date.now() - new Date(a.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
            ).length
          }
        />
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* tabs */}
      <div className="mt-8 flex gap-2 border-b border-navy/10">
        <TabButton active={tab === "appointments"} onClick={() => setTab("appointments")} icon={CalendarCheck}>
          Appointments ({appointments.length})
        </TabButton>
        <TabButton active={tab === "messages"} onClick={() => setTab("messages")} icon={MessageSquare}>
          Messages ({contacts.length})
        </TabButton>
      </div>

      <div className="mt-6">
        {checkingSession || loading ? (
          <p className="py-10 text-center text-sm text-navy/50">Loading…</p>
        ) : tab === "appointments" ? (
          <AppointmentsTable appointments={appointments} onStatusChange={handleStatusChange} />
        ) : (
          <MessagesTable contacts={contacts} />
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div className={`rounded-2xl p-5 shadow-soft ${highlight ? "bg-amber/20" : "bg-white"}`}>
      <p className="font-display text-3xl text-navy">{value}</p>
      <p className="mt-1 text-xs text-navy/55">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
        active ? "text-teal-700" : "text-navy/50 hover:text-navy"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
      {active && (
        <motion.span
          layoutId="admin-tab-underline"
          className="absolute inset-x-0 -bottom-px h-0.5 bg-teal-500"
        />
      )}
    </button>
  );
}

function AppointmentsTable({ appointments, onStatusChange }) {
  if (appointments.length === 0) {
    return <p className="py-10 text-center text-sm text-navy/50">No appointments booked yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-soft">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead>
          <tr className="border-b border-navy/10 text-xs uppercase tracking-wide text-navy/45">
            <th className="px-5 py-4 font-medium">Patient</th>
            <th className="px-5 py-4 font-medium">Department</th>
            <th className="px-5 py-4 font-medium">Requested for</th>
            <th className="px-5 py-4 font-medium">Contact</th>
            <th className="px-5 py-4 font-medium">Booked</th>
            <th className="px-5 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {appointments.map((a) => (
              <motion.tr
                key={a._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-b border-navy/5 last:border-0"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-navy">{a.fullName}</p>
                  {a.message && <p className="mt-0.5 max-w-[220px] truncate text-xs text-navy/45">{a.message}</p>}
                </td>
                <td className="px-5 py-4 text-navy/70">{a.department}</td>
                <td className="px-5 py-4 text-navy/70">
                  {new Date(a.preferredDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {a.preferredTime}
                </td>
                <td className="px-5 py-4 text-navy/70">
                  <a href={`tel:${a.phone}`} className="hover:text-teal-700">{a.phone}</a>
                </td>
                <td className="px-5 py-4 text-navy/50">
                  {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </td>
                <td className="px-5 py-4">
                  <select
                    value={a.status}
                    onChange={(e) => onStatusChange(a._id, e.target.value)}
                    className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold capitalize ${STATUS_STYLES[a.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

function MessagesTable({ contacts }) {
  if (contacts.length === 0) {
    return <p className="py-10 text-center text-sm text-navy/50">No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {contacts.map((c) => (
        <div key={c._id} className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-navy">{c.name}</p>
            <p className="text-xs text-navy/45">
              {new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
          <p className="mt-1 text-xs text-navy/55">
            {c.email} {c.phone && `· ${c.phone}`}
          </p>
          {c.subject && <p className="mt-2 text-sm font-medium text-teal-700">{c.subject}</p>}
          <p className="mt-1 text-sm text-navy/70 leading-relaxed">{c.message}</p>
        </div>
      ))}
    </div>
  );
}
