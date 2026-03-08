"use client";

import { useEffect, useRef } from "react";

interface Pixel {
  value: number;
  target: number;
  speed: number;
}

export default function PixelatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Configurações dos pixels
    const pixelSize = 50;
    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);

    // Armazenar o estado dos pixels
    const pixels: Pixel[] = Array(cols * rows)
      .fill(0)
      .map(() => ({
        value: Math.random(),
        target: Math.random(),
        speed: Math.random() * 0.0002 + 0.0095,
      }));

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = "#000"; // fundo
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Atualizar e desenhar pixels
      for (let i = 0; i < cols * rows; i++) {
        const x = (i % cols) * pixelSize;
        const y = Math.floor(i / cols) * pixelSize;

        // Animar valores dos pixels
        pixels[i].value +=
          (pixels[i].target - pixels[i].value) * pixels[i].speed;

        if (Math.random() < 0.01) {
          pixels[i].target = Math.random();
        }

        const colors = ["#09090b", "#18181b", "#27272a", "#3f3f46"];
        const colorIndex = Math.floor(pixels[i].value * colors.length);
        const opacity = 0.4;

        // Converter hex para rgba
        const hex = colors[colorIndex];
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        ctx.fillRect(x, y, pixelSize, pixelSize);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
}
