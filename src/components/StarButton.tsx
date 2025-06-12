"use client";

import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";
import { useState } from "react";

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { isSignedIn } = useAuth();
  const [optimisticIsStarred, setOptimisticIsStarred] = useState<boolean | null>(null);
  const [optimisticCount, setOptimisticCount] = useState<number | null>(null);

  const isStarredQuery = useQuery(api.snippets.isSnippetStarred, {
    snippetId
  });

  const starCountQuery = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const star = useMutation(api.snippets.starSnippet);

  // Determine the actual values to display considering the optimistic updates
  const isStarred = optimisticIsStarred !== null ? optimisticIsStarred : isStarredQuery;
  const starCount = optimisticCount !== null ? optimisticCount : starCountQuery;

  const handleStar = async () => {
    if (!isSignedIn) return;

    // Optimistic update
    const newIsStarred = !isStarred;
    const currentCount = starCount || 0;
    const newCount = currentCount + (newIsStarred ? 1 : -1);

    setOptimisticIsStarred(newIsStarred);
    setOptimisticCount(newCount);

    try {
      await star({ snippetId });
    } catch (error) {
      // Revert optimistic updates on error
      setOptimisticIsStarred(null);
      setOptimisticCount(null);
      console.error("Error starring snippet:", error);
    }
  };

  return (
    <button
      className={`group flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg 
    transition-all duration-200 ${isStarred
          ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
          : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
        }`}
      onClick={handleStar}
      disabled={!isSignedIn}
      aria-label={isStarred ? "Unstar snippet" : "Star snippet"}
    >
      <Star
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:text-gray-400"}`}
      />
      <span className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}>
        {starCount || 0}
      </span>
    </button>
  );
}

export default StarButton;
