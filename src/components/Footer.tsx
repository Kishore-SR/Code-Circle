import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">          <div className="flex items-center gap-2 text-gray-400">
          <Blocks className="size-5" />
          <span>Built for developers, by {" "}
            <a
              href="https://bento.me/ksr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-600 transition-colors font-medium"
            >
              Kishore S R
            </a>
          </span>
        </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:kishoresr01@gmail.com"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Support
            </a>
            <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;