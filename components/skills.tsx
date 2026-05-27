"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    name: "Three.js",
    badge: "https://skillicons.dev/icons?i=threejs",
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
    name: "GraphQL",
    badge: "https://skillicons.dev/icons?i=graphql",
    category: "backend",
  },
  {
    name: "Python",
    badge: "https://skillicons.dev/icons?i=python",
    category: "backend",
  },
  { name: "C", badge: "https://skillicons.dev/icons?i=c", category: "backend" },
  // {
  //   name: "JWT",
  //   badge: "https://api.iconify.design/logos/jwt-icon.svg",
  //   category: "backend",
  //   skilliconsStyle: true,
  // },
  {
    name: "Jest.js",
    badge: "https://skillicons.dev/icons?i=jest",
    category: "backend",
    skilliconsStyle: false,
  },

  // DATABASE
  {
    name: "SQLite",
    badge: "https://skillicons.dev/icons?i=sqlite",
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

  // DevOps
  {
    name: "Linux",
    badge: "https://skillicons.dev/icons?i=linux",
    category: "devops",
  },
  {
    name: "Bash",
    badge: "https://skillicons.dev/icons?i=bash",
    category: "devops",
  },
  {
    name: "Git",
    badge: "https://skillicons.dev/icons?i=git",
    category: "devops",
  },
  {
    name: "GitHub",
    badge: "https://skillicons.dev/icons?i=github",
    category: "devops",
  },
  {
    name: "Docker",
    badge: "https://skillicons.dev/icons?i=docker",
    category: "devops",
  },
  {
    name: "AWS",
    badge: "https://skillicons.dev/icons?i=aws",
    category: "devops",
  },
  // {
  //   name: "Vercel",
  //   badge: "https://skillicons.dev/icons?i=vercel",
  //   category: "devops",
  // },
  // {
  //   name: "Render",
  //   badge: "/render.png",
  //   category: "devops",
  //   skilliconsStyle: true,
  // },
  // {
  //   name: "Railway",
  //   badge: "/railway.svg",
  //   category: "devops",
  //   skilliconsStyle: true,
  // },
];

const categoryTranslations = {
  en: {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    // testing: "Testing",
    devops: "DevOps",
    design: "Design",
  },
  pt: {
    frontend: "Frontend",
    backend: "Backend",
    database: "Banco de Dados",
    // testing: "Testes",
    devops: "DevOps",
    design: "Design",
  },
};

const categoryOrder = [
  "frontend",
  "backend",
  "database",
  // "testing",
  "devops",
  "design",
];

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] },
  }),
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1.4,
    y: 0,
    transition: { duration: 0.25, delay: i * 0.015, ease: "backOut" },
  }),
};

export default function Skills() {
  const { t, language } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "0px" });

  useEffect(() => {
    skillBadges.forEach((skill) => {
      const img = new window.Image();
      img.src = skill.badge;
    });
  }, []);

  const groupedSkills = skillBadges.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skillBadges>,
  );

  const currentCategory = categoryOrder[currentCategoryIndex];
  const currentSkills = groupedSkills[currentCategory];
  const labels =
    categoryTranslations[language as keyof typeof categoryTranslations];

  const scrollPrev = () => {
    setDirection(-1);
    setCurrentCategoryIndex(
      (prev) => (prev - 1 + categoryOrder.length) % categoryOrder.length,
    );
  };

  const scrollNext = () => {
    setDirection(1);
    setCurrentCategoryIndex((prev) => (prev + 1) % categoryOrder.length);
  };

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
          "linear-gradient(to bottom, rgba(24,24,27,0), rgba(24,24,27,0.1), rgba(24,24,27,0.45), rgba(24,24,27,0.65), rgba(24,24,27,0.45), rgba(24,24,27,0.1), rgba(24,24,27,0))",
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

        {/* Dots + Chevrons */}
        <div className="z-10 py-4 flex justify-center items-center mb-8 gap-4">
          <button
            onClick={scrollPrev}
            className="p-2 shadow-lg rounded-full hover:scale-110 transition-transform hover:text-amber-400 hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
          >
            <ChevronLeft size={26} />
          </button>

          <div className="flex gap-4 items-center">
            {categoryOrder.map((cat, index) => (
              <button
                key={cat}
                onClick={() => {
                  setDirection(index > currentCategoryIndex ? 1 : -1);
                  setCurrentCategoryIndex(index);
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentCategoryIndex === index
                    ? "bg-amber-400 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                title={labels[cat as keyof typeof labels]}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="p-2 shadow-lg rounded-full hover:scale-110 transition-transform hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          >
            <ChevronRight size={26} />
          </button>
        </div>

        {/* Skills */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentCategory}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h3 className="text-xl font-semibold text-zinc-200 mb-10">
                {labels[currentCategory as keyof typeof labels]}
              </h3>

              <div className="flex flex-wrap justify-center gap-8 min-h-[8rem] pb-4">
                {currentSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
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
                          loading="eager"
                        />
                      </div>
                    ) : (
                      <img
                        src={skill.badge}
                        alt={skill.name}
                        className="h-10 w-10 object-contain transition-all duration-300 hover:drop-shadow-lg"
                        loading="eager"
                      />
                    )}

                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
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
      </div>
    </motion.section>
  );
}
