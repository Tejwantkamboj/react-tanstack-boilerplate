import clsx from "clsx";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "file"
    | "datetime-local"
    | "date";
  className?: string;
  label?: string;
  error?: { message?: string };
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>;
  variant?: "primary" | "secondary" | "outline";
  readOnly?: boolean;
  min?: number;
  max?: number;
  accept?: string;
  name?: string;
  Inputicon?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  title?: string;
};

const variants = {
  primary:
    "border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  secondary:
    "border border-gray-200 bg-gray-100 focus:ring-2 focus:ring-gray-400",
  outline: "border border-black focus:ring-2 focus:ring-black",
};

export const InputField = (props: InputFieldProps) => {
  const [show, setShow] = useState(false);

  const {
    type = "text",
    name,
    label = "Input Label",
    value,
    variant = "primary",
    className,
    registration,
    error,
    placeholder,
    readOnly,
    min,
    max,
    accept,
    onChange,
    title,
  } = props;

  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          name={name}
          value={value}
          title={title}
          onChange={onChange}
          placeholder={placeholder ?? label}
          readOnly={readOnly}
          min={type === "number" ? min : undefined}
          max={type === "number" ? max : undefined}
          accept={accept}
          {...registration}
          className={clsx(
            "w-full rounded-md px-3 py-2 text-sm outline-none transition",
            isPassword && "pr-10",
            variants[variant],
            error?.message && "border-red-500 focus:ring-red-500",
            className,
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {/* Error */}
      {error?.message && (
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};
