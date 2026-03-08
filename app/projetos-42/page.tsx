"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import projects42PT from "@/data/projects-42-pt.json";
import projects42EN from "@/data/projects-42-en.json";

export default function ProjectsPage() {
  const router = useRouter();

  // Estado para controlar o idioma local
  const [language, setLanguage] = useState<"pt" | "en">("pt");

  // Seleciona os projetos de acordo com a linguagem
  const projects = language === "pt" ? projects42PT : projects42EN;

  // Função para alternar idioma
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-8">
        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/42tp.png"
              alt="42 School Logo"
              className="w-32 h-24 object-contain"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              {language === "pt" ? "Projetos" : "Projects"}
            </h1>
          </div>

          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white text-zinc-800 rounded-lg hover:bg-zinc-200 transition"
          >
            {language === "pt" ? "English" : "Português"}
          </button>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {language === "pt"
            ? "Demonstrações interativas de projetos em C da escola 42. Cada demo mostra a funcionalidade principal em uma interface web acessível."
            : "Interactive demonstrations of C programming projects from 42 school. Each demo showcases the core functionality in an accessible web interface."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {/* Botão voltar (opcional) */}
        {/* <div className="pt-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 font-medium"
          >
            {language === "pt" ? "Voltar" : "Back"}
          </button>
        </div> */}
      </div>
    </div>
  );
}
