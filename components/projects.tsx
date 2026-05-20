"use client";

import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

import projectsPT from "@/data/projects-pt.json";
import projectsEN from "@/data/projects-en.json";

export default function Projects() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const projects: Project[] = language === "pt" ? projectsPT : projectsEN;

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 0.98 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="py-10 px-4 overflow-hidden relative z-[49]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(24,24,27,0), rgba(24,24,27, 0.9), rgba(24,24,27, 0.9), rgba(24,24,27,0))",
      }}
    >
      <h2 className="text-4xl text-center font-bold mb-4">
        {t("projects.title")}
      </h2>
      <motion.div
        className="w-20 h-1 bg-amber-400 mx-auto mb-6 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      />
      <p className="text-muted-foreground text-center mb-8">
        {t("projects.subtitle")}
      </p>

      {/* Carousel */}
      <div className="overflow-hidden w-full relative z-10 py-4">
        <div ref={emblaRef}>
          <div className="flex ml-[-0.75rem] sm:ml-[-1.5rem]">
            {projects.map((project) => {
              const isCategory = project.demo?.startsWith("/");

              if (isCategory) {
                return (
                  <motion.div
                    key={project.id}
                    className="pl-3 sm:pl-6 flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[520px] h-auto z-10"
                  >
                    <Link href={project.demo!}>
                      <motion.div
                        className="rounded-xl overflow-hidden flex flex-col shadow-2xl bg-card border border-amber-400/20 hover:border-amber-400/60 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative h-46 bg-muted">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute bottom-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                            {language === "pt" ? "Coleção de Projetos" : "Project Collection"}
                          </span>
                        </div>
                        <div className="p-3 sm:p-4 flex flex-col justify-between h-36">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold mb-1">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 ml-2 shrink-0">
                              {language === "pt" ? "Ver projetos" : "View projects"}
                              <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={project.id}
                  className="pl-3 sm:pl-6 flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[520px] h-auto cursor-pointer z-10"
                  onClick={() => setSelectedProject(project)}
                >
                  <motion.div
                    className="rounded-xl overflow-hidden flex flex-col shadow-2xl bg-card"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative h-46 bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col justify-between h-36">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex gap-4 mt-6 justify-center">
        <button
          onClick={scrollPrev}
          className="p-2 shadow-lg rounded-full hover:scale-110 transition-transform hover:text-amber-400 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
        >
          <ChevronLeft size={26} />
        </button>
        <button
          onClick={scrollNext}
          className="p-2 shadow-lg rounded-full hover:scale-110 transition-transform hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-card rounded-xl p-4 sm:p-8 relative max-w-4xl w-full 
                 max-h-[90vh] sm:max-h-none overflow-y-auto sm:overflow-y-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 hover:bg-amber-700/30 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-muted-foreground mb-5 sm:mb-6">
                  {selectedProject.longDescription}
                </p>

                <h4 className="font-semibold mb-3 text-amber-400">
                  Technologies Used:
                </h4>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-amber-600/10 text-amber-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center sm:justify-start
                           gap-2 px-6 py-3 bg-amber-600/90 text-white rounded-lg
                           font-semibold hover:bg-amber-500/90 transition-all"
                    >
                      GitHub
                    </a>
                  )}

                  {selectedProject.demo &&
                    (selectedProject.demo.startsWith("/") ? (
                      <Link
                        href={selectedProject.demo}
                        className="inline-flex items-center justify-center sm:justify-start
                             gap-2 px-6 py-3 bg-amber-600/90 text-white rounded-lg
                             font-semibold hover:bg-amber-500/90 transition-all"
                      >
                        Ver Projetos
                      </Link>
                    ) : (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center sm:justify-start
                             gap-2 px-6 py-3 bg-amber-600/90 text-white rounded-lg
                             font-semibold hover:bg-amber-500/90 transition-all"
                      >
                        Demo
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
