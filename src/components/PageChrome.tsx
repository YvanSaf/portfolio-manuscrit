import { fr } from "../content/fr";

export default function PageChrome() {
  const { chrome: t } = fr;

  return (
    <>
      <canvas id="sketch-canvas" className="pointer-events-none fixed inset-0 z-50" />

      <div className="side-margin side-margin-left" aria-hidden="true" />
      <div className="side-margin side-margin-right" aria-hidden="true">
        {t.sideMarginRight}
      </div>

      <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full" aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

      <button
        className="sound-toggle fixed right-6 top-6 z-50"
        type="button"
        aria-pressed="false"
        title={t.soundToggleLabel}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9v6h4l5 5V4L7 9H3z" fill="var(--ink)" />
          <path d="M16 9l6 6M22 9l-6 6" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </>
  );
}