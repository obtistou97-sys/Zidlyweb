"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Star, Heart, ShoppingBag, MapPin, Bed, Bath, Sparkles } from "lucide-react";
import { TranslationShape } from "./translations";

interface MockupItem {
  label: string;
  domain: string;
  gradient: string;
  content: (expanded?: boolean) => React.ReactNode;
}

interface DesktopPos {
  left: string;
  top: string;
  zIndex: number;
  width: string;
  initX: number;
  initY: number;
  rotate: number;
  floatY: number[];
  floatRotate: number[];
  delay: number;
}

const desktopPositions: DesktopPos[] = [
  { left: "50%", top: "0px", zIndex: 40, width: "440px", initX: 0, initY: 0, rotate: 0, floatY: [0, -10, 0], floatRotate: [0, 0.5, 0], delay: 0 },
  { left: "20%", top: "-10px", zIndex: 30, width: "360px", initX: -20, initY: 10, rotate: -3, floatY: [0, 8, 0], floatRotate: [-3, -2, -3], delay: 0.25 },
  { left: "56%", top: "25px", zIndex: 20, width: "360px", initX: 20, initY: 15, rotate: 2.5, floatY: [0, -7, 0], floatRotate: [2.5, 3.5, 2.5], delay: 0.5 },
  { left: "36%", top: "70px", zIndex: 10, width: "310px", initX: 0, initY: 20, rotate: -1.5, floatY: [0, 6, 0], floatRotate: [-1.5, -0.5, -1.5], delay: 0.75 },
];

const IMG = {
  house1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  house2: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
  house3: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  house4: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  prod1: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  prod2: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80",
  prod3: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  prod4: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80",
  hotel1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
  hotel2: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
  hotel3: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80",
  hotel4: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80",
  office1: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  office2: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&q=80",
  office3: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
  office4: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
};

