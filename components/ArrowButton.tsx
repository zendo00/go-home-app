"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ArrowButtonProps {
  icon: ReactNode;
  label: string;
  color: "blue" | "green";
  onClick?: () => void;
}

export function ArrowButton({ icon, label, color, onClick }: ArrowButtonProps) {
  const colorClasses = {
    blue: "fill-[#3F51B5]",
    green: "fill-[#4CAF50]",
  };

  return (
    <button
      onClick={onClick}
      className="relative w-[92%] max-w-[380px] h-[140px] group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-400 rounded-none"
      aria-label={label}
    >
      <svg
        viewBox="0 0 400 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={`
            M 30 0
            L 320 0
            L 400 90
            L 320 180
            L 30 180
            Q 0 180 0 150
            L 0 30
            Q 0 0 30 0
            Z
          `}
          className={cn(
            colorClasses[color],
            "transition-all duration-200 group-hover:brightness-110 group-active:brightness-90"
          )}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center gap-3 md:gap-4 text-white pr-8">
        <span className="text-5xl md:text-6xl">{icon}</span>
        <span className="text-4xl md:text-5xl font-bold tracking-wide">{label}</span>
      </div>
    </button>
  );
}
