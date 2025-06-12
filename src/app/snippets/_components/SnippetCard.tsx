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
      whileHover={{ y: -1 }}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        layout: { duration: 0.2, ease: "easeInOut" }
      }}
    >
      <Link href={`/snippets/${snippet._id}`} className="h-full block">
        <div
          className={`relative h-full bg-[#1e1e2e]/80 backdrop-blur-sm rounded-xl 
          border border-[#313244]/50 hover:border-[#414155] active:border-blue-500/50
          transition-all duration-300 overflow-hidden
          hover:shadow-md hover:shadow-blue-500/5`}
        >
          <div className={`p-2.5 xs:p-3 sm:p-3 ${view === "list" ? "flex flex-col sm:flex-row sm:items-start sm:gap-3" : ""}`}>
            {/* Header */}
            <div className={`flex items-start justify-between mb-2 sm:mb-3 ${view === "list" ? "sm:mb-0 sm:w-40 sm:flex-shrink-0" : ""}`}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 
                  group-hover:opacity-30 transition-all duration-500"
                    area-hidden="true"
                  />
                  <div
                    className="relative p-1 sm:p-1.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20
                   group-hover:to-purple-500/20 transition-all duration-500"
                  >
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-4 h-4 sm:w-5 sm:h-5 object-contain relative z-10"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="px-1.5 xs:px-2 sm:px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] xs:text-xs font-medium">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] xs:text-xs text-gray-500">
                    <Clock className="w-2.5 h-2.5" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div
                className="absolute top-2 xs:top-2 sm:top-3 right-2 xs:right-2 sm:right-3 z-10 flex gap-1 xs:gap-1.5 sm:gap-2 items-center"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />

                {user?.id === snippet.userId && (
                  <div className="z-10" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className={`group flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-all duration-200
                                  ${isDeleting
                          ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                          : "bg-gray-500/10 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
                        }
                                `}
                      aria-label="Delete snippet"
                    >
                      {isDeleting ? (
                        <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className={`space-y-2 sm:space-y-3 ${view === "list" ? "sm:flex-1" : ""}`}>
              <div>
                <h2 className="text-sm xs:text-base sm:text-base font-semibold text-white mb-1 line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <div className="flex items-center gap-0.5 xs:gap-1">
                    <div className="p-0.5 rounded-md bg-gray-800/50">
                      <User className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[70px] xs:max-w-[90px] sm:max-w-[100px]">{snippet.userName}</span>
                  </div>
                </div>
              </div>

              <div className="relative group/code">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                <pre className={`relative bg-black/30 rounded-lg p-1.5 sm:p-2 overflow-hidden text-[10px] xs:text-xs text-gray-300 font-mono ${view === "list"
                  ? "max-h-[70px] line-clamp-2 sm:max-h-[80px] sm:line-clamp-3"
                  : "max-h-[90px] line-clamp-3 sm:max-h-[100px] sm:line-clamp-4"
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
