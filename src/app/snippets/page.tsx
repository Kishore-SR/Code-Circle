"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./_components/SnippetCard";
import Image from "next/image";
import { Id } from "../../../convex/_generated/dataModel";

function SnippetsPage() {
  const snippetsQuery = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  // Default to grid view - always use grid on mobile since we removed the toggle buttons
  const [view, setView] = useState<"grid" | "list">("grid");
  // Keep track of locally deleted snippets for optimistic UI updates
  const [deletedSnippetIds, setDeletedSnippetIds] = useState<Id<"snippets">[]>([]);

  // Reset deleted snippets when the query result changes
  useEffect(() => {
    if (snippetsQuery !== undefined) {
      setDeletedSnippetIds([]);
    }
  }, [snippetsQuery]);

  // Handle local deletion
  const handleSnippetDelete = (snippetId: Id<"snippets">) => {
    setDeletedSnippetIds(prev => [...prev, snippetId]);
  };

  // loading state
  if (snippetsQuery === undefined) {
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  // Filter out locally deleted snippets
  const snippets = snippetsQuery.filter(snippet =>
    !deletedSnippetIds.includes(snippet._id)
  );

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-10">
        {/* Hero section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r
             from-blue-500/10 to-purple-500/10 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Community Code Library
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-4 sm:mb-6"
          >
            Discover & Share Code Snippets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg text-gray-400 mb-6 sm:mb-8"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </div>

        {/* Filters Section */}
        <div className="relative max-w-4xl mx-auto mb-8 sm:mb-10 space-y-4 sm:space-y-5">
          {/* Search by author name, snippet title or coding language */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, or author..."
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-[#1e1e2e]/80 hover:bg-[#1e1e2e] text-white
                  rounded-xl border border-[#313244] hover:border-[#414155] transition-all duration-200
                  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-400">Languages:</span>
            </div>

            {popularLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
                className={`
                    group relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all duration-200
                    ${selectedLanguage === lang
                    ? "text-blue-400 bg-blue-500/10 ring-2 ring-blue-500/50"
                    : "text-gray-400 hover:text-gray-300 bg-[#1e1e2e] hover:bg-[#262637] ring-1 ring-gray-800"
                  }
                  `}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Image
                    src={`/${lang}.png`}
                    alt={lang}
                    width={16}
                    height={16}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                  />
                  <span className="text-xs sm:text-sm">{lang}</span>
                </div>
              </button>
            ))}

            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <span className="hidden xs:inline-block text-xs sm:text-sm text-gray-500">
                {filteredSnippets.length} snippets found
              </span>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-1 p-0.5 sm:p-1 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 sm:p-2 rounded-md transition-all ${view === "grid"
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                    }`}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                >
                  <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 sm:p-2 rounded-md transition-all ${view === "list"
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                    }`}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                >
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Snippets Grid */}
        <motion.div
          className={`grid gap-4 sm:gap-5 ${view === "grid"
            ? "grid-cols-1 xs:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 max-w-2xl mx-auto"
            }`}
          layout
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                view={view}
                onDelete={handleSnippetDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* edge case: empty state */}
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md mx-auto mt-8 sm:mt-20 p-6 sm:p-8 rounded-2xl overflow-hidden"
          >
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br 
                from-blue-500/10 to-purple-500/10 ring-1 ring-white/10 mb-4 sm:mb-6"
              >
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3">No snippets found</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>

              {(searchQuery || selectedLanguage) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage(null);
                  }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#262637] text-gray-300 hover:text-white rounded-lg 
                    transition-colors text-sm"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
export default SnippetsPage;
