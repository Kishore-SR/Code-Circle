import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "./CopyButton";
import Image from "next/image";

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const trimmedCode = code
    .split("\n") // split into lines
    .map((line) => line.trimEnd()) // remove trailing spaces from each line
    .join("\n"); // join back into a single string

  return (
    <div className="my-3 sm:my-4 bg-[#0a0a0f] rounded-lg overflow-hidden border border-[#ffffff0a]">
      {/* header bar showing language and copy button */}
      <div className="flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#ffffff08]">
        {/* language indicator with icon */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Image
            src={`/${language}.png`}
            alt={language}
            width={16}
            height={16}
            className="size-3.5 sm:size-4 object-contain"
          />
          <span className="text-xs sm:text-sm text-gray-400">{language || "plaintext"}</span>
        </div>
        {/* button to copy code to clipboard */}
        <CopyButton code={trimmedCode} />
      </div>

      {/* code block with syntax highlighting */}
      <div className="relative overflow-x-auto">
        <SyntaxHighlighter
          language={language || "plaintext"}
          style={atomOneDark} // dark theme for the code
          customStyle={{
            padding: "0.75rem",
            paddingRight: "1.5rem", // extra padding for scrollbar
            background: "transparent",
            margin: 0,
            fontSize: "0.8rem",
          }}
          showLineNumbers={true}
          wrapLines={true} // wrap long lines
          wrapLongLines={false} // don't wrap long lines
          lineNumberStyle={{
            fontSize: "0.7rem",
            paddingRight: "0.5rem",
            color: "#6b7280",
          }}
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
