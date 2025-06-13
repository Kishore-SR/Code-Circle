"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import { Clock, Code, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import Image from "next/image";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";

function SnippetDetailPage() {
  const snippetId = useParams().id;

  const snippet = useQuery(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });
  const comments = useQuery(api.snippets.getComments, { snippetId: snippetId as Id<"snippets"> });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <main className="max-w-[90rem] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center justify-center size-10 sm:size-12 rounded-lg sm:rounded-xl bg-[#ffffff08] p-2 sm:p-2.5">
                  <Image
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1.5 sm:mb-2">
                    {snippet.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[#8b8b8d]">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{snippet.userName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[#8b8b8d]">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[#8b8b8d]">
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{comments?.length} comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-xs sm:text-sm font-medium mt-2 sm:mt-0">
                {snippet.language}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="mb-4 sm:mb-8 rounded-xl sm:rounded-2xl overflow-hidden border border-[#ffffff0a] bg-[#121218]">
            <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-[#ffffff0a]">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#808086]">
                <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">Source Code</span>
              </div>
              <CopyButton code={snippet.code} />
            </div>
            <Editor
              height="350px"
              className="min-h-[250px] sm:min-h-[350px] md:min-h-[500px] lg:min-h-[600px]"
              language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
              value={snippet.code}
              theme="vs-dark"
              beforeMount={defineMonacoThemes}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                readOnly: true,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                scrollbar: {
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                },
              }}
            />
          </div>

          <Comments snippetId={snippet._id} />
        </div>
      </main>
    </div>
  );
}
export default SnippetDetailPage;
