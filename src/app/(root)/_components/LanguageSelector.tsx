"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react";
import useMounted from "@/hooks/useMounted";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();

  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); const handleLanguageSelect = (langId: string) => {
    // Allow JavaScript, Java, Python, and C++ for free users
    const freeLanguages = ["javascript", "python", "java", "cpp"];
    if (!hasAccess && !freeLanguages.includes(langId)) {
      console.log("Language not available for free users:", langId);
      return;
    }

    console.log("Selecting language:", langId);
    setLanguage(langId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (<div className="relative" ref={dropdownRef}>      <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }} onClick={() => setIsOpen(!isOpen)}
    className={`group relative flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#1e1e2e]/80 
      rounded-lg transition-all 
       duration-200 border border-gray-800/50 hover:border-gray-700
       ${!hasAccess && !["javascript", "python", "java", "cpp"].includes(language) ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {/* Decoration */}
    <div
      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      aria-hidden="true"
    />

    <div className="size-3.5 sm:size-4 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
      <Image
        src={currentLanguageObj.logoPath}
        alt="programming language logo"
        width={24}
        height={24}
        className="w-full h-full object-contain relative z-10"
      />      </div>

    <span className="text-gray-200 min-w-[36px] sm:min-w-[50px] text-left group-hover:text-white transition-colors text-[10px] sm:text-xs">
      {currentLanguageObj.label}
    </span>

    <ChevronDownIcon
      className={`size-2.5 sm:size-3 text-gray-400 transition-all duration-300 group-hover:text-gray-300
            ${isOpen ? "rotate-180" : ""}`}
    />
  </motion.button>

    <AnimatePresence>
      {isOpen && (<motion.div
        initial={{ opacity: 0, y: 8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 mt-2 w-48 bg-[#1e1e2e]/95 backdrop-blur-xl
           rounded-xl border border-[#313244] shadow-2xl py-1.5 z-50"
      >
        <div className="px-2 sm:px-2.5 pb-1 sm:pb-1.5 mb-1 sm:mb-1.5 border-b border-gray-800/50">
          <p className="text-[10px] font-medium text-gray-400">Select Language</p>
        </div>        <div className="max-h-[240px] sm:max-h-[280px] overflow-y-auto overflow-x-hidden">
          {/* Free languages shown first */}
          {Object.values(LANGUAGE_CONFIG)
            .sort((a, b) => {
              // Define free languages
              const freeLanguages = ["javascript", "python", "java", "cpp"];

              // Order: 1. Free languages (in order defined), 2. Pro languages (alphabetically)
              const aIsFree = freeLanguages.includes(a.id);
              const bIsFree = freeLanguages.includes(b.id);

              if (aIsFree && !bIsFree) return -1;
              if (!aIsFree && bIsFree) return 1;

              if (aIsFree && bIsFree) {
                // Sort free languages in specified order
                return freeLanguages.indexOf(a.id) - freeLanguages.indexOf(b.id);
              }

              // Sort pro languages alphabetically
              return a.label.localeCompare(b.label);
            })
            .map((lang, index) => {
              const freeLanguages = ["javascript", "python", "java", "cpp"];
              const isLocked = !hasAccess && !freeLanguages.includes(lang.id);

              return (
                <motion.div
                  key={lang.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group px-2"
                >                    <button
                  className={`
                      relative w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-200
                      ${language === lang.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                      ${isLocked ? "opacity-50" : "hover:bg-[#262637]"}
                    `}
                  onClick={() => handleLanguageSelect(lang.id)}
                  disabled={isLocked}
                >
                    {/* decorator */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity"
                    />

                    <div
                      className={`
                         relative size-6 rounded-lg p-1 group-hover:scale-110 transition-transform
                         ${language === lang.id ? "bg-blue-500/10" : "bg-gray-800/50"}
                       `}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <Image
                        width={24}
                        height={24}
                        src={lang.logoPath}
                        alt={`${lang.label} logo`}
                        className="w-full h-full object-contain relative z-10"
                      />
                    </div>

                    <span className="flex-1 text-left text-xs group-hover:text-white transition-colors">
                      {lang.label}
                    </span>

                    {/* selected language border */}
                    {language === lang.id && (
                      <motion.div
                        className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}                      {isLocked ? (
                      <Lock className="w-3 h-3 text-gray-500" />
                    ) : (
                      language === lang.id && (
                        <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                      )
                    )}
                  </button>
                </motion.div>
              );
            })}
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}
export default LanguageSelector;