import { useEffect } from "react";
import { tick } from "../lib/sound";

/**
 * Plays a short tick sound whenever any .panel element is clicked,
 * site-wide.
 */
export function usePanelClickSound(): void {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if ((e.target as HTMLElement).closest(".panel")) {
        tick();
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}