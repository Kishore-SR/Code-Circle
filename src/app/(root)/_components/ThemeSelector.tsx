"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import { CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-3.5 sm:size-4" />,
  "vs-light": <Sun className="size-3.5 sm:size-4" />,
  "github-dark": <Github className="size-3.5 sm:size-4" />,
  monokai: <Laptop className="size-3.5 sm:size-4" />,
  "solarized-dark": <Cloud className="size-3.5 sm:size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>      <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsOpen(!isOpen)}
      className="w-auto sm:w-32 group relative flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#1e1e2e]/80 hover:bg-[#262637] 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
    >
      {/* hover state background decorator */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

      <Palette className="w-3 h-3 text-gray-400 group-hover:text-gray-300 transition-colors" />

      <span className="hidden sm:inline text-gray-300 min-w-[60px] sm:min-w-[70px] text-left text-[10px] sm:text-xs group-hover:text-white transition-colors">
        {currentTheme?.label}
      </span>

      {/* color indicator */}

      <div
        className="relative w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
        style={{ background: currentTheme?.color }}
      />
    </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 min-w-[160px] bg-[#1e1e2e]/95 
backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-1.5 sm:py-2 z-50"
          >            <div className="px-1.5 sm:px-2 pb-1 sm:pb-1.5 mb-1 sm:mb-1.5 border-b border-gray-800/50">
              <p className="text-[10px] font-medium text-gray-400 px-1.5 sm:px-2">Select Theme</p>
            </div>

            {THEMES.map((t, index) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                relative group w-full flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 hover:bg-[#262637] transition-all duration-200
                ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
              `}
                onClick={() => setTheme(t.id)}
              >
                {/* background gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 
              group-hover:opacity-100 transition-opacity"
                />

                {/* icon */}
                <div
                  className={`
                flex items-center justify-center size-5 sm:size-6 rounded-lg
                ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "bg-gray-800/50 text-gray-400"}
                group-hover:scale-110 transition-all duration-200
              `}
                >                  {THEME_ICONS[t.id] ?
                  React.cloneElement(THEME_ICONS[t.id] as React.ReactElement, { className: "w-2.5 h-2.5 sm:w-3 sm:h-3" }) :
                  <CircleOff className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  }
                </div>
                {/* label */}
                <span className="flex-1 text-left text-[10px] sm:text-xs group-hover:text-white transition-colors">
                  {t.label}
                </span>

                {/* color indicator */}
                <div
                  className="relative size-2.5 sm:size-3 rounded-full border border-gray-600 
                group-hover:border-gray-500 transition-colors"
                  style={{ background: t.color }}
                />

                {/* active theme border */}
                {theme === t.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ThemeSelector;