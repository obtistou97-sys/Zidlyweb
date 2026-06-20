"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, Trash2, Download } from "lucide-react";

type Lead = {
  name: string;
  email: string;
  details: string;
  capturedAt: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("zidlyweb-admin") === "true") {
      setAuthed(true);
      loadLeads();
    }
  }, []);

  const loadLeads = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("zidlyweb-leads") || "[]");
      setLeads(stored);
    } catch {}
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthed(true);
        sessionStorage.setItem("zidlyweb-admin", "true");
        loadLeads();
      } else {
        setError("Wrong password");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem("zidlyweb-admin");
  };

  const clearLeads = () => {
    localStorage.removeItem("zidlyweb-leads");
    setLeads([]);
  };

  const exportLeads = () => {
    const csv = [["Name", "Email", "Date", "Details"].join(",")]
      .concat(leads.map((l) => [l.name, l.email, l.capturedAt, `"${l.details.replace(/"/g, '""')}"`].join(",")))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zidlyweb-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] p-6">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CC3366]">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#333]">Admin</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-[50px] border border-gray-200 px-4 py-2.5 text-sm text-[#333] outline-none focus:border-[#CC3366]"
            autoFocus
          />
          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full rounded-[50px] bg-[#CC3366] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Leads</h1>
          <div className="flex gap-2">
            <button onClick={exportLeads} disabled={leads.length === 0} className="flex items-center gap-1.5 rounded-[50px] bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-30">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button onClick={clearLeads} disabled={leads.length === 0} className="flex items-center gap-1.5 rounded-[50px] bg-red-500/20 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30 disabled:opacity-30">
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-[50px] bg-white/10 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/20">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-12 text-center">
            <p className="text-sm text-white/30">No leads yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...leads].reverse().map((lead, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{lead.name}</h3>
                    <a href={`mailto:${lead.email}`} className="text-sm text-[#CC3366] hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  <span className="shrink-0 text-xs text-white/30">
                    {new Date(lead.capturedAt).toLocaleDateString()} {new Date(lead.capturedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                {lead.details && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-white/40 hover:text-white/60">Conversation</summary>
                    <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-xs text-white/50 leading-relaxed">{lead.details}</pre>
                  </details>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
