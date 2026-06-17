"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./providers";
import { TranslationShape } from "./translations";

const techBadges = [
  { name: "Next.js", color: "text-white", bg: "bg-white/10", icon: "▲" },
  { name: "React", color: "text-[#61DAFB]", bg: "bg-[#61DAFB]/10", icon: "⚛" },
  { name: "TypeScript", color: "text-[#3178C6]", bg: "bg-[#3178C6]/10", icon: "TS" },
  { name: "Tailwind CSS", color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10", icon: "🌊" },
  { name: "Framer Motion", color: "text-[#0055FF]", bg: "bg-[#0055FF]/10", icon: "◆" },
  { name: "Vercel", color: "text-white", bg: "bg-white/10", icon: "▽" },
];

function FloatingBadge({ badge, index, isMobile }: { badge: typeof techBadges[number]; index: number; isMobile: boolean }) {
  const positions = [
    "top-0 left-4 md:left-8",
    "top-0 right-4 md:right-8",
    "top-1/2 -left-2 md:left-0 -translate-y-1/2",
    "top-1/2 -right-2 md:right-0 -translate-y-1/2",
    "bottom-0 left-4 md:left-8",
    "bottom-0 right-4 md:right-8",
  ];

  const offsets = [
    { y: -3, x: 0 }, { y: -2, x: 1 }, { y: 2, x: -1 },
    { y: -1, x: 2 }, { y: 3, x: 0 }, { y: 2, x: -2 },
  ];

  if (isMobile) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.08, duration: 0.4 }}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${badge.bg} ${badge.color} border border-white/5`}
      >
        <span className="text-[10px]">{badge.icon}</span>
        {badge.name}
      </motion.span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, offsets[index].y, 0],
        x: [0, offsets[index].x, 0],
      }}
      transition={{
        opacity: { delay: 0.6 + index * 0.1, duration: 0.5 },
        scale: { delay: 0.6 + index * 0.1, duration: 0.5 },
        y: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
        x: { duration: 5 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
      }}
      className={`absolute ${positions[index]} z-10`}
    >
      <span className={`flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-md px-4 py-2 text-sm font-medium shadow-xl ${badge.color}`}>
        <span className="text-sm">{badge.icon}</span>
        {badge.name}
      </span>
    </motion.div>
  );
}

const codeLines = [
  { type: "comment", text: "// pages/home.tsx" },
  { type: "keyword", text: "import" }, { type: "normal", text: " { useState } " }, { type: "keyword", text: "from" }, { type: "string", text: " \"react\"" },
  { type: "keyword", text: "import" }, { type: "normal", text: " { motion } " }, { type: "keyword", text: "from" }, { type: "string", text: " \"framer-motion\"" },
  { type: "keyword", text: "import" }, { type: "normal", text: " { " }, { type: "type", text: "HeroSection" }, { type: "normal", text: ", " }, { type: "type", text: "Features" }, { type: "normal", text: " } " }, { type: "keyword", text: "from" }, { type: "string", text: " \"@/components\"" },
  { type: "empty" },
  { type: "keyword", text: "export default " }, { type: "keyword", text: "function" }, { type: "type", text: " Home" }, { type: "normal", text: "() {" },
  { type: "keyword", text: "  const" }, { type: "normal", text: " { data } = " }, { type: "keyword", text: "await" }, { type: "normal", text: " getPosts();" },
  { type: "empty" },
  { type: "keyword", text: "  return" }, { type: "normal", text: " (" },
  { type: "normal", text: "    <main" }, { type: "attr", text: " className" }, { type: "normal", text: "=" }, { type: "string", text: "\"min-h-screen\"" }, { type: "normal", text: ">" },
  { type: "normal", text: "      <" }, { type: "component", text: "HeroSection" }, { type: "normal", text: " />" },
  { type: "normal", text: "      <" }, { type: "component", text: "FeaturesGrid" }, { type: "normal", text: " />" },
  { type: "normal", text: "      <" }, { type: "component", text: "CTASection" }, { type: "normal", text: " />" },
  { type: "normal", text: "    </main>" },
  { type: "normal", text: "  );" },
  { type: "normal", text: "}" },
];

const syntaxColors: Record<string, string> = {
  comment: "text-zinc-500 italic",
  keyword: "text-[#C792EA]",
  string: "text-[#C3E88D]",
  type: "text-[#82AAFF]",
  attr: "text-[#F78C6C]",
  component: "text-[#FFCB6B]",
  normal: "text-zinc-300",
};

export default function DeveloperShowcase({ t }: { t: TranslationShape }) {
  const { locale } = useLanguage();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-[#802080]/20 blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative">
          {/* Desktop badges */}
          <div className="hidden md:block">
            {techBadges.map((badge, i) => (
              <FloatingBadge key={badge.name} badge={badge} index={i} isMobile={false} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-4xl"
          >
            {/* Editor mockup */}
            <div className="overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/60 backdrop-blur-xl shadow-2xl shadow-black/40">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-zinc-700/50 bg-zinc-900/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 text-xs text-zinc-500">pages/home.tsx - ZidlyWeb</span>
                <div className="ml-auto flex gap-1 text-xs text-zinc-600">
                  <span className="rounded bg-zinc-800 px-2 py-0.5">main</span>
                </div>
              </div>

              {/* Tab bar */}
              <div className="flex border-b border-zinc-700/30 bg-[#1e1e2e]/80">
                <div className="flex items-center gap-1 border-r border-zinc-700/30 bg-[#2d2d44] px-4 py-2">
                  <span className="h-2 w-2 rounded-full text-[10px] leading-none text-blue-400">●</span>
                  <span className="text-xs text-zinc-300">home.tsx</span>
                </div>
                <div className="flex items-center gap-1 px-4 py-2">
                  <span className="text-[10px] text-zinc-600">●</span>
                  <span className="text-xs text-zinc-600">layout.tsx</span>
                </div>
                <div className="flex items-center gap-1 px-4 py-2">
                  <span className="text-[10px] text-zinc-600">●</span>
                  <span className="text-xs text-zinc-600">globals.css</span>
                </div>
              </div>

              {/* Code area */}
              <div className="flex bg-[#1e1e2e]">
                {/* Line numbers */}
                <div className="select-none border-r border-zinc-800/50 px-3 py-4 text-right text-xs leading-6 text-zinc-600">
                  {codeLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Code content */}
                <div className="overflow-x-auto py-4 pl-4 pr-8 text-xs leading-6">
                  {codeLines.map((line, i) => (
                    <div key={i} className="whitespace-nowrap">
                      {"type" in line && line.type === "empty" ? (
                        <span className="text-zinc-500">&nbsp;</span>
                      ) : (
                        <span className={syntaxColors[line.type] || "text-zinc-300"}>
                          {line.text}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-zinc-700/30 bg-[#2d2d44]/80 px-4 py-1.5 text-xs text-zinc-500">
                <div className="flex items-center gap-3">
                  <span>main</span>
                  <span className="h-3 w-px bg-zinc-700" />
                  <span>TypeScript JSX</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Ln 12, Col 5</span>
                  <span>Spaces: 2</span>
                  <span>UTF-8</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
            {techBadges.map((badge, i) => (
              <FloatingBadge key={badge.name} badge={badge} index={i} isMobile={true} />
            ))}
          </div>
        </div>

        {/* Content below editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-2xl text-center sm:mt-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl font-display">
            {t.finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {t.finalCta.text}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/30"
          >
            {t.finalCta.ctaPrimary}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
