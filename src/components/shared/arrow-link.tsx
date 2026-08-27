import Link from "next/link";
import type { ComponentProps } from "react";

type ArrowLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "text";
};

export function ArrowLink({ children, className = "", variant = "text", ...props }: ArrowLinkProps) {
  const variants = {
    primary: "bg-brand-red text-white! border border-brand-red hover:bg-black hover:border-black",
    secondary: "bg-white text-black border border-black hover:bg-black hover:text-white",
    text: "hover:text-brand-red",
  };
  return <Link className={`group inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-bold uppercase tracking-[.04em] transition-colors duration-300 ${variants[variant]} ${className}`} {...props}>{children}<span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">↗</span></Link>;
}
