"use client";

import { useState } from "react";
import Link from "next/link";
import { SubPageCard } from "@/components/SubPageCard";
import gamesPT from "@/data/games-pt.json";
import gamesEN from "@/data/games-en.json";
import { ArrowLeft, Gamepad2 } from "lucide-react";

export default function GamesPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  const games = language === "pt" ? gamesPT : gamesEN;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-8">
        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <Link
                href="/"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-amber-400 transition-colors mb-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === "pt" ? "Voltar" : "Back"}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold">
                {language === "pt" ? "Jogos" : "Games"}
              </h1>
            </div>
          </div>

          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white text-zinc-800 rounded-lg hover:bg-zinc-200 transition self-start md:self-auto"
          >
            {language === "pt" ? "English" : "Português"}
          </button>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {language === "pt"
            ? "Jogos e experiências interativas desenvolvidos com JavaScript, TypeScript e Canvas API — de clássicos repaginados a aventuras originais."
            : "Games and interactive experiences built with JavaScript, TypeScript and Canvas API — from reimagined classics to original adventures."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <SubPageCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}
