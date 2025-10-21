import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GetNextLineDemo } from "@/components/demos/GetNextLineDemo"
import { ArrowLeft } from "lucide-react"

export default function GetNextLinePage() {
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
          <h1 className="text-4xl font-bold mb-4 font-mono">get_next_line</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A function that reads and returns one line at a time from a file descriptor. Handles multiple file
            descriptors simultaneously and manages buffer efficiently.
          </p>
        </div>

        <GetNextLineDemo />

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">About the Project</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The get_next_line project teaches file I/O operations and buffer management in C. The function must read
            from a file descriptor line by line, handling various buffer sizes and edge cases. It's particularly useful
            for parsing configuration files or processing large text files efficiently.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">C</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">File I/O</span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-mono">
              Static Variables
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
