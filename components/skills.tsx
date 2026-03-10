"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/language-context";

const skillBadges = [
  // FRONTEND
  {
    name: "HTML5",
    badge: "https://skillicons.dev/icons?i=html",
    category: "frontend",
  },
  {
    name: "CSS3",
    badge: "https://skillicons.dev/icons?i=css",
    category: "frontend",
  },
  {
    name: "JavaScript",
    badge: "https://skillicons.dev/icons?i=javascript",
    category: "frontend",
  },
  {
    name: "TypeScript",
    badge: "https://skillicons.dev/icons?i=typescript",
    category: "frontend",
  },
  {
    name: "React",
    badge: "https://skillicons.dev/icons?i=react",
    category: "frontend",
  },
  {
    name: "Next.js",
    badge: "https://skillicons.dev/icons?i=nextjs",
    category: "frontend",
  },
  {
    name: "Vite",
    badge: "https://skillicons.dev/icons?i=vite",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    badge: "https://skillicons.dev/icons?i=tailwindcss",
    category: "frontend",
  },

  // BACKEND
  {
    name: "Node.js",
    badge: "https://skillicons.dev/icons?i=nodejs",
    category: "backend",
  },
  {
    name: "Express.js",
    badge: "https://skillicons.dev/icons?i=expressjs",
    category: "backend",
  },
  {
    name: "Python",
    badge: "https://skillicons.dev/icons?i=python",
    category: "backend",
  },
  { name: "C", badge: "https://skillicons.dev/icons?i=c", category: "backend" },
  {
    name: "JWT",
    badge: "https://api.iconify.design/logos/jwt-icon.svg",
    category: "backend",
    skilliconsStyle: true,
  },

  // DATABASE
  {
    name: "MySQL",
    badge: "https://skillicons.dev/icons?i=mysql",
    category: "database",
  },
  {
    name: "PostgreSQL",
    badge: "https://skillicons.dev/icons?i=postgresql",
    category: "database",
  },
  {
    name: "MongoDB",
    badge: "https://skillicons.dev/icons?i=mongodb",
    category: "database",
  },
  {
    name: "Prisma",
    badge: "https://skillicons.dev/icons?i=prisma",
    category: "database",
  },

  // TESTING
  {
    name: "Jest.js",
    badge: "https://skillicons.dev/icons?i=jest",
    category: "testing",
  },

  // DESIGN
  {
    name: "Figma",
    badge: "https://skillicons.dev/icons?i=figma",
    category: "design",
  },
  {
    name: "Photoshop",
    badge: "https://skillicons.dev/icons?i=photoshop",
    category: "design",
  },
  {
    name: "After Effects",
    badge: "https://skillicons.dev/icons?i=aftereffects",
    category: "design",
  },

  // TOOLS
  {
    name: "Linux",
    badge: "https://skillicons.dev/icons?i=linux",
    category: "tools",
  },
  {
    name: "Bash",
    badge: "https://skillicons.dev/icons?i=bash",
    category: "tools",
  },
  {
    name: "Git",
    badge: "https://skillicons.dev/icons?i=git",
    category: "tools",
  },
  {
    name: "GitHub",
    badge: "https://skillicons.dev/icons?i=github",
    category: "tools",
  },
  {
    name: "Docker",
    badge: "https://skillicons.dev/icons?i=docker",
    category: "tools",
  },
  {
    name: "AWS",
    badge: "https://skillicons.dev/icons?i=aws",
    category: "tools",
  },
  {
    name: "Vercel",
    badge: "https://skillicons.dev/icons?i=vercel",
    category: "tools",
  },
  {
    name: "Render",
    badge: "/render.png",
    category: "tools",
    skilliconsStyle: true,
  },
  {
    name: "Render",
    badge: "/railway.svg",
    category: "tools",
    skilliconsStyle: true,
  },
];

const categoryTranslations = {
  en: {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    testing: "Testing",
    tools: "Tools",
    design: "Design",
  },
  pt: {
    frontend: "Frontend",
    backend: "Backend",
    database: "Banco de Dados",
    testing: "Testes",
    tools: "Ferramentas",
    design: "Design",
  },
};

export default function Skills() {
  const { t, language } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const groupedSkills = skillBadges.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skillBadges>,
  );

  const categoryOrder = [
    "frontend",
    "backend",
    "database",
    "testing",
    "tools",
    "design",
  ];
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = categoryOrder[currentCategoryIndex];
  const currentSkills = groupedSkills[currentCategory];

  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "0px" });

  return (
    <motion.section
      id="skills"
      ref={ref}
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 0.98 }}
      transition={{ duration: 1.2 }}
      viewport={{ once: true }}
      className="py-10 px-4 overflow-hidden relative z-[48]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(24,24,27,0), rgba(24,24,27, 0.8), rgba(24,24,27, 0.8), rgba(24,24,27,0))",
      }}
    >
      <div className="container mx-auto max-w-6xl text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-4xl text-center font-bold mb-4">
            {t("skills.title")}
          </h2>
          <motion.div
            className="w-20 h-1 bg-amber-400 mx-auto mb-6 origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <p className="text-muted-foreground">{t("skills.subtitle")}</p>
        </motion.div>

        {/* Swipe de categorias */}
        <div className="z-10 py-4 flex justify-center mb-8 gap-4 overflow-x-auto no-scrollbar">
          {categoryOrder.map((cat, index) => (
            <button
              key={cat}
              onClick={() => setCurrentCategoryIndex(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                currentCategoryIndex === index ? "bg-amber-400" : "bg-gray-300"
              }`}
              title={
                categoryTranslations[
                  language as keyof typeof categoryTranslations
                ][cat as keyof typeof categoryTranslations.en]
              }
            />
          ))}
        </div>

        {/* Skills da categoria selecionada */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-zinc mb-10">
              {
                categoryTranslations[
                  language as keyof typeof categoryTranslations
                ][currentCategory as keyof typeof categoryTranslations.en]
              }
            </h3>

            <div className="flex flex-wrap justify-center gap-8 h-32">
              {currentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  transition={{ duration: 0.1, delay: index * 0.02 }}
                  whileHover={{ scale: 1.7, y: -5 }}
                  className="badge-animate flex flex-col items-center h-20 relative"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill.skilliconsStyle ? (
                    <div className="w-10 h-10 bg-slate-50 dark:bg-darkblue dark:border-zinc-700 rounded-lg flex items-center justify-center transition-all duration-200">
                      <img
                        src={skill.badge}
                        alt={skill.name}
                        className="w-[34px] h-[34px] object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <img
                      src={skill.badge}
                      alt={skill.name}
                      className="h-10 w-10 object-contain transition-all duration-300 hover:drop-shadow-lg"
                      loading="lazy"
                    />
                  )}

                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs font-semibold text-retroYellow absolute top-11 whitespace-nowrap"
                      >
                        {skill.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
