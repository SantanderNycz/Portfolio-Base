"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo?: string;
}

export default function Projects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Simulating fetching projects from GitHub API
    // In a real implementation, you would fetch from the GitHub API
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          name: language === "en" ? "Fokus App" : "Aplicativo Fokus",
          description:
            language === "en"
              ? "An app to manage your focus and optimize your productivity."
              : "Um app para gerenciar seu foco e otimizar a sua produtividade.",
          image: "/fokus.png?height=300&width=500",
          technologies: ["React", "Node.js", "MongoDB", "Express"],
          github: "https://github.com/SantanderNycz/fokus",
          demo: "https://fokus-xi-eight.vercel.app/",
        },
        {
          id: 2,
          name: language === "en" ? "Order App" : "Aplicativo de Orçamento",
          description:
            language === "en"
              ? "A order application, with automatic date updating, print output and duplicate writing simultaneously for the customer's path."
              : "Um aplicativo de orçamento, com atualização automática de data, saída para impressão e com escrita duplicada simultaneamente para via do cliente.",
          image: "/order.png?height=300&width=500",
          technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
          github: "https://github.com/SantanderNycz/App-Or-amento",
          demo: "https://app-orcamento-lyart.vercel.app/",
        },
        {
          id: 3,
          name: language === "en" ? "Portfolio Website" : "Site de Portfólio",
          description:
            language === "en"
              ? "A modern, responsive portfolio website showcasing projects and skills with dark mode support."
              : "Um site de portfólio moderno e responsivo que apresenta projetos e habilidades com suporte ao modo escuro.",
          image: "/bikcraft.png?height=300&width=500",
          technologies: ["React", "Tailwind CSS", "Framer Motion"],
          github: "https://github.com/SantanderNycz/bikcraft",
          demo: "https://bikcraft-git-main-santandernyczs-projects.vercel.app/",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, [language]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20 bg-zinc-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t("projects.title")}
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-emerald-400/10 transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-zinc-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-zinc-800 text-emerald-400 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-zinc-300 hover:text-emerald-400 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      {t("projects.code")}
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-zinc-300 hover:text-emerald-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {t("projects.demo")}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
