import { useEffect, useRef, useState, type ElementType, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Counts from 0 to `to` when scrolled into view. */
export function CountUp({ to, duration = 1400, suffix = "", prefix = "" }: { to: number; duration?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/** Card with a mouse-following green spotlight. */
export function Spotlight({ as: Tag = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <Tag onMouseMove={onMove} className={cn("spotlight", className)}>
      {children}
    </Tag>
  );
}

/** Small pulsing "live" dot. */
export function LiveDot({ className }: { className?: string }) {
  return <span className={cn("inline-block size-2 shrink-0 rounded-full bg-primary animate-pulse-ring", className)} />;
}
