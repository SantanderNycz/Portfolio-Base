"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import featuredPT from "@/data/featured-projects-pt.json";
import featuredEN from "@/data/featured-projects-en.json";

interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

function ProjectRow({
  project,
  imageOnLeft,
  language,
}: {
  project: FeaturedProject;
  imageOnLeft: boolean;
  language: string;
}) {
  const imageContent = (
    <motion.div
      initial={{ opacity: 0, x: imageOnLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/5 group-hover:ring-amber-400/30 transition-all duration-500 shadow-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="bg-amber-400 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg">
              <ExternalLink size={16} />
              {language === "pt" ? "Ver site" : "Visit site"}
            </span>
          </a>
        )}
      </div>
    </motion.div>
  );

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: imageOnLeft ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col gap-5 ${!imageOnLeft ? "md:items-end md:text-right" : ""}`}
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400/60 mb-1 block">
          {language === "pt" ? "Projeto em Destaque" : "Featured Project"}
        </span>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
          {project.title}
        </h3>
      </div>

      <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-xl p-5 shadow-xl">
        <p className="text-zinc-400 leading-relaxed">{project.description}</p>
      </div>

      <div
        className={`flex flex-wrap gap-2 ${!imageOnLeft ? "md:justify-end" : ""}`}
      >
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-full text-xs font-medium border border-amber-400/20"
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        className={`flex items-center gap-5 ${!imageOnLeft ? "md:justify-end" : ""}`}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <Github size={18} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-black rounded-lg font-semibold text-sm hover:bg-amber-300 transition-colors shadow-lg"
          >
            <ExternalLink size={14} />
            Demo
          </a>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
      {imageOnLeft ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </div>
  );
}

export default function FeaturedProjects() {
  const { language } = useLanguage();
  const projects: FeaturedProject[] =
    language === "pt" ? featuredPT : featuredEN;

  return (
    <section
      id="featured-projects"
      className="py-20 px-4 overflow-hidden relative z-[49]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(24,24,27,0), rgba(24,24,27,0.6), rgba(24,24,27,0.6), rgba(24,24,27,0))",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4">
            {language === "pt" ? "Projetos em Destaque" : "Featured Projects"}
          </h2>
          <motion.div
            className="w-20 h-1 bg-amber-400 mx-auto origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              imageOnLeft={index % 2 === 0}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
