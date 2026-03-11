"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import githubLogo from "@/public/github-white.svg";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800 py-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link href="#home" className="text-xl font-bold">
              <Image
                src="/logo-leo.png"
                alt="Léo Nycz"
                width={60}
                height={20}
                className="mx-auto md:mx-0"
              />
            </Link>
            <p className="text-zinc-400 mt-2">{t("footer.role")}</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/SantanderNycz"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-amber-700/80 p-2 rounded-full transition-colors"
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
              className="bg-zinc-800 hover:bg-amber-700/80 p-2 rounded-full transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <p className="text-center text-md tracking-widest">
          {String.fromCharCode(169)} {currentYear} {"\u00B7"} Leo Santander Nycz{" "}
          {"\u00B7"} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
