import { useEffect } from "react";
import { gsap } from "gsap";

const RADIUS = 70;
const PULL_FACTOR = 0.45;

/**
 * Pulls every .magnetic element toward the cursor within a 70px radius,
 * then springs back with an elastic ease once the cursor leaves. Skipped
 * entirely on touch devices, where there is no cursor to react to.
 */
export function useMagneticButtons(): void {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const elements = gsap.utils.toArray<HTMLElement>(".magnetic");
    const xTo = elements.map((el) => gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" }));
    const yTo = elements.map((el) => gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" }));
    const inside = elements.map(() => false);

    function handleMouseMove(e: MouseEvent) {
      elements.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS) {
          inside[i] = true;
          const pull = 1 - dist / RADIUS;
          xTo[i](dx * pull * PULL_FACTOR);
          yTo[i](dy * pull * PULL_FACTOR);
        } else if (inside[i]) {
          inside[i] = false;
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
        }
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
}