"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution); const handleRun = async () => {
    console.log("Running code in language:", language);
    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      try {
        console.log("Saving execution for language:", language);
        await saveExecution({
          language,
          code: result.code,
          output: result.output || undefined,
          error: result.error || undefined,
        });
      } catch (error) {
        console.error("Error saving execution:", error);
        // Continue execution even if saving fails
      }
    }
  }; return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }} className={`
        group relative inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5
        disabled:cursor-not-allowed
        focus:outline-none
      `}
    >      {/* background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg sm:rounded-xl opacity-100 transition-opacity group-hover:opacity-90" /><div className="relative flex items-center gap-1 sm:gap-1.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-white/90">
              <span className="hidden xs:inline">Executing</span>
              <span className="inline xs:hidden">Run</span>...
            </span>
          </>
        ) : (
          <>            <div className="relative flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5">
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
          </div>            <span className="text-[10px] sm:text-xs font-medium text-white/90 group-hover:text-white">
              <span className="hidden xs:inline">Run Code</span>
              <span className="inline xs:hidden">Run</span>
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}
export default RunButton;