"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Lock, Star, ShoppingBag, Search, Sparkles } from "lucide-react";
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
  { left: "52%", top: "0px", zIndex: 40, width: "380px", initX: 0, initY: 0, rotate: 0, floatY: [0, -10, 0], floatRotate: [0, 0.5, 0], delay: 0 },
  { left: "12%", top: "80px", zIndex: 30, width: "380px", initX: -30, initY: 15, rotate: -4, floatY: [0, 10, 0], floatRotate: [-4, -2.5, -4], delay: 0.25 },
  { left: "63%", top: "190px", zIndex: 20, width: "380px", initX: 25, initY: 20, rotate: 3, floatY: [0, -8, 0], floatRotate: [3, 4.5, 3], delay: 0.5 },
  { left: "30%", top: "330px", zIndex: 10, width: "380px", initX: 15, initY: 25, rotate: -2, floatY: [0, 7, 0], floatRotate: [-2, -0.5, -2], delay: 0.75 },
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
        <div className="flex gap-2">
          {["Buy", "Rent", "Sell"].map((tab) => (
            <span key={tab} className={`rounded-full px-3 py-1 text-[10px] font-medium ${tab === "Buy" ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/50"}`}>{tab}</span>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Find Your Dream Home</h3>
          <p className="text-[10px] text-white/50">Explore 2,500+ properties nationwide</p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2">
            <Search className="h-3 w-3 text-white/40" />
            <span className="text-[10px] text-white/40">City, neighborhood...</span>
          </div>
          <button className="rounded-lg bg-emerald-600 px-3 py-2 text-[10px] font-medium text-white">Search</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ img: IMG.house1, name: "Modern Villa", price: "$850k", beds: 4 }, { img: IMG.house2, name: "City Apartment", price: "$420k", beds: 2 }, { img: IMG.house3, name: "Suburban Home", price: "$620k", beds: 3 }].map((p, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white/5">
              <div className="aspect-[4/3] w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="p-1.5">
                <div className="text-[9px] font-medium text-white">{p.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-400">{p.price}</span>
                  <span className="text-[8px] text-white/40">{p.beds} beds</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
          {["Talk to an agent", "Free consultation", "Contact"].map((cta) => (
            <span key={cta} className="text-[9px] font-medium text-emerald-400">{cta}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Online Store",
    domain: "yourstore.com",
    gradient: "from-cyan-500 to-blue-600",
    content: () => (
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2">
            <Search className="h-3 w-3 text-white/40" />
            <span className="text-[10px] text-white/40">Search products...</span>
          </div>
          <div className="relative">
            <ShoppingBag className="h-4 w-4 text-white/60" />
            <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-500 text-[7px] font-bold text-white">3</span>
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30 p-2.5 text-center">
          <div className="text-xs font-bold text-white">🔥 Summer Sale</div>
          <div className="text-[9px] text-white/60">Up to 50% Off — Limited Time</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[{ img: IMG.prod1, name: "Wireless Headphones", price: "$129", disc: "-40%" }, { img: IMG.prod2, name: "Smart Watch Pro", price: "$349", disc: "-25%" }, { img: IMG.prod3, name: "Minimal Sneakers", price: "$89", disc: "-30%" }, { img: IMG.prod4, name: "Designer Backpack", price: "$159", disc: "-20%" }].map((p, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg bg-white/5">
              <span className="absolute left-1 top-1 z-10 rounded bg-red-500 px-1 py-0.5 text-[8px] font-bold text-white">{p.disc}</span>
              <div className="aspect-square w-full bg-cover bg-center" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="p-1.5">
                <div className="truncate text-[9px] text-white/60">{p.name}</div>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white">{p.price}</span>
                  <span className="rounded bg-cyan-600 px-1.5 py-0.5 text-[7px] font-medium text-white">Add to Cart</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white/5 px-3 py-2 text-center text-[9px] text-white/40">
          Free shipping on orders over $50
        </div>
      </div>
    ),
  },
  {
    label: "Hotel Booking",
    domain: "yourhotel.com",
    gradient: "from-violet-500 to-purple-700",
    content: () => (
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex gap-2">
          {["Rooms", "Amenities", "Gallery"].map((tab) => (
            <span key={tab} className={`rounded-full px-3 py-1 text-[10px] font-medium ${tab === "Rooms" ? "bg-violet-500/20 text-violet-300" : "bg-white/10 text-white/50"}`}>{tab}</span>
          ))}
        </div>
        <div className="rounded-lg bg-gradient-to-r from-violet-600/20 to-purple-600/20 p-3">
          <h3 className="text-sm font-bold text-white">Welcome to YourHotel</h3>
          <p className="text-[10px] text-white/60">Luxury stays at the heart of the city</p>
          <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-violet-400">Book Now <ArrowRight className="h-3 w-3" /></span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ name: "Deluxe Room", price: "$199/night" }, { name: "Suite", price: "$349/night" }, { name: "Penthouse", price: "$599/night" }].map((r, i) => (
            <div key={i} className="rounded-lg bg-white/5 p-2 text-center">
              <div className="text-[9px] font-medium text-white">{r.name}</div>
              <div className="text-[10px] font-semibold text-violet-400">{r.price}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
          {["🏊 Pool", "🧖 Spa", "🍽 Rest.", "🏋 Gym"].map((a) => (
            <span key={a} className="text-[9px] text-white/60">{a}</span>
          ))}
        </div>
        <div className="rounded-lg bg-white/5 p-2.5 text-center italic text-[9px] text-white/50">
          &ldquo;Amazing stay! The views were incredible.&rdquo; — Sarah J.
        </div>
      </div>
    ),
  },
  {
    label: "Business",
    domain: "yourbusiness.com",
    gradient: "from-primary to-pink-600",
    content: () => (
      <div className="space-y-3 p-3 sm:p-4">
        <div className="flex gap-2">
          {["Home", "Features", "Pricing", "Contact"].map((tab) => (
            <span key={tab} className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${tab === "Home" ? "bg-primary/20 text-primary-300" : "bg-white/10 text-white/50"}`}>{tab}</span>
          ))}
        </div>
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-pink-600/20 p-3">
          <span className="rounded bg-primary/30 px-2 py-0.5 text-[8px] font-medium text-primary-200">Get Started</span>
          <h3 className="mt-1 text-sm font-bold text-white">Now in public beta</h3>
          <p className="text-[10px] text-white/60">Build Better Products</p>
          <p className="mt-1 text-[9px] text-white/40">The all-in-one platform for modern teams to ship faster and grow smarter.</p>
          <div className="mt-2 flex gap-1">
            <div className="flex-1 rounded bg-white/10 px-2 py-1.5 text-[9px] text-white/30">Enter your email</div>
            <button className="rounded bg-primary px-3 py-1.5 text-[9px] font-medium text-white">Get Started</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ value: "$12.4k", label: "Revenue" }, { value: "2,847", label: "Users" }, { value: "96%", label: "Uptime" }].map((s, i) => (
            <div key={i} className="rounded-lg bg-white/5 p-2 text-center">
              <div className="text-xs font-bold text-white">{s.value}</div>
              <div className="text-[8px] text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 rounded-lg bg-white/5 px-3 py-2">
          <span className="text-[8px] text-white/30">Trusted by</span>
          {["Company 1", "Company 2", "Company 3"].map((c) => (
            <span key={c} className="text-[8px] font-medium text-white/50">{c}</span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ title: "Analytics", desc: "Real-time insights" }, { title: "Automate", desc: "Workflow builder" }, { title: "Security", desc: "Enterprise grade" }].map((f, i) => (
            <div key={i} className="rounded-lg bg-white/5 p-2">
              <div className="text-[9px] font-medium text-white">{f.title}</div>
              <div className="text-[8px] text-white/40">{f.desc}</div>
            </div>
          ))}
        </div>
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
          <div className="relative mx-auto" style={{ maxWidth: "1400px", minHeight: "820px" }}>
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
