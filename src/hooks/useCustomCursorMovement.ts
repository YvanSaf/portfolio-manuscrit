import { useEffect, type RefObject } from "react";

export function useCustomCursorMovement(cursorRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let lastX = mx;
    let lastY = my;
    let visible = false;
    let frame = 0;

    cursor.style.opacity = "0";
    cursor.style.transition = "opacity .2s ease";

    function handleMouseMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        cursor!.style.opacity = "1";
      }
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      cursor!.dataset.state = target ? target.dataset.cursor ?? "default" : "default";
    }

    function handleMouseLeave() {
      cursor!.style.opacity = "0";
    }

    function handleMouseEnter() {
      cursor!.style.opacity = "1";
    }

    function loop() {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      const vx = mx - lastX;
      const vy = my - lastY;
      lastX = mx;
      lastY = my;
      if (Math.hypot(vx, vy) > 0.6) {
        const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
        cursor!.style.setProperty("--rot", `${angle + 45}deg`);
      }
      cursor!.style.transform = `translate(${cx}px, ${cy}px)`;
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(frame);
    };
  }, [cursorRef]);
}