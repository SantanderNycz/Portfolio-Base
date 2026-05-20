"use client";

import { useState } from "react";
import Link from "next/link";
import { SubPageCard } from "@/components/SubPageCard";
import sitesPT from "@/data/sites-pt.json";
import sitesEN from "@/data/sites-en.json";
import { ArrowLeft, Globe } from "lucide-react";

export default function SitesPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  const sites = language === "pt" ? sitesPT : sitesEN;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-8">
        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
              <Globe className="w-7 h-7 text-amber-400" />
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
                {language === "pt" ? "Sites" : "Websites"}
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
            ? "Sites e landing pages com foco em design, responsividade e boas práticas — de e-commerce a redes sociais, explorando HTML, CSS, Angular e React."
            : "Websites and landing pages focused on design, responsiveness and best practices — from e-commerce to social networks, exploring HTML, CSS, Angular and React."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <SubPageCard key={site.id} {...site} />
          ))}
        </div>
      </div>
    </div>
  );
}
