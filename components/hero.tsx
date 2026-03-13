"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import githubLogo from "@/public/github-white.svg";
import Image from "next/image";
import Header from "./header";

export default function Hero() {
  const { t, language } = useLanguage();
  const [typedText, setTypedText] = useState("");
  const fullText = t("hero.role");

  useEffect(() => {
    let currentIndex = 0;
    setTypedText("");

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText, language]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center"
    >
      <Header />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-zinc-900/30 to-transparent"></div>
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-900/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("hero.title")} <span className="text-amber-400">Léo!</span>
          </h1>

          <h2 className="text-xl md:text-2xl mb-8 text-zinc-300">
            <span className="relative pr-1">
              {typedText}
              <span className="absolute right-0 top-0 h-full border-r-2 border-amber-400 animate-blink"></span>
            </span>
          </h2>

          <div className="flex justify-center space-x-4 mb-12">
            <a
              href="https://github.com/SantanderNycz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-amber-500/80 p-3 rounded-full transition-colors"
            >
              <Image
                src={githubLogo}
                alt="GitHub"
                width={20}
                height={20}
                className="w-6 h-6"
              />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/leonardo-santander-nycz/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-amber-500/80 p-3 rounded-full transition-colors"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          <a
            onClick={(e) => {
              e.preventDefault();

              const target = document.getElementById("about");
              if (!target) return;

              const offset = 60;
              const top =
                target.getBoundingClientRect().top + window.scrollY - offset;

              window.scrollTo({
                top,
                behavior: "smooth",
              });
            }}
            className="inline-block animate-bounce cursor-pointer"
          >
            <ArrowDown className="w-6 h-6 text-amber-400" />
            <span className="sr-only">Scroll down</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
