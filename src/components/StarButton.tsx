"use client";

import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { isSignedIn, userId } = useAuth();
  const [optimisticIsStarred, setOptimisticIsStarred] = useState<boolean | null>(null);
  const [optimisticCount, setOptimisticCount] = useState<number | null>(null);

  // Only fetch isStarred when the user is signed in to avoid wrong caching
  const isStarredQuery = useQuery(
    api.snippets.isSnippetStarred,
    isSignedIn ? { snippetId } : "skip"
  );

  const starCountQuery = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const star = useMutation(api.snippets.starSnippet);

  // Determine the actual values to display considering the optimistic updates
  const isStarred = optimisticIsStarred !== null ? optimisticIsStarred : (isStarredQuery || false);
  const starCount = optimisticCount !== null ? optimisticCount : starCountQuery;

  // Reset optimistic state when user changes
  useEffect(() => {
    setOptimisticIsStarred(null);
    setOptimisticCount(null);
  }, [userId]);

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
      className={`group flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg 
    transition-all duration-200 ${isStarred
          ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
          : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
        }`}
      onClick={handleStar}
      disabled={!isSignedIn}
      aria-label={isStarred ? "Unstar snippet" : "Star snippet"}
    >
      <Star
        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:text-gray-400"}`}
      />
      <span className={`text-[10px] xs:text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}>
        {starCount || 0}
      </span>
    </button>
  );
}

export default StarButton;
