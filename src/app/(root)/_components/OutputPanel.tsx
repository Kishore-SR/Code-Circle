"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  }; return (
    <div className="relative bg-[#181825] rounded-xl p-2 sm:p-3 md:p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-300">Output</span>
        </div>        {hasContent && (<button
          onClick={handleCopy}
          className="flex items-center gap-1 px-1 sm:px-1.5 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-400 hover:text-gray-300 bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 transition-all"
        >
          {isCopied ? (
            <>
              <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden xs:inline text-[10px]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden xs:inline text-[10px]">Copy</span>
            </>
          )}
        </button>
        )}
      </div>

      {/* Output Area */}      <div className="relative">
        <div
          className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
        rounded-xl p-2.5 sm:p-3 md:p-4 h-[250px] sm:h-[300px] md:h-[350px] overflow-auto font-mono text-xs sm:text-sm"
        >          {isRunning ? (
          <RunningCodeSkeleton />
        ) : error ? (
          <div className="flex items-start gap-1.5 sm:gap-2 text-red-400">
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5 sm:mt-1" />
            <div className="space-y-0.5 sm:space-y-1">
              <div className="text-xs sm:text-sm font-medium">Execution Error</div>
              <pre className="text-[10px] sm:text-xs whitespace-pre-wrap text-red-400/80">{error}</pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 mb-1.5 sm:mb-2">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Execution Successful</span>
            </div>
            <pre className="text-[10px] sm:text-xs whitespace-pre-wrap text-gray-300">{output}</pre>
          </div>) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-2 sm:mb-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="text-[10px] sm:text-xs text-center">Run your code to see the output here...</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;