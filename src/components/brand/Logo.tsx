import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string; tone?: "ink" | "light" }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)} aria-label="Mapa Fácil — início">
      <span className="relative grid size-9 place-items-center rounded-xl border border-primary/40 bg-ink text-foreground shadow-glow">
        <span className="font-display text-lg font-extrabold leading-none text-gradient">M</span>
        <span className="absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
          <Check className="size-2.5" strokeWidth={4} />
        </span>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[17px] font-extrabold tracking-tight text-foreground">Mapa Fácil</span>
        <span className="mt-0.5 block font-mono-tech text-[9.5px] font-bold text-muted-foreground uppercase">
          Reforma Tributária
        </span>
      </span>
    </Link>
  );
}
