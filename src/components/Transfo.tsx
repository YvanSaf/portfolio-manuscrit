import { fr } from "../content/fr";
import TomoeEgg from "./TomoeEgg";

export default function Transfo() {
  const { transfo: t } = fr;

  return (
    <section className="transfo relative h-[380vh] border-t border-dashed border-guide">
      <div className="transfo-pin sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="transfo-bg-grid" />

        <div className="absolute left-7 top-12 text-xs uppercase tracking-[3px] text-ink-soft">
          {t.label}
        </div>

        <TomoeEgg id="transfo" className="egg egg-on-transfo" />

        <div
          id="char-stage"
          className="relative aspect-[828/1108] h-[min(78vh,860px)] w-auto max-w-[90vw] overflow-hidden border-[3px] border-ink bg-kraft shadow-[6px_6px_0_var(--ink)]"
        >
          <canvas id="char-canvas" className="block h-full w-full" width={828} height={1108} />
        </div>

        <div className="absolute bottom-[60px] left-1/2 w-[80%] max-w-[480px] -translate-x-1/2 text-center font-anime-ace text-lg text-red">
          {t.caption}
        </div>
      </div>
    </section>
  );
}