import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/85",
  secondary: "border border-border-strong bg-bg text-fg hover:border-fg/40 hover:bg-surface",
  ghost: "text-fg-muted hover:bg-surface hover:text-fg",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
};

export function ButtonLink({ variant = "primary", icon, className = "", children, ...props }: Props) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon}
    </Link>
  );
}

export const buttonClasses = (variant: Variant = "primary", className = "") =>
  `${base} ${variants[variant]} ${className}`;
