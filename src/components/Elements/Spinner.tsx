type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
};

export const Spinner = ({ size = "md", color = "border-blue-500" }: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-transparent ${color} ${sizeClasses[size]}`}
    />
  );
};