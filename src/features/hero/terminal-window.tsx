"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  { type: "cmd", text: "$ deploy --service notification-api" },
  { type: "out", text: "✓ Health check passed · 3 regions active" },
  { type: "cmd", text: "$ prisma migrate deploy" },
  { type: "out", text: "✓ 12 migrations applied · PostgreSQL ready" },
  { type: "cmd", text: "$ openai embeddings --collection engineering-notes" },
  { type: "out", text: "✓ 847 chunks indexed · semantic search online" },
  { type: "cmd", text: "$ status" },
  { type: "out", text: "→ Building scalable products with AI-native workflows" },
];

export function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      const reset = setTimeout(() => setVisibleLines(0), 4000);
      return () => clearTimeout(reset);
    }
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 700);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="glass-panel overflow-hidden shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          cesar@prod — zsh
        </span>
      </div>
      <div className="grid-bg min-h-[320px] p-4 font-mono text-sm md:min-h-[380px] md:p-6">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={`${line.text}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={
              line.type === "cmd"
                ? "mt-3 text-foreground/90"
                : "mt-1 text-primary/90"
            }
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <span className="mt-4 inline-block terminal-cursor" />
        )}
      </div>
    </div>
  );
}
