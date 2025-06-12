import CodeBlock from "./CodeBlock";

function CommentContent({ content }: { content: string }) {
  // regex to split content into regular text and code blocks
  const parts = content.split(/(```[\w-]*\n[\s\S]*?\n```)/g);

  return (
    <div className="max-w-none text-white text-sm sm:text-base">
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          //           ```javascript
          // const name = "John";
          // ```
          const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);

          if (match) {
            const [, language, code] = match;
            return <CodeBlock language={language} code={code} key={index} />;
          }
        }

        return part.split("\n").map((line, lineIdx) => (
          <p key={lineIdx} className="mb-3 sm:mb-4 text-gray-300 last:mb-0">
            {line}
          </p>
        ));
      })}
    </div>
  );
}
export default CommentContent;
