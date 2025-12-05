"use client";

import { useEffect, useRef } from "react";

export function ScrollingStripe() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    console.log("--- ScrollingStripe: useEffect iniciado ---");

    const path = pathRef.current;
    if (!path) {
      console.error("ERRO: A referência ao <path> do SVG não foi encontrada!");
      return;
    }

    // --- TESTE DE VISIBILIDADE INICIAL ---
    // Vamos pintar a linha de uma cor e depois alterá-la.
    path.style.stroke = "red"; // Cor inicial de depuração

    // 1. Medir o comprimento.
    const pathLength = path.getTotalLength();
    console.log(`Comprimento do caminho medido (pathLength): ${pathLength}`);

    // Se o comprimento for 0, não podemos continuar.
    if (pathLength === 0) {
      console.error(
        "FALHA CRÍTICA: path.getTotalLength() retornou 0. O caminho pode não estar renderizado no momento da medição."
      );
      // Mesmo que falhe, vamos garantir que a linha fica visível.
      path.style.stroke = "blue"; // Pinta de azul para indicar falha na medição.
      path.style.strokeWidth = "25";
      return;
    }

    // 2. Preparar a animação.
    path.style.strokeDasharray = pathLength.toString();
    path.style.strokeDashoffset = pathLength.toString();
    path.style.stroke = "url(#retro-gradient)"; // Volta a aplicar o gradiente

    console.log("Caminho preparado para a animação.");

    // 3. Criar o handler de scroll.
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = window.scrollY / docHeight;
      const drawLength = pathLength * scrollPercent;
      const offset = pathLength - drawLength;

      // Atualiza o estilo.
      path.style.strokeDashoffset = offset.toString();

      // Log para ver os valores em tempo real (pode causar lentidão, mas é para depuração).
      console.log(
        `Scroll: ${Math.round(scrollPercent * 100)}%, Offset: ${Math.round(
          offset
        )}`
      );
    };

    // 4. Adicionar o listener.
    window.addEventListener("scroll", handleScroll);
    console.log("Listener de scroll adicionado.");

    // 5. Limpeza.
    return () => {
      console.log("Limpando o listener de scroll.");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 1200"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{ opacity: 0.7 }}
    >
      <defs>
        <linearGradient id="retro-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f2c14e" />
          <stop offset="20%" stopColor="#f26a2e" />
          <stop offset="40%" stopColor="#4fa3a5" />
          <stop offset="60%" stopColor="#7e9f55" />
          <stop offset="80%" stopColor="#2f5d73" />
          <stop offset="100%" stopColor="#efe3cc" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        d="M 400 -100 L 400 200 C 400 300 100 300 100 400 L 100 600 C 100 700 700 700 700 800 L 700 1000 L 400 1300"
        fill="none"
        stroke="transparent" // Começa transparente para evitar um "flash" da linha inteira
        strokeWidth="75"
        strokeLinecap="round"
      />
    </svg>
  );
}
