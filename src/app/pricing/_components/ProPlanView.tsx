import NavigationHeader from "@/components/NavigationHeader";
import { ArrowRight, Command, Star } from "lucide-react";
import Link from "next/link";

function ProPlanView() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <NavigationHeader />
      <div className="relative px-4 py-16 sm:py-0 sm:h-[80vh] flex items-center justify-center">
        <div className="relative w-full max-w-xl mx-auto text-center">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl opacity-10" />

          <div className="relative bg-[#12121a]/90 border border-gray-800/50 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-6 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05] rounded-xl sm:rounded-2xl" />

            <div className="relative">
              <div className="inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 mb-4 sm:mb-6 ring-1 ring-gray-800/60">
                <Star className="w-6 sm:w-8 h-6 sm:h-8 text-purple-400" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2 sm:mb-3">Pro Plan Active</h1>
              <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
                Experience the full power of professional development
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white rounded-lg sm:rounded-xl transition-all duration-200 border border-gray-800 hover:border-blue-500/50 group"
              >
                <Command className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400" />
                <span className="text-sm sm:text-base">Open Pro Editor</span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProPlanView;
