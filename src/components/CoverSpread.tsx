import { useEffect, useRef } from "react";
import { fr } from "../content/fr";
import TomoeEgg from "./TomoeEgg";
import { useCoverTurn } from "../hooks/useCoverTurn";

export default function CoverSpread() {
  const { coverSpread: t } = fr;
  const sectionRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const eggRef = useRef<HTMLSpanElement>(null);

  useCoverTurn("#cover-spread");

  useEffect(() => {
    const hint = hintRef.current;
    const spread = sectionRef.current;
    const egg = eggRef.current;
    if (!hint || !spread || !egg) return;

    function syncPosition() {
      const hintRect = hint!.getBoundingClientRect();
      const spreadRect = spread!.getBoundingClientRect();
      egg!.style.top = `${hintRect.top - spreadRect.top - 6}px`;
      egg!.style.left = `${hintRect.right - spreadRect.left + 8}px`;
    }

    syncPosition();
    window.addEventListener("resize", syncPosition);
    window.addEventListener("load", syncPosition);
    const timeout = setTimeout(syncPosition, 400);

    return () => {
      window.removeEventListener("resize", syncPosition);
      window.removeEventListener("load", syncPosition);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="cover-spread relative" id="cover-spread">
      <div className="cover-perspective">
        <div className="cover-front">
          <div className="cover-inner mx-auto max-w-[1100px] px-7">
            <div className="plate-label mb-4 flex items-center gap-2 font-anime-ace text-[13px] uppercase tracking-[4px] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              {t.plateLabel}
            </div>

            <h1 className="font-anime-ace font-bold uppercase leading-[0.95] tracking-[-1px] text-[clamp(1.85rem,4.8vw,3.4rem)] text-ink">
              {t.titleBefore} <em className="not-italic text-red">{t.titleEm}</em>
              <br />
              {t.titleAfter}
            </h1>

            <span className="mt-3 inline-block font-anime-ace text-[22px] text-ink-soft">{t.role}</span>

            <span
              ref={hintRef}
              className="cover-hint mt-10 block font-anime-ace text-[15px] uppercase tracking-[2px] text-ink-soft opacity-80"
            >
              {[...t.hint].map((ch, i) => (
                <span key={i} className="letter" style={{ animationDelay: `${i * 0.045}s` }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </div>
          <div className="cover-shade" />
          <div className="cover-crease" />
        </div>

        <div className="cover-back">
          <div className="cover-inner mx-auto max-w-[1100px] px-7">
            <p className="mb-7 max-w-[56ch] text-[16px] text-ink-soft">{t.bio}</p>
            <div className="note relative font-anime-ace text-red before:absolute before:left-[-18px] before:top-1 before:h-[10px] before:w-[10px] before:rotate-45 before:border-b-2 before:border-l-2 before:border-red before:content-['']">
              {t.noteLine1}
              <br />
              {t.noteLine2}
              <br />
              {t.noteLine3}
            </div>
          </div>
        </div>
      </div>

      <TomoeEgg ref={eggRef} id="cover" className="egg egg-on-cover" />
    </section>
  );
}