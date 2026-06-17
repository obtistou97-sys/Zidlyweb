"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Star, Heart, ShoppingBag } from "lucide-react";
import { TranslationShape } from "./translations";

const mockupData = [
  {
    label: "Landing Page",
    color: "from-primary to-[#802080]",
    content: (
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex gap-2">
          <div className="h-3 w-16 rounded bg-zinc-700/50 sm:h-4 sm:w-24" />
          <div className="h-3 w-12 rounded bg-zinc-700/50 sm:h-4 sm:w-16" />
          <div className="ml-auto h-3 w-14 rounded bg-primary/40 sm:h-4 sm:w-20" />
        </div>
        <div className="mt-4 flex flex-col items-center rounded-xl bg-zinc-800/40 p-4 text-center sm:p-6">
          <div className="h-5 w-32 rounded bg-zinc-700/50 sm:h-6 sm:w-40" />
          <div className="mt-2 h-3 w-48 rounded bg-zinc-700/30 sm:h-4 sm:w-64" />
          <div className="mt-3 flex gap-2">
            <div className="h-8 w-24 rounded-lg bg-primary/70 sm:h-9 sm:w-28" />
            <div className="h-8 w-24 rounded-lg border border-zinc-600 sm:h-9 sm:w-28" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg bg-zinc-800/30 p-3">
              <div className="mx-auto h-6 w-6 rounded bg-primary/30 sm:h-7 sm:w-7" />
              <div className="mx-auto mt-2 h-2.5 w-12 rounded bg-zinc-700/50 sm:w-16" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Business Website",
    color: "from-[#7C3AED] to-[#4F46E5]",
    content: (
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex gap-2">
          <div className="h-3 w-20 rounded bg-zinc-700/50 sm:h-4 sm:w-28" />
          <div className="h-3 w-14 rounded bg-zinc-700/50 sm:h-4 sm:w-20" />
          <div className="h-3 w-12 rounded bg-zinc-700/50 sm:h-4 sm:w-16" />
          <div className="ml-auto h-3 w-16 rounded bg-zinc-700/50 sm:h-4 sm:w-20" />
        </div>
        <div className="mt-3 rounded-xl bg-zinc-800/40 p-4 sm:p-5">
          <div className="h-4 w-36 rounded bg-zinc-700/50 sm:h-5 sm:w-48" />
          <div className="mt-2 h-3 w-full rounded bg-zinc-700/30" />
          <div className="mt-1 h-3 w-3/4 rounded bg-zinc-700/30" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg bg-zinc-800/50 p-2.5">
                <div className="h-3 w-8 rounded bg-zinc-700/50" />
                <div className="mt-1 h-2 w-full rounded bg-zinc-700/30" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-700/30 bg-zinc-800/30 p-3 sm:p-4">
          <div className="flex gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 sm:h-4 sm:w-4" />
                <div className="h-2 w-12 rounded bg-zinc-700/50 sm:w-16" />
              </div>
            ))}
          </div>
          <div className="mt-2 h-2.5 w-full rounded bg-zinc-700/30" />
        </div>
      </div>
    ),
  },
  {
    label: "E-Commerce Store",
    color: "from-[#06B6D4] to-[#3B82F6]",
    content: (
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <ShoppingBag className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
          </div>
          <div className="h-3 w-24 rounded bg-zinc-700/50 sm:h-4 sm:w-32" />
          <div className="ml-auto flex gap-1">
            <Heart className="h-3 w-3 text-zinc-500 sm:h-3.5 sm:w-3.5" />
            <div className="h-3 w-10 rounded bg-zinc-700/50 sm:h-4 sm:w-14" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl bg-zinc-800/40 p-2.5 sm:p-3">
              <div className="aspect-[4/3] w-full rounded-lg bg-zinc-700/40" />
              <div className="mt-2 h-2.5 w-3/4 rounded bg-zinc-700/50" />
              <div className="mt-1 flex items-center justify-between">
                <div className="h-3 w-12 rounded bg-primary/50 sm:w-14" />
                <div className="h-6 w-6 rounded-lg bg-primary/40 sm:h-7 sm:w-7" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const floatingConfig = [
  { y: [0, -12, 0], rotate: [-1, 1, -1], scale: 1, z: 10, delay: 0 },
  { y: [0, 10, 0], rotate: [1, -1, 1], scale: 0.95, z: 5, delay: 0.3 },
  { y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5], scale: 0.9, z: 0, delay: 0.6 },
];

function BrowserWindow({ mockup, index }: { mockup: typeof mockupData[number]; index: number }) {
  const cfg = floatingConfig[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${index > 0 ? "hidden md:block" : ""}`}
      style={{ zIndex: cfg.z }}
    >
      <motion.div
        animate={{ y: cfg.y, rotate: cfg.rotate }}
        transition={{
          y: { duration: 6 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: cfg.delay },
          rotate: { duration: 8 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: cfg.delay },
        }}
        whileHover={{ scale: 1.02, y: -4 }}
        className={`overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-2xl transition-shadow hover:shadow-primary/10 ${
          index === 0 ? "shadow-black/50" : "shadow-black/30"
        }`}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-zinc-900/90 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 sm:h-3 sm:w-3" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md bg-zinc-800/60 px-3 py-1">
            <span className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r ${mockup.color}`} />
            <span className="text-[10px] font-medium text-zinc-400 sm:text-xs truncate max-w-[120px] sm:max-w-[200px]">
              {mockup.label.toLowerCase().replace(/\s+/g, "-")}.com
            </span>
          </div>
          <div className="flex gap-1">
            <ChevronRight className="h-3 w-3 text-zinc-600 sm:h-3.5 sm:w-3.5" />
          </div>
        </div>

        {/* Browser content */}
        <div className="bg-[#1a1a2e]/90">
          {mockup.content}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WebsiteShowcase({ t }: { t: TranslationShape }) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Purple/pink gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-[#1a1a2e] to-[#0f0f1a]" />

      {/* Soft radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-[#802080]/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

        {/* Floating ambient particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30 - i * 5, 0],
              x: [0, 15 + i * 3, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className={`absolute h-2 w-2 rounded-full bg-primary/40`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Browser mockups - Desktop */}
        <div className="hidden md:block">
          <div className="mx-auto max-w-6xl px-6 lg:px-12">
            <div className="relative flex items-end justify-center" style={{ minHeight: "600px" }}>
              {/* Mockup 3 (back) */}
              <div className="absolute left-1/2 top-0 w-full max-w-2xl -translate-x-1/2 translate-y-8">
                <BrowserWindow mockup={mockupData[2]} index={2} />
              </div>
              {/* Mockup 2 (middle) */}
              <div className="absolute left-1/2 top-0 w-full max-w-2xl -translate-x-1/2 translate-y-4">
                <BrowserWindow mockup={mockupData[1]} index={1} />
              </div>
              {/* Mockup 1 (front) */}
              <div className="absolute left-1/2 top-0 w-full max-w-2xl -translate-x-1/2">
                <BrowserWindow mockup={mockupData[0]} index={0} />
              </div>
            </div>
          </div>
        </div>

        {/* Browser mockups - Mobile */}
        <div className="space-y-4 px-4 md:hidden">
          {mockupData.map((mockup, i) => (
            <BrowserWindow key={mockup.label} mockup={mockup} index={i} />
          ))}
        </div>

        {/* Content below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-2xl px-6 text-center sm:mt-16 lg:mt-20"
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

        {/* Gradient fade to next section */}
        <div className="pointer-events-none h-32 w-full bg-gradient-to-b from-transparent to-black/60 -mb-32 relative z-20" />
      </div>
    </section>
  );
}
