import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)} aria-label="Mapa Fácil — início">
      <span className="relative grid size-9 place-items-center rounded-xl bg-ink text-ink-foreground shadow-card">
        <span className="font-display text-lg font-extrabold leading-none">M</span>
        <span className="absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
          <Check className="size-2.5" strokeWidth={4} />
        </span>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[17px] font-extrabold tracking-tight",
            tone === "light" ? "text-ink-foreground" : "text-foreground",
          )}
        >
          Mapa Fácil
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[10px] font-bold tracking-[0.16em] uppercase",
            tone === "light" ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          Reforma Tributária
        </span>
      </span>
    </Link>
  );
}
