import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAME_COUNT } from "./useCharFrames";

gsap.registerPlugin(ScrollTrigger);

/**
 * Maps scroll progress within the section to a frame index, and calls
 * the provided drawFrame function only when the target frame actually
 * changes, avoiding redundant canvas redraws.
 */
export function useCharScrollAnimation(
  sectionSelector: string,
  drawFrameRef: RefObject<(index: number) => void>
): void {
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionSelector,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: (self) => {
        const idx = Math.min(FRAME_COUNT - 1, Math.round(self.progress * (FRAME_COUNT - 1)));
        if (idx !== currentFrameRef.current) {
          currentFrameRef.current = idx;
          drawFrameRef.current?.(idx);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [sectionSelector, drawFrameRef]);
}