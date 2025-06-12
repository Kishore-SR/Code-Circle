const FeatureCategory = ({
  children,
  label,
  className = ""
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) => (
  <div className={`space-y-3 sm:space-y-4 ${className}`}>
    <h3 className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">{label}</h3>
    <div className="space-y-2 sm:space-y-3">{children}</div>
  </div>
);

export default FeatureCategory;
