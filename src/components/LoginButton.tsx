import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg
             transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
      >
        <LogIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform" />
        <span className="text-[10px] sm:text-xs">Sign In</span>
      </button>
    </SignInButton>
  );
}
export default LoginButton;