import { useState } from "react";
import { useContent } from "../hooks/useContent";
import { isSoundOn, setSoundOn, tick } from "../lib/sound";
import { toHexAscii } from "../lib/text";
import { useGrainParallax } from "../hooks/useGrainParallax";
import { useLanguage } from "../hooks/useLanguage";

export default function PageChrome() {
  const { chrome: t } = useContent();
  const { lang, setLang } = useLanguage();
  const [soundOn, setSoundOnState] = useState(isSoundOn());

  useGrainParallax("grain-svg");

  function handleToggle() {
    const next = !soundOn;
    setSoundOn(next);
    setSoundOnState(next);
    if (next) {
      tick();
    }
  }

  return (
    <>
      <canvas id="sketch-canvas" className="pointer-events-none fixed inset-0 z-50" />

      <div className="side-margin side-margin-left" aria-hidden="true">
        {toHexAscii(t.sideMarginRight)}
      </div>
      <div className="side-margin side-margin-right" aria-hidden="true">
        {t.sideMarginRight}
      </div>

      <div className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden">
        <svg
          id="grain-svg"
          className="absolute -inset-[20px] h-[calc(100%+40px)] w-[calc(100%+40px)] opacity-5 mix-blend-multiply"
          aria-hidden="true"
        >
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>
      </div>

      <button
        className="sound-toggle magnetic"
        type="button"
        aria-pressed={soundOn}
        title={t.soundToggleLabel}
        onClick={handleToggle}
      >
        {!soundOn && (
          <svg className="icon-off" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="var(--ink)" />
            <path d="M16 9l6 6M22 9l-6 6" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {soundOn && (
          <svg className="icon-on" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3z" fill="var(--ink)" />
            <path d="M16 8a5 5 0 010 8" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path
              d="M19 5a9 9 0 010 14"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity=".55"
            />
          </svg>
        )}
      </button>
      <button
        className="lang-toggle"
        type="button"
        onClick={() => setLang(lang === "fr" ? "en" : "fr")}
        title={lang === "fr" ? "Switch to English" : "Passer en français"}
      >
        {lang === "fr" ? "EN" : "FR"}
      </button>
    </>
  );
}