"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "./providers";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "zidlyweb-chat";
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;

export default function ChatWidget() {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(`${STORAGE_KEY}-${locale}`);
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch {}
  }, [locale]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(`${STORAGE_KEY}-${locale}`, JSON.stringify(messages));
      } catch {}
    }
  }, [messages, locale]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const greeting: Message = {
        role: "assistant",
        content: locale === "ar"
          ? "مرحباً! أنا زدلي، مساعدك في Zidlyweb. كيف يمكنني مساعدتك اليوم؟"
          : "Hi! I'm Zidly, your assistant at Zidlyweb. How can I help you today?",
      };
      setMessages([greeting]);
    }
  };

  const sendLead = async (email: string) => {
    const allText = messages.map((m) => `${m.role}: ${m.content}`).join("\n");
    const nameMatch = messages
      .map((m) => m.content.match(/my name is (\w+)/i))
      .find(Boolean);
    const name = nameMatch?.[1] || "Chat Lead";
    const lead = { name, email, details: allText, capturedAt: new Date().toISOString() };

    try {
      const stored = JSON.parse(localStorage.getItem("zidlyweb-leads") || "[]");
      stored.push(lead);
      localStorage.setItem("zidlyweb-leads", JSON.stringify(stored));
    } catch {}

    try {
      await fetch("/api/notify-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      console.error("Failed to send lead notification");
    }

    setLeadSent(true);
  };

  const sendMessage = async (content: string) => {
    const userMsg: Message = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    const emailMatch = content.match(EMAIL_RE);
    if (emailMatch && !leadSent) {
      sendLead(emailMatch[0]);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
      });

      const data = await res.json();
      let replyText = data.reply || (locale === "ar" ? "عذراً، حدث خطأ. حاول مرة أخرى." : "Sorry, something went wrong. Please try again.");

      if (emailMatch && !leadSent) {
        const confirm = locale === "ar"
          ? "\n\n✅ تم استلام معلوماتك! سأتواصل معك قريباً."
          : "\n\n✅ Your info has been received! I'll get back to you soon.";
        replyText += confirm;
      }

      const reply: Message = { role: "assistant", content: replyText };
      setMessages((prev) => [...prev, reply]);
    } catch {
      const errorMsg: Message = {
        role: "assistant",
        content: locale === "ar" ? "عذراً، تعذر الاتصال بالخادم." : "Sorry, couldn't reach the server.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    sendMessage(trimmed);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-[50px] bg-[#CC3366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
            aria-label="Open chat"
          >
            <MessageCircle className="h-7 w-7" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:w-96"
            style={{ maxHeight: "500px" }}
          >
            <div className="flex items-center justify-between bg-[#CC3366] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                  Z
                </div>
                <div>
                  <p className="text-sm font-semibold">Zidly</p>
                  <p className="text-[10px] text-white/70">
                    {leadSent
                      ? (locale === "ar" ? "تم الاستلام ✅" : "Lead received ✅")
                      : (locale === "ar" ? "متصل" : "Online")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ minHeight: "300px", maxHeight: "350px" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-[50px] px-4 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#CC3366] text-white"
                        : "bg-gray-100 text-[#333]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="mb-3 flex justify-start">
                  <div className="flex items-center gap-1 rounded-[50px] bg-gray-100 px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={locale === "ar" ? "اكتب رسالتك..." : "Type your message..."}
                disabled={loading}
                className="flex-1 rounded-[50px] bg-gray-100 px-4 py-2 text-sm text-[#333] outline-none placeholder:text-gray-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CC3366] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                aria-label="Send message"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
