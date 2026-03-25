import React from "react";
import { Spinner } from "../index";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  type: "button" | "submit" | "reset";
  name?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  name = "Button Name",
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded font-medium transition-all focus:outline-none";

  const variants = {
    primary: "bg-black text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        (disabled || loading) && "opacity-50 cursor-not-allowed"
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      <span className={loading ? "ml-2" : ""}>{children}</span>
      {name}
    </button>
  );
};
