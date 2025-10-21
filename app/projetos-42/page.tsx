import { ProjectCard } from "@/components/ProjectCard";

const projects = [
  {
    title: "libft",
    description:
      "A custom C library implementing standard functions like strlen, strcpy, memcpy, and more. Foundation for all 42 projects.",
    demoPath: "/projects/libft",
    githubUrl: "https://github.com/yourusername/libft",
  },
  {
    title: "get_next_line",
    description:
      "A function that reads a line from a file descriptor. Handles multiple file descriptors and buffer management.",
    demoPath: "/projects/get_next_line",
    githubUrl: "https://github.com/yourusername/get_next_line",
  },
  {
    title: "ft_printf",
    description:
      "Recreation of the printf function with support for multiple format specifiers (%s, %d, %x, %p, etc.).",
    demoPath: "/projects/ft_printf",
    githubUrl: "https://github.com/yourusername/ft_printf",
  },
  {
    title: "push_swap",
    description:
      "A sorting algorithm using two stacks and a limited set of operations. Optimizes for minimum number of moves.",
    demoPath: "/projects/push_swap",
    githubUrl: "https://github.com/yourusername/push_swap",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            42 School Projects
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
      </div>
    </div>
  );
}
