import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface SubPageCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

export function SubPageCard({
  title,
  description,
  image,
  technologies,
  github,
  demo,
}: SubPageCardProps) {
  return (
    <Card className="flex flex-col h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-amber-400/50 transition-colors overflow-hidden">
      <div className="relative h-48 bg-muted overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex gap-2">
        {demo && demo !== "#" ? (
          <Button asChild className="flex-1 bg-amber-600 hover:bg-amber-500 text-white">
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo
            </a>
          </Button>
        ) : (
          <Button disabled className="flex-1 bg-amber-600/40 text-white/60 cursor-not-allowed">
            <ExternalLink className="w-4 h-4 mr-2" />
            Em breve
          </Button>
        )}
        <Button
          asChild
          variant="outline"
          className="bg-white hover:bg-zinc-300"
        >
          <a href={github} target="_blank" rel="noopener noreferrer">
            <img src="/github.png" alt="GitHub" className="w-6 h-6" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
