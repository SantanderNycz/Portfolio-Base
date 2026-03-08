"use client";

import { useEffect, useState } from "react";

export default function RetroStripes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: `repeating-linear-gradient(
          45deg,
          #efe3cc 0px,
          #efe3cc 15px,
          #f2c14e 15px,
          #f2c14e 30px,
          #f26a2e 30px,
          #f26a2e 45px,
          #4fa3a5 45px,
          #4fa3a5 60px,
          #7e9f55 60px,
          #7e9f55 75px,
          #2f5d73 75px,
          #2f5d73 90px
        )`,
        backgroundAttachment: "fixed",
        opacity: 0.3,
      }}
    />
  );
}
