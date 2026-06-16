"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const phrases = [
  "Elegant websites for modern brands",
  "Built with performance and conversion in mind",
  "Designed to grow your business online",
];

export default function AnimatedHeroText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(phrases.length - 1, Math.floor(v * phrases.length));
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div ref={sectionRef} className="mx-auto mt-6 max-w-xl h-14 sm:h-12 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-lg leading-relaxed text-white/80"
        >
          {phrases[activeIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
