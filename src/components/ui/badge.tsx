import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        iq: "bg-iq/20 text-iq border-iq/30",
        eq: "bg-eq/20 text-eq border-eq/30",
        sq: "bg-sq/20 text-sq border-sq/30",
        aq: "bg-aq/20 text-aq border-aq/30",
        red: "bg-band-red/20 text-band-red border-band-red/30",
        yellow: "bg-band-yellow/20 text-band-yellow border-band-yellow/30",
        green: "bg-band-green/20 text-band-green border-band-green/30",
        "phase-pre": "bg-phase-pre/20 text-phase-pre border-phase-pre/30",
        "phase-intervention": "bg-phase-intervention/20 text-phase-intervention border-phase-intervention/30",
        "phase-post": "bg-phase-post/20 text-phase-post border-phase-post/30",
        "phase-corporate": "bg-phase-corporate/20 text-phase-corporate border-phase-corporate/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
