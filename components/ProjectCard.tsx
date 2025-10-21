import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Play } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  demoPath: string
  githubUrl: string
}

export function ProjectCard({ title, description, demoPath, githubUrl }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl font-mono">{title}</CardTitle>
          <span className="px-2 py-1 text-xs font-mono bg-accent/20 text-accent rounded">C</span>
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex gap-2">
        <Button asChild className="flex-1">
          <Link href={demoPath}>
            <Play className="w-4 h-4 mr-2" />
            Try Demo
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
