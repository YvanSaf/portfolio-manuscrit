import { useEffect } from "react";

/**
 * Makes the paper grain texture drift subtly toward the cursor, lerped
 * for a smooth trailing feel. Disabled entirely for
 * prefers-reduced-motion, matching the rest of the site's motion policy.
 */
export function useGrainParallax(elementId: string): void {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const grain = document.getElementById(elementId);
    if (!grain) return;

    let tx = 0;
    let ty = 0;
    let gx = 0;
    let gy = 0;
    let frame = 0;

    function handleMouseMove(e: MouseEvent) {
      tx = (e.clientX / window.innerWidth - 0.5) * 16;
      ty = (e.clientY / window.innerHeight - 0.5) * 16;
    }

    function loop() {
      gx += (tx - gx) * 0.05;
      gy += (ty - gy) * 0.05;
      grain!.style.transform = `translate(${gx}px, ${gy}px)`;
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMouseMove);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [elementId]);
}