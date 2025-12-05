"use client";

import { useEffect, useRef } from "react";

const RetroStripes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Cores das faixas retrô anos 70
    const colors = ["#2F5D73", "#4FA3A5", "#7E9F55", "#F2C14E", "#F26A2E"];
    const stripeWidth = 8;
    const spacing = 4;

    // Configurar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resizeCanvas();

    // Pontos de controle para criar o caminho das faixas
    const getControlPoints = () => {
      const h = canvas.height;
      const w = canvas.width;

      return [
        { x: w * 0.2, y: 0 },
        { x: w * 0.8, y: h * 0.15 },
        { x: w * 0.3, y: h * 0.35 },
        { x: w * 0.7, y: h * 0.55 },
        { x: w * 0.4, y: h * 0.75 },
        { x: w * 0.6, y: h },
      ];
    };

    // Desenhar as 5 faixas coloridas
    const drawStripes = (scrollY: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const controlPoints = getControlPoints();

      // Movimento contínuo das faixas (paralaxe com scroll)
      const movement = scrollY * 0.5;

      colors.forEach((color, index) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = stripeWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.8;

        const offset = (index - 2) * (stripeWidth + spacing) + movement;

        ctx.beginPath();

        for (let i = 0; i < controlPoints.length - 1; i++) {
          const current = controlPoints[i];
          const next = controlPoints[i + 1];

          if (i === 0) {
            ctx.moveTo(current.x + offset, current.y);
          }

          const cpX = (current.x + next.x) / 2 + offset;
          const cpY = (current.y + next.y) / 2;

          ctx.quadraticCurveTo(current.x + offset, current.y, cpX, cpY);

          if (i === controlPoints.length - 2) {
            ctx.quadraticCurveTo(
              next.x + offset,
              next.y,
              next.x + offset,
              next.y
            );
          }
        }

        ctx.stroke();
      });

      ctx.globalAlpha = 1;
    };

    // Redesenhar no scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      drawStripes(scrollY);
    };

    // Desenho inicial
    drawStripes(0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      resizeCanvas();
      drawStripes(window.scrollY);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 0, height: "100vh" }}
    />
  );
};

export default RetroStripes;
