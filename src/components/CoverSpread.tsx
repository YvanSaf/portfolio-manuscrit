import { fr } from "../content/fr";
import TomoeEgg from "./TomoeEgg";

export default function CoverSpread() {
  const { coverSpread: t } = fr;

  return (
    <section className="cover-spread relative" id="cover-spread">
      <div className="wrap py-24">
        <div className="plate-label mb-4 flex items-center gap-2 font-anime-ace text-[13px] uppercase tracking-[4px] text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          {t.plateLabel}
        </div>

        <h1 className="font-anime-ace font-bold uppercase leading-[0.95] tracking-[-1px] text-[clamp(2.5rem,7vw,4.75rem)] text-ink">
          {t.titleBefore} <em className="not-italic text-red">{t.titleEm}</em>
          <br />
          {t.titleAfter}
        </h1>

        <span className="mt-3 inline-block font-anime-ace text-[22px] text-ink-soft">
          {t.role}
        </span>

        <span className="mt-10 block font-anime-ace text-[15px] uppercase tracking-[2px] text-ink-soft opacity-80">
          {t.hint}
        </span>

        <div className="mt-16 max-w-[56ch]">
          <p className="text-ink-soft">{t.bio}</p>
          <div className="note font-anime-ace text-red">
            {t.noteLine1}
            <br />
            <span className="strike line-through opacity-55">{t.noteStrike}</span>
            <br />
            {t.noteLine2}
          </div>
        </div>
      </div>

      <TomoeEgg className="egg egg-on-cover" />
    </section>
  );
}