"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Globe,
  ShoppingCart,
  Search,
  Smartphone,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Loader2,
  Quote,
  Languages,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "./providers";
import InteractiveShowcase from "./InteractiveShowcase";
import AnimatedHeroText from "./AnimatedHeroText";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const serviceIcons = [Globe, Code2, ShoppingCart, Search];
const WHATSAPP_NUMBER = "213558823254";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}

function GradientBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-25 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #CC3366, transparent 60%)",
      }}
    />
  );
}

function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative w-full max-w-2xl"
    >
      <div className="absolute -inset-6 rounded-sm bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl" />
      <div className="relative overflow-hidden rounded-sm border border-slate-200 dark:border-white/5 bg-white shadow-xl shadow-black/5 dark:bg-surface dark:shadow-2xl dark:shadow-black/40">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/30 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <div className="ml-3 flex-1 rounded-sm border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30 px-3 py-1">
            <span className="text-xs text-slate-400 dark:text-text-muted">zidlyweb.com</span>
          </div>
        </div>

        <div className="space-y-6 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <div className="h-3 w-24 rounded-sm bg-slate-300 dark:bg-white/10" />
            </div>
            <div className="flex gap-4">
              <div className="h-2.5 w-14 rounded-sm bg-slate-200 dark:bg-white/5" />
              <div className="h-2.5 w-14 rounded-sm bg-slate-200 dark:bg-white/5" />
              <div className="h-2.5 w-14 rounded-sm bg-slate-200 dark:bg-white/5" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-8 pt-4">
            <div className="col-span-3 space-y-4">
              <div className="h-3 w-16 rounded-sm bg-primary/20" />
              <div className="h-5 w-full rounded-sm bg-gradient-to-r from-slate-600 to-slate-300 dark:from-white dark:to-white/40" />
              <div className="h-5 w-3/4 rounded-sm bg-gradient-to-r from-slate-600 to-slate-300 dark:from-white dark:to-white/40" />
              <div className="h-3 w-full rounded-sm bg-slate-200 dark:bg-white/5" />
              <div className="flex gap-3 pt-2">
                <div className="h-10 w-32 rounded-sm bg-primary" />
                <div className="h-10 w-32 rounded-sm border border-slate-300 dark:border-white/10" />
              </div>
            </div>
            <div className="col-span-2 aspect-[3/4] rounded-sm border border-slate-200 dark:border-white/5 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-white/[0.02]" />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-sm border border-slate-200 dark:border-white/5 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-white/[0.02]"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LanguageToggle({ light }: { light?: boolean }) {
  const { locale, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      aria-label="Switch language"
      className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
        light ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-[#1E293B]"
      }`}
    >
      <Languages className="h-4 w-4" />
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}

function WhatsAppButton() {
  const { dir } = useLanguage();
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 2 }}
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-sm bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl rtl:right-auto rtl:left-6"
      aria-label={dir === "rtl" ? "تواصل معنا" : "Contact us"}
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}

export default function Home() {
  const { t, dir, locale } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prevScrollY = useRef(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [formState, handleSubmit] = useForm("mzdqyyev");
  const pendingLead = useRef<Record<string, string> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 80) {
        setScrolled(true);
        if (currentY > prevScrollY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setScrolled(false);
        setHidden(false);
      }
      prevScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % t.hero.rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.hero.rotatingPhrases.length]);

  useEffect(() => {
    if (formState.succeeded && pendingLead.current) {
      const data = pendingLead.current;
      pendingLead.current = null;
      fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});
    }
  }, [formState.succeeded]);

  useEffect(() => {
    const section = document.getElementById("about-section");
    if (!section) return;
    let sent = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !sent) {
          sent = true;
          setTimeout(() => {
            const iframe = document.querySelector<HTMLIFrameElement>('iframe[src="/zf.html"]');
            iframe?.contentWindow?.postMessage("start-scroll", "*");
          }, 5000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main
      dir={dir}
      className="relative overflow-x-hidden bg-white text-[#1E293B] dark:bg-black dark:text-white antialiased"
    >
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white shadow-md shadow-black/5"
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <a href="#top" className={`flex items-center gap-2 text-lg font-bold transition-colors ${
            scrolled ? "text-[#1E293B]" : "text-white"
          }`}>
            <svg viewBox="0 0 48 48" className="h-14 w-auto sm:h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="10" fill="url(#logoGrad)" />
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily="system-ui">Z</text>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#CC3366" />
                  <stop offset="100%" stopColor="#E5558A" />
                </linearGradient>
              </defs>
            </svg><span className="inline-flex items-baseline" dir="ltr"><span className="text-xl sm:text-2xl">Zidly</span>Web</span>
          </a>

          <div className={`hidden items-center gap-8 text-sm font-medium transition-colors lg:flex ${
            scrolled ? "text-slate-600" : "text-white/70"
          }`}>
            <a href="#services" className="transition-colors hover:text-primary">{t.nav.services}</a>
            <a href="#work" className="transition-colors hover:text-primary">{t.nav.work}</a>
            <a href="#process" className="transition-colors hover:text-primary">{t.nav.process}</a>
            <a href="#testimonials" className="transition-colors hover:text-primary">{t.nav.testimonials}</a>
            <a href="#pricing" className="transition-colors hover:text-primary">{t.nav.pricing}</a>
            <a href="#faq" className="transition-colors hover:text-primary">{t.nav.faq}</a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle light={!scrolled} />
            <a
              href="#contact"
              className="inline-flex items-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              {t.nav.cta}
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle light={!scrolled} />
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-sm transition-colors ${
                scrolled
                  ? "border border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                  : "border border-white/20 bg-white/10 text-white/70 backdrop-blur-sm hover:border-white/40 hover:text-white"
              }`}
            >
              {mobileMenuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className={`border-t px-6 py-4 backdrop-blur-md lg:hidden ${
            scrolled
              ? "border-slate-200 bg-white/95 text-slate-600"
              : "border-white/10 bg-black/80 text-white/70"
          }`}>
            <div className={`flex flex-col gap-4 text-sm font-medium ${
              scrolled ? "text-slate-600" : "text-white/70"
            }`}>
<a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">{t.nav.services}</a>
<a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">{t.nav.work}</a>
<a href="#process" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">{t.nav.process}</a>
<a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">{t.nav.testimonials}</a>
<a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">{t.nav.pricing}</a>
<a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary">{t.nav.faq}</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mt-2 inline-flex justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white">{t.nav.cta}</a>
            </div>
          </div>
        )}
      </header>

      <section
        id="top"
        className="relative isolate overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />
        <div
          aria-hidden
          className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(204,51,102,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(204,51,102,0.06)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <GradientBlob className="-top-32 -left-32 h-96 w-96 rtl:-right-32 rtl:left-auto" />
        <GradientBlob className="top-1/3 -right-32 h-96 w-96 opacity-15 rtl:-left-32 rtl:right-auto" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] w-full max-w-4xl items-center px-6 py-20 pt-28 lg:px-12 lg:py-28 lg:pt-32">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center">
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
              <span className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
                {(t.hero.headlineLine1 as string).split(" ").map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.06 }}
                    className={word.toLowerCase() === "real" ? "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" : ""}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <AnimatedHeroText />

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/60 hover:text-white"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {t.hero.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  animate="show"
                  custom={i + 2}
                  variants={fadeUp}
                >
                  <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </motion.div>
              ))}

              <motion.div
                initial="hidden"
                animate="show"
                custom={4}
                variants={fadeUp}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-2xl font-bold text-[#CC3467] sm:text-3xl">
                      {t.hero.rotatingPhrases[phraseIndex].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-black/50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-text-muted">
            {t.trustBadges.title}
          </p>
        </div>
        <div className="relative flex overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
          <motion.div
            className="flex shrink-0 items-center gap-16 px-8"
            animate={{ x: ["0%", "-25%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...t.trustBadges.items, ...t.trustBadges.items, ...t.trustBadges.items, ...t.trustBadges.items].map((client, i) => (
              <div key={i} className="flex h-14 items-center justify-center shrink-0">
                <img
                  src={client.image}
                  alt={client.name}
                  className="h-full w-auto max-w-[140px] object-contain opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <span id="services" />
      <span id="work" />
      <span id="process" />
      <span id="testimonials" />
      <span id="faq" />
      <span id="pricing" />
      <InteractiveShowcase t={t} locale={locale} />

      <section id="about-section" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <Eyebrow>{t.whyChoose.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1E293B] dark:text-white sm:text-4xl lg:text-5xl font-display">
              {t.whyChoose.title}
            </h2>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.whyChoose.items.map((item, i) => {
              const IconComponent = (() => {
                switch (item.icon) {
                  case "Code2": return Code2;
                  case "Sparkles": return Sparkles;
                  case "Smartphone": return Smartphone;
                  case "ShieldCheck": return ShieldCheck;
                  default: return Check;
                }
              })();
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  custom={i}
                  className="group rounded-sm border border-slate-200 dark:border-white/5 bg-white dark:bg-surface p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/20 text-primary">
                    <IconComponent className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[#1E293B] dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-text-muted">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-24 grid items-center gap-12 lg:grid-cols-5">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1E293B] dark:text-white sm:text-4xl lg:text-5xl font-display">
                {locale === "ar" ? (
                  <>حلول مواقع رقمية تحقق <span className="text-[#CC3467]">تأثيراً</span> حقيقياً</>
                ) : (
                  <>Digital Website Solutions that deliver Real <span className="text-[#CC3467]">Impact</span></>
                )}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-500 dark:text-text-muted sm:text-lg">
                {t.about.paragraph1Rest}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center justify-center overflow-hidden rounded-full bg-primary/20">
                  <img src="/oussama.jpg" alt={t.about.ceoName} className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1E293B] dark:text-white">{t.about.ceoName}</p>
                  <p className="text-sm text-slate-500 dark:text-text-muted">{t.about.ceoTitle}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={1}
              className="lg:col-span-2"
            >
              <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px]">
                <div className="relative rounded-[2rem] border-[6px] border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
                  <div className="absolute top-0 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rounded-b-xl bg-zinc-900">
                    <div className="mx-auto mt-1.5 h-3 w-3 rounded-full bg-zinc-800" />
                  </div>
                  <div className="overflow-hidden rounded-[1.7rem]">
                    <iframe
                      src="/zf.html"
                      title="ZidFollow.shop"
                      className="h-[600px] w-full sm:h-[700px]"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-sm bg-gradient-to-br from-primary to-[#802080] px-8 py-16 text-center shadow-2xl shadow-primary/20 sm:px-16"
          >
            <div
              aria-hidden
              className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]"
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-display">
                {t.finalCta.headline}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                {t.finalCta.text}
              </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-all hover:opacity-90"
                >
                  {t.finalCta.ctaPrimary}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  {t.finalCta.ctaSecondary}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
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

        <section id="contact" className="relative z-10 scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              className="lg:col-span-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <Eyebrow>{t.contact.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
                {t.contact.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                {t.contact.subtitle}
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=brahimioussama446@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-sm border border-white/10 bg-transparent p-4 transition-colors hover:border-primary/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary/20 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-white/60">{t.contact.emailLabel}</p>
                    <p className="text-sm font-semibold text-white" dir="ltr">brahimioussama446@gmail.com</p>
                  </div>
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-sm border border-white/10 bg-transparent p-4 transition-colors hover:border-[#25D366]/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#25D366]/10 text-[#25D366]">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-white/60">{t.contact.whatsappLabel}</p>
                    <p className="text-sm font-semibold text-white" dir="ltr">+213 558 82 32 54</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-sm border border-white/10 bg-transparent p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white/60">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-white/60">{t.contact.locationLabel}</p>
                    <p className="text-sm font-semibold text-white">{t.contact.locationValue}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              custom={1}
            >
              <div className="rounded-sm border border-white/10 bg-transparent p-8 sm:p-10">
                {formState.succeeded ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <Check className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-white">{t.contact.form.successTitle}</h3>
                    <p className="mt-2 max-w-sm text-sm text-white/60">{t.contact.form.successText}</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => {
                    const fd = new FormData(e.currentTarget);
                    pendingLead.current = {
                      name: fd.get("name") as string,
                      email: fd.get("email") as string,
                      whatsapp: fd.get("whatsapp") as string,
                      business: (fd.get("business") as string) || "",
                      details: fd.get("details") as string,
                    };
                    handleSubmit(e);
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white">{t.contact.form.nameLabel}</label>
                        <input
                          id="name" type="text" name="name" required
                          placeholder={t.contact.form.namePlaceholder}
                          className="w-full rounded-sm border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <ValidationError prefix="Name" field="name" errors={formState.errors} />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white">{t.contact.form.emailLabel}</label>
                        <input
                          id="email" type="email" name="email" required
                          placeholder={t.contact.form.emailPlaceholder}
                          className="w-full rounded-sm border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <ValidationError prefix="Email" field="email" errors={formState.errors} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="business" className="mb-2 block text-sm font-semibold text-white">{t.contact.form.businessLabel}</label>
                      <input
                        id="business" type="text" name="business"
                        placeholder={t.contact.form.businessPlaceholder}
                        className="w-full rounded-sm border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <ValidationError prefix="Business" field="business" errors={formState.errors} />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-white">{t.contact.form.whatsappLabel}</label>
                      <input
                        id="whatsapp" type="tel" name="whatsapp" required
                        placeholder={t.contact.form.whatsappPlaceholder}
                        className="w-full rounded-sm border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <ValidationError prefix="WhatsApp" field="whatsapp" errors={formState.errors} />
                    </div>

                    <div>
                      <label htmlFor="details" className="mb-2 block text-sm font-semibold text-white">{t.contact.form.detailsLabel}</label>
                      <textarea
                        id="details" name="details" required rows={5}
                        placeholder={t.contact.form.detailsPlaceholder}
                        className="w-full resize-none rounded-sm border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <ValidationError prefix="Details" field="details" errors={formState.errors} />
                    </div>

                    {formState.errors && formState.errors.getFormErrors()?.length > 0 && (
                      <p className="text-sm text-red-400">{t.contact.form.error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={formState.submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-7 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {formState.submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      {formState.submitting ? t.contact.form.sending : t.contact.form.submit}
                    </button>
                  </form>
                )}
              </div>
          </motion.div>
        </div>
      </div>
      </section>

        <footer className="relative z-10 border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
            <a href="#top" className="flex items-center gap-2 font-bold text-white">
              <svg viewBox="0 0 48 48" className="h-12 w-auto sm:h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="10" fill="url(#logoGrad)" />
                <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily="system-ui">Z</text>
              </svg>
              <span className="inline-flex items-baseline" dir="ltr"><span className="text-lg sm:text-xl">Zidly</span>Web</span>
            </a>
            <div className="flex flex-col items-center gap-1 sm:items-end">
              <p className="text-sm text-white/60">
                &copy; {new Date().getFullYear()} ZidlyWeb. {t.footer.rights}
              </p>
              <p className="text-xs text-white/40">
                Designed by{" "}
                <a
                  href="https://web.facebook.com/oussama.tistou.3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-primary transition-colors"
                >
                  Oussama Tistou
                </a>
              </p>
            </div>
          </div>
        </footer>
      </section>

      <WhatsAppButton />
    </main>
  );
}
