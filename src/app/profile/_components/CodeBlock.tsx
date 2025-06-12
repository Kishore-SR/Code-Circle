"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.split("\n");
  const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={atomOneDark}
        customStyle={{
          padding: "0.75rem",
          borderRadius: "0.5rem",
          background: "rgba(0, 0, 0, 0.4)",
          margin: 0,
          fontSize: "12px",
        }}
        codeTagProps={{
          style: {
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono)",
          }
        }}
      >
        {displayCode}
      </SyntaxHighlighter>

      {lines.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-1.5 right-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-500/20 text-blue-400 rounded text-[10px] sm:text-xs flex items-center 
          gap-0.5 sm:gap-1 hover:bg-blue-500/30 transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CodeBlock;
