import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LibftDemo } from "@/components/demos/LibftDemo"
import { ArrowLeft } from "lucide-react"

export default function LibftPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 font-mono">libft</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A custom C library that reimplements standard library functions. This project is the foundation for all
            subsequent 42 projects, providing essential string manipulation, memory management, and utility functions.
          </p>
        </div>

        <LibftDemo />

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The libft project involves creating a library of useful C functions that will be used throughout the 42
            curriculum. It includes functions for string manipulation (ft_strlen, ft_strcpy), memory operations
            (ft_memcpy, ft_memset), character checks (ft_isalpha, ft_isdigit), and more advanced utilities.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">C</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">Makefile</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Memory Management
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