const mockupData: MockupItem[] = [
  {
    label: "Real Estate",
    domain: "yourrealestate.com",
    gradient: "from-emerald-500 to-emerald-700",
    content: () => (
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span className="text-[11px] text-white/60">Search by city, neighborhood...</span>
          <span className="ml-auto rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">230+</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[{ img: IMG.house1, price: "$450,000", beds: 3, baths: 2 }, { img: IMG.house2, price: "$620,000", beds: 4, baths: 3 }, { img: IMG.house3, price: "$385,000", beds: 3, baths: 1 }, { img: IMG.house4, price: "$725,000", beds: 5, baths: 3 }].map((p, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white/5">
              <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="p-2">
                <div className="text-xs font-semibold text-white">{p.price}</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/50">
                  <Bed className="h-3 w-3" />{p.beds} <Bath className="h-3 w-3" />{p.baths}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg bg-emerald-600 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-700">
          View All Properties
        </button>
      </div>
    ),
  },
  {
    label: "Online Store",
    domain: "yourstore.com",
    gradient: "from-cyan-500 to-blue-600",
    content: () => (
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {["All", "New", "Popular", "Sale"].map((cat) => (
            <span key={cat} className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${cat === "All" ? "bg-cyan-500/20 text-cyan-300" : "bg-white/10 text-white/60"}`}>{cat}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[{ img: IMG.prod1, name: "Wireless Headphones", price: "$79" }, { img: IMG.prod2, name: "Smart Watch", price: "$249" }, { img: IMG.prod3, name: "Sneakers", price: "$129" }, { img: IMG.prod4, name: "Camera", price: "$449" }].map((p, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white/5">
              <div className="aspect-square w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="p-2">
                <div className="truncate text-[10px] text-white/60">{p.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{p.price}</span>
                  <ShoppingBag className="h-3 w-3 text-cyan-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg bg-cyan-600 py-2 text-xs font-medium text-white transition-colors hover:bg-cyan-700">
          Shop Now
        </button>
      </div>
    ),
  },
  {
    label: "Hotel Booking",
    domain: "yourhotel.com",
    gradient: "from-violet-500 to-purple-700",
    content: () => (
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
          <div className="flex items-center gap-1 text-[11px] text-white/70">
            <MapPin className="h-3 w-3 text-violet-400" /> Paris
          </div>
          <div className="mx-1 h-3 w-px bg-white/10" />
          <div className="text-[11px] text-white/70">Jun 17 – 20</div>
          <div className="ml-auto rounded bg-violet-500/20 px-2 py-0.5 text-[10px] font-medium text-violet-300">
            2 guests
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[{ img: IMG.hotel1, name: "Deluxe Suite", price: "$289/night", rating: 4.8 }, { img: IMG.hotel2, name: "Premium Room", price: "$199/night", rating: 4.6 }, { img: IMG.hotel3, name: "Garden Villa", price: "$359/night", rating: 4.9 }, { img: IMG.hotel4, name: "Ocean View", price: "$159/night", rating: 4.5 }].map((r, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white/5">
              <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${r.img})` }} />
              <div className="p-2">
                <div className="truncate text-[10px] font-medium text-white">{r.name}</div>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-[10px] text-white/60">{r.price}</span>
                  <span className="flex items-center gap-0.5 text-[10px] text-yellow-400">
                    <Star className="h-2.5 w-2.5 fill-current" />{r.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg bg-violet-600 py-2 text-xs font-medium text-white transition-colors hover:bg-violet-700">
          Browse Rooms
        </button>
      </div>
    ),
  },
  {
    label: "Business",
    domain: "yourbusiness.com",
    gradient: "from-primary to-pink-600",
    content: () => (
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary-300">Premium</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">Agency</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[{ img: IMG.office1, title: "Strategy" }, { img: IMG.office2, title: "Design" }, { img: IMG.office3, title: "Development" }, { img: IMG.office4, title: "Analytics" }].map((s, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white/5">
              <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="p-2">
                <div className="text-[11px] font-medium text-white">{s.title}</div>
                <div className="mt-0.5 flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full rounded-lg bg-primary py-2 text-xs font-medium text-white transition-colors hover:opacity-90">
          Learn More
        </button>
      </div>
    ),
  },
];

function BrowserWindow({ mockup, i }: { mockup: MockupItem; i: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-2xl shadow-black/30 backdrop-blur-xl transition-shadow duration-300 hover:shadow-primary/10">
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-zinc-900/90 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70 sm:h-3 sm:w-3" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-zinc-800/60 px-3 py-1">
          <Lock className="h-2.5 w-2.5 text-green-400 sm:h-3 sm:w-3" />
          <span className="max-w-[120px] truncate text-[10px] font-medium text-zinc-400 sm:max-w-[200px] sm:text-xs">
            {mockup.domain}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-0.5 rounded bg-zinc-700 sm:h-2.5" />
          <span className="h-2 w-0.5 rounded bg-zinc-700 sm:h-2.5" />
          <span className="h-2 w-0.5 rounded bg-zinc-700 sm:h-2.5" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950">
        {mockup.content()}
      </div>
    </div>
  );
}

function ExpandedMockup({ mockup, onClose }: { mockup: MockupItem; onClose: () => void }) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/5 bg-zinc-900/90 px-4 py-3 sm:px-5 sm:py-3.5">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="mx-auto flex items-center gap-1.5 rounded-md bg-zinc-800/60 px-4 py-1.5">
              <Lock className="h-3 w-3 text-green-400" />
              <span className="text-xs font-medium text-zinc-400 sm:text-sm">{mockup.domain}</span>
            </div>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950">{mockup.content(true)}</div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-white/80">Imagine your brand here</span>
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      </motion.div>
    </div>
  );
}

export default function WebsiteShowcase({ t }: { t: TranslationShape }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const closeExpand = useCallback(() => setExpandedIdx(null), []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-[#1a1a2e] to-[#0f0f1a]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-[#802080]/15 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30 - i * 5, 0], x: [0, 15 + i * 3, 0], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            className="absolute h-2 w-2 rounded-full bg-primary/40"
            style={{ left: `${15 + i * 12}%`, top: `${20 + i * 10}%` }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Desktop scattered layout */}
        <div className="hidden md:block">
          <div className="relative mx-auto" style={{ maxWidth: "1100px", minHeight: "580px" }}>
            {mockupData.map((mockup, i) => {
              const pos = desktopPositions[i];
              return (
                <motion.div
                  key={mockup.label}
                  className="absolute cursor-pointer"
                  style={{ left: pos.left, top: pos.top, zIndex: pos.zIndex, width: pos.width, transform: `translateX(${i === 0 ? "-50%" : "0"})` }}
                  initial={{ opacity: 0, x: pos.initX, y: pos.initY }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setExpandedIdx(i)}
                  whileHover={{ y: -6 }}
                >
                  <motion.div
                    animate={{ y: pos.floatY, rotate: pos.floatRotate }}
                    transition={{
                      y: { duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: pos.delay },
                      rotate: { duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: pos.delay },
                    }}
                    style={{ transformOrigin: "center bottom" }}
                  >
                    <BrowserWindow mockup={mockup} i={i} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile stacked layout */}
        <div className="space-y-4 px-4 md:hidden">
          {mockupData.map((mockup, i) => (
            <motion.div
              key={mockup.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setExpandedIdx(i)}
              className="cursor-pointer"
            >
              <BrowserWindow mockup={mockup} i={i} />
            </motion.div>
          ))}
        </div>

        {/* Content below mockups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-2xl px-6 text-center sm:mt-20 lg:mt-24"
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

        <div className="pointer-events-none relative z-20 -mb-32 h-32 w-full bg-gradient-to-b from-transparent to-black/60" />
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {expandedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={closeExpand}
          >
            <ExpandedMockup mockup={mockupData[expandedIdx]} onClose={closeExpand} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
