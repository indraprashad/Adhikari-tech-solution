import * as React from "react";
import { cn } from "@/lib/utils";

const HeroSection = ({
  children,
  className,
  variant = "gradient",
}) => {
  const variants = {
    default: "bg-background",
    gradient: "hero-gradient-soft",
    minimal: "bg-muted/30",
  };

  return (
    <section
      className={cn("relative overflow-hidden", variants[variant], className)}
    >
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      )}
      <div className="relative">{children}</div>
    </section>
  );
};

export default HeroSection;
