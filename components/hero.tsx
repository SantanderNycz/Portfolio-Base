"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import githubLogo from "@/public/github-white.svg";
import Header from "./header";

export default function Hero() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  // GSAP hero entrance
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowTagline(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-reveal", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.2,
      }).from(
        ".hero-fade",
        { y: 20, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out" },
        "-=0.4",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Typing animation — runs once on mount
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const typedRole = language === "pt" ? "Olá! Eu sou o Léo." : "Hi! I'm Leo.";
    let interval: ReturnType<typeof setInterval> | undefined;
    let transitionTimeout: ReturnType<typeof setTimeout> | undefined;

    // Start after GSAP entrance finishes (~1.4s)
    const startTimeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i++;
        setTypedText(typedRole.slice(0, i));
        if (i >= typedRole.length) {
          clearInterval(interval);
          setTypingDone(true);
          // 3s wait, then fade to tagline
          transitionTimeout = setTimeout(() => setShowTagline(true), 3000);
        }
      }, 55);
    }, 1400);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToWork = () => {
    document.getElementById("featured-projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24"
    >
      <Header />

      {/* Vignette + seamless bottom fade into next section */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(9,9,11,1) 0%, rgba(9,9,11,0.85) 10%, rgba(9,9,11,0.4) 28%, rgba(9,9,11,0.1) 55%, rgba(9,9,11,0) 100%)",
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-4">
        {/* Badge */}
        <div className="overflow-hidden mb-5">
          <span className="hero-reveal inline-block text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400/70">
            {language === "pt"
              ? "Disponível para oportunidades"
              : "Open to opportunities"}
          </span>
        </div>

        {/* Headline — pb on wrappers prevents descender clipping */}
        <h1>
          <div className="overflow-hidden pb-2 pt-1 ml-[-0.35em]">
            <span
              className="hero-reveal block text-[clamp(3.5rem,11vw,9rem)] font-bold tracking-tight"
              style={{ lineHeight: 1 }}
            >
              Full-Stack
            </span>
          </div>
          <div className="overflow-hidden pb-3 pt-1 mb-6 md:mb-10 ml-[-0.38em]">
            <span
              className="hero-reveal block text-[clamp(3.5rem,11vw,9rem)] font-bold tracking-tight text-amber-400"
              style={{ lineHeight: 0.9 }}
            >
              Developer.
            </span>
          </div>
        </h1>

        {/* Typing → Tagline area */}
        <div className="mb-8 min-h-[6rem]">
          <AnimatePresence mode="wait">
            {!showTagline ? (
              <motion.p
                key="typed"
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="text-zinc-300 text-base md:text-lg max-w-md leading-relaxed font-mono"
              >
                {typedText}
                <span
                  className={`inline-block w-[2px] h-[1em] bg-amber-400 ml-0.5 align-middle${
                    typingDone ? " cursor-blink" : ""
                  }`}
                />
              </motion.p>
            ) : (
              <motion.p
                key="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed"
              >
                {language === "pt"
                  ? "Crio produtos digitais com código limpo e design intencional."
                  : "I build digital products with clean code and intentional design."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Identity + links */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/SantanderNycz"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-fade bg-zinc-800/80 hover:bg-amber-500/80 p-3 rounded-full transition-colors backdrop-blur-sm"
          >
            <Image
              src={githubLogo}
              alt="GitHub"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/leonardo-santander-nycz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-fade bg-zinc-800/80 hover:bg-amber-500/80 p-3 rounded-full transition-colors backdrop-blur-sm"
          >
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <span className="hero-fade text-zinc-700 hidden sm:block" aria-hidden>
            ·
          </span>
          <span className="hero-fade text-sm text-zinc-500">
            Léo Santander Nycz — Porto, PT
          </span>
        </div>
      </div>

      {/* Scroll CTA */}
      <button
        onClick={scrollToWork}
        aria-label={language === "pt" ? "Ver trabalho" : "Scroll to work"}
        className="absolute bottom-8 right-4 flex flex-col items-center gap-2 group"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-amber-400 transition-colors whitespace-nowrap">
          {language === "pt" ? "Ver trabalho" : "See work"}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-700 to-transparent group-hover:from-amber-400 transition-colors" />
      </button>
    </section>
  );
}
