import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades and slides in every .reveal-up element currently in the DOM,
 * staggered in groups of 3. Reusable across sections: any element with
 * this class picks up the effect automatically once mounted.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const triggers = gsap.utils.toArray<HTMLElement>(".reveal-up").map((el, i) =>
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: (i % 3) * 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      })
    );

    return () => {
      triggers.forEach((tween) => tween.scrollTrigger?.kill());
    };
  }, []);
}