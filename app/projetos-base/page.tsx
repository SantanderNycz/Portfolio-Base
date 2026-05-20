"use client";

import { useState } from "react";
import Link from "next/link";
import { SubPageCard } from "@/components/SubPageCard";
import baseProjectsPT from "@/data/base-projects-pt.json";
import baseProjectsEN from "@/data/base-projects-en.json";
import { ArrowLeft, Code2 } from "lucide-react";

export default function BaseProjectsPage() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  const projects = language === "pt" ? baseProjectsPT : baseProjectsEN;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-8">
        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center">
              <Code2 className="w-7 h-7 text-amber-400" />
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
                {language === "pt" ? "Projetos Base" : "Base Projects"}
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
            ? "Projetos fundamentais que consolidaram conhecimentos em JavaScript, React e desenvolvimento full-stack, explorando desde lógica de negócio até integração de APIs."
            : "Foundational projects that consolidated knowledge in JavaScript, React and full-stack development, exploring everything from business logic to API integration."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <SubPageCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
