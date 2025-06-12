import { Check } from "lucide-react";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-2 sm:gap-3 group">
    <div className="mt-0.5 sm:mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 group-hover:bg-blue-500/20 transition-colors">
      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400" />
    </div>
    <span className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">{children}</span>
  </div>
);

export default FeatureItem;
