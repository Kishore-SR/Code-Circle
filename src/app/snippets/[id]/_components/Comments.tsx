"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletinCommentId, setDeletingCommentId] = useState<string | null>(null);

  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);

    try {
      await addComment({ snippetId, content });
    } catch (error) {
      console.log("Error adding comment:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.log("Error deleting comment:", error);
      toast.error("Something went wrong");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-xl sm:rounded-2xl overflow-hidden">
      <div className="px-4 sm:px-8 py-3 sm:py-6 border-b border-[#ffffff0a]">
        <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-1.5 sm:gap-2">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-3 sm:p-8">
        {user ? (
          <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
        ) : (
          <div className="bg-[#0a0a0f] rounded-lg sm:rounded-xl p-4 sm:p-6 text-center mb-6 sm:mb-8 border border-[#ffffff0a]">
            <p className="text-sm sm:text-base text-[#808086] mb-3 sm:mb-4">Sign in to join the discussion</p>
            <SignInButton mode="modal">
              <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#3b82f6] text-white text-sm rounded-lg hover:bg-[#2563eb] transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-4 sm:space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onDelete={handleDeleteComment}
                isDeleting={deletinCommentId === comment._id}
                currentUserId={user?.id}
              />
            ))
          ) : (
            <div className="text-center py-6 text-[#808086] text-sm sm:text-base">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Comments;
