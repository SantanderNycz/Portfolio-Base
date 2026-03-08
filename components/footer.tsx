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
    <footer className="bg-zinc-900 border-t border-zinc-800 py-8">
      <div className="max-w-8xl mx-auto px-4">
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

        <div className="border-t border-zinc-800 mt-6 pt-6 text-center text-zinc-400 text-sm">
          <p>
            &copy; {currentYear} Léo Santander Nycz. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
