"use client";
import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/components/StarButton";

function SnippetCard({ snippet, view = "grid" }: { snippet: Snippet; view?: "grid" | "list" }) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteSnippet({ snippetId: snippet._id });
    } catch (error) {
      console.log("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      className="group relative"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        layout: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <div
          className={`relative h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-xl 
          border border-[#313244]/50 hover:border-[#414155] active:border-blue-500/50
          transition-all duration-300 overflow-hidden
          hover:shadow-md hover:shadow-blue-500/5`}
        >
          <div className={`p-3 xs:p-4 sm:p-6 ${view === "list" ? "flex flex-col sm:flex-row sm:items-start sm:gap-6" : ""}`}>
            {/* Header */}
            <div className={`flex items-start justify-between mb-3 sm:mb-4 ${view === "list" ? "sm:mb-0 sm:w-52 sm:flex-shrink-0" : ""}`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 
                  group-hover:opacity-30 transition-all duration-500"
                    area-hidden="true"
                  />
                  <div
                    className="relative p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20
                   group-hover:to-purple-500/20 transition-all duration-500"
                  >
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain relative z-10"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="space-y-0.5 xs:space-y-1">
                  <span className="px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] xs:text-xs font-medium">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-[10px] xs:text-xs text-gray-500">
                    <Clock className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className="absolute top-2 xs:top-3 sm:top-5 right-2 xs:right-3 sm:right-5 z-10 flex gap-1.5 xs:gap-2 sm:gap-4 items-center"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />

                {user?.id === snippet.userId && (
                  <div className="z-10" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`group flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all duration-200
                                  ${isDeleting
                          ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                          : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                        }
                                `}
                      aria-label="Delete snippet"
                    >
                      {isDeleting ? (
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className={`space-y-3 sm:space-y-4 ${view === "list" ? "sm:flex-1" : ""}`}>
              <div>
                <h2 className="text-sm xs:text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-2 xs:gap-3 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                    <div className="p-0.5 xs:p-0.5 sm:p-1 rounded-md bg-gray-800/50">
                      <User className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[150px]">{snippet.userName}</span>
                  </div>
                </div>
              </div>

              <div className="relative group/code">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                <pre className={`relative bg-black/30 rounded-lg p-2 xs:p-3 sm:p-4 overflow-hidden text-[10px] xs:text-xs sm:text-sm text-gray-300 font-mono ${view === "list"
                    ? "max-h-[80px] line-clamp-2 xs:max-h-[100px] sm:max-h-[120px] sm:line-clamp-3"
                    : "max-h-[120px] line-clamp-3 xs:max-h-[150px] sm:max-h-[180px] sm:line-clamp-4"
                  }`}>
                  {snippet.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
export default SnippetCard;
