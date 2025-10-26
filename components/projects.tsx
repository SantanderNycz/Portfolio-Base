"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
          name: language === "en" ? "Bikcraft" : "Bikcraft",
          description:
            language === "en"
              ? "A modern, responsive portfolio site that showcases projects and skills with dark mode support."
              : "Um site de portfólio moderno e responsivo que apresenta projetos e habilidades com suporte ao modo escuro.",
          image: "/bikcraft.png?height=300&width=500",
          technologies: ["HTML", "CSS", "JavaScript", "PHP"],
          github: "https://github.com/SantanderNycz/bikcraft",
          demo: "https://bikcraft-git-main-santandernyczs-projects.vercel.app/",
        },

        {
          id: 2,
          name: language === "en" ? "Sandlerflix" : "Sandlerflix",
          description:
            language === "en"
              ? "A project based on Netflix, but focused solely and entirely on Adam Sandler, one of the greatest actors of our time."
              : "Um projeto baseado na Netflix, mas focado única e totalmente no Adam Sandler, um dos maiores atores da atualidade.",
          image: "/Sandlerflix.png?height=300&width=500",
          technologies: ["HTML", "CSS", "JavaScript"],
          github: "https://github.com/SantanderNycz/sandlerflix",
          demo: "https://sandlerflix.vercel.app/",
        },
        {
          id: 3,
          name: language === "en" ? "42 Porto" : "42 Porto",
          description:
            language === "en"
              ? "Projects carried out during Common Core at School 42 Porto."
              : "Projetos feitos durante o Common Core da escola 42 Porto.",
          image: "/42.png?height=300&width=500",
          technologies: ["C"],
          github: "https://github.com/SantanderNycz/42CommonCore",
          demo: "/projetos-42",
        },
        {
          id: 4,
          name: language === "en" ? "Order App" : "Aplicativo de Orçamento",
          description:
            language === "en"
              ? "A quotation application designed for Stock Som e Stock Music stores, with automatic date updating, print output and duplicate writing simultaneously for the customer's path."
              : "Um aplicativo de orçamento feito para as lojas Stock Som e Stock Music, com atualização automática de data, saída para impressão e com escrita duplicada simultaneamente para via do cliente.",
          image: "/order.png?height=300&width=500",
          technologies: ["JavaScript", "TypeScript", "CSS"],
          github: "https://github.com/SantanderNycz/App-Orcamento",
          demo: "https://app-orcamento-lyart.vercel.app/",
        },
        {
          id: 5,
          name: language === "en" ? "Clone do Spotify" : "Spotify Clone",
          description:
            language === "en"
              ? "Spotify clone project, using knowledge of CSS and JS effects."
              : "Projeto de clone do Spotify, utilizando o conhecimento em CSS e efeitos de JS.",
          image: "/Spotify.png?height=300&width=500",
          technologies: ["HTML", "CSS", "JavaScript"],
          github: "https://github.com/SantanderNycz/spotify",
          demo: "https://spotify-clone-sandy-nine.vercel.app/",
        },
        {
          id: 6,
          name: language === "en" ? "Fokus App" : "Aplicativo Fokus",
          description:
            language === "en"
              ? "An app to manage your focus and optimize your productivity, simulating the pomodoro method."
              : "Um app para gerenciar seu foco e otimizar a sua produtividade, simulando o método pomodoro.",
          image: "/fokus.png?height=300&width=500",
          technologies: ["JavaScript", "HTML", "CSS"],
          github: "https://github.com/SantanderNycz/fokus",
          demo: "https://fokus-xi-eight.vercel.app/",
        },
        {
          id: 7,
          name: language === "en" ? "Green Loop" : "Green Loop",
          description:
            language === "en"
              ? "A project presented at the 'The Retail Hack' hackathon, organized by the Sonae Group, Google and other collaborators, aimed at presenting a solution for food waste. The idea was an app/website to identify markets with products close to their expiration date, indicating the location and offering discounts, so that customers could save money and everyone could avoid waste.                      "
              : "Um projeto apresentado no hackaton 'The Retail Hack', ministrado pelo Grupo Sonae, Google e outros colaboradores, visando apresentar uma solução para o desperdício alimentício. A idéia foi um app/site para identificar mercados com produtos próximo do vencimento, indicando o local e oferecendo desconto, para que o cliente poupe dinheiro e para que todos evitem o desperdício. ",
          image: "/greenloop.png?height=300&width=500",
          technologies: ["JavaScript", "TypeScript", "CSS", "HTML"],
          github: "https://github.com/SantanderNycz/GreenLoop",
          demo: "https://green-loop-six.vercel.app/",
        },
        {
          id: 8,
          name: language === "en" ? "Eri Pongson - v2" : "Eri Pongson - v2",
          description:
            language === "en"
              ? "A Pong game with AI, initially built using the p5.js library, with the second version bringing improvements in gameplay, smoother animations, and enhanced AI. The game is inspired by the legendary actor Eri Johnson, well known for his footvolley skills."
              : "Um jogo Pong com IA, que utilizava em sua primeira versão a biblioteca p5.js, e na sua segunda versão traz melhorias na jogabilidade, animações mais suaves e IA aprimorada. O jogo é inspirado no lendário ator Eri Johnson, muito conhecido por sua habilidades no futevôlei.",
          image: "/Pongson.png?height=300&width=500",
          technologies: ["HTML", "CSS", "JavaScript"],
          github: "https://github.com/SantanderNycz/eri-pongson-v2",
          demo: "https://eri-pongson.vercel.app/",
        },
        {
          id: 9,
          name: language === "en" ? "Expert Notes" : "Bloco de notas",
          description:
            language === "en"
              ? "A notepad app, based on TS and JS, with the option of audio or written notes."
              : "Um app de bloco de notas, baseado em TS e JS, com opção de notas em áudio ou escritas.",
          image: "/Notes.png?height=300&width=500",
          technologies: ["HTML", "CSS", "JavaScript", "TypeScript"],
          github: "https://github.com/SantanderNycz/nlw-expert-notes",
          demo: "https://nlw-expert-notes-five-pi.vercel.app/",
        },
        {
          id: 10,
          name:
            language === "en" ? "Secret Number Game" : "Jogo do Número Secreto",
          description:
            language === "en"
              ? "A guessing game in which you have to get the chosen number right and which counts the number of attempts to make it competitive."
              : "Um jogo de adivinhação em que você precisa acertar o número escolhido e que contabiliza o número de tentativas, para torná-lo competitivo.",
          image: "/NumeroSecreto.png?height=300&width=500",
          technologies: ["HTML", "CSS", "JavaScript"],
          github: "https://github.com/SantanderNycz/Jogo-do-numero-secreto",
          demo: "https://secret-number-beta-project.vercel.app/",
        },
        {
          id: 11,
          name: language === "en" ? "Encryptor" : "Encriptador",
          description:
            language === "en"
              ? "An encryptor that allows you to copy the encrypted text or reverse the process."
              : "Um encriptador que você pode copiar o texto encriptado ou fazer o processo reverso.",
          image: "/decoder.png?height=300&width=500",
          technologies: ["HTML", "CSS", "JavaScript"],
          github: "https://github.com/SantanderNycz/Decode",
          demo: "https://decode-sand-three.vercel.app/",
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
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
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
                className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-400/10 transition-shadow"
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
                        className="text-xs bg-zinc-800 text-amber-400 px-2 py-1 rounded"
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
                      className="flex items-center text-zinc-300 hover:text-amber-400 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      {t("projects.code")}
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-zinc-300 hover:text-amber-400 transition-colors"
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
