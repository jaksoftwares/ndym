import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-semibold text-foreground/80 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            type={inputType}
            className={cn(
              "flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 group-hover:border-primary/50",
              error && "border-secondary focus-visible:ring-secondary",
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-secondary animate-in fade-in slide-in-from-top-1 ml-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
