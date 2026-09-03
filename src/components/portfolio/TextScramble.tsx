"use client";

import React, { useState, useEffect, useRef } from "react";

const CYBER_CHARS = "ABCDEF0123456789!@#$%^&*<>[]{}|/~";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
}

export default function TextScramble({
  text,
  className = "",
  scrambleSpeed = 30,
  revealSpeed = 2
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * revealSpeed;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / revealSpeed) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, scrambleSpeed);
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerScramble();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={triggerScramble}
      className={`inline-block cursor-default font-mono transition-all ${className}`}
    >
      {displayText}
    </span>
  );
}
