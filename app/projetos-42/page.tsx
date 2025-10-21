"use client";

import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";

const projects = [
  {
    title: "libft",
    description:
      "A custom C library implementing standard functions like strlen, strcpy, memcpy, and more. Foundation for all 42 projects.",
    demoPath: "/projetos-42/libft",
    githubUrl: "https://github.com/SantanderNycz/42CommonCore/tree/main/libft",
  },
  {
    title: "get_next_line",
    description:
      "A function that reads a line from a file descriptor. Handles multiple file descriptors and buffer management.",
    demoPath: "/projetos-42/get_next_line",
    githubUrl:
      "https://github.com/SantanderNycz/42CommonCore/tree/main/get_next_line",
  },
  {
    title: "ft_printf",
    description:
      "Recreation of the printf function with support for multiple format specifiers (%s, %d, %x, %p, etc.).",
    demoPath: "/projetos-42/ft_printf",
    githubUrl: "https://github.com/SantanderNycz/42CommonCore/tree/main/printf",
  },
  {
    title: "push_swap",
    description:
      "A sorting algorithm using two stacks and a limited set of operations. Optimizes for minimum number of moves.",
    demoPath: "/projetos-42/push_swap",
    githubUrl:
      "https://github.com/SantanderNycz/42CommonCore/tree/main/push_swap",
  },
];

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-8">
        <div className="mb-12">
          <img
            src="/42tp.png"
            alt="42 School Logo"
            className="w-32 h-24 object-contain"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Interactive demonstrations of C programming projects from 42 school.
            Each demo showcases the core functionality in an accessible web
            interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="pt-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
