import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { LucideLoader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center space-x-2 gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-neutral-50 hover:bg-primary-500/90 dark:bg-primary-50 dark:text-neutral-900 dark:hover:bg-primary-50/90",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white hover:bg-primary-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-primary-950 dark:hover:bg-primary-800 dark:hover:text-neutral-50",
        secondary:
          "bg-primary-100 text-neutral-900 hover:bg-primary-100/80 dark:bg-primary-800 dark:text-neutral-50 dark:hover:bg-primary-800/80",
        ghost:
          "hover:bg-primary-100 hover:text-neutral-900 dark:hover:bg-primary-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
        unstyled: "",
      },
      size: {
        default: "h-10 px-4 py-6 text-lg",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        none: "h-auto w-auto p-0",
      },
      rounded: {
        true: "rounded-full p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  rounded?: boolean;
  loading?: boolean;
  tooltip?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      tooltip,
      loading,
      disabled,
      tooltipSide = "top",
      asChild = false,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return tooltip ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              className={cn(
                buttonVariants({ variant, size, rounded, className })
              )}
              ref={ref}
              disabled={loading || disabled}
              type={type}
              {...props}
            >
              {children}
              {loading && <LucideLoader2 className="animate-spin size-5" />}
            </Comp>
          </TooltipTrigger>
          <TooltipContent side={tooltipSide}>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={loading || disabled}
        type={type}
        {...props}
      >
        {children}
        {loading && <LucideLoader2 className="animate-spin size-5" />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
