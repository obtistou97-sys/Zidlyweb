"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Trash2, Download, MessageSquare, Users, ChevronDown, ChevronRight, RefreshCw } from "lucide-react";

type Lead = {
  name: string;
  email: string;
  details: string;
  capturedAt: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

type Conversation = {
  id: string;
  locale: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

type Tab = "conversations" | "leads";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("conversations");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [convLoading, setConvLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedConv, setExpandedConv] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("zidlyweb-admin") === "true") {
      setAuthed(true);
      loadLeads();
      loadConversations();
    }
  }, []);

  const loadLeads = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("zidlyweb-leads") || "[]");
      setLeads(stored);
    } catch {}
  };

  const loadConversations = async () => {
    setConvLoading(true);
    try {
      const res = await fetch("/api/conversations", {
        headers: { Authorization: `Bearer ${password || sessionStorage.getItem("zidlyweb-admin-pw") || ""}` },
      });
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch {}
    setConvLoading(false);
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
        sessionStorage.setItem("zidlyweb-admin-pw", password);
        loadLeads();
        loadConversations();
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
    sessionStorage.removeItem("zidlyweb-admin-pw");
  };

  const clearLeads = () => {
    localStorage.removeItem("zidlyweb-leads");
    setLeads([]);
  };

  const deleteConversation = async (id: string) => {
    try {
      await fetch(`/api/conversations?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("zidlyweb-admin-pw") || ""}` },
      });
      setConversations((prev) => prev.filter((c) => c.id !== id));
    } catch {}
  };

  const clearConversations = async () => {
    try {
      await fetch("/api/conversations", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("zidlyweb-admin-pw") || ""}` },
      });
      setConversations([]);
    } catch {}
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

  const exportConversations = () => {
    const lines = conversations.flatMap((conv) => {
      const header = `=== Conversation ${conv.id} (${new Date(conv.createdAt).toLocaleString()}) ===`;
      const msgs = conv.messages.map((m) => `${m.role === "user" ? "Visitor" : "Zidly"}: ${m.content}`);
      return [header, ...msgs, ""];
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "zidlyweb-conversations.txt";
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
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <div className="flex gap-2">
            {tab === "leads" ? (
              <>
                <button onClick={exportLeads} disabled={leads.length === 0} className="flex items-center gap-1.5 rounded-[50px] bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-30">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button onClick={clearLeads} disabled={leads.length === 0} className="flex items-center gap-1.5 rounded-[50px] bg-red-500/20 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30 disabled:opacity-30">
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              </>
            ) : (
              <>
                <button onClick={loadConversations} disabled={convLoading} className="flex items-center gap-1.5 rounded-[50px] bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-30">
                  <RefreshCw className={`h-3.5 w-3.5 ${convLoading ? "animate-spin" : ""}`} /> Refresh
                </button>
                <button onClick={exportConversations} disabled={conversations.length === 0} className="flex items-center gap-1.5 rounded-[50px] bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20 disabled:opacity-30">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button onClick={clearConversations} disabled={conversations.length === 0} className="flex items-center gap-1.5 rounded-[50px] bg-red-500/20 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30 disabled:opacity-30">
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              </>
            )}
            <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-[50px] bg-white/10 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/20">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-1 rounded-[50px] bg-white/5 p-1">
          <button
            onClick={() => setTab("conversations")}
            className={`flex items-center gap-2 rounded-[50px] px-5 py-2 text-sm font-medium transition-all ${
              tab === "conversations" ? "bg-[#CC3366] text-white" : "text-white/50 hover:text-white/70"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Conversations
            {conversations.length > 0 && (
              <span className="ml-1 rounded-full bg-white/20 px-1.5 text-[10px]">{conversations.length}</span>
            )}
          </button>
          <button
            onClick={() => setTab("leads")}
            className={`flex items-center gap-2 rounded-[50px] px-5 py-2 text-sm font-medium transition-all ${
              tab === "leads" ? "bg-[#CC3366] text-white" : "text-white/50 hover:text-white/70"
            }`}
          >
            <Users className="h-4 w-4" />
            Leads
            {leads.length > 0 && (
              <span className="ml-1 rounded-full bg-white/20 px-1.5 text-[10px]">{leads.length}</span>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "conversations" ? (
            <motion.div
              key="conversations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {conversations.length === 0 ? (
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-12 text-center">
                  <p className="text-sm text-white/30">{convLoading ? "Loading..." : "No conversations yet"}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conv) => {
                    const isExpanded = expandedConv === conv.id;
                    const preview = conv.messages.length > 0
                      ? conv.messages[conv.messages.length - 1].content.slice(0, 100)
                      : "Empty conversation";

                    return (
                      <motion.div
                        key={conv.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedConv(isExpanded ? null : conv.id)}
                          className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-white/[0.02]"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 shrink-0 text-white/40" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-white/30">
                                {new Date(conv.updatedAt).toLocaleDateString()} {new Date(conv.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/50">
                                {conv.locale.toUpperCase()}
                              </span>
                              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/50">
                                {conv.messages.length} msgs
                              </span>
                            </div>
                            <p className="mt-1 truncate text-sm text-white/60">{preview}</p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); }}
                            className="shrink-0 rounded-full p-1.5 text-white/20 transition-colors hover:bg-red-500/20 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-white/5 px-4 py-3 space-y-2 max-h-[400px] overflow-y-auto">
                                {conv.messages.map((msg, i) => (
                                  <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                  >
                                    <div
                                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                                        msg.role === "user"
                                          ? "bg-[#CC3366]/20 text-[#CC3366]"
                                          : "bg-white/5 text-white/70"
                                      }`}
                                    >
                                      <span className="text-[10px] font-medium opacity-50">
                                        {msg.role === "user" ? "Visitor" : "Zidly"}
                                      </span>
                                      <p className="mt-0.5 whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="leads"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
