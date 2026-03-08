"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { Code, Hash, Brackets, GitBranch, Terminal } from "lucide-react";

interface TechBackgroundProps {
  className?: string;
  iconCount?: number;
}

export default function TechBackground({
  className = "",
  iconCount = 20,
}: TechBackgroundProps) {
  const techIcons = [Code, Hash, Brackets, GitBranch, Terminal];

  useEffect(() => {
    const elements = document.querySelectorAll(".tech-symbol");

    gsap.to(elements, {
      y: () => gsap.utils.random(-50, 50),
      x: () => gsap.utils.random(-100, 100),
      rotation: () => gsap.utils.random(-20, 20),
      duration: () => gsap.utils.random(4, 8),
      repeat: -1,
      yoyo: true,
      stagger: 0.4,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {Array.from({ length: iconCount }).map((_, i) => {
        const Icon = techIcons[Math.floor(Math.random() * techIcons.length)];
        return (
          <div
            key={i}
            className="tech-symbol absolute text-amber-400 opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Icon size={20} />
          </div>
        );
      })}
    </div>
  );
}
