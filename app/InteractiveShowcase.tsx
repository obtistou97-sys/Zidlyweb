"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Globe,
  Code2,
  ShoppingCart,
  Search,
  Quote,
  ArrowRight,
  ChevronDown,
  Star,
  Check,
} from "lucide-react";
import { TranslationShape } from "./translations";

const serviceIcons = [Globe, Code2, ShoppingCart, Search];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const tabVariants = {
  inactive: { color: "#71717A" },
  active: { color: "#A1A1AA" },
};

const glowPositions = [
  "left-[10%] top-[20%]",
  "left-[60%] top-[10%]",
  "left-[30%] top-[60%]",
  "left-[70%] top-[50%]",
  "left-[20%] top-[40%]",
];

const TABS = [
  { key: "services", labelKey: "services" as const },
  { key: "work", labelKey: "work" as const },
  { key: "process", labelKey: "process" as const },
  { key: "testimonials", labelKey: "testimonials" as const },
  { key: "pricing", labelKey: "pricing" as const },
  { key: "faq", labelKey: "faq" as const },
];

function Rating({ value = 5 }: { value?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < value ? "fill-primary text-primary" : "fill-zinc-600 text-zinc-600"}`}
        />
      ))}
    </div>
  );
}

function FAQAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2.5">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-medium text-zinc-200 sm:text-base">
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 text-primary"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-zinc-800/40 px-6 pb-5 pt-4 text-sm leading-relaxed text-zinc-400">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function ServicesPanel({ t }: { t: Pick<TranslationShape, "services"> }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {t.services.items.map((item, i) => {
        const Icon = serviceIcons[i];
        return (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/60 p-6 backdrop-blur-sm transition-colors hover:border-primary/30"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5.5 w-5.5" />
            </span>
            <h3 className="relative mt-4 text-base font-semibold text-zinc-100">
              {item.title}
            </h3>
            <p className="relative mt-1.5 text-sm leading-relaxed text-zinc-400">
              {item.desc}
            </p>
            <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors group-hover:text-primary/80">
              {item.cta}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ProjectsPanel({ t }: { t: TranslationShape }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {t.work.items.map((project, i) => (
        <motion.div
          key={project.title}
          variants={itemVariants}
          className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm transition-colors hover:border-primary/30"
        >
          <div className="aspect-[4/3] overflow-hidden bg-zinc-800/50">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <span className="text-xs font-semibold text-primary">
              {project.tag}
            </span>
            <h3 className="mt-1 text-sm font-semibold text-zinc-100">
              {project.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              {project.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ProcessPanel({ t }: { t: TranslationShape }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative"
    >
      <div className="absolute left-[23px] top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent sm:block" />
      <div className="space-y-5">
        {t.process.steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={itemVariants}
            className="relative flex gap-5 sm:items-start"
          >
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-900 text-sm font-bold text-primary shadow-lg shadow-primary/5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 pt-1.5">
              <h3 className="text-base font-semibold text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function TestimonialsPanel({ t }: { t: TranslationShape }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 md:grid-cols-3"
    >
      {t.testimonials.items.map((item, i) => (
        <motion.div
          key={item.name}
          variants={itemVariants}
          className="group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/20"
        >
          <Quote className="h-5 w-5 text-primary/40" />
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            &ldquo;{item.text}&rdquo;
          </p>
          <div className="mt-5 flex items-center gap-3 border-t border-zinc-800/40 pt-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary text-xs font-bold text-white shadow-lg shadow-primary/20">
              {item.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-200">{item.name}</p>
              <p className="text-xs text-zinc-500">{item.role}</p>
            </div>
            <div className="ml-auto shrink-0">
              <Rating value={5} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function FAQPanel({ t }: { t: TranslationShape }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <FAQAccordion items={t.faq.items} />
    </motion.div>
  );
}

function PricingPanel({ t }: { t: TranslationShape }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-5 md:grid-cols-3"
    >
      {t.pricing.plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          variants={itemVariants}
          className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm transition-colors ${
            "featured" in plan && plan.featured
              ? "border-primary/40 bg-primary/10 shadow-lg shadow-primary/10"
              : "border-zinc-800/50 bg-zinc-900/40 hover:border-primary/30"
          }`}
        >
          {"featured" in plan && plan.featured && (
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
              Popular
            </span>
          )}
          <h3 className="text-lg font-bold text-zinc-100">{plan.name}</h3>
          <p className="mt-1 text-2xl font-bold text-primary">{plan.price}</p>
          <p className="mt-2 text-sm text-zinc-400">{plan.desc}</p>
          <ul className="mt-5 flex-1 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              "featured" in plan && plan.featured
                ? "bg-primary text-white hover:opacity-90"
                : "border border-zinc-700 text-zinc-200 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {plan.cta}
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
}

const panelComponents = [
  ServicesPanel,
  ProjectsPanel,
  ProcessPanel,
  TestimonialsPanel,
  PricingPanel,
  FAQPanel,
];

export default function InteractiveShowcase({
  t,
  locale,
}: {
  t: TranslationShape;
  locale: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const idx = TABS.findIndex((t) => t.key === hash);
      if (idx >= 0) setActiveIndex(idx);
    }
    const onHash = () => {
      const h = window.location.hash.slice(1);
      const idx = TABS.findIndex((t) => t.key === h);
      if (idx >= 0) setActiveIndex(idx);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const ActivePanel = panelComponents[activeIndex];

  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-32">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/get-in-tuch-and-footer-background.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden
          className={`pointer-events-none absolute ${glowPositions[activeIndex]} h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]`}
        />
      </AnimatePresence>

      <div className="relative z-10 mx-auto px-6 lg:px-12">
        <div className="sticky top-24 z-10 pb-8 sm:pb-12 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {locale === "ar" ? "كل ما تحتاجه" : "Everything You Need"}
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
              {locale === "ar"
                ? "منصة متكاملة لبناء موقعك"
                : "An All-in-One Experience"}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg">
              {locale === "ar"
                ? "كل ما تحتاجه لبناء وتنمية وإدارة تواجدك الرقمي — كل ذلك في مكان واحد."
                : "Everything you need to build, grow, and manage your online presence — all in one place."}
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl pt-2">
          <LayoutGroup>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="no-scrollbar mt-10 flex gap-1 overflow-x-auto rounded-2xl border border-zinc-800/50 bg-zinc-900/60 p-1.5 backdrop-blur-sm"
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setActiveIndex(i)}
                className={`relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeIndex === i
                    ? "text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {activeIndex === i && (
                  <motion.span
                    layoutId="showcase-tab"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-xl bg-primary/15"
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">
                  {t.nav[tab.labelKey]}
                </span>
              </button>
            ))}
          </motion.div>
        </LayoutGroup>

        <div className="relative mt-6 min-h-[420px]">
          <div className="absolute -inset-4 rounded-3xl border border-zinc-800/30 bg-zinc-900/20 backdrop-blur-sm" />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-600">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="text-zinc-700"> / {String(TABS.length).padStart(2, "0")}</span>
              </span>
              <div className="flex gap-1.5">
                {TABS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ActivePanel t={t} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
