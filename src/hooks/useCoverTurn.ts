import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pageTurn } from "../lib/sound";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pins the cover-spread section and turns the cover like a page,
 * driven by scroll position. Skips the animation entirely for
 * prefers-reduced-motion, revealing the back content immediately instead.
 */
export function useCoverTurn(sectionSelector: string): void {
  const soundPlayedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const front = document.querySelector<HTMLElement>(".cover-front");
    if (!front) return;

    if (reduceMotion) {
      front.style.display = "none";
      const backInner = document.querySelector<HTMLElement>(".cover-back .cover-inner");
      if (backInner) backInner.style.opacity = "1";
      return;
    }

    gsap.set(front, { transformStyle: "preserve-3d" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionSelector,
        start: "top top",
        end: "+=100%",
        scrub: 0.6,
        pin: true,
        onUpdate: (self) => {
          if (self.progress > 0.35 && !soundPlayedRef.current) {
            soundPlayedRef.current = true;
            pageTurn();
          } else if (self.progress < 0.05) {
            soundPlayedRef.current = false;
          }
          const eggCover = document.querySelector<HTMLElement>(".egg-on-cover");
          if (eggCover) {
            eggCover.style.opacity = self.progress > 0.3 ? "0" : "";
            eggCover.style.pointerEvents = self.progress > 0.3 ? "none" : "";
          }
        },
      },
    })
      .to(".cover-front", { rotateY: -55, skewY: -2.5, scaleY: 1.012, ease: "power1.out" }, 0)
      .to(".cover-front", { rotateY: -105, skewY: 2.5, scaleY: 0.985, ease: "power1.inOut" }, 0.38)
      .to(".cover-front", { rotateY: -150, skewY: 0, scaleY: 1, ease: "power1.in" }, 0.72)
      .fromTo(".cover-crease", { left: "-8%", opacity: 0 }, { left: "48%", opacity: 1, ease: "none" }, 0)
      .to(".cover-crease", { left: "108%", opacity: 0, ease: "none" }, 0.5)
      .to(".cover-shade", { opacity: 1, duration: 0.3 }, 0)
      .to(".cover-shade", { opacity: 0, duration: 0.3 }, 0.55)
      .fromTo(".cover-back .cover-inner", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4 }, 0.3);

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [sectionSelector]);
}